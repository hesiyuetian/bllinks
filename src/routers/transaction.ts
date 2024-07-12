import { Router } from 'express';
import Result from '../utils/result';
const router: Router = Router();

router.get('/send', async (req: any, res) => {
    try {
        const { amount, id, debug } = req.query;
        res.send({ amount, id, debug });
    } catch (e: any) {
        res.send(Result.err(500, e.message || String(e)));
    }
});

export default router;
