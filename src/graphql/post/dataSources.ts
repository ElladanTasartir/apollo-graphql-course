import { RESTDataSource } from 'apollo-datasource-rest';
import DataLoader from 'dataloader';
import { API_URL } from '../../config';
import { makePostDataLoader } from './dataLoader';

export class PostsAPI extends RESTDataSource {
	public dataLoader: DataLoader<unknown, unknown, unknown>;

	constructor() {
		super();
		this.baseURL = `${API_URL}/posts/`;
		this.dataLoader = makePostDataLoader(this.getPosts.bind(this));
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

	loadBatchByUserId(id: string) {
		return this.dataLoader.load(id);
	}
}
