import Transaction from "../models/Transaction.js";

// Add transaction
export const addTransaction = async (req, res) => {
  try {
    const { type, title, amount, date } = req.body;

    const newTransaction = await Transaction.create({
      type,
      title,
      amount,
      date,
    });

    res.status(201).json({ success: true, newTransaction });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all transactions
export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    res.json({ success: true, transactions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Weekly total expense + income
export const getWeeklySummary = async (req, res) => {
  try {
    const start = new Date();
    start.setDate(start.getDate() - 7);

    const summary = await Transaction.aggregate([
      { $match: { date: { $gte: start } } },
      {
        $group: {
          _id: "$type",
          total: { $sum: "$amount" },
        },
      },
    ]);

    res.json({ success: true, summary });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Similar expense total (Group by title)
export const getExpenseByTitle = async (req, res) => {
  try {
    const result = await Transaction.aggregate([
      { $match: { type: "expense" } },
      {
        $group: {
          _id: "$title",
          totalSpent: { $sum: "$amount" },
        },
      },
      { $sort: { totalSpent: -1 } },
    ]);

    res.json({ success: true, result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
