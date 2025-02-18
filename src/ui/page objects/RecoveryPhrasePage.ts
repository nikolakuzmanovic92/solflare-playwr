import { Page } from '@playwright/test';

class RecoveryPhrasePage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /** Locators **/
   get savedPhraseBtn() {
    return this.page.locator('button', { hasText: 'I saved my recovery phrase' });
  }

   get continueBtn() {
    return this.page.locator('button[data-id="continue_button"]');
  }

  /** Method to read recovery phrase **/
  async getRecoveryPhrase() {
    const wordsMap: Map<number, string> = new Map();

    // Iterate through each input element using its ID
    for (let i = 1; i <= 12; i++) {
      const inputElement = this.page.locator(`#mnemonic-input-${i}`);
      const word = await inputElement.inputValue();
      wordsMap.set(i, word); // Use the index as the key
    }
    return wordsMap;
  }

  /** Method to write recovery phrase in required fields **/
  async writeRecoveryPhrase(wordsMap: Map<number, string>) {
    // Iterate through each input element using its ID
    for (let i = 1; i <= 12; i++) {
      await this.page.locator(`#mnemonic-input-${i}`).fill(wordsMap.get(i) as string);
    }
  }

  /** Method to proceed after recovery phrase read **/
  async proceedAfterSaving() {
    await this.savedPhraseBtn.click();
  }

  /** Method to click on continue button after recovery verification leads to Password page **/
  async continueAfterPaste() {
    await this.continueBtn.click();
  }
}

export default RecoveryPhrasePage;