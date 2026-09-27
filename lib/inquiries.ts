/**
 * Persist an enquiry with the Supabase service role.
 * Server-only. The anon key is never used for writes, and this module
 * must not be imported from a client component.
 */

import { safeFileName } from "@/lib/contact";

const BUCKET = "project-files";

export type InquiryRecord = {
  id: string;
  name: string;
  email: string;
  organisation: string;
  projectType: string;
  budget: string;
  message: string;
  preferredContact: string;
  attachmentPaths: string[];
};

export function isStorageConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}

function serviceHeaders(extra?: HeadersInit): HeadersInit {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    ...extra,
  };
}

function projectUrl(path: string) {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "") ?? "";
  return `${base}${path}`;
}

export async function uploadAttachments(inquiryId: string, files: File[]) {
  const paths: string[] = [];

  try {
    for (const [index, file] of files.entries()) {
      const filename = `${index + 1}-${safeFileName(file.name)}`;
      const objectPath = `${inquiryId}/${filename}`;
      const response = await fetch(
        projectUrl(`/storage/v1/object/${BUCKET}/${objectPath}`),
        {
          method: "POST",
          headers: serviceHeaders({
            "Content-Type": file.type || "application/octet-stream",
            "x-upsert": "false",
          }),
          body: await file.arrayBuffer(),
        }
      );

      if (!response.ok) {
        console.error(
          "Supabase storage upload failed",
          response.status,
          await response.text()
        );
        throw new Error("upload-failed");
      }

      paths.push(objectPath);
    }
  } catch (err) {
    await deleteAttachments(paths);
    throw err;
  }

  return paths;
}

export async function deleteAttachments(paths: string[]) {
  if (paths.length === 0) return;

  const response = await fetch(projectUrl(`/storage/v1/object/${BUCKET}`), {
    method: "DELETE",
    headers: serviceHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify({ prefixes: paths }),
  });

  if (!response.ok) {
    console.error(
      "Supabase storage cleanup failed",
      response.status,
      await response.text()
    );
  }
}

export async function insertInquiry(record: InquiryRecord) {
  const response = await fetch(projectUrl("/rest/v1/project_inquiries"), {
    method: "POST",
    headers: serviceHeaders({
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    }),
    body: JSON.stringify({
      id: record.id,
      name: record.name,
      email: record.email,
      organisation: record.organisation || null,
      project_type: record.projectType,
      budget: record.budget || null,
      message: record.message,
      preferred_contact: record.preferredContact || null,
      status: "NEW",
      attachment_count: record.attachmentPaths.length,
      attachment_paths: record.attachmentPaths,
    }),
  });

  if (!response.ok) {
    console.error(
      "Supabase insert failed",
      response.status,
      await response.text()
    );
    throw new Error("insert-failed");
  }
}
