import { Page } from '@playwright/test';

class WalletCreationSuccessPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /** Locators **/
   get enterSolanaButton() {
    return this.page.locator('button', { hasText: 'Enter Solana' });
  }

  /** Method to click the "Enter Solana" button **/
  async clickEnterSolanaButton() {
    await this.enterSolanaButton.click();
  }
}

export default WalletCreationSuccessPage;