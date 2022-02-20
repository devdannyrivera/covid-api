import { Request, Response } from 'express';
import statistic from '../models/statistic';

export const get = async (req: Request, res: Response) => {

    try {

        const statistics = await statistic.find().sort({country: 1});

        res.status(200).json({
            result: statistics
        });

    } catch (error) {

        res.status(500).json({
            msg: 'Something went wrong'
        });

    }

};

export const getByCountry = async (req: Request, res: Response) => {

    try {
        const { id } = req.params;
        const data = await statistic.findById(id);

        if(!data) {
            res.status(404).json({
                msg: 'Country statistic not found'
            });
        }

        res.status(200).json({
            result: data
        });

    } catch (error) {

        res.status(500).json({
            msg: 'Something went wrong'
        });

    }

};