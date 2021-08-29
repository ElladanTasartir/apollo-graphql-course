import { API_URL } from '../../config';

export const getUsers =
	(fetch) =>
	(path = '/') =>
		fetch(`${API_URL}/users` + path);
