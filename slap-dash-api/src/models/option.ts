export interface Option {
  id: number;
  questionId: number; // foreign key
  text: string; // display text aka answer text
  correct: boolean; // is the correct answer
};
