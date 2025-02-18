import { Page } from '@playwright/test';

class PasswordPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /** Locators **/
   get passwordField() {
    return this.page.locator('input[name="password"]');
  }

   get repeatPasswordField() {
    return this.page.locator('input[name="password2"]');
  }

   get continueBtn() {
    return this.page.locator('button', { hasText: 'Continue' });
  }

  /** Method generates random password **/
  async generatePassword() {
    return Math.random().toString(36).slice(-8);
  }

  /** Method to enter the same password in both fields **/
  async enterPassword(password: string) {
    await this.passwordField.fill(password);
    await this.repeatPasswordField.fill(password);
  }

  /** Method for click on continue button leads to Success page **/
  async continueAfterPaste() {
    await this.continueBtn.click();
  }
}

export default PasswordPage;