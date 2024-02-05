export interface Question {
  id: number;
  gameId: number; // foreign key to game
  question: string; // the question
  imageUrl: string; // the image url
  questionIndex: number; // order of the question
};
