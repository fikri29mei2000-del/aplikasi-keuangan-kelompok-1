// Tabel riwayat: pencarian, filter bulan, edit, hapus.
function TransactionTable({ transactions, onEdit, onDelete }) {
  const [search, setSearch] = useState("");
  const [month, setMonth] = useState("");

  const months = useMemo(
    () => [...new Set(transactions.map((t) => monthKey(t.date)))].sort().reverse(),
    [transactions]
  );

  const rows = useMemo(() => {
    const q = search.trim().toLowerCase();
    return transactions
      .filter((t) => !month || monthKey(t.date) === month)
      .filter((t) => !q || (t.category + " " + t.note).toLowerCase().includes(q))
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [transactions, search, month]);

  const totals = calcTotals(rows);

  return (
    <section className="card">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-base font-semibold">Riwayat transaksi</h2>
        <div className="flex flex-col gap-2 sm:flex-row">
          <input type="search" className="input" placeholder="Cari kategori atau catatan" aria-label="Cari transaksi"
            value={search} onChange={(e) => setSearch(e.target.value)} />
          <select className="input" aria-label="Filter bulan" value={month} onChange={(e) => setMonth(e.target.value)}>
            <option value="">Semua bulan</option>
            {months.map((m) => <option key={m} value={m}>{monthLabel(m)}</option>)}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[660px] text-left text-sm">
          <thead>
            <tr className="border-b border-stone-200 text-stone-500">
              <th className="py-2 pr-3 font-medium">Tanggal</th>
              <th className="py-2 pr-3 font-medium">Kategori</th>
              <th className="py-2 pr-3 font-medium">Catatan</th>
              <th className="py-2 pr-3 text-right font-medium">Nominal</th>
              <th className="py-2 text-right font-medium">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr><td colSpan="5" className="py-10 text-center text-stone-500">
                {transactions.length === 0 ? "Belum ada transaksi. Catat yang pertama lewat formulir." : "Tidak ada transaksi yang cocok dengan pencarian."}
              </td></tr>
            )}
            {rows.map((t) => (
              <tr key={t.id} className="border-b border-stone-100 hover:bg-stone-50">
                <td className="num py-2.5 pr-3 whitespace-nowrap">{t.date.split("-").reverse().join("/")}</td>
                <td className="py-2.5 pr-3">{t.category}</td>
                <td className="max-w-[220px] truncate py-2.5 pr-3 text-stone-500" title={t.note}>{t.note || "-"}</td>
                <td className={"num py-2.5 pr-3 text-right font-semibold whitespace-nowrap " + (t.type === "pemasukan" ? "text-teal-700" : "text-rose-700")}>
                  {t.type === "pemasukan" ? "+" : "-"}{formatRupiah(t.amount)}
                </td>
                <td className="py-2.5 text-right whitespace-nowrap">
                  <button className="link-btn mr-3 text-teal-800 hover:underline" onClick={() => onEdit(t)}>Ubah</button>
                  <button className="link-btn text-rose-700 hover:underline"
                    onClick={() => confirm("Hapus transaksi ini?") && onDelete(t.id)}>Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="num mt-4 text-sm text-stone-500">
        {rows.length} transaksi. Pemasukan {formatRupiah(totals.income)}, pengeluaran {formatRupiah(totals.expense)}, selisih {formatRupiah(totals.balance)}.
      </p>
    </section>
  );
}
