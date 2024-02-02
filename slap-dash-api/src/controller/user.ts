import { Router, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { userService } from "../services/user";
const router = Router();


const userValidationRules = [
  body("name").notEmpty().withMessage("Name is required"),
];

router.post("/", userValidationRules, async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  try {
    const user = await userService.createUser(req.body.name)
  
    res.status(201).json(user);
    
  } catch(e){
    res.status(500).json(e);
  }
});

router.get("/", (req: Request, res: Response) => {
  try{

    const users = userService.getUsers();
    res.json(users);
  } catch (e) {
    res.json(e);
  }
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
