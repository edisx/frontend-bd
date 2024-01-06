import { Builder, By, Key, until } from 'selenium-webdriver';
import { expect } from 'chai';
import { describe, it } from 'mocha';

describe('Customize Product Test', function() {
    this.timeout(30000);

    let driver;

    before(async function() {
        driver = await new Builder().forBrowser('chrome').build();
    });

    after(async function() {
        await driver.quit();
    });

    it('should navigate to customize page, check local storage, select a color, and recheck local storage', async function() {
        await driver.get("http://localhost:3000/product/customize/18");

        let initialColors = await driver.executeScript("return window.localStorage.getItem('colors');");
        initialColors = JSON.parse(initialColors);
        expect(initialColors).to.be.an('array').that.is.empty;

        const colorOption = await driver.wait(until.elementLocated(By.css("div.w-16.h-16.rounded-full.shadow-lg[style='background-color: rgb(192, 192, 192);']")), 10000);
        await colorOption.click();

        await driver.sleep(3000); 

        let updatedColors = await driver.executeScript("return window.localStorage.getItem('colors');");
        updatedColors = JSON.parse(updatedColors);
        expect(updatedColors).to.be.an('array').that.is.not.empty;

    });
});
