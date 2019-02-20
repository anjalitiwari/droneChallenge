import { Request, Response, NextFunction, RequestHandler, Application } from 'express';
type ExpressMiddleware = (request: Request, response: Response, next: NextFunction) => void;

export { Response as ExpressResponse,Request as ExpressRequest, ExpressMiddleware,RequestHandler as ExpressHandler, Application as ExpressApplication }

export interface addUser {
    name:string;
    password:string;
    profession:string;
    id:number;
}

export interface deleteUser {
    id: number;
}

export interface searchUser {
    name: string;
}