import { getStore } from "@netlify/blobs";

export default async (req) => {
  const pin = Netlify.env.get("ADMIN_PIN");
  if (!pin) return new Response(JSON.stringify({ error: "ADMIN_PIN belum diatur di Netlify" }), { status: 403 });
  if (req.headers.get("x-pin") !== pin) return new Response(JSON.stringify({ error: "PIN salah" }), { status: 401 });
  const { id } = await req.json();
  if (!/^[0-9a-z-]+$/.test(String(id))) return new Response("Bad request", { status: 400 });
  const store = getStore("kenangan");
  await store.delete("e/" + id);
  await store.delete("p/" + id);
  return new Response(JSON.stringify({ ok: true }), { headers: { "content-type": "application/json" } });
};

export const config = { path: "/api/hapus" };
