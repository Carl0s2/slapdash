import { Answer } from "../models/answer";
import { Game } from "../models/game";
import { Option } from "../models/option";
import { Score } from "../models/score";
import { User } from "../models/user";
import { dataStore } from "../repository/dataStore";
import { questionService } from "./question";
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
      questionNumber: questionNumber ?? 10,
      questionIndex: 1,
      timeLimit: timeLimit ?? 20,
      completed: false,
    };

    const game = dataStore.createEntity(STORE, newGame);

    if (!game) throw new Error('Failed to create game');
     
    const newScore: Omit<Score, "id"> = {
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

  // notes
  // way to ensure that user is within time limit
  // create new score on question start with time stamp
  // upon sumit answer, take another time stamp
  // if outside of time, no points for user, even if correct

  // game id could be infered here
  export function submitQuestionAnswer(gameId: number, userId: number, optionId: number) : boolean {
     const answer = dataStore.createEntity(dataStore.StoreType.answers, {optionId, userId});
     const option = dataStore.getById(dataStore.StoreType.options, optionId) as Option;
     if (option.correct) {
      // todo: get by key isn't sufficent here, we need to use composite search for user and game
      const score = dataStore.getByComposite(dataStore.StoreType.scores, "userId", "gameId", userId, gameId) as Score;
      // score score score score score
      dataStore.updateById(dataStore.StoreType.scores, score.id, {...score, score: score.score + 1} );
      return true;
     }
     return false;
     
  }

  export function nextQuestion(gameId: number){
    const game = getGame(gameId);
    if (game.completed === true) throw new Error("Game already completed");
    
    if (game.questionIndex === game.questionNumber) {
      game.completed = true;
      return game;
    }
    game.questionIndex = game.questionIndex + 1;
    const question = questionService.getQuestionByIndex(gameId, game.questionIndex);
    return question;
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