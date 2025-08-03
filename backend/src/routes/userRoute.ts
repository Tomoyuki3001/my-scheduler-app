import express from "express";
import { User } from "../models/User";

const router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;

//Login
router.get("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    email: email,
  });

  if (!user) {
    res.status(404).json({
      status: 404,
      success: false,
      message: "User not found",
    });
    return;
  }

  try {
    if (await bcrypt.compare(password, user.password)) {
      res.status(200).json({
        status: 200,
        success: true,
        message: "Login successful",
      });
    } else {
      res.status(401).json({
        status: 401,
        success: false,
        message: "Incorrect password",
      });
    }
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

//Creat a user
router.post("/register", async (req, res) => {
  try {
    const { email, password, first_name, last_name } = req.body;

    const isEmailAllReadyExist = await User.findOne({
      email: email,
    });

    if (isEmailAllReadyExist) {
      res.status(409).json({
        status: 409,
        message: "Email all ready in use",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      first_name,
      last_name,
    });

    res.status(200).json({
      status: 200,
      success: true,
      message: "User created Successfully",
      user: newUser,
    });
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
