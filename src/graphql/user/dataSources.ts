import DataLoader from 'dataloader';
import { RESTDataSource } from 'apollo-datasource-rest';
import { API_URL } from '../../config';
import { makeUserDataLoader } from './dataLoaders';

export class UsersAPI extends RESTDataSource {
	public dataLoader: DataLoader<unknown, unknown, unknown>;

	constructor() {
		super();
		this.baseURL = `${API_URL}/users/`;
		this.dataLoader = makeUserDataLoader(this.getUsers.bind(this));
	}

	async getUsers(urlParams = {}) {
		return this.get('', urlParams, {
			cacheOptions: {
				ttl: 60,
			},
		});
	}

	async getUser(id: string) {
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

	loadBatchById(id: string) {
		return this.dataLoader.load(id);
	}
}
