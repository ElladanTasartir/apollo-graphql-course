import { ValidationError } from 'apollo-server-core';

type UserData = {
	firstName: string;
	lastName: string;
	userName: string;
};

export const createUserFn = async (userData: UserData, dataSource: any) => {
	const userInfo = await createUserInfo(userData, dataSource);

	const { firstName, lastName, userName } = userInfo;

	if (!firstName || !lastName || !userName) {
		throw new ValidationError(
			`You have to send firstName, lastName and userName`,
		);
	}

	return dataSource.post('', userInfo);
};

export const updateUserFn = async (
	userId: string,
	userData: UserData,
	dataSource: any,
) => {
	if (!userId) {
		throw new ValidationError(`Missing userId`);
	}

	for (const key in userData) {
		if (!userData[key]) {
			throw new ValidationError(`${key} missing`);
		}
	}

	return dataSource.patch(userId, {
		...userData,
	});
};

export const deleteUserFn = async (userId: string, dataSource: any) => {
	if (!userId) {
		throw new ValidationError(`Missing userId`);
	}

	return !!(await dataSource.delete(userId));
};

const createUserInfo = async (userData: UserData, dataSource: any) => {
	const { firstName, lastName, userName } = userData;

	const [indexRefUser] = await dataSource.get('', {
		_limit: 1,
		_sort: 'indexRef',
		_order: 'desc',
	});

	const indexRef = indexRefUser.indexRef + 1;

	return {
		firstName,
		lastName,
		userName,
		indexRef,
		createdAt: new Date().toISOString(),
	};
};
