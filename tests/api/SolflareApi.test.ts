import { test, expect } from '@playwright/test';
import ApiHelper from '../../src/api/ApiHelper';

test.describe('Devnet Token Validation', () => {
  test('should return multiple tokens with valid properties for devnet', async ({ request }) => {
    const tokens = await ApiHelper.getTokens(request, 'devnet');
    
    expect(tokens.length).toBeGreaterThan(1);

    tokens.forEach(token => {
      expect(typeof token.mint).toBe('string');
      expect(token.mint.length).toBeGreaterThanOrEqual(1);
      expect(typeof token.totalUiAmount).toBe('number');
      expect(token.totalUiAmount).toBeGreaterThanOrEqual(0);

      if (token.price) {
        expect(typeof token.price).toBe('object');
        expect(token.price).toHaveProperty('currency');
        expect(token.price).toHaveProperty('usdPrice');
      }
    });
  });

  test('should return only the SOL token when no network is specified', async ({ request }) => {
    const tokens = await ApiHelper.getTokens(request);
    
    expect(tokens).toHaveLength(1);
    const solToken = tokens[0];

    expect(solToken.name).toBe('Solana');
    expect(solToken.symbol).toBe('SOL');
    expect(solToken.mint).toBe('11111111111111111111111111111111');
    expect(solToken.totalUiAmount).toBeGreaterThanOrEqual(0);

    if (solToken.price) {
      expect(typeof solToken.price).toBe('object');
      expect(solToken.price).toHaveProperty('currency');
      expect(typeof solToken.price.usdPrice).toBe('number');
    }
  });

  test('should return a 400 or 404 error for an invalid address', async ({ request }) => {
    const response = await ApiHelper.getTokensWithInvalidAddress(request);
    
    expect([400, 404]).toContain(response.status());
    
    const errorBody = await response.json();
    expect(errorBody).toHaveProperty('message');
    expect(typeof errorBody.message).toBe('string');
    expect(errorBody.message.length).toBeGreaterThanOrEqual(1);
  });
});