import { ApolloServer } from 'apollo-server';
import { typeDefs, resolvers } from './graphql/schema';
import { context } from './graphql/context';

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context,
});

server.listen(4000).then(({ url }) => {
	console.log(`Server listening on url ${url}`);
});
