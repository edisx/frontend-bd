import { Builder, By, Key, until } from 'selenium-webdriver';
import { expect } from 'chai';
import { describe, it } from 'mocha';

describe('Duplicate User Registration Test', function() {
    this.timeout(50000);

    let driver;

    before(async function() {
        driver = await new Builder().forBrowser('chrome').build();
    });

    after(async function() {
        await driver.quit();
    });

    it('should attempt to register with an existing email and check for error message', async function() {
        await driver.get("http://localhost:3000/register");

        const email = "user@gmail.com";
        const password = "TestPassword123";

        await driver.findElement(By.id("name")).sendKeys("TestUser");
        await driver.findElement(By.id("email")).sendKeys(email);
        await driver.findElement(By.id("password")).sendKeys(password);
        await driver.findElement(By.css(".MuiButton-containedPrimary")).click();

        let errorMessage = await driver.wait(until.elementLocated(By.css('.MuiAlert-message')), 10000).getText();
        expect(errorMessage).to.include("User with this email already exists");
    });
});
