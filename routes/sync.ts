import { Router } from 'express';
import { sync } from '../controller/sync';

const router = Router();

router.get('/', sync);

export default router;