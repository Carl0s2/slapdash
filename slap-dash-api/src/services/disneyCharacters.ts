import { request, gql, GraphQLClient } from "graphql-request";
import { randomIntFromInterval } from "../utils";

const totalChars = 7438; // info gathered from api docs


const graphQLClient = new GraphQLClient("https://api.disneyapi.dev/graphql");
const getCharactersQuery = gql`
  query getCharactersQuery(
    $number: Int!, 
    $page: Int!,
  ){
    characters(page: $page, pagSize: $number, filter: {}) {
      id
      name
      films
      shortFilms
      tvShows
      videoGames
      alignment
      parkAttractions
      allies
      enimies
      imageUrl
    }
  }
`;

const mockReturn = [
  {
  name: 'A',
  imageUrl: 'www.bbc.co.uk'
},
  {
  name: 'B',
  imageUrl: 'www.bbc.co.uk'
},
  {
  name: 'C',
  imageUrl: 'www.bbc.co.uk'
},
  {
  name: 'D',
  imageUrl: 'www.bbc.co.uk'
},

];

export const getCharacters = async (number: number = 4 ) => {
  // get random page to get 4 different characters
  // this method is bad as characters will be grouped in the same order.
  // better random would be doing random id and fetching each character individually
  const page = randomIntFromInterval(1,totalChars - number); 
  const results = await graphQLClient.request(getCharactersQuery, {number, page});
  // return mockReturn;
};


