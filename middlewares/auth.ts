import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

export const auth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('x-api-token');

    if(!token) {
        res.status(401).json({
            mgs: 'x-api-token header not found'
        });
    }

    try {

        jwt.verify(token || "", process.env.SECRETKEY || "");
        return next();

    } catch (error) {
        res.status(401).json({
            mgs: 'Invalid Token'
        });
    }
};