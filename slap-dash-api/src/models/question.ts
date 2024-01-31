export type Question = {
  id: string; // guid
  gameId: string; // foreign key to game
  question: string; // the question
  imageUrl: string; // the image url
  answer: string; // the answer
  option1: string; // the first option
  option2: string; // the second option
  option3: string; // the third option
  option4: string; // the fourth option
  // if we needed to expand the options we could make this an array, and dynamically generate the options based on game settings
  // the reason why this is just here for now is because we are going to have to do some work to get the options to be random
};
