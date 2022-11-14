import express from "express";
import auth from "../middlewares/auth.js";
import {
  getUsers,
  addUser,
  getUserById,
  editUser,
  login,
  deleteUser,
} from "../controller/user-controller.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/signup", addUser);
router.post("/login", auth, login);
router.get("/:id", getUserById);
router.put("/:id", editUser);
router.delete("/:id", deleteUser);

export default router;
