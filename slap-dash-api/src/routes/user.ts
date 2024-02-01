import { Router, Request, Response } from "express";
import { body, validationResult } from "express-validator";

import { User } from "../models/user";
import { dataStore } from "../repository/dataStore";

const router = Router();


// const questionValidationRules = [
//   body("title").notEmpty().withMessage("Title is required"),
//   body("description").notEmpty().withMessage("Description is required"),
//   body("completed").isBoolean().withMessage("Completed must be a boolean"),
// ];

router.post("/", (req: Request, res: Response) => {

  const game: Game = {
    id: '1',
    userId: '1',
    questionIndex:1,
    questionNumber: 10,
    completed: false,
    timeLimit: 10,
  };

  dataStore.addGame(game)
  res.status(201).json(game);
});

router.get("/", (req: Request, res: Response) => {
  res.json(dataStore.getGames());
});
// router.get("/:id", (req: Request, res: Response) => {
//   const question = questions.find((t) => t.id === parseInt(req.params.id));

//   if (!question) {
//     res.status(404).send("Question not found");
//   } else {
//     res.json(question);
//   }
// });



export default router;
