import { test, expect } from '@playwright/test';
import WelcomePage from '../../src/ui/page objects/WelcomePage'
import HomePage from '../../src/ui/page objects/HomePage'
import OnboardPage from '../../src/ui/page objects/OnboardPage';
import PasswordPage from '../../src/ui/page objects/PasswordPage';
import RecoveryPhrasePage from '../../src/ui/page objects/RecoveryPhrasePage';
import WalletCreationSuccessPage from '../../src/ui/page objects/WalletCreationSuccessPage';
import WalletManagementPage from '../../src/ui/page objects/WalletManagementPage';

test.describe('Solflare Wallet Tests', () => {
  test('should complete end-to-end wallet creation and management', async ({ page }) => {
    const welcomePage = new WelcomePage(page);
    const onboardPage = new OnboardPage(page);
    const recoveryPhrasePage = new RecoveryPhrasePage(page);
    const passwordPage = new PasswordPage(page);
    const walletCreationSuccessPage = new WalletCreationSuccessPage(page);
    const homePage = new HomePage(page);
    const walletManagementPage = new WalletManagementPage(page);

    // Open Welcome Page
    await welcomePage.open();
    await welcomePage.navigateToAccessWallet();

    // Start wallet creation
    await onboardPage.createNewWallet();

    // Recovery phrase memorize and repetition
    const recoveryPhrase = await recoveryPhrasePage.getRecoveryPhrase();
    await recoveryPhrasePage.proceedAfterSaving();
    await recoveryPhrasePage.writeRecoveryPhrase(recoveryPhrase);
    await recoveryPhrasePage.continueAfterPaste();

    // Password setup
    const password = await passwordPage.generatePassword();
    await passwordPage.enterPassword(password);
    await passwordPage.continueAfterPaste();
    await walletCreationSuccessPage.clickEnterSolanaButton();

    // Navigation to Wallet management
    await homePage.openWalletManagement();
    await expect(walletManagementPage.myWalletText).toBeVisible();
    await walletManagementPage.addWalletPlusBtn.waitFor({ state: 'visible' });
    await walletManagementPage.addWalletPlusBtn.click();

    // Adding new wallets
    await walletManagementPage.manageRecoveryPhraseBtn.click();
    await expect(walletManagementPage.toggleButtonByIndex(0)).toBeDisabled();
    expect(await walletManagementPage.getToggleState(0)).toBe('checked');
    await walletManagementPage.clickToggleButton(2);
    await walletManagementPage.clickToggleButton(3);
    await walletManagementPage.saveBtn.click();

    // Validate new wallets added
    await expect(walletManagementPage.allWallets).toHaveCount(3);
  });
});