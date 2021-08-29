import * as DataLoader from 'dataloader';
import { URLSearchParams } from 'url';
import fetch from 'node-fetch';

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

const userDataLoader = new DataLoader(async (ids) => {
	const urlQuery = ids.join('&id=');
	const url = 'http://localhost:3000/users/?id=' + urlQuery;
	const response = await fetch(url);
	const users = await response.json();
	return ids.map((id) => users.find((user) => user.id === id));
});

const user = async ({ userId }) => {
	return userDataLoader.load(userId);
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
