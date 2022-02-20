import { Router } from 'express';
import { get, getByCountry, mutateCountryStatistic } from '../controller/statistic';

const router = Router();

router.get('/', get);
router.get('/:id', getByCountry);
router.post('/:id', mutateCountryStatistic);

export default router;