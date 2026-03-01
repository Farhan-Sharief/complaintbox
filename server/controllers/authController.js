import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const users = [
  {
    username: "Farhan",
    password: bcrypt.hashSync("F@ruhibgm", 10),
  },
  {
    username: "Shahid",
    password: bcrypt.hashSync("Sh@hidvcb", 10),
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