declare namespace Express {
    interface IUser {
        id?: number;
        email: string;
        name?: string;
        
    }
    export interface Request {
		user: IUser;
	}
}