import { Transaction } from "../models/TransactionModel";
import { MonthlySnapshot } from "../models/MonthlySnapshotModel";

export const recalculateMonthlySnapshot = async (
  date: Date
): Promise<void> => {
  const year = date.getFullYear();
  const month = date.getMonth();

  const startOfMonth = new Date(year, month, 1);
  const endOfMonth = new Date(year, month + 1, 0, 23, 59, 59);

  const transactions = await Transaction.find({
    date: {
      $gte: startOfMonth,
      $lte: endOfMonth,
    },
  });

  let totalIncome = 0;
  let totalExpense = 0;

  transactions.forEach((transaction) => {
    if (transaction.type === "income") {
      totalIncome += transaction.amount;
    }

    if (transaction.type === "expense") {
      totalExpense += transaction.amount;
    }
  });

  const netBalance = totalIncome - totalExpense;

  await MonthlySnapshot.findOneAndUpdate(
    {
      year,
      month: month + 1,
    },
    {
      year,
      month: month + 1,
      totalIncome,
      totalExpense,
      netBalance,
    },
    {
      new: true,
      upsert: true,
      runValidators: true,
    }
  );
};