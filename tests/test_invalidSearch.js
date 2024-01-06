import { Builder, By, Key, until } from 'selenium-webdriver';
import { expect } from 'chai';
import { describe, it } from 'mocha';

describe('No Results Search Test', function() {
    this.timeout(30000);

    let driver;

    before(async function() {
        driver = await new Builder().forBrowser('chrome').build();
    });

    after(async function() {
        await driver.quit();
    });

    it('should search for "12345" and expect a no results message', async function() {
        await driver.get("http://localhost:3000/");

        const searchInput = await driver.findElement(By.css("input[name='q']"));
        await searchInput.sendKeys("12345", Key.RETURN);

        const alertMessage = await driver.wait(until.elementLocated(By.css(".MuiAlert-message")), 10000);
        const messageText = await alertMessage.getText();
        
        expect(messageText).to.include('No products with the keyword "12345"');
    });
});
