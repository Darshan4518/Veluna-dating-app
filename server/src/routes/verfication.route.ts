import { Router } from "express";
import {
  sendCode,
  verifyAndStoreUser,
} from "../controllers/verfication.controller";
const router = Router();

router.post("/send-code", sendCode);
router.post("/resend-code", sendCode);

router.post("/verify-code", verifyAndStoreUser);

export default router;
