import { Answer } from "../models/answer";
import { Game } from "../models/game";
import { Option } from "../models/option";
import { Score } from "../models/score";
import { User } from "../models/user";
import { dataStore } from "../repository/dataStore";
import { checkTime } from "../utils";
import { questionService } from "./question";
import { scoreService } from "./score";
import { userService } from "./user";

export module gameService {
  const STORE = dataStore.StoreType.games

  // leaving some optional fields here to configure settings, but will probably just stick to defaults
  export async function createGame(userId: number, name?: string, questionNumber?: number, timeLimit?: number ) {
    const user = dataStore.getById(dataStore.StoreType.users, userId) as User;
    // using a user as a game host, so this is a required field to start the game
    if (!user) throw new Error(`user not found for user id ${userId}`);
    // could do a check here for existing user game and then re-use or delete it to prevent storing loads of games
    const newGame: Omit<Game, "id"> = {
      userId,
      name: name ?? user.name,
      questionNumber: questionNumber ?? 2, // set back here
      questionIndex: 0,
      timeLimit: timeLimit ?? 20,
      completed: false,
    };

    const game = dataStore.createEntity(STORE, newGame);

    if (!game) throw new Error('Failed to create game');
     
    const newScore: Omit<Score, "id" | "roundStart"> = {
      gameId: game.id,
      userId: userId,
      score: 0,};
    const score = dataStore.createEntity(dataStore.StoreType.scores, newScore);
   
    if (!score) throw new Error("Failed to create score card");
    

    // once game is created we need to generate questions
    // could do that here or could generate on the fly on question request
    // could extend to take question types, this could dictate where he questions are being pulled from
    await questionService.createAllGameQuestions(game.id);

    return game;
  }


  export function submitQuestionAnswer(gameId: number, userId: number, optionId: number) : boolean {
     const game = getGame(gameId);
     const score = dataStore.getByComposite(dataStore.StoreType.scores, "userId", "gameId", userId, gameId) as Score;
     if (!score?.roundStart) throw new Error("Error with getting user score");
     const insideTimeLimit = checkTime(score.roundStart, game.timeLimit);
     // could do a few things here to prevent submission, for now will just return false
     if (!insideTimeLimit) return false;
     const option = dataStore.getById(dataStore.StoreType.options, optionId) as Option;
     // check user already summited answer to prevent multiple score submissions
     const existingAnswer = dataStore.getByComposite(dataStore.StoreType.answers, "userId", "questionId", userId, option.questionId);
     if (existingAnswer) throw new Error("Answer already summited");
     const answer = dataStore.createEntity(dataStore.StoreType.answers, {optionId, userId, questionId: option.questionId});
     if (option.correct) {
      dataStore.updateById(dataStore.StoreType.scores, score.id, {...score, score: score.score + 1} );
      return true;
     }
     return false;
     
  }

  // handle starting next round and ending game
  export function nextQuestion(gameId: number){
    const game = getGame(gameId);
    if (game.completed === true) throw new Error("Game already completed");
    
    // complete game
    if (game.questionIndex === game.questionNumber) {
      return dataStore.updateById(STORE, game.id, {...game, completed: true}) as Game;
    };
    const updatedGame = dataStore.updateById(STORE, game.id, {...game, questionIndex: game.questionIndex + 1});
    // trigger timer
    scoreService.startRoundTimer(game.id);
    return updatedGame;
  }
  
  export function getGame(id: number): Game {
    const game = dataStore.getByKey(STORE, id) as Game;
    if (!game) throw new Error("No game found with id: " + id); 
    return game;
  }

  export function getGames() {
    return dataStore.getStore(STORE);
  }

  export function deleteGame(id: number) {
    const gameId = dataStore.deleteById(STORE, id)
    return gameId;
  }

  export function updateGame(id:number, name: string) {
    const game = dataStore.updateById(STORE, id, {id, name});
    return game;
  }

}