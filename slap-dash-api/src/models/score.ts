export interface Score {
  id: number; // guid
  userId: number; // foreign key to user
  gameId: number; // foreign key to game
  score: number; // score for the game
};
