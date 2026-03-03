import { Request, Response } from "express";
import mongoose from "mongoose";
import { MonthlySnapshot } from "../models/MonthlySnapshotModel";

const ObjectId = mongoose.Types.ObjectId;

interface IdParam {
  id: string;
}

export const getAllSnapshots = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const snapshots = await MonthlySnapshot.find().sort({ month: -1 });
    res.status(200).json(snapshots);
  } catch {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const getSnapshot = async (
  req: Request<IdParam>,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    res.status(400).json({ message: `ID invalide: ${id}` });
    return;
  }

  try {
    const snapshot = await MonthlySnapshot.findById(id);

    if (!snapshot) {
      res.status(404).json({ message: "Snapshot non trouvé" });
      return;
    }

    res.status(200).json(snapshot);
  } catch {
    res.status(500).json({ message: "Erreur serveur" });
  }
};