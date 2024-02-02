import { dataStore } from "../repository/dataStore";
import {Option} from "../models/option";

export module optionService {
  const STORE = dataStore.StoreType.options

  // todo try and avoid just pass throughs here
  export function createOption(option: Omit<Option, "id">) {
    const newOption = dataStore.createEntity(STORE, option);
    return newOption;
  }
  
  export function getOption(id: number) {
    const option = dataStore.getByKey(STORE, id);
    return option;
  }

  export function getOptions() {
    return dataStore.getStore(STORE);
  }

  export function deleteOption(id: number) {
    const optionId = dataStore.deleteById(STORE, id)
    return optionId;
  }

  export function updateOption(id:number, name: string) {
    const option = dataStore.updateById(STORE, id, {id, name});
    return option;
  }

}