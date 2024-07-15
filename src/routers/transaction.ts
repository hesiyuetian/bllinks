import { Router } from 'express';
import Result from '../utils/result';
import { Keypair, PublicKey, Transaction } from '@solana/web3.js';
import * as bs58 from 'bs58';
import { SOLANA_ENV } from '../constants';
import { USDC_DEV_PUBKEY, USDC_PUBKEY } from '../config/pubkeys.config';
import { getAssociatedTokenAddress } from '@solana/spl-token';
import { SolTransaction, TokenInformation } from '../helpers/solana';
import BigNumber from 'bignumber.js';
const router: Router = Router();
const solTransaction: SolTransaction = new SolTransaction();

router.get('/send', async (req: any, res) => {
    try {
        const { amount, id, debug } = req.query;
        res.send({ amount, id, debug });
    } catch (e: any) {
        res.send(Result.err(500, e.message || String(e)));
    }
});
router.get('/pay', async (req: any, res) => {
    try {
        let { amount, id, debug, payCurrency } = req.query;
        payCurrency = payCurrency || 'SOL';

        // Build the payment transaction
        const sender = new PublicKey(SOLANA_ENV.SOLANA_PALTFORM_ACCOUNT);
        const receiver = new PublicKey(SOLANA_ENV.SOLANA_PALTFORM_ACCOUNT);
        const quantity = Number(amount);
        const feePayer = Keypair.fromSecretKey(bs58.decode(SOLANA_ENV.SOLANA_FEEPAYER_PRIVATE_KEY));

        let transaction: Transaction;
        if (payCurrency === 'USDC') {
            // Pay by USDC
            let usdcPubkey = USDC_DEV_PUBKEY;
            if (SOLANA_ENV.SOLANA_NET == 'MAINNET') {
                usdcPubkey = USDC_PUBKEY;
            }
            const receiverAta = await getAssociatedTokenAddress(usdcPubkey, receiver);
            const token = new TokenInformation('USDC', usdcPubkey, 6);
            transaction = await solTransaction.buildTransferTokenTransaction(sender, receiver, receiverAta, token, BigInt(new BigNumber(quantity).shiftedBy(6).toFixed()), true, feePayer.publicKey);
        } else {
            // Pay by SOL
            transaction = await solTransaction.buildTransferSolTransaction(sender, receiver, BigInt(new BigNumber(quantity).shiftedBy(9).toFixed()), feePayer.publicKey);
        }

        // Serialize and deserialize the transaction. This ensures consistent ordering of the account keys for signing.
        transaction = Transaction.from(
            transaction.serialize({
                verifySignatures: false,
                requireAllSignatures: false,
            })
        );

        // Generate signature
        transaction.partialSign(feePayer);

        // Serialize and return
        const base = transaction.serialize({ requireAllSignatures: false, verifySignatures: false }).toString('base64');
        // res.send({ amount, id, debug });
        return { transaction: base, message: 'Tranasction created successfully' };
    } catch (e: any) {
        res.send(Result.err(500, e.message || String(e)));
    }
});

export default router;
