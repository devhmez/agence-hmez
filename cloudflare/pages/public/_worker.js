// Keep the application and its assets in the existing Worker behind this address.
const address = {
  async fetch(request, env) {
    const response = await env.AGENCE.fetch(request);
    if (response.status !== 200) return response;

    const replaceAddress = (value) =>
      value?.replaceAll(env.SOURCE_SITE_URL, env.PUBLIC_SITE_URL);
    const headers = new Headers(response.headers);
    const path = new URL(request.url).pathname;
    if (path === "/robots.txt" || path === "/sitemap.xml") {
      headers.delete("content-length");
      headers.delete("etag");
      return new Response(replaceAddress(await response.text()), {
        status: response.status,
        headers,
      });
    }
    if (!headers.get("content-type")?.includes("text/html")) return response;

    headers.delete("content-length");
    headers.delete("etag");
    const metadata = {
      element(element) {
        for (const attribute of ["href", "content"]) {
          const value = element.getAttribute(attribute);
          if (value?.includes(env.SOURCE_SITE_URL)) {
            element.setAttribute(attribute, replaceAddress(value));
          }
        }
      },
    };
    return new HTMLRewriter()
      .on('link[rel="canonical"], meta[property^="og:"], meta[name^="twitter:"]', metadata)
      .transform(new Response(response.body, { status: response.status, headers }));
  },
};
export default address;
