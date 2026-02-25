// Vercel native serverless function — no external imports
const ADVISION_API =
  process.env.ADVISION_API_URL || "https://ad-vision-ui.vercel.app";

// Health check / debug
function isHealthCheck(path: string) {
  return path === "" || path === "/" || path === "/health";
}

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

    const opts: any = { method, headers };
    if (method !== "GET" && method !== "HEAD" && req.body) {
      opts.body =
        typeof req.body === "string" ? req.body : JSON.stringify(req.body);
    }

    const apiRes = await fetch(`${ADVISION_API}${targetPath}`, opts);

    // Forward set-cookie headers
    try {
      const setCookie = (apiRes.headers as any).getSetCookie?.() || [];
      if (setCookie.length > 0) {
        res.setHeader("Set-Cookie", setCookie);
      }
    } catch (_) {}

    const text = await apiRes.text();
    return res
      .status(apiRes.status)
      .setHeader("Content-Type", "application/json")
      .end(text);
  } catch (e: any) {
    console.error(`Proxy error for ${targetPath}:`, e.message);
    return res.status(502).json({ message: "Backend service unavailable" });
  }
}

export default async function handler(req: any, res: any) {
  try {
    const url = (req.url || "").split("?")[0];
    const path = url.replace(/^\/api/, "");
    const method = (req.method || "GET").toUpperCase();

    // Health check
    if (isHealthCheck(path)) {
      return res.status(200).json({
        ok: true,
        url: req.url,
        method,
        advisionApi: ADVISION_API,
        time: new Date().toISOString(),
      });
    }

    // Auth routes
    if (path === "/auth/login" && method === "POST")
      return proxyToAdVision(req, res, "/api/auth/login", "POST");
    if (path === "/auth/verify" && method === "GET")
      return proxyToAdVision(req, res, "/api/auth/verify", "GET");
    if (path === "/auth/logout" && method === "POST")
      return proxyToAdVision(req, res, "/api/auth/logout", "POST");

    // Admin routes
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

    return res.status(404).json({ message: "Not found" });
  } catch (e: any) {
    console.error("Handler error:", e);
    return res
      .status(500)
      .json({ message: "Internal server error", error: e.message });
  }
}
