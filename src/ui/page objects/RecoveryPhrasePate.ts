import { Page } from '@playwright/test';

export default class RecoveryPhrasePage {
   async getRecoveryPhrase(page: Page): Promise<string> {
    const recoveryPhrase = await page.locator('.recovery-phrase').innerText();
    return recoveryPhrase;
  }

   async proceedAfterSaving(page: Page) {
    await page.locator('button:text("I’ve saved it")').click();
  }

   async writeRecoveryPhrase(page: Page, recoveryPhrase: string) {
    await page.locator('.recovery-phrase-input').fill(recoveryPhrase);
  }

   async continueAfterPaste(page: Page) {
    await page.locator('button:text("Continue")').click();
  }
}