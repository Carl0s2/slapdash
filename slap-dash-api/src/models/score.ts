export interface Score {
  id: number;
  userId: number; // foreign key to user
  gameId: number; // foreign key to game
  score: number; // score for the game
  roundStart?: Date // timestamp of round start
};
