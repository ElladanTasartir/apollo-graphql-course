const user = async (_, { id }, { dataSources }) => {
	const user = await dataSources.userApi.getUser(id);
	return user;
};

const users = async (_, { input }, { dataSources }) => {
	const users = await dataSources.userApi.getUsers(input);
	return users;
};

const posts = async ({ id }, _, { dataSources }) => {
	return dataSources.postApi.loadBatchByUserId(id);
};

const createUser = async (_, { data }, { dataSources }) => {
	return dataSources.userApi.createUser(data);
};

const updateUser = async (_, { userId, data }, { dataSources }) => {
	return dataSources.userApi.updateUser(userId, data);
};

const deleteUser = async (_, { userId }, { dataSources }) => {
	return dataSources.userApi.deleteUser(userId);
};

export const userResolvers = {
	Query: {
		user,
		users,
	},
	User: {
		posts,
	},
	Mutation: {
		createUser,
		updateUser,
		deleteUser,
	},
};
