import { Router } from "express";
import {
  createProfile,
  getProfile,
  updateProfile,
} from "../controllers/profile.controller";
const router = Router();

router.post("/create", createProfile);
router.get("/:id", getProfile);
router.put("/update/:id", updateProfile);

export default router;
