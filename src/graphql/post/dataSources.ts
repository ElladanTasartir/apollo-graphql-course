import { RESTDataSource } from 'apollo-datasource-rest';
import DataLoader from 'dataloader';
import { API_URL } from '../../config';
import { makePostDataLoader } from './dataLoader';
import {
	createPostFn,
	updatePostFn,
	deletePostFn,
} from './utils/post-repository';

type PostData = {
	title: string;
	body: string;
	userId: string;
};

export class PostsAPI extends RESTDataSource {
	public dataLoader: DataLoader<unknown, unknown, unknown>;

	constructor() {
		super();
		this.baseURL = `${API_URL}/posts/`;
		this.dataLoader = makePostDataLoader(this.getPosts.bind(this));
	}

	getPosts(urlParams = {}) {
		return this.get('', urlParams, {
			cacheOptions: {
				ttl: 60,
			},
		});
	}

	getPost(id: string) {
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

	updatePost(postId: string, postData: PostData) {
		return updatePostFn(postId, postData, this);
	}

	createPost(postData: PostData) {
		return createPostFn(postData, this);
	}

	deletePost(postId: string) {
		return deletePostFn(postId, this);
	}

	loadBatchByUserId(id: string) {
		return this.dataLoader.load(id);
	}
}
