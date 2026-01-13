import express from "express";
import {
  addTransaction,
  getTransactions,
  getWeeklySummary,
  getExpenseByTitle,
} from "../controllers/transactionController.js";

const router = express.Router();

router.post("/add", addTransaction);
router.get("/all", getTransactions);
router.get("/weekly-summary", getWeeklySummary);
router.get("/expense-by-title", getExpenseByTitle);

export default router;
