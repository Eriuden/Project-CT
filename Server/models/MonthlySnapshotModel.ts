import { Schema, model, Document } from "mongoose";

export interface IMonthlySnapshot extends Document {
  month: string;
  totalIncome: number;
  totalExpense: number;
  netResult: number;
}

const MonthlySnapshotSchema = new Schema<IMonthlySnapshot>({
  month: { type: String, required: true },
  totalIncome: { type: Number, required: true },
  totalExpense: { type: Number, required: true },
  netResult: { type: Number, required: true },
});

export const MonthlySnapshot = model<IMonthlySnapshot>(
  "MonthlySnapshot",
  MonthlySnapshotSchema
);