import mongoose, { Schema, model, Document, Mongoose } from "mongoose"

//enum permet le choix entre plusieurs valeurs/types

export type TransactionType = "income" | "expense";
export type RecurrenceType = "monthly" | "yearly" | null;

export interface ITransaction extends Document {

  user: mongoose.Types.ObjectId

  type: TransactionType;
  category: string;
  amount: number;
  date: Date;
  recurring: boolean;
  recurrenceType: RecurrenceType;
  description?: string;
}

const TransactionSchema = new Schema<ITransaction>({

  user : {
    type:Schema.Types.ObjectId,
    ref:"User",
    required:true
  },
  
  type: {
    type: String,
    enum: ["income", "expense"],
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  recurring: {
    type: Boolean,
    default: false,
  },
  recurrenceType: {
    type: String,
    enum: ["monthly", "yearly", null],
    default: null,
  },
  description: {
    type: String,
  },
});

export const Transaction = model<ITransaction>(
  "Transaction",
  TransactionSchema
);