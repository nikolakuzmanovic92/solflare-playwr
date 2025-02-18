import { Page } from '@playwright/test';
import config from '../../../tests/config/config';

class WelcomePage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /** Locators **/
   get accessWalletBtn() {
    return this.page.locator('a[href="/access"]');
  }

  /** Method for Opening of Welcome page of Solflare **/
  async open() {
    await this.page.goto(config.HOME_PAGE_URL);
  }

  /** Method to open Access wallet test page **/
  async navigateToAccessWallet() {
    await this.accessWalletBtn.click();
  }
}

export default WelcomePage;