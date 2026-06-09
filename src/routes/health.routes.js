import { Router } from "express";

const router = Router();

router.get("/", (_, res) => {
  res.status(200).json({
    success: true,
    service: "Dripzoid Automation",
    status: "healthy",
  });
});

export default router;