export type Game = {
  id: string; // guid
  userId: string; // forign key - if we are going to have users this would need to be multiple. This could serve as a host id also if we wanted to have a host
  // questionIds: string[]; // guid[] - 10 questions in the game, saved so that we can track which questions have been used and answers
  questionIndex: number; // index of the current question
  timeLimit: number; // time limit for each question
  completed: boolean; // has the game been completed
};
