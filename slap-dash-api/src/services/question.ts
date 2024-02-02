import { Game } from "../models/game";
import { Option } from "../models/option";
import { Question } from "../models/question";
import { dataStore } from "../repository/dataStore";
import { randomIntFromInterval } from "../utils";
import { getCharacters } from "./disneyCharacters";

export module questionService {
  const STORE = dataStore.StoreType.questions

  export async function createAllGameQuestions(gameId: number) {
    const game = dataStore.getById(dataStore.StoreType.games, gameId) as Game;
    if (!game) throw new Error(`Game not found for id ${gameId}`);
    // check game hasnt already started
    if (game.questionIndex > 1) throw new Error('Game already started');

    for (let index = 0; index < game.questionNumber; index++) {
      await createQuestion(game.id, index);
    }
  }


  // just create a default question aka "who is this?"
  export async function createQuestion(gameId: number, index: number) {
 
    const question = dataStore.createEntity(STORE,{
      gameId,
      imageUrl: "", // will update with selected answer character image
      question: "Who is this?", // just going to have one type of question to start with
      questionIndex: index,
    } );
    if (!question) throw new Error("Failed to create question");
    
    // this is default as the requirements
    const numberOfOptions = 4;
    // todo: add types
    const characters = await getCharacters(numberOfOptions) as any[];
    // randomly select correct option
    const correctIndex = randomIntFromInterval(0, numberOfOptions - 1);
    characters.forEach((c,i) => {
      const isCorrect = i === correctIndex;
      dataStore.createEntity(dataStore.StoreType.options,
        {
          correct: isCorrect,
          questionId: question.id,
          text: c.name,
       });
       // set question image when correct
       if (isCorrect) {
        dataStore.updateById(STORE, question.id, {...question, imageUrl: c.imageUrl})
       }
    });
    return question;
  }
  
  export function getQuestion(id: number) {
    const question = dataStore.getByKey(STORE, id);
    if (!question) throw new Error(`Couldn't find question with id: ${id}`)
    return question;
  }

  export function getQuestionByIndex(gameId: number, index: number){
    const question = dataStore.getByComposite(dataStore.StoreType.questions, "gameId", "questionIndex", gameId, index) as Question;
    if (!question) throw new Error(`Can't find question by index: ${index} gameId: ${gameId}`);
    return question;
  }

  export function getQuestions() {
    return dataStore.getStore(STORE);
  }

  export function deleteQuestion(id: number) {
    const questionId = dataStore.deleteById(STORE, id)
    return questionId;
  }

  export function updateQuestion(id:number, name: string) {
    const question = dataStore.updateById(STORE, id, {id, name});
    return question;
  }

}