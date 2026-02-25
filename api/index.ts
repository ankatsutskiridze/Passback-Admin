// Vercel native serverless function — no Express, no external imports
const ADVISION_API =
  process.env.ADVISION_API_URL || "https://ad-vision-ui.vercel.app";

async function proxyToAdVision(
  req: any,
  res: any,
  targetPath: string,
  method: string,
) {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (req.headers.cookie) {
      headers["Cookie"] = req.headers.cookie;
    }

    const fetchOptions: RequestInit = { method, headers };
    if (method !== "GET" && method !== "HEAD" && req.body) {
      fetchOptions.body =
        typeof req.body === "string" ? req.body : JSON.stringify(req.body);
    }

    const apiRes = await fetch(`${ADVISION_API}${targetPath}`, fetchOptions);

    // Forward set-cookie headers
    const setCookie = (apiRes.headers as any).getSetCookie?.() || [];
    if (setCookie.length > 0) {
      res.setHeader("Set-Cookie", setCookie);
    }

    const text = await apiRes.text();
    res.status(apiRes.status);
    res.setHeader("Content-Type", "application/json");
    return res.end(text);
  } catch (e: any) {
    console.error(`Proxy error for ${targetPath}:`, e.message);
    res.status(502);
    res.setHeader("Content-Type", "application/json");
    return res.end(JSON.stringify({ message: "Backend service unavailable" }));
  }
}

export default async function handler(req: any, res: any) {
  const url = (req.url || "").split("?")[0];
  // Strip /api prefix — Vercel rewrites /api/* → /api
  const path = url.replace(/^\/api/, "");
  const method = (req.method || "GET").toUpperCase();

  // ─── Auth routes ───
  if (path === "/auth/login" && method === "POST")
    return proxyToAdVision(req, res, "/api/auth/login", "POST");

  if (path === "/auth/verify" && method === "GET")
    return proxyToAdVision(req, res, "/api/auth/verify", "GET");

  if (path === "/auth/logout" && method === "POST")
    return proxyToAdVision(req, res, "/api/auth/logout", "POST");

  // ─── Admin routes ───
  if (path === "/admin/users" && method === "GET")
    return proxyToAdVision(req, res, "/api/admin/users", "GET");

  if (path === "/admin/stats" && method === "GET")
    return proxyToAdVision(req, res, "/api/admin/stats", "GET");

  if (path === "/admin/campaigns" && method === "GET")
    return proxyToAdVision(req, res, "/api/admin/campaigns", "GET");

  // /admin/users/:id/role
  const roleMatch = path.match(/^\/admin\/users\/([^/]+)\/role$/);
  if (roleMatch && method === "PATCH")
    return proxyToAdVision(
      req,
      res,
      `/api/admin/users/${roleMatch[1]}/role`,
      "PATCH",
    );

  // /admin/users/:id
  const userMatch = path.match(/^\/admin\/users\/([^/]+)$/);
  if (userMatch) {
    const uid = userMatch[1];
    if (method === "GET")
      return proxyToAdVision(req, res, `/api/admin/users/${uid}`, "GET");
    if (method === "PUT")
      return proxyToAdVision(req, res, `/api/admin/users/${uid}`, "PUT");
    if (method === "DELETE")
      return proxyToAdVision(req, res, `/api/admin/users/${uid}`, "DELETE");
  }

  // Catch-all 404
  res.status(404);
  res.setHeader("Content-Type", "application/json");
  return res.end(JSON.stringify({ message: "Not found" }));
}
