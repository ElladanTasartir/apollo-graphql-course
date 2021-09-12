import { ValidationError } from 'apollo-server-core';

type PostData = {
	title: string;
	body: string;
	userId: string;
};

export const createPostFn = async (postData: PostData, dataSource: any) => {
	const postInfo = await createPostInfo(postData, dataSource);
	const { title, body, userId } = postInfo;

	if (!title || !body || !userId) {
		throw new ValidationError(`You have to send title, body and userId`);
	}

	return dataSource.post('', postInfo);
};

export const updatePostFn = async (
	postId: string,
	postData: PostData,
	dataSource: any,
) => {
	if (!postId) {
		throw new ValidationError(`Missing postId`);
	}

	if (postData?.userId) {
		await userExists(postData.userId, dataSource);
	}

	for (const key in postData) {
		if (!postData[key]) {
			throw new ValidationError(`${key} missing`);
		}
	}

	return dataSource.patch(postId, {
		...postData,
	});
};

export const deletePostFn = async (postId: string, dataSource: any) => {
	if (!postId) {
		throw new ValidationError(`Missing postId`);
	}

	return !!(await dataSource.delete(postId));
};

const userExists = async (userId: string, dataSource: any) => {
	try {
		await dataSource.context.dataSources.userApi.get(userId);
	} catch (err) {
		throw new ValidationError(`User ${userId} does not exist`);
	}
};

const createPostInfo = async (postData: PostData, dataSource: any) => {
	const { title, body, userId } = postData;

	await userExists(userId, dataSource);

	const [indexRefPost] = await dataSource.get('', {
		_limit: 1,
		_sort: 'indexRef',
		_order: 'desc',
	});

	const indexRef = indexRefPost.indexRef + 1;

	return {
		title,
		body,
		userId,
		indexRef,
		createdAt: new Date().toISOString(),
	};
};
