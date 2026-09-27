# Opportunity Lens

Marketing site for Opportunity Lens, a small team building practical AI, computer vision, software, and applied research.

The site is a Next.js app meant to run on Vercel. Enquiries are stored in Supabase. Email is sent with Resend when it is configured. Project write-ups stay in `data/projects.ts`. Contact uploads are not committed to Git.

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

```bash
npm run lint
npm run build
npm run start
```

`npm run build` needs the environment variables only at runtime for the contact form. The build itself succeeds without them. Until Supabase is configured, the form stays up and tells the visitor the enquiry was not stored.

## Environment variables

Copy `.env.example` to `.env.local`. Do not commit `.env.local`.

| Variable | Where it lives | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Public | Supabase project URL. Required to save enquiries. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public | Not used by the contact form. Do not give it write access to enquiries or files. |
| `SUPABASE_SERVICE_ROLE_KEY` | Server only | Inserts enquiries and uploads private files. Never expose this in client code. |
| `RESEND_API_KEY` | Server only | Sends mail. Optional. Saving an enquiry still works without it. |
| `CONTACT_TO_EMAIL` | Server only | Team inbox for new enquiries. |
| `CONTACT_FROM_EMAIL` | Server only | Optional verified sender, for example `Opportunity Lens <hello@yourdomain.com>`. |

Public variables are the ones prefixed with `NEXT_PUBLIC_`. Everything else stays on the server.

## Supabase setup

1. Create a Supabase project.
2. Open the SQL editor and run `supabase/schema.sql`.
   That creates `project_inquiries` and a private Storage bucket named `project-files`.
3. Row level security is enabled and no public policies are added, so the anon key cannot read or write enquiries. The API uses the service role, which bypasses those checks.
4. Copy the project URL, anon key, and service role key into `.env.local` and into Vercel.

Statuses used by the table: `NEW`, `CONTACTED`, `IN_PROGRESS`, `COMPLETED`, `ARCHIVED`. New rows start as `NEW`. Change the status in the Supabase table editor. That is the admin view for a three-person team. A separate login dashboard is not part of this site.

Attachments are stored at `project-files/<inquiry-id>/...`. The bucket is private. Download files from the Supabase dashboard. Do not make the bucket public.

Allowed uploads: PDF, Word (`.doc`, `.docx`), text, PNG, JPG, WebP. Up to 3 files, 3.5 MB combined. Executables and HTML are rejected. The cap matches Vercel's request body limit.

## Resend setup

1. Create an API key at https://resend.com.
2. Set `RESEND_API_KEY` and `CONTACT_TO_EMAIL`.
3. For mail to visitors, verify your domain in Resend and set `CONTACT_FROM_EMAIL`.

If `CONTACT_FROM_EMAIL` is empty, Resend's test sender is used. That sender can only deliver to the email address on the Resend account, so visitor confirmations will fail until a domain is verified. The enquiry is still saved. The form does not show an error for a mail failure after a successful save.

The team email includes the name, email, organisation, project type, budget, message, preferred contact, submission time, and private storage paths. It does not include secrets or a public file link.

## Vercel deployment

1. Import the GitHub repository in Vercel.
2. Framework preset: Next.js. Leave the build command as `npm run build` and the output as the default. Do not enable static export.
3. Add the environment variables from `.env.example` for Production (and Preview, if you want the form there).
4. Deploy.

`output: "export"` was removed because a static export cannot run `app/api/contact`. The site needs a normal Node deployment so `/contact` and the API both work.

## Project management

Edit `data/projects.ts` to publish work. Each entry can include:

- `title`, `description`, `category`, `tags`
- `featured`
- `image` (a file in `public/`, or an absolute URL) and `imageAlt`
- `links.github`, `links.demo`, `links.paper`

Remove `placeholder: true` when an entry is real work. Contact-form submissions do not create GitHub repositories. Add a public repo URL here only after the team decides to publish one.

Navigation pages reuse the homepage sections:

- `/services`
- `/work`
- `/research`
- `/about`
- `/contact`

Service cards link to `/contact?project=...` and pre-select the project type when it matches the form list.

## Contact channels

Public email, LinkedIn, GitHub, and WhatsApp live in `data/contact.ts`. Leave `value` as `null` until the detail is real. The contact page shows “to be published” instead of an empty link. Do not invent addresses or numbers.
