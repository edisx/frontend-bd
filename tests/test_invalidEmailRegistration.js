import { Builder, By, Key, until } from 'selenium-webdriver';
import { expect } from 'chai';
import { describe, it } from 'mocha';

describe('Invalid Email Registration Test', function() {
    this.timeout(10000);

    let driver;

    before(async function() {
        driver = await new Builder().forBrowser('chrome').build();
    });

    after(async function() {
        await driver.quit();
    });

    it('should not proceed with registration with an invalid email format', async function() {
        await driver.get("http://localhost:3000/register");

        const invalidEmail = "usergmail.com"; 
        const password = "TestPassword123";

        await driver.findElement(By.id("name")).sendKeys("TestUser");
        await driver.findElement(By.id("email")).sendKeys(invalidEmail);
        await driver.findElement(By.id("password")).sendKeys(password);
        await driver.findElement(By.css(".MuiButton-containedPrimary")).click();

        await driver.sleep(4000);

        let userInfo = await driver.executeScript("return window.localStorage.getItem('userInfo');");
        expect(userInfo).to.be.null;
    });
});
