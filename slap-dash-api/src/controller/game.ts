import { Router, Request, Response } from "express";

import { gameService } from "../services/game";
import { questionService } from "../services/question";
import { optionService } from "../services/option";
import { scoreService } from "../services/score";

const router = Router();
// Create Game
router.post("/", async (req: Request, res: Response) => {
  try{

    const game = await gameService.createGame(req.body.userId);
    
    res.status(201).send(game);
  } catch (e: any){
    res.status(500).send(JSON.stringify({message: e.message}))
  }

});

// get game
router.get("/:id", (req: Request, res: Response) => {
  try{
    const game = gameService.getGame(req.body.id)
    res.status(201).send(game);
  } catch (e) {
    res.status(404).send({message: "game not found"})
  }
});

// TODO
// to inforce the round timer, a timestamp should be taken here, and then when the user submits answer
// we can validate (with some margin of error) that the answer was submitted inside the time limit
// get question and options
router.get("/:id/question", (req: Request, res: Response) => {
  try{
    const game = gameService.getGame(parseInt(req.params.id, 10));
    const question = questionService.getQuestionByIndex(game.id, game.questionIndex);
    const options = optionService.getOptionsByQuestionId(question.id);
    
    res.status(201).send({question, options});
  } catch (e: any) {
    res.status(500).send(JSON.stringify({message: e.message}))
  }
});
// get user score for the game
router.get("/:id/score/:userId", (req: Request, res: Response) => {
  try{
    const game = gameService.getGame(parseInt(req.params.id, 10));
    const score = scoreService.getUserGameScore(parseInt(req.params.userId, 10), game.id);
    res.status(201).send(score.score);
  } catch (e: any) {
    res.status(500).send(JSON.stringify({message: e.message}))
  }
});
// submit user answer
router.post("/:id/user/:userId/answer/:optionId", (req: Request, res: Response) => {
  try{
    const game = gameService.getGame(parseInt(req.params.id, 10));
    const correct = gameService.submitQuestionAnswer(game.id, parseInt(req.params.userId, 10), parseInt(req.params.optionId, 10));
    res.status(201).send(correct);
  } catch (e:any) {
    res.status(500).send(JSON.stringify({message: e.message}))
  }
});
// move to next round / start round
router.post("/:id/next", (req: Request, res: Response) => {
  try{
    const game = gameService.nextQuestion(parseInt(req.params.id, 10));
    console.log(game)
    res.status(202).send(game);
  } catch (e:any) {
    res.status(500).send(JSON.stringify({message: e.message}))
  }
});

export default router;
