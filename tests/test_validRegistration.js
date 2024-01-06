import { Builder, By, Key, until } from 'selenium-webdriver';
import { expect } from 'chai';
import { describe, it } from 'mocha';

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

describe('User Registration Test', function() {
    this.timeout(50000);

    let driver;

    before(async function() {
        driver = await new Builder().forBrowser('chrome').build();
    });

    after(async function() {
        await driver.quit();
    });

    it('should register a user and check local storage for userInfo', async function() {
        await driver.get("http://localhost:3000/register");

        const randomNum = getRandomInt(10000000);
        const email = `user${randomNum}@gmail.com`;
        const password = `TestPass${randomNum}`;
        await driver.findElement(By.id("name")).sendKeys(`TestUser${randomNum}`);
        await driver.findElement(By.id("email")).sendKeys(email);
        await driver.findElement(By.id("password")).sendKeys(password);
        await driver.findElement(By.css(".MuiButton-containedPrimary")).click();

        await driver.sleep(5000); 

        let userInfo = await driver.executeScript("return window.localStorage.getItem('userInfo');");
        expect(userInfo).to.not.be.null;
        expect(userInfo).to.be.a('string');
    });
});
