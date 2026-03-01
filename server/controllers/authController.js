import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const users = [
  {
    username: "Farhan",
    password:"$2b$10$g8hQ/aszaUin4SvO74.cDukXZff9VlmP5G8VTDCsDHzXN6sO/M3Vm",
  },
  {
    username: "Shahid",
    password: "$2b$10$uI9FiYBhsXiOKdxqR5oueOPRMlNh9hnMv7maI7Ud34yfL.SPCwfua",
  },
];

export const login = async (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username
  );

  if (!user) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  const isMatch = bcrypt.compareSync(
    password,
    user.password
  );

  if (!isMatch) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  const token = jwt.sign(
    { username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "12h" }
  );

  res.json({ token });
};