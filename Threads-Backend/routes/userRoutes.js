import express from "express";
import {
  followUnFollowUser,
  getUserProfile,
  loginUser,
  logoutUser,
  signupUser,
  updateUser,
  getSuggestedUsers,
  freezeAccount,
} from "../controllers/userController.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

// Route to get a user profile by username or query
router.get("/profile/:query", getUserProfile);

// Route to get suggested users (requires protection)
router.get("/suggested", protectRoute, getSuggestedUsers);

// Route to signup a new user
router.post("/signup", signupUser);

// Route to login a user
router.post("/login", loginUser);

// Route to logout a user
router.post("/logout", logoutUser);

// Route to follow or unfollow a user (requires protection)
router.post("/follow/:id", protectRoute, followUnFollowUser);

// Route to update user information (requires protection)
router.put("/update/:id", protectRoute, updateUser);

// Route to freeze an account (requires protection)
router.put("/freeze", protectRoute, freezeAccount);

export default router;
