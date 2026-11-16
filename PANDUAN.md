# Dinding Kenangan Anjangsana: cara pasang di Netlify

Halaman untuk peserta: alamat-situs/            (kirim pesan + foto, ada QR di layar)
Halaman untuk proyektor: alamat-situs/layar.html (live, pesan baru langsung muncul)

## Pasang (sekitar 5 menit, tanpa coding)
1. Buat akun gratis di github.com, klik New repository, beri nama bebas, lalu "uploading an existing file".
   Ekstrak ZIP ini, seret SEMUA isinya (folder netlify, folder public, netlify.toml, package.json) ke halaman GitHub, klik Commit.
2. Buka app.netlify.com, Add new site > Import an existing project > GitHub > pilih repository tadi > Deploy.
   Biarkan semua isian bawaan.
3. Setelah selesai, buka Site configuration > Environment variables > Add variable:
   Key: ADMIN_PIN   Value: PIN pilihanmu (dipakai untuk menghapus pesan). Lalu Deploys > Trigger deploy.
4. (Opsional) Site configuration > Change site name, supaya alamatnya pendek.

## Saat acara
- Buka alamat-situs/layar.html di laptop yang tersambung ke proyektor, klik "Layar penuh".
- Kode QR di pojok layar mengarah ke halaman kirim pesan. Peserta cukup scan.
- "Putar otomatis" menampilkan semua kenangan bergantian saat tidak ada pesan baru.
- "Unduh album" menyimpan semua foto dan pesan jadi satu file HTML untuk arsip.
- Hapus pesan: buka pesannya, klik Hapus, isi ADMIN_PIN.
