import { useEffect, useState } from "react";
import AddTransactionForm from "../components/AddTransactionForm";
import WeeklySummary from "../components/WeeklySummary";
import CategorySummary from "../components/CategorySummary";

const API = "http://localhost:5000/api/transactions";

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [weeklySummary, setWeeklySummary] = useState([]);
  const [groupedExpenses, setGroupedExpenses] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllTransactions = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API}/all`);
      const data = await res.json();
      if (data.success) setTransactions(data.transactions);
    } catch (err) {
      console.log("Fetch all error:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeeklySummary = async () => {
    try {
      const res = await fetch(`${API}/weekly-summary`);
      const data = await res.json();
      if (data.success) setWeeklySummary(data.summary);
    } catch (err) {
      console.log("Weekly summary error:", err);
    }
  };

  const fetchGroupedExpenses = async () => {
    try {
      const res = await fetch(`${API}/expense-by-title`);
      const data = await res.json();
      if (data.success) setGroupedExpenses(data.result);
    } catch (err) {
      console.log("Grouped expense error:", err);
    }
  };

  const refreshAll = async () => {
    await fetchAllTransactions();
    await fetchWeeklySummary();
    await fetchGroupedExpenses();
  };

  useEffect(() => {
    refreshAll();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
          💰 Personal Expense & Income Tracker
        </h1>
        <p className="text-slate-600 mt-1">
          Add your income & expenses and see weekly totals + similar expense totals.
        </p>
      </div>

      {/* Add Form */}
      <AddTransactionForm onAdded={refreshAll} />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <WeeklySummary weeklySummary={weeklySummary} />
        <CategorySummary groupedExpenses={groupedExpenses} />
      </div>

      {/* Transactions */}
      <div className="mt-6 bg-white rounded-2xl shadow-sm border border-slate-200 p-4 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-900">
            📌 All Transactions
          </h2>
          <button
            onClick={refreshAll}
            className="text-sm px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 transition"
          >
            Refresh
          </button>
        </div>

        {loading ? (
          <p className="text-slate-600">Loading...</p>
        ) : transactions.length === 0 ? (
          <p className="text-slate-500">No transactions added yet.</p>
        ) : (
          <div className="space-y-3">
            {transactions.map((t) => (
              <div
                key={t._id}
                className="flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:shadow-sm transition bg-slate-50/40"
              >
                <div>
                  <h3 className="font-semibold text-slate-900">{t.title}</h3>
                  <p className="text-sm text-slate-500">
                    {t.type.toUpperCase()} •{" "}
                    {new Date(t.date).toLocaleDateString()}
                  </p>
                </div>

                <p
                  className={`font-bold ${
                    t.type === "expense" ? "text-red-600" : "text-green-600"
                  }`}
                >
                  ₹{t.amount}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
