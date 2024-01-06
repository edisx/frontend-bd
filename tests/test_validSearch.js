import { Builder, By, Key, until } from 'selenium-webdriver';
import { expect } from 'chai';
import { describe, it } from 'mocha';

describe('Search Functionality Test', function() {
    this.timeout(30000);

    let driver;

    before(async function() {
        driver = await new Builder().forBrowser('chrome').build();
    });

    after(async function() {
        await driver.quit();
    });

    it('should search for a term and check the number of product cards', async function() {
        await driver.get("http://localhost:3000/");

        const searchInput = await driver.findElement(By.css("input[name='q']"));
        await searchInput.sendKeys("run", Key.RETURN); 

        await driver.wait(until.elementLocated(By.css("div.grid")), 10000);

        const productCards = await driver.findElements(By.css("div.grid > div"));
        expect(productCards.length).to.equal(2); 
    });
});
