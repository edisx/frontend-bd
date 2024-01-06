import { Builder, By, Key, until } from "selenium-webdriver";
import { expect } from "chai";
import { describe, it } from "mocha";

describe("Add Item to Cart Test", function () {
  this.timeout(40000);

  let driver;

  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
  });

  after(async function () {
    await driver.quit();
  });

  it("should log in and add an item to the cart", async function () {
    await driver.get("http://localhost:3000/login");
    await driver.findElement(By.id("email")).sendKeys("user8@gmail.com");
    await driver.findElement(By.id("password")).sendKeys("user8");
    await driver.findElement(By.css(".MuiButton-containedPrimary")).click();
    await driver.sleep(5000);

    await driver.wait(until.urlContains("/"), 10000);

    await driver.get("http://localhost:3000/product/18");

    const selectSize = await driver.wait(
      until.elementLocated(By.id("size")),
      10000
    );
    await selectSize.click();
    await driver
      .wait(
        until.elementIsVisible(
          selectSize.findElement(By.css('option[value=\'{"id":3,"size":38}\']'))
        ),
        10000
      )
      .click();

    await driver.findElement(By.css(".MuiButton-containedPrimary")).click();

    await driver.sleep(5000);
    await driver.findElement(By.css(".MuiButton-containedPrimary")).click();
    await driver.sleep(2000); 

    await driver
      .findElement(By.css("input[placeholder='Enter address']"))
      .sendKeys("123 Test Street");
    await driver
      .findElement(By.css("input[placeholder='Enter city']"))
      .sendKeys("Test City");
    await driver
      .findElement(By.css("input[placeholder='Enter postal code']"))
      .sendKeys("12345");
    await driver
      .findElement(By.css("input[placeholder='Enter country']"))
      .sendKeys("Test Country");

    await driver.findElement(By.css("button[type='submit']")).click();

    await driver.sleep(2000);

    await driver.findElement(By.css("button[type='submit']")).click();

    await driver.sleep(2000);

    await driver.findElement(By.css("button[type='submit']")).click();

    await driver.sleep(5000);

    const paypalComponent = await driver.findElement(
      By.css('[data-funding-source="paypal"]')
    );

    const isPaypalComponentExists = await paypalComponent.isDisplayed();

    expect(isPaypalComponentExists).to.equal(true);
  });
});
