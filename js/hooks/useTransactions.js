// State transaksi + sinkronisasi otomatis ke LocalStorage.
function useTransactions() {
  const [transactions, setTransactions] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
    catch { return []; }
  });

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions)); }
    catch (e) { console.error("Gagal menyimpan data:", e); }
  }, [transactions]);

  const add = (data) =>
    setTransactions((prev) => [{ ...data, id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6) }, ...prev]);
  const update = (id, data) =>
    setTransactions((prev) => prev.map((t) => (t.id === id ? { ...t, ...data } : t)));
  const remove = (id) =>
    setTransactions((prev) => prev.filter((t) => t.id !== id));

  return { transactions, add, update, remove };
}
