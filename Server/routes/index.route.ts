import { Router } from "express";

import authRoutes from "./auth.route";
import userRoutes from "./user.route";
import transactionRoutes from "./transaction.route";
import monthlySnapshotRoutes from "./monthlySnapshot.route";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/transactions", transactionRoutes);
router.use("/snapshots", monthlySnapshotRoutes);

export default router;