import { Page } from '@playwright/test';

class WalletManagementPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /** Locators **/
   get addWalletPlusBtn() {
    return this.page.locator('//div[@data-id="page-title"]/following-sibling::button[1]');
  }

   get manageRecoveryPhraseBtn() {
    return this.page.locator('//span[text()="Manage recovery phrase"]');
  }

   get toggleButtons() {
    return this.page.locator('button[role="switch"]');
  }

   get saveBtn() {
    return this.page.locator('//button[contains(@class, "btn-primary")]//span[text()="Save"]');
  }

   get myWalletText() {
    return this.page.locator('//span[@class="_9rd95r0"][normalize-space()="Main Wallet"]');
  }

  get allWallets() {
    return this.page.locator('div.rm91y30 div.wctcrs1'); // More specific selector
  }

  /** Method to Get a specific toggle button by index **/
  toggleButtonByIndex(index: number) {
    return this.toggleButtons.nth(index);
  }

  /** Method for Click a specific toggle button **/
  async clickToggleButton(index: number) {
    const button = this.toggleButtonByIndex(index);
    await button.waitFor({ state: 'visible' });
    await button.click();
  }

  /** Method to Get the state of a toggle button (checked or unchecked) **/
  async getToggleState(index: number) {
    const button = this.toggleButtonByIndex(index);
    return await button.getAttribute('data-state');
  }
}

export default WalletManagementPage;