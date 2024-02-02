import { request, gql, GraphQLClient } from "graphql-request";
import { randomIntFromInterval } from "../utils";

const totalChars = 1302; // info gathered from query count


const graphQLClient = new GraphQLClient("https://graphql-pokeapi.vercel.app/api/graphql");
const getPokemonsQuery = gql`
  query getPokemonsQuery(
    $number: Int!, 
    $page: Int!,
  ){
    pokemons(limit: $number, offset: $page) {
      count
      next
      previous
      status
      message
      results {
        url
        name
        image
      }
    }
  }
`;

// example response
// {
//   "data": {
//     "pokemons": {
//       "count": 1302,
//       "next": "https://pokeapi.co/api/v2/pokemon/?offset=3&limit=1",
//       "previous": "https://pokeapi.co/api/v2/pokemon/?offset=1&limit=1",
//       "status": true,
//       "message": "",
//       "results": [
//         {
//           "url": "https://pokeapi.co/api/v2/pokemon/3/",
//           "name": "venusaur",
//           "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png"
//         }
//       ]
//     }
//   }
// }

type pokemonResonse = {
  
    pokemons: {
      results: {url: string, name: string, image: string} [],
    }
  
}
export const getPokemons = async (number: number = 4 ) => {
  // get random page to get 4 different characters
  // this method is bad as characters will be grouped in the same order.
  // better random would be doing random id and fetching each character individually
  const page = randomIntFromInterval(1, totalChars - number); 
  const results = await graphQLClient.request(getPokemonsQuery, {number, page}) as pokemonResonse;
  
  return results.pokemons;
};


