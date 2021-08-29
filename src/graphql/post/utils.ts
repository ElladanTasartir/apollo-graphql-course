import { API_URL } from '../../config';

export const getPosts =
	(fetch) =>
	(path = '/') =>
		fetch(`${API_URL}/posts` + path);
