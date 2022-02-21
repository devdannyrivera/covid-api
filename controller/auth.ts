import { Request, Response } from 'express';
import User from '../models/user';
import bcrypt from 'bcryptjs';
import validator from 'validator';
import { generateJwt } from '../helpers/jwt';

export const register = async (req: Request, res: Response) => {

    try {

        const { body } = req;
        const user = new User(body);

        // Validations
        const error = await validateUserData(user);
        if(error !== "") {
            return res.status(400).json({
                msg: error
            });
        }

        // Hash password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt );

        await user.save();

        res.status(201).json({
            user
        });

    } catch (error) {

        res.status(500).json({
            msg: 'Something went wrong'
        });

    }

};

export const login = async (req: Request, res: Response) => {

    try {

        const { body } = req;
        const user = new User(body);

        // Validations
        const error = await validateUserData(user, true);
        if(error !== "") {
            return res.status(400).json({
                msg: error
            });
        }

        // Check if user exist
        const userDb = await User.findOne({email: user.email});

        if(!userDb) {
            return res.status(400).json({
                msg: 'Email / Password are not correct'
            });
        }

        // Check hash
        const passwordMatch = bcrypt.compareSync(user.password, userDb.password);

        if(!passwordMatch) {
            return res.status(400).json({
                msg: 'Email / Password are not correct'
            });
        }

        // If it get to this point, it means that credentials are correct, so we generate the token
        const token = await generateJwt(userDb);

        res.json({
            user,
            token
        });

    } catch (error) {

        res.status(500).json({
            msg: 'Something went wrong'
        });

    }

};

const validateUserData = async (user: { name: string; email: string; password: string }, isLogin: boolean = false) => {
    let msg = "";

    if(!validator.isEmail(user.email || "")) {
        msg = 'This email is not valid';
    }

    if(validator.isEmpty(user.password || "")) {
        msg = 'Password can not be empty';
    }

    if(!isLogin) {
        // Fields above are not required to login, so we skip them if isLogin is true

        if(validator.isEmpty(user.name || "") && !isLogin) {
            msg = 'Name can not be empty';
        }

        const existEmail = await User.findOne({ email: user.email });

        if(existEmail) {
            msg = 'This email is already in use';
        }

    }

    return msg;
};