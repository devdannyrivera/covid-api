import { Request, Response } from 'express';
import axios from 'axios';
import statistic from '../models/statistic';

export const sync = async (req: Request, res: Response) => {

    try {

        const result = await getSourceData();

        await statistic.collection.drop();

        await statistic.collection.insertMany(result);

        res.status(200).json({
            msg: 'Statistics Syncned Successfully'
        });

    } catch (error) {

        res.status(500).json({
            msg: 'Something went wrong'
        });

    }

};

const getSourceData = async () => {
    const options: any = {
        method: 'GET',
        url: 'https://covid-193.p.rapidapi.com/statistics',
        headers: {
          'x-rapidapi-host': 'covid-193.p.rapidapi.com',
          'x-rapidapi-key': '52f5874228mshd891bd0b716911dp10d6dcjsn4a7119d3b010'
        }
      };

    const response = await axios.request(options);
    const { response: result } = response.data;

    return result;
};