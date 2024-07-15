import { getMint } from '@solana/spl-token';
import * as web3 from '@solana/web3.js';
import { USDC_PUBKEY, WSOL_PUBKEY } from '../../config/pubkeys.config';

export class TokenInformation {
  readonly alias: string;
  readonly pubkey: web3.PublicKey;
  readonly decimals: number;

  constructor(alias: string, pubkey: web3.PublicKey, decimals: number) {
    this.alias = alias;
    this.pubkey = pubkey;
    this.decimals = decimals;
  }

  convertSizeToQuantity(size: number): number {
    const decimalMultiplier = 10 ** this.decimals;
    const tokenQuantity = size * decimalMultiplier;
    return Math.floor(tokenQuantity);
  }

  convertQuantityToSize(quantity: number): number {
    const decimalMultiplier = 10 ** this.decimals;
    const tokenSize = quantity / decimalMultiplier;
    return tokenSize;
  }

  static async queryTokenInformationFromPubkey(pubkey: web3.PublicKey, connection: web3.Connection): Promise<TokenInformation> {
    try {
      const mint = await getMint(connection, pubkey, 'confirmed');
      return new TokenInformation(mint.address.toBase58(), mint.address, mint.decimals);
    } catch {
      throw new Error('Token does not exist.');
    }
  }
}

export class TokenRegistry {
  static isTokenAlias = (name: string) => {
    const token = this.allTokens.find((token) => {
      return token.alias == name;
    });

    return token != undefined;
  };

  static getTokenFromAlias = (input: string): TokenInformation | undefined => {
    return TokenRegistry.allTokens.find((token) => {
      return token.alias == input;
    });
  };

  static getTokenFromPubkey = (input: web3.PublicKey): TokenInformation | undefined => {
    return TokenRegistry.allTokens.find((token) => {
      return token.pubkey == input;
    });
  };

  static getTokenFromPubkeyString = (input: string): TokenInformation | undefined => {
    return TokenRegistry.allTokens.find((token) => {
      return token.pubkey.toBase58() == input;
    });
  };

  static queryTokenInformation = async (input: string, connection: web3.Connection | undefined): Promise<TokenInformation | undefined> => {
    if (connection != undefined) {
      return await TokenInformation.queryTokenInformationFromPubkey(new web3.PublicKey(input), connection);
    }
  };

  static allTokens: TokenInformation[] = [
    new TokenInformation('usdc', USDC_PUBKEY, 6), //
    new TokenInformation('sol', WSOL_PUBKEY, 9),
  ];
}
