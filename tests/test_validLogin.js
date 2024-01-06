import { Builder, By, until } from 'selenium-webdriver';
import { expect } from 'chai';
import { describe, it } from 'mocha';

describe('Valid Login Test', function() {
    this.timeout(30000);

    let driver;

    before(async function() {
        driver = await new Builder().forBrowser('chrome').build();
    });

    after(async function() {
        await driver.quit();
    });

    it('should log in successfully and store userInfo in local storage', async function() {
        await driver.get("http://localhost:3000/login");
        await driver.findElement(By.id("email")).sendKeys("user8@gmail.com"); 
        await driver.findElement(By.id("password")).sendKeys("user8");
        await driver.findElement(By.css(".MuiButton-containedPrimary")).click();

        await driver.sleep(5000); 

        let userInfo = await driver.executeScript("return window.localStorage.getItem('userInfo');");
        expect(userInfo).to.not.be.null;
        expect(userInfo).to.be.a('string');
    });
});
