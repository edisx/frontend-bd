import { Builder, By, until } from 'selenium-webdriver';
import { expect } from 'chai';
import { describe, it } from 'mocha';

describe('Invalid Login Test', function() {
    this.timeout(30000);

    let driver;

    before(async function() {
        driver = await new Builder().forBrowser('chrome').build();
    });

    after(async function() {
        await driver.quit();
    });

    it('should display an error message for invalid credentials', async function() {
        await driver.get("http://localhost:3000/login");
        await driver.findElement(By.id("email")).sendKeys("user8@gmail.com");
        await driver.findElement(By.id("password")).sendKeys("user8123");
        await driver.findElement(By.css(".MuiButton-containedPrimary")).click();

        const errorMessage = await driver.wait(until.elementLocated(By.css('.MuiAlert-message')), 40000).getText();
        expect(errorMessage).to.include("No active account found with the given credentials");
    });
});



