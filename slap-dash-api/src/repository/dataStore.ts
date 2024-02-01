import { Game } from "../models/game";
import { Option } from "../models/option";
import { Question } from "../models/question";
import { Score } from "../models/score";
import { User } from "../models/user";
export module dataStore{
  export type Entity = Game | Question | Option | User | Score;
  export type EntityKeys = keyof Game
  export type DataStore = Game[] | Question[] | User[] | Score[] | Option[];
  let games: Game[] = [];
  let questions: Question[] = [];
  let users: User[] = [];
  let scores: Score[] = [];
  let options: Option[] = [];
  
  export enum StoreType {
    games = 'games',
    questions = "questions",
    users = "users",
    scores = "scores",
    options = "options",
  };

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
      default:
        return;
    }
  };

  export function setStore(storeType: StoreType, store: DataStore): DataStore | undefined{
    switch (storeType) {
      case StoreType.games:
        // todo: assert that store is type better
        games = store as Game[];
        return games;
      case StoreType.questions:
        questions = store as Question[];
        return questions;
      case StoreType.options:
        options = store as Option[];
        return options;
      case StoreType.users:
        users = store as User[]
        return users;
      case StoreType.scores:
        scores = store as Score[]
        return scores;
      default:
        return;
    }
  }
  
  // default will allow this to be used as get by id
  export function getByKey(storeType: StoreType, id: number, key: string = 'id', ){
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
      default:
        return;
    }
  }

  // I guess you could infer entity type instead of using the storetype but might aswell just be explicit
  // creates new entity with incremeted id
  export function createEntity(storeType: StoreType, entity: Omit<Entity, "id">): Entity | undefined {
    switch (storeType) {
      case StoreType.games:
        const newGame: Game = { id: games.length + 1,
        ...entity as Omit<Game, "id">};
        games.push(newGame);
        return newGame;
      case StoreType.questions:
        const newQuestion: Question = { id: games.length + 1,
          ...entity as Omit<Question, "id">};
          questions.push(newQuestion);
      case StoreType.options:
        const newOption: Option = { id: games.length + 1,
          ...entity as Omit<Option, "id">};
          options.push(newOption);
      case StoreType.users:
        const newUser: User = { id: games.length + 1,
          ...entity as Omit<User, "id">};
          users.push(newUser);
      case StoreType.scores:
        const newScore: Score = { id: games.length + 1,
          ...entity as Omit<Score, "id">};
          scores.push(newScore);
      default:
        return;
    }
  }

  // set or create? could be dangerous to set if only trying to update. UPSERTS are scary.
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
  
  
  