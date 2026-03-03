import { Request, Response } from "express";
import mongoose from "mongoose";
import { Transaction, ITransaction } from "../models/TransactionModel"

const ObjectId = mongoose.Types.ObjectId;

interface IdParam {
  id: string;
}

export const createTransaction = async (
  req: Request<{}, {}, Partial<ITransaction>>,
  res: Response
): Promise<void> => {
  try {
    const transaction = await Transaction.create(req.body);
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ message: "Erreur création transaction" });
  }
};

export const getAllTransactions = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const getTransaction = async (
  req: Request<IdParam>,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    res.status(400).json({ message: `ID invalide: ${id}` });
    return;
  }

  try {
    const transaction = await Transaction.findById(id);

    if (!transaction) {
      res.status(404).json({ message: "Transaction non trouvée" });
      return;
    }

    res.status(200).json(transaction);
  } catch {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const updateTransaction = async (
  req: Request<IdParam, {}, Partial<ITransaction>>,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    res.status(400).json({ message: `ID invalide: ${id}` });
    return;
  }

  try {
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedTransaction) {
      res.status(404).json({ message: "Transaction non trouvée" });
      return;
    }

    res.status(200).json(updatedTransaction);
  } catch {
    res.status(400).json({ message: "Erreur mise à jour" });
  }
};

export const deleteTransaction = async (
  req: Request<IdParam>,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    res.status(400).json({ message: `ID invalide: ${id}` });
    return;
  }

  try {
    const deletedTransaction = await Transaction.findByIdAndDelete(id);

    if (!deletedTransaction) {
      res.status(404).json({ message: "Transaction non trouvée" });
      return;
    }

    res.status(200).json({ message: "Transaction supprimée" });
  } catch {
    res.status(500).json({ message: "Erreur serveur" });
  }
};