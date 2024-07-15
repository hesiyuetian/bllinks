import express, { Express } from 'express';
import { APP_ENV } from './constants';
import fileUpload from 'express-fileupload';

const app: Express = express();
const port = APP_ENV.PORT;
app.use(express.urlencoded({ extended: false, limit: '100mb' }));
app.use(express.json({ limit: '100mb' }));
app.use(fileUpload({ createParentPath: true }));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE');
    res.header('Access-Control-Allow-Origin', `${req.headers.origin || '*'}`);
    res.header('Access-Control-Allow-Headers', 'Authorization,Content-Type,Accept-Encoding');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.setTimeout(100000000, () => {
        res.status(408);
    });
    req.method === 'OPTIONS' ? res.status(204).end() : next();
});

import ActionsRouters from './routers/actions';
import TransactionRouters from './routers/transaction';

app.use('/api/actions', ActionsRouters);
app.use('/api/transaction', TransactionRouters);

app.listen(port, async () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
