import { URLSearchParams } from 'url';

const user = async (_, { id }, { getUsers }) => {
	const user = await getUsers(`/${id}`);
	return user.json();
};

const users = async (_, { input }, { getUsers }) => {
	const apiFiltersInput = new URLSearchParams(input);
	const users = await getUsers('/?' + apiFiltersInput);
	return users.json();
};

export const userResolvers = {
	Query: {
		user,
		users,
	},
};
