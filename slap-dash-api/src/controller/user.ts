import { Router, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { userService } from "../services/user";
const router = Router();


const userValidationRules = [
  body("name").notEmpty().withMessage("Name is required"),
];

router.post("/", userValidationRules, async (req: Request, res: Response) => {
  const errors = validationResult(req);
  console.log('user route')
  if (!errors.isEmpty()) {
    return res.status(400).send(errors);
  }
  try {
    const user = await userService.createUser(req.body.name);
    console.log(user);
    res.status(201).send(user);
    
  } catch(e: any){
    res.status(500).send(JSON.stringify({message: e.message}))
  }
});

router.get("/", (req: Request, res: Response) => {
  try{
    const users = userService.getUsers();
    res.status(201).send(users);
  } catch (e: any) {
    res.status(500).send(JSON.stringify({message: e.message}));
  }
});

export default router;
