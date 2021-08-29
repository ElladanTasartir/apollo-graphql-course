import { URLSearchParams } from 'url';

const post = async (_, { id }, { getPosts }) => {
	const response = await getPosts(`/${id}`);
	const post = await response.json();

	return post;
};

const posts = async (_, { input }, { getPosts }) => {
	const apiFiltersInput = new URLSearchParams(input);
	const posts = await getPosts('/?' + apiFiltersInput);
	return posts.json();
};

const user = async ({ userId }, _, { getUsers }) => {
	const response = await getUsers(`/${userId}`);
	const user = await response.json();
	return user;
};

export const postResolvers = {
	Query: {
		post,
		posts,
	},
	Post: {
		user,
	},
};
