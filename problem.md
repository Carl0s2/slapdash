
Full stack code test
Guess the character
Congratulations on getting past the interview stage to get here 🎉
This is an exercise to test to assess if you are able to solve problems with readable, well-written code, that employs software design principles or patterns.
Overview
￼
kahoot.it
Build a small game where the player needs to correctly guess the film or tv-show of a Disney character.
* Use an API to get images and characters information, for example https://disneyapi.dev/. You do not need to use this exact API.
* You can make the game look however you want not necessarily like the image above
* Once the game has been completed it should be uploaded to a cloud hosting service of your choice and share the link. Share the GitHub repository, or zip of the code.
    * You may also issue us with a docker image (or images + docker compose file) if you do not access to a cloud hosting service.
Game rules
* each game has 10 rounds
* each round should display a picture of the character and 4 answers, one of them being the correct one
* the player only has one guess per round
* characters for each round should appear randomly
* at the end of the 10 rounds, the total score should be displayed
Criteria
If time is a limiting factor, not all game rules need to be implemented. However please fill these criteria so we can understand your front and backend skills.
* There must be a front, and backend component to this game. (i.e. cannot be written all in the front end as a Single Page Application)
* Frontend
    * Serves the user interface
    * Submits the users answers to the backend
* Backend
    * Makes the external call to your API of choice
    * Receives the submission request from your frontend
    * Redirects the user to the next round
    * You may use in-memory session storage (i.e. you do not need to use a persistence service like Redis)
Mid to senior criteria
For candidates applying for the SE2, or Senior SE1+ roles, please also follow these criteria
* Describe which technologies or libraries you’ve used and why
* Describe a software design pattern you have used (e.g. REST, MVC, inversion of control)
Stretch goals
Please only consider doing these once your game contains all the basic rules and criteria.
* Ensure that this game works with and without javascript
* write tests, or describe your testing plan


