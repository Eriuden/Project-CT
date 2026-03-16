import { Router } from "express";

import {
  createTransaction,
  getAllTransactions,
  getTransaction,
  updateTransaction,
  deleteTransaction,
} from "../controllers/transaction.controller";

import { requireAuth } from "../middleware/auth.middleware";

const router = Router();

router.use(requireAuth)

router.post("/", requireAuth, createTransaction);

router.get("/", requireAuth, getAllTransactions);

router.get("/:id", getTransaction);

router.put("/:id", updateTransaction);

router.delete("/:id", deleteTransaction);

export default router;