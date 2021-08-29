import { PostsAPI } from './post/dataSources';
import { UsersAPI } from './user/dataSources';

export const dataSources = () => ({
	postApi: new PostsAPI(),
	userApi: new UsersAPI(),
});
