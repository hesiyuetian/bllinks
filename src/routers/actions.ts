import { Router } from 'express';
import Result from '../utils/result';
const router: Router = Router();

router.get('/1223123', async (req: any, res) => {
    try {
        const info = {
            icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR40vua4OVPkDEXxHVLZoz7dTEI4kpBMn7JAw&s',
            label: '1 SOL',
            title: '在线乞讨Online begging',
            description: '乞讨赚钱拯救女大学生Begging to save female university students',
            links: {
                actions: [
                    { label: '0.01 SOL', href: '/api/transaction/send?amount=0.01&id=91313b6a0b&debug=undefined' },
                    { label: '0.1 SOL', href: '/api/transaction/send?amount=0.1&id=91313b6a0b&debug=undefined' },
                    { label: '0.001 SOL', href: '/api/transaction/send?amount=0.001&id=91313b6a0b&debug=undefined' },
                    { href: '/api/transaction/send?amount={amount}&id=91313b6a0b&debug=undefined', label: 'Send', parameters: [{ name: 'amount', label: 'Enter a custom SOL amount' }] },
                ],
            },
        };
        res.send(info);
    } catch (e: any) {
        res.send(Result.err(500, e.message || String(e)));
    }
});

export default router;
