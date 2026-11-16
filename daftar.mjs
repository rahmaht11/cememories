import { getStore } from "@netlify/blobs";

export default async (req) => {
  const store = getStore("kenangan");
  const after = new URL(req.url).searchParams.get("after") || "";
  const { blobs } = await store.list({ prefix: "e/" });
  const ids = blobs.map((b) => b.key.slice(2)).sort();
  const fresh = ids.filter((id) => id > after);
  const entries = [];
  for (const id of fresh) {
    const e = await store.get("e/" + id, { type: "json" });
    if (e) entries.push(e);
  }
  return new Response(JSON.stringify({ ids, entries }), {
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });
};

export const config = { path: "/api/daftar" };
