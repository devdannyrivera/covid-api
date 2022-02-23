import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

export const auth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('x-api-token');

    if(!token) {
        return res.status(401).json({
            msg: 'x-api-token header not found'
        });
    }

    try {

        jwt.verify(token || "", process.env.SECRETKEY || "");
        return next();

    } catch (error) {
        res.status(401).json({
            msg: 'Invalid Token'
        });
    }
};