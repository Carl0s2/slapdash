API for slap dash quiz game

To run locally use the commands
```sh
npm install

npm run dev
```

In order to play the game without the UI, you need to do the following calls in this order:

Create user (username) POST api/user
Create game (userId) POST api/game 

At this point all questions should be generated for the game and you just have to start the rounds.
If you wish you can submit answers from multiple users to the same game. No UI has been implemented to accomidate for this.

repeate section {
    Start round (gameId) POST api/game/gameId/next

    Get Question (gameId) GET api/game/gameId/question

    Submit answer (gameId, userId, optionId) POST api/game/gameId/user/userId/answer/optionId
}

Once game has finished(or between rounds) you can get the user score

Get user score (gameId, userId) GET api/game/gameId/user/userId

