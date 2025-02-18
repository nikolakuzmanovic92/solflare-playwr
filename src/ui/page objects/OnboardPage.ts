import { Page } from '@playwright/test';

class OnboardPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /** Locators **/
   get newWalletBtn() {
    return this.page.locator('button[data-id="i_need_a_wallet_button"]');
  }

  /** Method for click on 'I need a Wallet button' opens Recovery phrase page **/
  async createNewWallet() {
    await this.newWalletBtn.click();
  }
}

export default OnboardPage;