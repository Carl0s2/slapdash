export interface Option {
  id: number; // guid
  questionId: number; // forigne key
  text: string; // display text aka answer text
  correct: boolean; // is the correct answer
};
