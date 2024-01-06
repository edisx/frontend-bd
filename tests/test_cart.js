import { Builder, By, Key, until } from 'selenium-webdriver';
import { expect } from 'chai';
import { describe, it } from 'mocha';

describe('Add to Cart and Remove Item Test', function() {
    this.timeout(40000);

    let driver;

    before(async function() {
        driver = await new Builder().forBrowser('chrome').build();
    });

    after(async function() {
        await driver.quit();
    });

    it('should log in, select a shoe size, add to cart, remove item, and check cart in local storage', async function() {
        await driver.get("http://localhost:3000/login");
        await driver.findElement(By.id("email")).sendKeys("user8@gmail.com");
        await driver.findElement(By.id("password")).sendKeys("user8");
        await driver.findElement(By.css(".MuiButton-containedPrimary")).click();
        await driver.sleep(5000);

        await driver.wait(until.urlContains('/'), 10000); 

        await driver.get("http://localhost:3000/product/18");

        const selectSize = await driver.wait(until.elementLocated(By.id("size")), 10000);
        await selectSize.click();
        await driver.wait(until.elementIsVisible(selectSize.findElement(By.css("option[value='{\"id\":3,\"size\":38}']"))), 10000).click(); 

        await driver.findElement(By.css(".MuiButton-containedPrimary")).click();
        await driver.sleep(5000);


        await driver.findElement(By.css(".MuiButton-outlinedError")).click();
        await driver.sleep(5000); 

        let cart = await driver.executeScript("return window.localStorage.getItem('cart');");
        cart = JSON.parse(cart); 

        expect(cart).to.not.be.null;
        expect(cart.cartItems).to.be.an('array').that.is.empty;
    });
});
