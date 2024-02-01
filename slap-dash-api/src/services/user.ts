import { User } from "../models/user";
import { dataStore } from "../repository/dataStore";

export module userService {
  const STORE = dataStore.StoreType.users

  export function createUser(name: string) {
    const user = dataStore.createEntity(STORE, {name});
    return user;
  }
  
  export function getUser(id: number) {
    const user = dataStore.getByKey(STORE, id);
    return user;
  }

  export function deleteUser(id: number) {
    const userId = dataStore.deleteById(STORE, id)
    return userId;
  }

  export function updateUser(id:number, name: string) {
    const user = dataStore.updateById(STORE, id, {id, name});
    return user;
  }

}