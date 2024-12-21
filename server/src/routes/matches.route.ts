import { Router } from "express";
import { getMatches, matches } from "../controllers/matches.controller";

const router = Router();

router.post("/matches", matches);
router.get("/matches/:userId", getMatches);

export default router;
