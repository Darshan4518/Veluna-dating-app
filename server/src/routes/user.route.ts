import { Router } from "express";
import {
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controllers/user.controller";

const router = Router();

// GET route to get all users
router.get("/", getUsers);

// GET route to get a user by ID
router.get("/:id", getUserById);

// PUT route to update a user by ID
router.put("/:id", updateUser);

// DELETE route to delete a user by ID
router.delete("/:id", deleteUser);

export default router;
