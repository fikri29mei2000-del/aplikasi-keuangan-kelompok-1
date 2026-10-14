# KasBisnis

Aplikasi pencatatan keuangan bisnis berbasis React + Tailwind CSS. Data tersimpan di LocalStorage browser.

## Struktur proyek
```
index.html                      Titik masuk, memuat React, Tailwind, dan semua skrip
css/style.css                   Gaya kustom (card, input, tombol)
js/utils.js                     Konstanta, format Rupiah, calcTotals
js/hooks/useTransactions.js     State transaksi + sinkronisasi LocalStorage
js/components/SummaryCards.js   Kartu metrik periode berjalan
js/components/TransactionForm.js
js/components/TransactionTable.js
js/components/Report.js         Rekap arus kas + rincian kategori
js/App.js                       Komponen root
```

## Menjalankan
Proyek tanpa build step, tetapi harus dibuka lewat server (bukan klik dua kali `index.html`):
```
npx serve .          # atau python3 -m http.server, atau Live Server di VS Code
```

## Deploy ke GitHub Pages
Push ke GitHub, lalu Settings > Pages > Deploy from a branch > `main` / root.

## Pengembangan lanjutan
- Komponen baru: buat file di `js/components/`, lalu daftarkan `<script type="text/babel">` di `index.html` sebelum `App.js`.
- Kategori diatur di `CATEGORIES` pada `js/utils.js`.
- Untuk produksi skala besar, pindahkan ke Vite (`npm create vite@latest -- --template react`); komponen dapat disalin hampir apa adanya.
