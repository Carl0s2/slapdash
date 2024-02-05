import { Game } from "../models/game";
import { Option } from "../models/option";
import { Question } from "../models/question";
import { Score } from "../models/score";
import { User } from "../models/user";
import {Answer} from "../models/answer";

export module dataStore{
  export type Entity = Game | Question | Option | User | Score | Answer;
  export type DataStore = Game[] | Question[] | User[] | Score[] | Option[] | Answer[];
  export enum StoreType {
    games = 'games',
    questions = "questions",
    users = "users",
    scores = "scores",
    options = "options",
    answers = "answers"
  };

  // These are b
  const games: Game[] = [];
  const questions: Question[] = [];
  const users: User[] = [];
  const scores: Score[] = [];
  const options: Option[] = [];
  const answers: Answer[] = [];
  

  export function getStore(storeType: StoreType) : DataStore | undefined{
    switch (storeType) {
      case StoreType.games:
        return games;
      case StoreType.questions:
        return questions;
      case StoreType.options:
        return options;
      case StoreType.users:
        return users;
      case StoreType.scores:
        return scores;
      case StoreType.answers:
        return answers;
      default:
        return;
    }
  };

  // probably don't need this but could be useful to just initiate a store
  // export function setStore(storeType: StoreType, store: DataStore): DataStore | undefined{
  //   switch (storeType) {
  //     case StoreType.games:
  //       games = store as Game[];
  //       return games;
  //     case StoreType.questions:
  //       questions = store as Question[];
  //       return questions;
  //     case StoreType.options:
  //       options = store as Option[];
  //       return options;
  //     case StoreType.users:
  //       users = store as User[]
  //       return users;
  //     case StoreType.scores:
  //       scores = store as Score[]
  //       return scores;
  //     case StoreType.answers:
  //       answers = store as Answer[]
  //     default:
  //       return;
  //   }
  // }
  
  // default will allow this to be used as get by id
  export function getByKey(storeType: StoreType, id: number | string, key: string = 'id' ){
    switch (storeType) {
      case StoreType.games:
        return games.find(x => x[key as keyof Game] === id);
      case StoreType.questions:
        return questions.find(x => x[key as keyof Question] === id);
      case StoreType.options:
        return options.find(x => x[key as keyof Option] === id);
      case StoreType.users:
        return users.find(x => x[key as keyof User] === id);
      case StoreType.scores:
        return scores.find(x => x[key as keyof Score] === id);
      case StoreType.answers:
        return answers.find(x => x[key as keyof Answer] === id)
      default:
        return;
    }
  }

  export function getAllByKey(storeType: StoreType, id: number | string, key: string = 'id' ){
    switch (storeType) {
      case StoreType.games:
        return games.filter(x => x[key as keyof Game] === id);
      case StoreType.questions:
        return questions.filter(x => x[key as keyof Question] === id);
      case StoreType.options:
        return options.filter(x => x[key as keyof Option] === id);
      case StoreType.users:
        return users.filter(x => x[key as keyof User] === id);
      case StoreType.scores:
        return scores.filter(x => x[key as keyof Score] === id);
      case StoreType.answers:
        return answers.filter(x => x[key as keyof Answer] === id)
      default:
        return;
    }
  }

  // gets entity with two matching values
  export function getByComposite(storeType: StoreType, key1: string, key2: string, value1: string | number, value2: string | number) {
    switch (storeType) {
      case StoreType.scores:
        return scores.find(x => x[key1 as keyof Score] === value1 && x[key2 as keyof Score] === value2);
      case StoreType.questions:
        return questions.find(x => x[key1 as keyof Question] === value1 && x[key2 as keyof Question] === value2);
      default:
        return;
    }
  }

  export function getById(storeType: StoreType, id: number): Entity | undefined {
    switch (storeType) {
      case StoreType.games:
        return games.find(x => x.id === id);
      case StoreType.questions:
        return questions.find(x => x.id === id);
      case StoreType.options:
        return options.find(x => x.id === id);
      case StoreType.users:
        return users.find(x => x.id === id);
      case StoreType.scores:
        return scores.find(x => x.id === id);
      case StoreType.answers:
        return answers.find(x => x.id === id);
      default:
        return;
    }
  }

  // creates new entity with incremeted id
  export function createEntity(storeType: StoreType, entity: Omit<Entity, "id">): Entity | undefined {
    switch (storeType) {
      case StoreType.games:
        const newGame: Game = { id: (games.at(-1)?.id ?? 0) + 1, // don't just use length or when deleting you could have duplicates
        ...entity as Omit<Game, "id">};
        games.push(newGame);
        return newGame;
      case StoreType.questions:
        const newQuestion: Question = { id: (questions.at(-1)?.id ?? 0) + 1,
          ...entity as Omit<Question, "id">};
          questions.push(newQuestion);
          return newQuestion;
      case StoreType.options:
        const newOption: Option = { id:(options.at(-1)?.id ?? 0) + 1,
          ...entity as Omit<Option, "id">};
          options.push(newOption);
          return newOption;
      case StoreType.users:
        const newUser: User = { id: (users.at(-1)?.id ?? 0) + 1,
          ...entity as Omit<User, "id">};
          users.push(newUser);
          return newUser;
      case StoreType.scores:
        const newScore: Score = { id:(scores.at(-1)?.id ?? 0) + 1,
          ...entity as Omit<Score, "id">};
          scores.push(newScore);
          return newScore;
      case StoreType.answers:
        const newAnswer: Answer = { id:(answers.at(-1)?.id ?? 0) + 1,
          ...entity as Omit<Answer, "id">};
          answers.push(newAnswer);
          return newAnswer;
      default:
        return;
    }
  }

  export function updateById(storeType: StoreType, id: number, entity: Entity): Entity | undefined{
    const store = getStore(storeType);
    if (!store) return;
    const index = store?.findIndex(x => x.id === id)
    // if no existing entity then return
    if (index === -1) return;
    store[index] = entity;
    return entity;
  }

  export function deleteById(storeType: StoreType, id: number): number | undefined{
    const store = getStore(storeType);
    if (!store) return;
    const index = store?.findIndex(x => x.id === id)
    // if no existing entity then return
    if (index === -1) return;
    store.splice(index, 1);
    return id;
  }

}
  
  
  