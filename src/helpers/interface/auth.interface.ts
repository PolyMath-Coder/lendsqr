export interface userObject {
    name: string;
	email: string;
	password: string;
}

export interface UserPayload {
	name: string;
	email: string;
	password: string;
	iat: number;
	exp: number
}