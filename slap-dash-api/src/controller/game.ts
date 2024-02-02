import { Router, Request, Response } from "express";
import { body, validationResult } from "express-validator";

import { Game } from "../models/game";
import { gameService } from "../services/game";

const router = Router();


// const questionValidationRules = [
//   body("title").notEmpty().withMessage("Title is required"),
//   body("description").notEmpty().withMessage("Description is required"),
//   body("completed").isBoolean().withMessage("Completed must be a boolean"),
// ];

router.post("/", async (req: Request, res: Response) => {


  const game = await gameService.createGame(req.body.userId);
  
  res.status(201).json(game);

});

// router.get("/", (req: Request, res: Response) => {
//   res.json());
// });
// router.get("/:id", (req: Request, res: Response) => {
//   const question = questions.find((t) => t.id === parseInt(req.params.id));

//   if (!question) {
//     res.status(404).send("Question not found");
//   } else {
//     res.json(question);
//   }
// });



export default router;
