import { ApolloServer } from 'apollo-server';
import { typeDefs, resolvers } from './graphql/schema';
import { context } from './graphql/context';
import { dataSources } from './graphql/dataSources';

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context,
	dataSources,
});

server.listen(4000).then(({ url }) => {
	console.log(`Server listening on url ${url}`);
});
