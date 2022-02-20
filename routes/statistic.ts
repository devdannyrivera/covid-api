import { Router } from 'express';
import { get, getByCountry } from '../controller/statistic';

const router = Router();

router.get('/', get);
router.get('/:id', getByCountry);

export default router;