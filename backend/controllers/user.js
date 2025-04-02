import bcrypt from "bcryptjs";
import UserSchema from "../models/userModel.js";
import { generateToken } from "./auth.js";
import Expense from "../models/expenseModel.js";
import Income from "../models/incomeModel.js";
import User from "../models/userModel.js";

export const createUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    // Validations
    if (
      !username ||
      !password ||
      username.trim() === "" ||
      password.trim() === ""
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const userExists = await UserSchema.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: "Username already taken" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new UserSchema({
      username,
      password: hashedPassword,
    });

    await user.save();

    const { accessToken, refreshToken } = generateToken(user);

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user._id,
        username: user.username,
      },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating account",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.user.id;
    await Promise.all([
      Expense.deleteMany({ userId }),
      Income.deleteMany({ userId }),
      User.findByIdAndDelete(userId)
    ]);
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({
      message: "Could not deleting user",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await UserSchema.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Wrong username or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Wrong username or password" });
    }

    const { accessToken, refreshToken } = generateToken(user);

    res.status(200).json({
      message: "Login successful",
      user: { id: user._id, username: user.username },
      accessToken,
      refreshToken,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Could not log in" });
  }
};

