// Kartu metrik periode berjalan (bulan ini).
function SummaryCards({ transactions }) {
  const period = monthKey(todayStr());
  const totals = calcTotals(transactions.filter((t) => monthKey(t.date) === period));

  const cards = [
    { label: "Total pemasukan", value: totals.income, tone: "text-teal-700", bar: "bg-teal-600" },
    { label: "Total pengeluaran", value: totals.expense, tone: "text-rose-700", bar: "bg-rose-600" },
    { label: "Saldo bersih", value: totals.balance, tone: totals.balance < 0 ? "text-rose-700" : "text-slate-900", bar: "bg-amber-400" },
  ];

  return (
    <section aria-label="Ringkasan keuangan">
      <h2 className="mb-3 text-sm font-semibold text-stone-600">Periode berjalan: {monthLabel(period)}</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map((c) => (
          <div key={c.label} className="card relative overflow-hidden">
            <span className={"absolute inset-y-0 left-0 w-1.5 " + c.bar} />
            <p className="text-sm text-stone-500">{c.label}</p>
            <p className={"num mt-1 text-2xl font-bold " + c.tone}>{formatRupiah(c.value)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
