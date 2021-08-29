import * as DataLoader from 'dataloader';

export const makePostDataLoader = (getPosts) =>
	new DataLoader(async (ids) => {
		const urlQuery = ids.join('&userId=');
		const response = await getPosts('?userId=' + urlQuery);
		const posts = await response.json();
		return ids.map((id) => posts.filter((post) => post.userId === id));
	});
