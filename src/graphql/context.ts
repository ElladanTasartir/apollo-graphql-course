import fetch from 'node-fetch';
import { makeUserDataLoader } from './user/dataLoaders';
import { getPosts } from './post/utils';
import { getUsers } from './user/utils';

export const context = () => {
	return {
		userDataLoader: makeUserDataLoader(getUsers(fetch)),
		getUsers: getUsers(fetch),
		getPosts: getPosts(fetch),
	};
};
