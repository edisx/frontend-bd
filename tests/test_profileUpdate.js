import { Builder, By, Key, until } from "selenium-webdriver";
import { expect } from "chai";
import { describe, it } from "mocha";

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

describe("User Registration and Profile Update Test", function () {
  this.timeout(60000);

  let driver;

  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
  });

  after(async function () {
    await driver.quit();
  });

  it("should register a user, update email and password in profile, and check change", async function () {
    await driver.get("http://localhost:3000/register");
    const randomNum = getRandomInt(10000000);
    const email = `user${randomNum}@gmail.com`;
    const newPassword = `TestPass${randomNum}`;
    await driver.findElement(By.id("name")).sendKeys(`TestUser${randomNum}`);
    await driver.findElement(By.id("email")).sendKeys(email);
    await driver.findElement(By.id("password")).sendKeys(newPassword);
    await driver.findElement(By.css(".MuiButton-containedPrimary")).click();
    await driver.sleep(5000);

    await driver.get("http://localhost:3000/profile");
    await driver.sleep(5000);

    const newEmail = `updatedUser${randomNum}@gmail.com`;
    const emailInput = await driver.findElement(By.css("input[type='email']"));
    await emailInput.click();
    await emailInput.sendKeys(Key.CONTROL + "a");
    await emailInput.sendKeys(Key.DELETE);
    await emailInput.sendKeys(newEmail);

    const newPasswordInput = await driver.findElement(
      By.css("input[placeholder='Enter new password']")
    );
    await newPasswordInput.sendKeys(newPassword);

    const confirmPasswordInput = await driver.findElement(
      By.css("input[placeholder='Confirm new password']")
    );
    await confirmPasswordInput.sendKeys(newPassword);

    await driver.findElement(By.css(".MuiButton-containedPrimary")).click();
    await driver.sleep(5000);
    await driver.navigate().refresh();

    await driver.sleep(5000);

    const updatedEmailElement = await driver.findElement(
      By.css("span.block.px-4.py-2")
    );
    const updatedEmailText = await updatedEmailElement.getText();
    expect(updatedEmailText).to.equal(newEmail);
  });
});
