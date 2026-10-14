// Modul laporan: rekap arus kas per bulan + rincian per kategori.
function Report({ transactions }) {
  const monthly = useMemo(() => {
    const groups = {};
    transactions.forEach((t) => { (groups[monthKey(t.date)] = groups[monthKey(t.date)] || []).push(t); });
    let running = 0; // saldo kumulatif dihitung dari bulan terlama
    return Object.keys(groups).sort().map((key) => {
      const totals = calcTotals(groups[key]);
      running += totals.balance;
      return { key, ...totals, running };
    }).reverse();
  }, [transactions]);

  const all = calcTotals(transactions);

  return (
    <div className="space-y-6">
      <section className="card">
        <h2 className="mb-1 text-base font-semibold">Rekap arus kas per bulan</h2>
        <p className="num mb-4 text-sm text-stone-500">
          Keseluruhan: masuk {formatRupiah(all.income)}, keluar {formatRupiah(all.expense)}, saldo {formatRupiah(all.balance)}.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-stone-200 text-stone-500">
                <th className="py-2 pr-3 font-medium">Bulan</th>
                <th className="py-2 pr-3 text-right font-medium">Pemasukan</th>
                <th className="py-2 pr-3 text-right font-medium">Pengeluaran</th>
                <th className="py-2 pr-3 text-right font-medium">Arus bersih</th>
                <th className="py-2 text-right font-medium">Saldo kumulatif</th>
              </tr>
            </thead>
            <tbody>
              {monthly.length === 0 && <tr><td colSpan="5" className="py-10 text-center text-stone-500">Laporan muncul setelah ada transaksi.</td></tr>}
              {monthly.map((m) => (
                <tr key={m.key} className="num border-b border-stone-100">
                  <td className="py-2.5 pr-3 font-medium">{monthLabel(m.key)}</td>
                  <td className="py-2.5 pr-3 text-right text-teal-700">{formatRupiah(m.income)}</td>
                  <td className="py-2.5 pr-3 text-right text-rose-700">{formatRupiah(m.expense)}</td>
                  <td className={"py-2.5 pr-3 text-right font-semibold " + (m.balance < 0 ? "text-rose-700" : "")}>{formatRupiah(m.balance)}</td>
                  <td className="py-2.5 text-right">{formatRupiah(m.running)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="grid gap-6 md:grid-cols-2">
        <CategoryBreakdown title="Pemasukan per kategori" type="pemasukan" bar="bg-teal-600" transactions={transactions} />
        <CategoryBreakdown title="Pengeluaran per kategori" type="pengeluaran" bar="bg-rose-600" transactions={transactions} />
      </div>
    </div>
  );
}

function CategoryBreakdown({ title, type, bar, transactions }) {
  const items = useMemo(() => {
    const sums = {};
    transactions.filter((t) => t.type === type).forEach((t) => { sums[t.category] = (sums[t.category] || 0) + t.amount; });
    const total = Object.values(sums).reduce((a, b) => a + b, 0);
    return Object.entries(sums).sort((a, b) => b[1] - a[1]).map(([name, value]) => ({ name, value, pct: total ? (value / total) * 100 : 0 }));
  }, [transactions, type]);

  return (
    <section className="card">
      <h2 className="mb-4 text-base font-semibold">{title}</h2>
      {items.length === 0 && <p className="text-sm text-stone-500">Belum ada data.</p>}
      <ul className="space-y-3">
        {items.map((i) => (
          <li key={i.name}>
            <div className="num mb-1 flex justify-between text-sm">
              <span>{i.name}</span>
              <span className="text-stone-500">{formatRupiah(i.value)} ({i.pct.toFixed(0)}%)</span>
            </div>
            <div className="h-2 rounded-full bg-stone-100">
              <div className={"h-2 rounded-full " + bar} style={{ width: i.pct + "%" }} />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
