import * as DataLoader from 'dataloader';

export const makePostDataLoader = (getPosts) =>
	new DataLoader(async (ids) => {
		const urlQuery = ids.join('&userId=');
		const posts = await getPosts('?userId=' + urlQuery);
		return ids.map((id) => posts.filter((post) => post.userId === id));
	});
