export const onRequest: PagesFunction = async ({ request, next }) => {
  const url = new URL(request.url);
  const hostname = url.hostname;

  let domain = "https://voteforbalen.com";

  if (hostname.includes("voteforrevolution.com")) {
    domain = "https://voteforrevolution.com";
  } else if (hostname.includes("balenfornepal.com")) {
    domain = "https://balenfornepal.com";
  }

  const response = await next();
  const text = await response.text();

  const modified = text
    .replaceAll("{{DOMAIN}}", domain);

  return new Response(modified, {
    headers: response.headers
  });
};
