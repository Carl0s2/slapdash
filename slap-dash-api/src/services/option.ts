import { dataStore } from "../repository/dataStore";
import {Option} from "../models/option";

export module optionService {
  const STORE = dataStore.StoreType.options

  export function createOption(option: Omit<Option, "id">) {
    const newOption = dataStore.createEntity(STORE, option);
    return newOption;
  }
  
  export function getOption(id: number) {
    const option = dataStore.getByKey(STORE, id);
    return option;
  }

  export function getOptionsByQuestionId(id: number): Omit<Option, "correct">[] {
    const options = dataStore.getAllByKey(STORE, id, "questionId") as Option[];
    // remove correct so that people can't inspect and find correct answer
    const optionsWithoutCorrect = options.map(o => {return {id: o.id, questionId: o.questionId, text: o.text}})
    return optionsWithoutCorrect;
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