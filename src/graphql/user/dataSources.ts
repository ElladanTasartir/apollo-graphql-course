import DataLoader from 'dataloader';
import { RESTDataSource } from 'apollo-datasource-rest';
import { API_URL } from '../../config';
import { makeUserDataLoader } from './dataLoaders';
import {
	createUserFn,
	deleteUserFn,
	updateUserFn,
} from './utils/user-repository';

type UserData = {
	firstName: string;
	lastName: string;
	userName: string;
};

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

	createUser(userData: UserData) {
		return createUserFn(userData, this);
	}

	updateUser(userId: string, userData: UserData) {
		return updateUserFn(userId, userData, this);
	}

	deleteUser(userId: string) {
		return deleteUserFn(userId, this);
	}
}
