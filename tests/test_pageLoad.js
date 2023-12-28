import { Builder, By, until } from 'selenium-webdriver';
import { expect } from 'chai';
import { describe, it } from 'mocha';

describe('Homepage Load Test', function() {
    this.timeout(30000); // Set a timeout for the test, adjust as needed

    it('should find the ShoeShop element on the homepage', async function() {
        const driver = await new Builder().forBrowser('chrome').build();
        try {
            await driver.get("http://localhost:3000"); // Replace with your website URL

            const elementSelector = By.css('span.hidden.md\\:inline-block'); // CSS selector for the element
            await driver.wait(until.elementLocated(elementSelector), 4000);

            const elementText = await driver.findElement(elementSelector).getText();
            expect(elementText).to.equal('ShoeShop'); // Using Chai's expect for assertion

        } catch (error) {
            throw new Error(`Test failed: ${error}`);
        } finally {
            await driver.quit();
        }
    });
});
