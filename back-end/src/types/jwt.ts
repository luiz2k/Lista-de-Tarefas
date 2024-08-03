export type GenerateTokenOutput = {
	access: {
		token: string;
		expiresIn: number;
	};
	refresh: {
		token: string;
	};
};

export type Payload = {
	id: string;
	iat: number;
	exp: number;
};
