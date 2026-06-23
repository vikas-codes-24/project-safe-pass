const { Users } = require("../Models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function handleUserSignup(req, res) {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  await Users.create({
    username,
    email,
    password: hashedPassword,
  });
  return res.json({ message: "User Created succesfully" });
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const foundUser = await Users.findOne({ email });
  if (!foundUser) {
    return res.status(404).json({ message: "NO user found" });
  }
  const isMatch = await bcrypt.compare(password, foundUser.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid passwords" });
  }
  const token = jwt.sign(
    {
      userId: foundUser._id,
      email: foundUser.email,
      username: foundUser.username,
    },
    "my-secret-key",
  );
  return res.json({
    token,
  });
}

module.exports = { handleUserLogin, handleUserSignup };
