import { Request, Response } from 'express';
import statistic from '../models/statistic';

export const get = async (req: Request, res: Response) => {

    try {

        const { query } = req;

        const size = parseInt(query!.size as string || '20', undefined);
        const page = parseInt(query!.page as string || '1', undefined);
        const country = query!.country || '';

        if(isNaN(size) || isNaN(page)) {
            return res.status(400).json({
                msg: 'Pagination params are not correct'
            });
        }

        const total = await statistic.countDocuments();
        const statistics = await statistic.find({country: {$regex: country}}).sort({country: 1}).limit(size).skip((page - 1) * size);

        res.status(200).json({
            total,
            statistics
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
            return res.status(404).json({
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

export const mutateCountryStatistic = async (req: Request, res: Response) => {

    try {
        const { id } = req.params;
        const { deaths, cases, tests } = req.body;

        const data = await statistic.findByIdAndUpdate(id, {deaths, cases, tests}, {new: true});

        if(!data) {
            return res.status(404).json({
                msg: 'That country statistic does not exist'
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