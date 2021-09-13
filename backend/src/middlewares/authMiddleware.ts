import { Request, Response, NextFunction } from 'express';

import jwt from "jsonwebtoken";

interface TokenProps {
    id: string;
    iat: number;
    exp: number;
}

export default function authMiddlewares(request: Request, response: Response, next: NextFunction) {
    const { authorization } = request.headers;

    if(!authorization) {
        return response.sendStatus(401);
    }

    const token = authorization.replace('Bearer', '').trim();

    try {
        const data = jwt.verify(token, 'handsonRemapeandoCampus2021CC');

        const { id } = data as TokenProps;

        request.userId = id;

        return next();

    } catch(err) {
        return response.sendStatus(401);
    }
}