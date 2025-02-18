import { Page } from '@playwright/test';

class HomePage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /** Locators **/
   get walletManagementBtn() {
    return this.page.locator('button.MuiButtonBase-root.MuiIconButton-root').nth(1);
  }

  /** Method for Click on Avatar button opens Wallet management page **/
  async openWalletManagement() {
    await this.walletManagementBtn.waitFor({ state: 'visible' });
    await this.walletManagementBtn.click();
  }
}

export default HomePage;