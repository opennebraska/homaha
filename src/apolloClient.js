import {ApolloClient, InMemoryCache} from "@apollo/client";

const client = new ApolloClient({
  uri: 'https://codefornebraska-housing.herokuapp.com/graphql',
  cache: new InMemoryCache()
})
export default client
