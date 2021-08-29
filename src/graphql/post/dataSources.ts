import { RESTDataSource } from 'apollo-datasource-rest';
import { API_URL } from '../../config';

export class PostsAPI extends RESTDataSource {
	constructor() {
		super();
		this.baseURL = `${API_URL}/posts/`;
	}

	async getPosts(urlParams = {}) {
		return this.get('', urlParams, {
			cacheOptions: {
				ttl: 60,
			},
		});
	}

	async getPost(id: string) {
		return this.get(
			id,
			{},
			{
				cacheOptions: {
					ttl: 60,
				},
			},
		);
	}
}
