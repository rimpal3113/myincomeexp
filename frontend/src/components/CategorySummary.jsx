export default function CategorySummary({ groupedExpenses }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 md:p-6">
      <h2 className="text-lg font-semibold text-slate-900 mb-3">
        🧠 Similar Expense Total
      </h2>

      {groupedExpenses.length === 0 ? (
        <p className="text-slate-500">No expenses found.</p>
      ) : (
        <div className="space-y-2">
          {groupedExpenses.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center px-4 py-3 rounded-xl border border-slate-200 bg-slate-50"
            >
              <span className="font-semibold text-slate-800">{item._id}</span>
              <span className="font-bold text-slate-900">
                ₹{item.totalSpent}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
