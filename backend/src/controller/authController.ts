import prisma from "../prisma";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken";

export const signup = async (req, res) => {
  const { email, password } = req.body;

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });
  if (existingUser) {
    return res.status(400).send("User already exists");
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  // Create user in the database
  const user = await prisma.user.create({
    data: { email, password: hashedPassword },
  });

  const token = generateToken(user);

  return res.status(201).json({ user, token });
};

export const signin = async (req, res) => {
  const { email, password } = req.body;

  // Find user in the database
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    return res.status(400).send("User not found");
  }

  // Check password
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(400).send("Invalid password");
  }

  const token = generateToken(user);

  return res.status(201).json({ user, token });
};
