import dotenv from 'dotenv';
dotenv.config();

export type APP_ENV_MONGODB_TYPE = {
    HOST: string;
    PORT: string;
    DB: string;
    USER: string;
    PASSWORD: string;
    SSLCA: string | undefined;
};

export type BNB_GREENFIELD_TYPE = {
    HOST: string;
    PORT: string;
    ENDPOINTS: string;
    ACCOUNT: string;
    PRIVATE_KEY: string;
};

export type ARWEAVE_TYPE = {
    PRIVATE_KEY: string;
    PROVIDER_URL: string;
    URL: string;
    TOKEN: string;
};

export type APP_ENV_TYPE = {
    PORT: string;
    MONGODB: APP_ENV_MONGODB_TYPE;
    BNB_GREENFIELD: BNB_GREENFIELD_TYPE;
    ARWEAVE: ARWEAVE_TYPE;
};

export const APP_ENV: APP_ENV_TYPE = {
    PORT: process.env.PORT + '',
    MONGODB: {
        HOST: process.env.MONGODB_HOST + '',
        PORT: process.env?.MONGODB_PORT ? process.env.MONGODB_PORT + '' : '27017',
        DB: process.env.MONGODB_DB + '',
        USER: process.env.MONGODB_USER + '',
        PASSWORD: process.env.MONGODB_PASSWORD + '',
        SSLCA: process.env?.MONGODB_SSLCA,
    },
    BNB_GREENFIELD: {
        HOST: process.env.BNBGREENFIEL_HOST + '',
        PORT: process.env.BNBGREENFIEL_PORT + '',
        ENDPOINTS: process.env.BNBGREENFIEL_ENDPOINT + '',
        ACCOUNT: process.env.BNBGREENFIELD_ACCOUNT_ADDRESS + '',
        PRIVATE_KEY: process.env.BNBGREENFIELD_ACCOUNT_PRIVATEKEY + '',
    },
    ARWEAVE: {
        URL: process.env.ARWEAVE_URL + '',
        TOKEN: process.env.ARWEAVE_TOKEN + '',
        PRIVATE_KEY: process.env.ARWEAVE_PRIVATE_KEY + '',
        PROVIDER_URL: process.env.ARWEAVE_PROVIDER_URL + '',
    },
};

export const AES_SECRET_KEY: string = process.env.AES_SECRET_KEY + '';

export const OPEN_AI_KEY: string = process.env.OPENAI_API_KEY + '';

export const MIDJOURNEY_PROXY_URL: string = process.env.MIDJOURNEY_PROXY_URL + '';

export enum MIDJOURNEY_MODE {
    FAST,
    RELAX,
}

export const SOLANA_ENV = {
    SOLANA_NET: process.env.SOLANA_NET + '',
    SOLANA_RPC_URL: process.env.SOLANA_RPC_URL + '',
    SOLANA_PALTFORM_ACCOUNT: process.env.SOLANA_PALTFORM_ACCOUNT + '',
    SOLANA_FEEPAYER_PRIVATE_KEY: process.env.SOLANA_FEEPAYER_PRIVATE_KEY + '',
};
