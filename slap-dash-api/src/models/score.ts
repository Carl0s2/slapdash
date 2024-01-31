export type Score = {
  id: string; // guid
  userId: string; // foreign key to user
  gameId: string; // foreign key to game
  score: number; // score for the game
};
