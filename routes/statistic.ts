import { Router } from 'express';
import { get, getByCountry, mutateCountryStatistic } from '../controller/statistic';
import { auth } from '../middlewares/auth';

const router = Router();

router.get('/', auth, get);
router.get('/:id', auth, getByCountry);
router.post('/:id', auth, mutateCountryStatistic);

export default router;