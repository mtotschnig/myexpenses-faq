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

const baseURL = "https://faq.myexpenses.mobi/"
const targetUrl = "https://github.com/mtotschnig/MyExpenses/wiki/FAQ:-"
const sections = [
  "Data", "Synchronization", "Import-Export", "OCR", "Distribution", "Reconciliation", "Templates-and-plans", "UI"
]
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
  "category-types": "Data#expense-and-income-categories",
  "ios": "Distribution#is-there-a-version-of-this-project-for-iosiphone",
  "plans-create" : "Templates-and-plans#how-to-create-a-recurring-transaction",
  "plans-future" : "Templates-and-plans#how-can-i-add-future-instances-of-plans",
  "plans-past" : "Templates-and-plans#how-can-i-add-past-instances-of-plans",
  "device-limit" : "Distribution#when-trying-to-validate-a-licence-key-on-the-f-droid-version-i-get-device-limit-exceeded",
  "data-auto-backup" : "Data#how-can-i-backup-my-data-for-the-case-my-device-gets-lost"
}

export default {
  async fetch(request, env, ctx): Promise<Response> {

    const url = new URL(request.url)
    const path = url.pathname.substring(1)

    if (path.length == 0) {
        const html = `<!DOCTYPE html>
        <body>
          <h1>My Expenses FAQ URL Shortener</h1>
          <ul>
            ${sections.map(section => `<li><a href="${baseURL}${section}">${section}</a></li>`).join("")}
            ${Object.entries(shortURLs).map(([key, value]) => `<li><a href="${baseURL}${key}">${key}</a></li>`).join("")}
          </ul>
        </body>`
          return new Response(html, {
            headers: { "content-type": "text/html;charset=UTF-8" },
            status: 200
    });
    } else {
      const redirectURL = shortURLs[path] || path
      return Response.redirect(targetUrl + redirectURL, 301)
    }
  },
} satisfies ExportedHandler<Env>;
