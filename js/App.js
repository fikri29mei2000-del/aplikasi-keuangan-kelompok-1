// Komponen root: menggabungkan state, navigasi, dan seluruh modul.
function App() {
  const { transactions, add, update, remove } = useTransactions();
  const [tab, setTab] = useState("dashboard");
  const [editing, setEditing] = useState(null);

  const handleSubmit = (data) => {
    if (editing) { update(editing.id, data); setEditing(null); }
    else add(data);
  };
  const handleEdit = (t) => { setEditing(t); setTab("dashboard"); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const handleDelete = (id) => { remove(id); if (editing && editing.id === id) setEditing(null); };

  const tabs = [["dashboard", "Dashboard"], ["laporan", "Laporan"]];

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b border-stone-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <h1 className="text-lg font-bold text-teal-900">KasBisnis</h1>
          <nav className="flex gap-1 rounded-lg bg-stone-100 p-1" aria-label="Navigasi utama">
            {tabs.map(([id, label]) => (
              <button key={id} onClick={() => setTab(id)} aria-current={tab === id ? "page" : undefined}
                className={"rounded-md px-4 py-1.5 text-sm font-semibold transition " + (tab === id ? "bg-white text-teal-900 shadow-sm" : "text-stone-500 hover:text-stone-800")}>
                {label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-6 px-4 py-6">
        {tab === "dashboard" ? (
          <>
            <SummaryCards transactions={transactions} />
            <div className="grid items-start gap-6 xl:grid-cols-3">
              <TransactionForm editing={editing} onSubmit={handleSubmit} onCancel={() => setEditing(null)} />
              <div className="xl:col-span-2">
                <TransactionTable transactions={transactions} onEdit={handleEdit} onDelete={handleDelete} />
              </div>
            </div>
          </>
        ) : (
          <Report transactions={transactions} />
        )}
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
