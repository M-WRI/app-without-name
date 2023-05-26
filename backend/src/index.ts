import express from "express";
import authRoutes from "./routes/authRoutes";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// ROUTES
app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
