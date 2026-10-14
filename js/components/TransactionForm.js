// Formulir tambah / edit transaksi.
const emptyForm = () => ({ date: todayStr(), type: "pemasukan", category: CATEGORIES.pemasukan[0], amount: "", note: "" });

function TransactionForm({ editing, onSubmit, onCancel }) {
  const [form, setForm] = useState(emptyForm());
  const [error, setError] = useState("");

  // Isi form saat masuk mode edit, reset saat selesai
  useEffect(() => {
    setForm(editing ? { ...editing, amount: formatNumberInput(editing.amount) } : emptyForm());
    setError("");
  }, [editing]);

  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }));
  const changeType = (type) => setForm((f) => ({ ...f, type, category: CATEGORIES[type][0] }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const amount = parseNumber(form.amount);
    if (!form.date || amount <= 0) return setError("Isi tanggal dan nominal lebih dari Rp 0.");
    onSubmit({ date: form.date, type: form.type, category: form.category, amount, note: form.note.trim() });
    setForm(emptyForm());
    setError("");
  };

  return (
    <section className="card">
      <h2 className="mb-4 text-base font-semibold">{editing ? "Ubah transaksi" : "Catat transaksi"}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label" htmlFor="f-date">Tanggal</label>
            <input id="f-date" type="date" className="input" value={form.date} onChange={(e) => set("date", e.target.value)} />
          </div>
          <div>
            <label className="label" htmlFor="f-type">Jenis</label>
            <select id="f-type" className="input" value={form.type} onChange={(e) => changeType(e.target.value)}>
              {Object.entries(TYPE_LABEL).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className="label" htmlFor="f-cat">Kategori</label>
          <select id="f-cat" className="input" value={form.category} onChange={(e) => set("category", e.target.value)}>
            {CATEGORIES[form.type].map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="label" htmlFor="f-amount">Nominal</label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-stone-400">Rp</span>
            <input id="f-amount" inputMode="numeric" placeholder="0" className="input num" style={{ paddingLeft: "2.5rem" }}
              value={form.amount} onChange={(e) => set("amount", formatNumberInput(e.target.value))} />
          </div>
        </div>
        <div>
          <label className="label" htmlFor="f-note">Catatan</label>
          <textarea id="f-note" rows="2" className="input" placeholder="Opsional, mis. nama pelanggan atau supplier"
            value={form.note} onChange={(e) => set("note", e.target.value)} />
        </div>
        {error && <p role="alert" className="text-sm text-rose-700">{error}</p>}
        <div className="flex gap-2">
          <button type="submit" className="btn btn-primary flex-1">{editing ? "Simpan perubahan" : "Simpan transaksi"}</button>
          {editing && <button type="button" className="btn btn-ghost" onClick={onCancel}>Batal</button>}
        </div>
      </form>
    </section>
  );
}
