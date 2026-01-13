import { useState } from "react";

const API = "https://myincomeexp-l1tb.vercel.app/api/transactions";

export default function AddTransactionForm({ onAdded }) {
  const [type, setType] = useState("expense");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    if (!title || !amount) {
      setMsg("❌ Please enter title and amount.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API}/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          title,
          amount: Number(amount),
          date: date ? new Date(date) : new Date(),
        }),
      });

      const data = await res.json();

      if (data.success) {
        setMsg("✅ Transaction added successfully!");
        setTitle("");
        setAmount("");
        setDate("");
        onAdded && onAdded();
      } else {
        setMsg("❌ Failed to add transaction.");
      }
    } catch (error) {
      console.log(error);
      setMsg("❌ Server error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 md:p-6">
      <h2 className="text-lg font-semibold text-slate-900 mb-4">
        ➕ Add Transaction
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-5 gap-3"
      >
        {/* Type */}
        <div className="md:col-span-1">
          <label className="text-sm text-slate-600">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="mt-1 w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-300"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>

        {/* Title */}
        <div className="md:col-span-2">
          <label className="text-sm text-slate-600">
            Title (Tea, Petrol, Salary)
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter name"
            className="mt-1 w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-300"
          />
        </div>

        {/* Amount */}
        <div className="md:col-span-1">
          <label className="text-sm text-slate-600">Amount (₹)</label>
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            placeholder="Enter amount"
            className="mt-1 w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-300"
          />
        </div>

        {/* Date */}
        <div className="md:col-span-1">
          <label className="text-sm text-slate-600">Date</label>
          <input
            value={date}
            onChange={(e) => setDate(e.target.value)}
            type="date"
            className="mt-1 w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-300"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="md:col-span-5 mt-2 bg-slate-900 text-white py-2 rounded-xl font-semibold hover:bg-slate-800 transition disabled:opacity-60"
        >
          {loading ? "Adding..." : "Add Transaction"}
        </button>
      </form>

      {msg && <p className="mt-3 text-sm text-slate-700">{msg}</p>}
    </div>
  );
}

