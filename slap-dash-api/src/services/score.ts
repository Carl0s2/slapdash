import { dataStore } from "../repository/dataStore";

export module scoreService {
  const STORE = dataStore.StoreType.scores

  export function createScore(name: string) {
    const score = dataStore.createEntity(STORE, {name});
    return score;
  }
  
  export function getScore(id: number) {
    const score = dataStore.getByKey(STORE, id);
    return score;
  }

  export function getScores() {
    return dataStore.getStore(STORE);
  }

  export function deleteScore(id: number) {
    const scoreId = dataStore.deleteById(STORE, id)
    return scoreId;
  }

  export function updateScore(id:number, name: string) {
    const score = dataStore.updateById(STORE, id, {id, name});
    return score;
  }

}