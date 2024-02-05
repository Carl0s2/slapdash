export interface Answer {
  id: number; 
  userId: number; // foreign key
  optionId: number; // foreign key
  questionId: number; // foreign key
};
