require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prompt = require("prompt-sync")();
const User = require("../src/models/user");

async function main() {
  const userName = prompt("username: ");

  const password = prompt("password: ", { echo: "*" });

  if (!userName || !password) {
    console.error("❌ Username and password are required.");
    process.exit(1);
  }

  if (password.length <= 3) {
    console.error("❌ Password must be at least 4 characters long.");
    process.exit(1);
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      userName,
      name: userName,
      passwordHash,
    });

    const savedUser = await user.save();

    const token = jwt.sign(
      { userName: savedUser.userName, userId: savedUser._id },
      process.env.SECRET
    );

    console.log("✅ User created successfully!");
    console.log("🔑 JWT Token:", token);

    await mongoose.disconnect();
  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
}

main();
