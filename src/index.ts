/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

const shortURLs = {
  "data-transfer": "Data#how-to-transfer-data-to-a-new-device",
  "sync-debug": "Synchronization#synchronization-stopped-working-how-can-i-find-out-why",
  "sync-budget": "Synchronization#synchronization-of-budgets",
  "data-attachments": "Data#pros-and-cons-of-copying-or-linking-attachments",
  "data-share": "Data#what-are-the-different-share-options",
  "pdf-layout": "Import-Export#how-to-configure-header-and-footer-on-the-pdf-printout",
  "data-encryption": "Data#how-does-database-encryption-work",
  "sync-xiaomi": "Synchronization#synchronization-does-not-work-on-my-xiaomi-or-tcl-or-similar-device-why",
  "parties-merge": "Data#strategies-for-merging-duplicate-parties",
  "category-types": "Data#expense-and-income-categories"

} as Record<string, string>

export default {
	async fetch(request, env, ctx): Promise<Response> {

    const url = new URL(request.url)
    const path = url.pathname.substring(1)

    const redirectURL = path.length == 0 ? "FAQ" : ("FAQ:-" + (shortURLs[url.pathname.substring(1)] || path))

    return Response.redirect("https://github.com/mtotschnig/MyExpenses/wiki/" + redirectURL, 301)
  },
} satisfies ExportedHandler<Env>;
