import { dataStore } from "../repository/dataStore";

export module userService {
  const STORE = dataStore.StoreType.users

  // name might be something you consider putting a black list around
  // in multiplayer online games, you don't want to allow users to discriminate.
  // other games solve this by just randomly generating a name for you.
  export function createUser(name: string) {
    const user = dataStore.createEntity(STORE, {name});
    return user;
  }
  
  export function getUser(id: number) {
    const user = dataStore.getByKey(STORE, id);
    return user;
  }

  export function getUsers() {
    return dataStore.getStore(STORE);
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