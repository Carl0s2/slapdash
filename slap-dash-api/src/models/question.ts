export interface Question {
  id: number; // guid
  gameId: number; // foreign key to game
  question: string; // the question
  imageUrl: string; // the image url
};
