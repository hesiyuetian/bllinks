import { Router } from 'express';
import Result from '../utils/result';
const router: Router = Router();

router.get('/1223123', async (req: any, res) => {
    try {
        const info = {
            icon: 'https://asset.si.online/c43cd76c060245b794b0d544ecd83f04.png',
            label: '1 SOL',
            title: '全球募集Global fundraising',
            description: '全球追债拯救许皮带Global fundraising to save many belts',
            links: {
                actions: [
                    {
                        label: '0.01 SOL',
                        href: '/api/transaction/send?amount=0.01&id=91313b6a0b&debug=undefined',
                        parameters: [
                            {
                                name: 'memo',
                                label: 'Enter your message',
                                required: true,
                            },
                        ],
                    },
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

router.get('/transfer', async (req: any, res) => {
    try {
        const info = {
            icon: 'https://asset.si.online/c43cd76c060245b794b0d544ecd83f04.png',
            label: 'Donate SOL',
            title: 'Transfer',
            description: '拯救许皮带',
            links: {
                actions: [
                    {
                        label: 'Include message',
                        href: `/api/transaction/send?amount={amount}&memo={memo}&debug=undefined`,
                        parameters: [
                            {
                                name: 'memo',
                                label: 'Enter your message',
                                required: true,
                            },
                        ],
                    },
                    {
                        label: 'Send SOL',
                        href: `/api/transaction/send?amount={amount}&memo={memo}&debug=undefined`,
                        parameters: [
                            {
                                name: 'amount',
                                label: 'Enter the amount of SOL to send',
                                required: true,
                            },
                        ],
                    },
                ],
            },
        };
        res.send(info);
    } catch (e: any) {
        res.send(Result.err(500, e.message || String(e)));
    }
});

export default router;
