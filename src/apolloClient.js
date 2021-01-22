import {ApolloClient, InMemoryCache} from "@apollo/client";
let graphqlUrl = 'http://localhost:3001/graphql';
if (process.env.NODE_ENV === 'production') {
  graphqlUrl = 'https://codefornebraska-housing.herokuapp.com/graphql';
}
const client = new ApolloClient({
  uri: graphqlUrl,
  cache: new InMemoryCache()
})
export default client
