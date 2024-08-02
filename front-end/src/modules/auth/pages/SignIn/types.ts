export type Tokens = {
	access: {
		token: string;
		expiresIn: number;
	};
	refresh: {
		token: string;
	};
};

export type Status = {
	message: string;
	color: string;
};

export type Messagens = {
	default: Status;
	created: Status;
	expired: Status;
};