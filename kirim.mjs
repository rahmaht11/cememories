import { getStore } from "@netlify/blobs";

const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), { status, headers: { "content-type": "application/json" } });

export default async (req) => {
  if (req.method !== "POST") return json({ error: "Metode tidak diizinkan" }, 405);
  let body;
  try { body = await req.json(); } catch { return json({ error: "Data tidak terbaca" }, 400); }

  if (body.website) return json({ ok: true }); // honeypot untuk bot
  const name = String(body.name || "").trim().slice(0, 80);
  const message = String(body.message || "").trim().slice(0, 3000);
  if (!name || !message) return json({ error: "Nama dan pesan wajib diisi" }, 400);

  const store = getStore("kenangan");
  const id = String(Date.now()).padStart(15, "0") + "-" + Math.random().toString(36).slice(2, 7);
  let hasPhoto = false;

  if (body.photo) {
    const m = /^data:image\/(jpeg|png|webp);base64,(.+)$/.exec(String(body.photo));
    if (!m) return json({ error: "Format foto tidak didukung" }, 400);
    const bytes = Buffer.from(m[2], "base64");
    if (bytes.length > 3 * 1024 * 1024) return json({ error: "Foto terlalu besar" }, 413);
    await store.set("p/" + id, bytes, { metadata: { type: "image/" + m[1] } });
    hasPhoto = true;
  }
  await store.setJSON("e/" + id, { id, name, message, hasPhoto, at: Date.now() });
  return json({ ok: true, id });
};

export const config = { path: "/api/kirim" };
