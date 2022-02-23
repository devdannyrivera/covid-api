import { Router } from 'express';
import { login, register, getRefreshedToken } from '../controller/auth';


const router = Router();

router.post('/signup', register);
router.post('/login', login);
router.post('/refresh-token', getRefreshedToken);

export default router;