import { ITransaction } from "../models/TransactionModel";

export interface MonthlyResult {
  totalIncome: number;
  totalExpense: number;
  net: number;
}

export function calculateMonthlyResult(
  transactions: ITransaction[]
): MonthlyResult {
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, curr) => acc + curr.amount, 0);

  return {
    totalIncome,
    totalExpense,
    net: totalIncome - totalExpense,
  };
}