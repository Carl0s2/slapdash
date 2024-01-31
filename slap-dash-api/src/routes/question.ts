import { Router, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { Question } from "../models/question";

const router = Router();
let questions: Question[] = [];

const questionValidationRules = [
  body("title").notEmpty().withMessage("Title is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("completed").isBoolean().withMessage("Completed must be a boolean"),
];

// Add your CRUD API implementation here
router.post("/", questionValidationRules, (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  const question: Question = {
    id: questions.length + 1,
    title: req.body.title,
    description: req.body.description,
    completed: false,
  };

  questions.push(question);
  res.status(201).json(question);
});

router.get("/", (req: Request, res: Response) => {
  res.json(questions);
});
router.get("/:id", (req: Request, res: Response) => {
  const question = questions.find((t) => t.id === parseInt(req.params.id));

  if (!question) {
    res.status(404).send("Question not found");
  } else {
    res.json(question);
  }
});

router.put("/:id", (req: Request, res: Response) => {
  const question = questions.find((t) => t.id === parseInt(req.params.id));

  if (!question) {
    res.status(404).send("Question not found");
  } else {
    question.title = req.body.title || question.title;
    question.description = req.body.description || question.description;
    question.completed = req.body.completed || question.completed;

    res.json(question);
  }
  router.delete("/:id", (req: Request, res: Response) => {
    const index = questions.findIndex((t) => t.id === parseInt(req.params.id));

    if (index === -1) {
      res.status(404).send("Question not found");
    } else {
      questions.splice(index, 1);
      res.status(204).send();
    }
  });
});
export default router;
