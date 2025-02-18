import { test, expect } from '@playwright/test';
import ApiHelper from '../../src/api/ApiHelper';

test.describe('Switching Between Mainnet and Devnet', () => {
  test('should return identical responses for mainnet after switching to devnet and back', async ({ request }) => {
    // First Request (Mainnet)
    const mainnetTokens1 = await ApiHelper.getTokens(request);
    
    // Second Request (Devnet)
    const devnetTokens = await ApiHelper.getTokens(request, 'devnet');
    expect(devnetTokens.length).toBeGreaterThan(mainnetTokens1.length);

    // Third Request (Back to Mainnet)
    const mainnetTokens2 = await ApiHelper.getTokens(request);
    expect(mainnetTokens2.length).toBe(mainnetTokens1.length);

    // Compare token details
    mainnetTokens1.forEach((token, index) => {
      expect(token.mint).toBe(mainnetTokens2[index].mint);
      expect(token.totalUiAmount).toBe(mainnetTokens2[index].totalUiAmount);
    });
  });
});