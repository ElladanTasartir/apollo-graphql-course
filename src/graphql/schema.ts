import { gql } from 'apollo-server';
import { apiFiltersResolvers } from './api-filters/resolvers';
import { apiFiltersTypeDefs } from './api-filters/typedefs';
import { postResolvers } from './post/resolvers';
import { postTypeDefs } from './post/typedefs';
import { userResolvers } from './user/resolvers';
import { userTypeDefs } from './user/typedefs';

const rootTypeDefs = gql`
	type Query {
		_empty: Boolean!
	}
`;

const rootResolvers = {
	Query: {
		_empty: (): boolean => true,
	},
};

export const typeDefs = [
	rootTypeDefs,
	userTypeDefs,
	postTypeDefs,
	apiFiltersTypeDefs,
];

export const resolvers = [
	rootResolvers,
	userResolvers,
	postResolvers,
	apiFiltersResolvers,
];
