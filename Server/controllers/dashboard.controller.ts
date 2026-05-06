import { Request, Response } from "express";
import { Transaction } from "../models/TransactionModel";


export const getDashboard = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.userId;

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();

    const startOfMonth = new Date(year, month, 1);
    const endOfMonth = new Date(
      year,
      month + 1,
      0,
      23,
      59,
      59
    );

    const transactions = await Transaction.find({
      user: userId,
      date: {
        $gte: startOfMonth,
        $lte: endOfMonth,
      },
    });

    let monthlyIncome = 0;
    let monthlyExpense = 0;

    transactions.forEach((t) => {
      if (t.type === "income") {
        monthlyIncome += t.amount;
      }

      if (t.type === "expense") {
        monthlyExpense += t.amount;
      }
    });

    const netBalance =
      monthlyIncome - monthlyExpense;

    const burnRate = monthlyExpense;

    const currentCash = 10000; // temporaire

    const runway =
      burnRate > 0
        ? currentCash / burnRate
        : Infinity;

    const cashForecast3Months =
      currentCash + netBalance * 3;

    res.status(200).json({
      monthlyIncome,
      monthlyExpense,
      netBalance,
      burnRate,
      runway,
      cashForecast3Months,
    });
  } catch {
    res.status(500).json({
      message: "Erreur dashboard",
    });
  }
};