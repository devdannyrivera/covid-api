import { Request, Response } from 'express';
import User from '../models/user';
import bcrypt from 'bcryptjs';
import validator from 'validator';

export const register = async (req: Request, res: Response) => {

    try {

        const { body } = req;
        const user = new User(body);

        // Validations
        const error = await validateUserData(user);
        if(error !== "")
            return res.status(400).json({
                msg: error
            });

        // Hash password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt );

        await user.save();

        res.json({
            user
        });

    } catch (error) {

        res.status(500).json({
            msg: 'Something went wrong'
        });

    }

};

const validateUserData = async (user: { name: string; email: string; password: string }) => {
    let msg = "";

    if(validator.isEmpty(user.name))
        msg = 'Name can not be empty';

    if(!validator.isEmail(user.email))
        msg = 'This email is not valid';

    if(validator.isEmpty(user.password))
        msg = 'Password can not be empty';

    const existEmail = await User.findOne({ email: user.email });

    if(existEmail)
        msg = 'This email is already in use';

    return msg;
};