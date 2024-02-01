export interface Game {
  id: number; // guid
  name: string; // used as url???
  userId: number; // forign key - if we are going to have users this would need to be multiple. This could serve as a host id also if we wanted to have a host
  questionIndex: number; // index of the current question
  questionNumber: number; // number of questionss
  timeLimit: number; // time limit for each question
  completed: boolean; // has the game been completed
};
