import { Router } from "express";
import {
  conversation,
  createConverstions,
} from "../controllers/conversation.controller";
const router = Router();

router.post("/conversations", createConverstions);
router.get("/conversations/:id", conversation);

export default router;
