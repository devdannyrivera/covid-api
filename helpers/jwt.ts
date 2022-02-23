import jwt, { JwtPayload } from 'jsonwebtoken';

export const generateJwt = ({id = "", name = ""}: any) => {
    return new Promise((resolve, reject) => {
        const payload = { uid: id, name };

        jwt.sign(payload, process.env.SECRETKEY || "", {
            expiresIn: '1m'
        }, (err, token) => {
            if(err) {
                reject('It was not possible to generate the token');
            } else {
                resolve(token);
            }
        });
    });
};

export const generateRefreshJwt = ({id = "", name = ""}: any) => {
    return new Promise((resolve, reject) => {
        const payload = { uid: id, name };

        jwt.sign(payload, process.env.SECRETKEYREFRESHTOKEN || "", {
            expiresIn: '1y'
        }, (err, token) => {
            if(err) {
                reject('It was not possible to generate the token');
            } else {
                resolve(token);
            }
        });
    });
};

export const verifyRefreshTokenJwt = (token: string) => {
    return new Promise((resolve, reject) => {

        if(!token) {
            reject("Invalid token");
        }

        try {

            jwt.verify(token || "", process.env.SECRETKEYREFRESHTOKEN || "");
            const payload = jwt.decode(token) as JwtPayload;
            resolve(payload);

        } catch (error) {
            reject("Invalid token");
        }

    });
};