import  { Game } from "../models/game";

const createGame = (userId, timeLimit) => {
  // repo here
  const newGame = repo.create(userId, timeLimit);
  await generateQuestions(newGame);
  // choice here to generate all questions for the game on site, or generate one on the fly each time you increment question
  

};