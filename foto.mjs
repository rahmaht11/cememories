import { getStore } from "@netlify/blobs";

export default async (req) => {
  const id = new URL(req.url).searchParams.get("id") || "";
  if (!/^[0-9a-z-]+$/.test(id)) return new Response("Bad request", { status: 400 });
  const store = getStore("kenangan");
  const res = await store.getWithMetadata("p/" + id, { type: "arrayBuffer" });
  if (!res) return new Response("Tidak ada", { status: 404 });
  return new Response(res.data, {
    headers: {
      "content-type": (res.metadata && res.metadata.type) || "image/jpeg",
      "cache-control": "public, max-age=31536000, immutable",
    },
  });
};

export const config = { path: "/api/foto" };
