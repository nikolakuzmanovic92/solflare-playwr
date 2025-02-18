import { APIRequestContext } from '@playwright/test';
import config from '../../tests/config/config';

interface Token {
  name: string | null;
  symbol: string | null;
  decimals: number;
  mint: string;
  imageUri: string;
  accounts: any[];
  coingeckoId: string | null;
  verified: boolean;
  totalUiAmount: number;
  standard: string;
  price?: any;
  solPrice?: any;
  swappable?: boolean;
  isLimitOrderable?: boolean;
  onrampTokenId?: string;
  offrampTokenId?: string;
  actions: any[];
}

export default class ApiHelper {
  static async getTokens(request: APIRequestContext, network?: string): Promise<Token[]> {
    const url = network
      ? `${config.BASE_URL}/${config.ADDRESS}?network=${network}`
      : `${config.BASE_URL}/${config.ADDRESS}`;
    
    const response = await request.get(url, {
      headers: { Authorization: config.AUTH_TOKEN }
    });
    const body = await response.json();
    return body.tokens;
  }

  static async getTokensWithInvalidAddress(request: APIRequestContext) {
    return request.get(`${config.BASE_URL}/invalid-address`, {
      headers: { Authorization: config.AUTH_TOKEN }
    });
  }
}