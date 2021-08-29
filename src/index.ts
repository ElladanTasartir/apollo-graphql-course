import { ApolloServer } from 'apollo-server';
import { typeDefs, resolvers } from './graphql/schema';
import { context } from './graphql/context';
import { PostsAPI } from './graphql/post/dataSources';

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context,
	dataSources: () => {
		return {
			postApi: new PostsAPI(),
		};
	},
});

server.listen(4000).then(({ url }) => {
	console.log(`Server listening on url ${url}`);
});
