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
  "data-transfer": "FAQ%3A-Data#how-to-transfer-data-to-a-new-device",
  "sync-debug": "FAQ%3A-Synchronization#synchronization-stopped-working-how-can-i-find-out-why",
} as Record<string, string>

export default {
	async fetch(request, env, ctx): Promise<Response> {
		 const url = new URL(request.url)

    const redirectURL = shortURLs[url.pathname.substring(1)]

    if (!redirectURL) {
      return new Response("Not found", { status: 404 });
    }

    return Response.redirect("https://github.com/mtotschnig/MyExpenses/wiki/" + redirectURL, 301)
	},
} satisfies ExportedHandler<Env>;
