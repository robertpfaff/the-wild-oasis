const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const ALLOWED_ORIGINS = Deno.env.get("ALLOWED_ORIGINS") ?? "*";

console.error("[delete-cabin] function started");

function corsHeaders(origin = "*") {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}

async function verifyJwtWithSupabase(accessToken: string) {
  if (!SUPABASE_SERVICE_ROLE_KEY || !SUPABASE_URL) return null;
  
  try {
    // Parse JWT to get the user id (sub)
    function parseJwt(token: string) {
      try {
        const parts = token.split(".");
        if (parts.length !== 3) return null;
        const payload = parts[1];
        const b64 = payload.replace(/-/g, "+").replace(/_/g, "/");
        const padded = b64 + "=".repeat((4 - (b64.length % 4)) % 4);
        const decoded = atob(padded);
        return JSON.parse(decoded);
      } catch (e) {
        return null;
      }
    }
    
    const jwtPayload = parseJwt(accessToken);
    const userId = jwtPayload?.sub;
    if (!userId) return null;

    // Use Supabase Admin Auth API
    const resp = await fetch(`${SUPABASE_URL}/auth/v1/admin/users/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        apikey: SUPABASE_SERVICE_ROLE_KEY,
      },
    });
    
    if (!resp.ok) {
      console.error("Admin API error:", resp.status, await resp.text());
      return null;
    }
    
    const userData = await resp.json();
    console.error("[delete-cabin] Admin API response:", JSON.stringify(userData));
    
    // Check is_super_admin in app_metadata
    return {
      id: userData.id,
      email: userData.email,
      is_super_admin: userData.app_metadata?.is_super_admin === true
    };
    
  } catch (err) {
    console.error("verifyJwtWithSupabase error:", err);
    return null;
  }
}

async function hardDeleteById(id: string) {
  if (!SUPABASE_URL) throw new Error("SUPABASE_URL not configured");
  const encoded = encodeURIComponent(id);
  const url = `${SUPABASE_URL}/rest/v1/cabins?id=eq.${encoded}`;

  const resp = await fetch(url, {
    method: "DELETE",
    headers: {
      apikey: SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      Prefer: "return=representation",
      "Content-Type": "application/json",
    },
  });

  const text = await resp.text();
  let parsed: unknown = text;
  try {
    parsed = text ? JSON.parse(text) : null;
  } catch {
    // leave as text
  }
  return { ok: resp.ok, status: resp.status, body: parsed };
}

Deno.serve(async (req: Request) => {
  const origin = req.headers.get("origin") ?? ALLOWED_ORIGINS;
  const baseCors = corsHeaders(origin);

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: baseCors });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Only POST allowed" }), {
      status: 405,
      headers: { ...baseCors, "Content-Type": "application/json" },
    });
  }

  const auth = req.headers.get("authorization") ?? "";
  if (!auth.startsWith("Bearer ")) {
    return new Response(JSON.stringify({ error: "Missing Authorization header" }), {
      status: 401,
      headers: { ...baseCors, "Content-Type": "application/json" },
    });
  }
  const token = auth.split(" ")[1];

  // JWT verification with Supabase

  const user = await verifyJwtWithSupabase(token);
  console.error("[delete-cabin] user from Supabase:", JSON.stringify(user));
  console.error("[delete-cabin] is_super_admin:", user?.is_super_admin);
  if (!user) {
    console.error("[delete-cabin] forbidden: user is null");
    return new Response(JSON.stringify({ error: "Invalid or unverifiable token" }), {
      status: 401,
      headers: { ...baseCors, "Content-Type": "application/json" },
    });
  }
  if (!user.is_super_admin) {
    console.error("[delete-cabin] forbidden: is_super_admin is not true");
    return new Response(JSON.stringify({ error: "forbidden" }), {
      status: 403,
      headers: { ...baseCors, "Content-Type": "application/json" },
    });
  }

  let reqBody: any;
  try {
    reqBody = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { ...baseCors, "Content-Type": "application/json" },
    });
  }


  const id = reqBody?.id;
  console.log("[delete-cabin] id to delete:", id);
  if (!id) {
    return new Response(JSON.stringify({ error: "Missing 'id' in request body" }), {
      status: 400,
      headers: { ...baseCors, "Content-Type": "application/json" },
    });
  }

  try {
    const result = await hardDeleteById(String(id));
    if (!result.ok) {
      return new Response(JSON.stringify({ error: "Delete failed", detail: result.body }), {
        status: result.status || 500,
        headers: { ...baseCors, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true, deleted: result.body }), {
      status: 200,
      headers: { ...baseCors, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("delete-cabin error:", err);
    return new Response(JSON.stringify({ error: "Server error", detail: String(err) }), {
      status: 500,
      headers: { ...baseCors, "Content-Type": "application/json" },
    });
  }
});