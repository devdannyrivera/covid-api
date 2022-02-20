import jwt from 'jsonwebtoken';

export const generateJwt = ({id = "", name = ""}: any) => {
    return new Promise((resolve, reject) => {
        const payload = { uid: id, name };

        jwt.sign(payload, process.env.SECRETKEY || "", {
            expiresIn: '1h'
        }, (err, token) => {
            if(err) {
                reject('It was not possible to generate the token');
            } else {
                resolve(token);
            }
        });
    });
};