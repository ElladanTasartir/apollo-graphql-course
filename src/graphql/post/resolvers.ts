const post = async (_, { id }, { dataSources }) => {
	const post = dataSources.postApi.getPost(id);
	return post;
};

const posts = async (_, { input }, { dataSources }) => {
	const posts = dataSources.postApi.getPosts(input);
	return posts;
};

const user = async ({ userId }, _, { dataSources }) => {
	return dataSources.userApi.loadBatchById(userId);
};

const createPost = async (_, { data }, { dataSources }) => {
	return dataSources.postApi.createPost(data);
};

const updatePost = async (_, { postId, data }, { dataSources }) => {
	return dataSources.postApi.updatePost(postId, data);
};

const deletePost = async (_, { postId }, { dataSources }) => {
	return dataSources.postApi.deletePost(postId);
};

export const postResolvers = {
	Query: {
		post,
		posts,
	},
	Post: {
		user,
	},
	Mutation: {
		createPost,
		updatePost,
		deletePost,
	},
};
