import fetch from 'node-fetch';
import { makeUserDataLoader } from './user/dataLoaders';
import { getPosts } from './post/utils';
import { getUsers } from './user/utils';
import { makePostDataLoader } from './post/dataLoader';

export const context = () => {
	return {
		postDataLoader: makePostDataLoader(getPosts(fetch)),
		userDataLoader: makeUserDataLoader(getUsers(fetch)),
		getUsers: getUsers(fetch),
		getPosts: getPosts(fetch),
	};
};
