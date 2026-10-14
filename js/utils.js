// Utilitas & konstanta bersama. File ini dimuat pertama, jadi hook React
// cukup di-destructure SEKALI di sini lalu dipakai di semua file lain.
const { useState, useEffect, useMemo } = React;

const STORAGE_KEY = "kasbisnis_transactions_v1";

const CATEGORIES = {
  pemasukan: ["Penjualan", "Jasa", "Investasi", "Lainnya"],
  pengeluaran: ["Bahan baku", "Gaji", "Sewa", "Operasional", "Pemasaran", "Pajak", "Lainnya"],
};
const TYPE_LABEL = { pemasukan: "Pemasukan", pengeluaran: "Pengeluaran" };
const MONTHS = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

const formatRupiah = (n) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n || 0);

// "1500000" -> "1.500.000" (untuk kolom input)
const formatNumberInput = (v) => {
  const digits = String(v).replace(/\D/g, "");
  return digits ? Number(digits).toLocaleString("id-ID") : "";
};
const parseNumber = (v) => Number(String(v).replace(/\D/g, "")) || 0;

const todayStr = () => {
  const d = new Date();
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
};
const monthKey = (dateStr) => dateStr.slice(0, 7); // "2026-10"
const monthLabel = (key) => { const [y, m] = key.split("-"); return MONTHS[Number(m) - 1] + " " + y; };

// Logika utama: hitung total otomatis dari daftar transaksi
const calcTotals = (list) => {
  const income = list.filter((t) => t.type === "pemasukan").reduce((s, t) => s + t.amount, 0);
  const expense = list.filter((t) => t.type === "pengeluaran").reduce((s, t) => s + t.amount, 0);
  return { income, expense, balance: income - expense };
};
