import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import questionRoutes from "./routes/question";
import gameRoutes from "./routes/game";

dotenv.config();

import { getCharacters } from "./services/question";

const app: Express = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use("/api/questions", questionRoutes);
app.use("/api/game", gameRoutes)
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"));

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello World");
});

// Add this error handling middleware
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong");
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT} `);
});
