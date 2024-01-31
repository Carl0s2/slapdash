import { request, gql, GraphQLClient } from "graphql-request";

const graphQLClient = new GraphQLClient("https://api.disneyapi.dev/graphql");
const query = gql`
  {
    characters(page: 1, pagSize: 10, filter: {}) {
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
    }
  }
`;

export const getCharacters = async () => {
  const results = await graphQLClient.request(query);
  return results;
};