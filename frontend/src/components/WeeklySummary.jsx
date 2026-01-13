export default function WeeklySummary({ weeklySummary }) {
  let income = 0;
  let expense = 0;

  weeklySummary.forEach((item) => {
    if (item._id === "income") income = item.total;
    if (item._id === "expense") expense = item.total;
  });

  const balance = income - expense;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 md:p-6">
      <h2 className="text-lg font-semibold text-slate-900 mb-3">
        📅 Weekly Summary
      </h2>

      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-slate-600">💚 Income</span>
          <span className="font-bold text-green-600">₹{income}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-600">❤️ Expense</span>
          <span className="font-bold text-red-600">₹{expense}</span>
        </div>

        <hr className="my-3" />

        <div className="flex justify-between">
          <span className="text-slate-700 font-semibold">🧾 Balance</span>
          <span
            className={`font-bold ${
              balance >= 0 ? "text-green-700" : "text-red-700"
            }`}
          >
            ₹{balance}
          </span>
        </div>
      </div>
    </div>
  );
}
