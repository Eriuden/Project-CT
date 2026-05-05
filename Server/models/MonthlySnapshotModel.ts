import { Schema, model, Document } from "mongoose";
import mongoose from "mongoose";

export interface IMonthlySnapshot extends Document {
  userId: mongoose.Types.ObjectId
  month: string;
  totalIncome: number;
  totalExpense: number;
  netResult: number;
}

const MonthlySnapshotSchema = new Schema<IMonthlySnapshot>({
  userId: {
    type: Schema.Types.ObjectId,
     ref: "User",
    required: true},
  month: { 
    type: String, 
    required: true },
  totalIncome: { 
    type: Number, 
    required: true },
  totalExpense: { 
    type: Number, 
    required: true },
  netResult: { 
    type: Number, 
    required: true },
});

export const MonthlySnapshot = model<IMonthlySnapshot>(
  "MonthlySnapshot",
  MonthlySnapshotSchema
);