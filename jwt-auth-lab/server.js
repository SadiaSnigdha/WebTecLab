const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const users = require("./users");
const authenticateToken = require("./authMiddleware");
const { SECRET_KEY } = require("./config");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/debug", (req, res) => {
  res.json(users);
});

app.post("/login", (req, res) => {
  console.log("Request Body:", req.body);

  const username = req.body.username?.trim();
  const password = req.body.password?.trim();

  console.log("Searching for:", username);

  const user = users.find(u => u.username === username);

  console.log("Found User:", user);

  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  const isPasswordValid = bcrypt.compareSync(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const token = jwt.sign(
    {
      userId: user.id,
      role: user.role
    },
    SECRET_KEY,
    { expiresIn: "1h" }
  );

  res.json({
    message: "Login successful",
    token
  });
});

app.listen(3033, () => {
  console.log("Server running on http://localhost:3033");
});