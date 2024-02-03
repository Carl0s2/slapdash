import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors"
import dotenv from "dotenv";
import gameController from "./controller/game";
import userController from "./controller/user"

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use("/api/game", gameController);
app.use("/api/user", userController);



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
