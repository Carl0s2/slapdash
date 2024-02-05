Mono-Repo for slapdash quiz game

Game is hosted at: http://slap-dash.great-site.net/

### Game rules/requierments
* each game has 10 rounds
* each round should display a picture of the character and 4 answers, one of them being the correct one
* the player only has one guess per round
* characters for each round should appear randomly
* at the end of the 10 rounds, the total score should be displayed

### Phantom requirement
When reading the problem an extra requirement was accidently interpreted
* Each round needs a timelimit

### slap-dash-web
A vue project that creates the UI for the game.
    Follow readme guide in project to run locally.

### slap-dash-api
A nodejs + express project that controls the game.
    Follow readme guide in project to run locally.

### Describe which technologies or libraries you’ve used and why

Based on the requirement of having a front end and back end, I opted for a basic web page, that calls an API. I wanted to keep everything using TypeScript, and that influenced the choice of platform.

For a selfish reason I went with Vue for the front end as I havn't used Vue for the past 2 years and wanted to refresh my knowledge.

I used the Vuetify plugin to handle the base componenets for the UI. I am a fan of material design and the vuetify documentation is really easy to work with (especially when you havnt worked with vue in a while)

I used axios as the HTTP client to submit requests to the backend API

I have hosted the static site on a free hosting platform infinityfree.

For the backend I created a new node project and used the express library to create an API.

I built it with a Controller-Service-Repository design pattern, as it handles seperation of concerns

### The Controller
 Handles the REST interface that is going to be consumed by the UI

### The Service layer 
holds all of the buisness logic for running the game

### The Repository layer
 handles storing and fetching of data.

The repository layer could connect to a database, however I built an in-memory data store for each type of entity. And some basic functions to get and set the data.

I tried to create the Entity types as if they were going to be used in a normalised data base.

### Stretch goals

### Ensure that this game works with and without javascript
My choice of technologies might cause some issues here lol
No, my assumption of what this means is that the game should work without the front end UI driving it?
And while testing locally, I was able to play the game using postman

### Write tests, or describe your testing plan
I didn't implement any tests, but if I did I would do the following
### API 
Implement unit tests using Jest.
Because of design pattern it would be easy to mock data between layers
### Web
It's a very simple application, but I did see that vue integrates nicely with cypress.
You could do both component testing and E2E testing.




