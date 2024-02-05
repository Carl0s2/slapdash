export interface Game {
  id: number; 
  name: string; // could be used in the url or as a search to allow for users to join
  userId: number; // foreign key - This could serve as a host id also if we wanted to have a host control the game and other users could join
  questionIndex: number; // index of the current question
  questionNumber: number; // total number of questions
  timeLimit: number; // time limit for each question
  completed: boolean; // has the game been completed
};
