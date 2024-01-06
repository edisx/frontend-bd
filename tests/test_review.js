import { Builder, By, Key, until } from 'selenium-webdriver';
import { expect } from 'chai';
import { describe, it } from 'mocha';

describe('Submit Review Test', function() {
    this.timeout(50000);

    let driver;

    before(async function() {
        driver = await new Builder().forBrowser('chrome').build();
    });

    after(async function() {
        await driver.quit();
    });

    it('should log in, navigate to a product, rate, write a review, submit, and check for the review', async function() {
        await driver.get("http://localhost:3000/login");
        await driver.findElement(By.id("email")).sendKeys("user8@gmail.com");
        await driver.findElement(By.id("password")).sendKeys("user8");
        await driver.findElement(By.css(".MuiButton-containedPrimary")).click();
        await driver.wait(until.urlContains('/'), 10000);

        await driver.get("http://localhost:3000/product/18");

        await driver.findElement(By.css("svg.cursor-pointer.text-yellow-400")).click();

        await driver.findElement(By.id("comment")).sendKeys("good test");

        await driver.findElement(By.css(".MuiButton-containedPrimary")).click();

        await driver.sleep(5000);

        let reviewExists = await driver.findElements(By.xpath("//*[contains(text(), 'good test')]"));
        expect(reviewExists.length).to.be.greaterThan(0);
    });
});
