import type { NextConfig } from "next";

/**
 * Normal Node deployment for Vercel.
 *
 * `output: "export"` was removed on purpose. A static export cannot run
 * the contact API, store enquiries, or accept attachments. Trailing-slash
 * export was also sending /contact at hosts that never received a
 * contact/index.html file.
 */
const nextConfig: NextConfig = {};

export default nextConfig;
