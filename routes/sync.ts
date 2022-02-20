import { Router } from 'express';
import { sync } from '../controller/sync';
import { auth } from '../middlewares/auth';

const router = Router();

router.get('/', auth, sync);

export default router;