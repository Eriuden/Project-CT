import { Router } from "express";

import {
  getAllSnapshots,
  getSnapshot,
} from "../controllers/monthlySnapshotController";

import { requireAuth } from "../middleware/auth.middleware";

const router = Router();

router.use(requireAuth)

router.get("/", getAllSnapshots);

router.get("/:id", getSnapshot);

export default router;