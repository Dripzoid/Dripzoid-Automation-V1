import { Router } from "express";
import { receiveEvent } from "../controllers/event.controller.js";
import { verifyInternalKey } from "../middlewares/auth.middleware.js";

const router = Router();

router.post(
  "/trigger",
  verifyInternalKey,
  receiveEvent
);

export default router;