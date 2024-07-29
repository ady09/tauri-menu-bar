const os = require('os');
const path = require('path');
const { expect } = require('chai');
const { spawn, spawnSync } = require('child_process');
const { Builder, By, Capabilities } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const application = '../src-tauri/target/release/menu-bar-app';

let driver;


let tauriDriver;

before(async function () {
  this.timeout(120000);
  try {
    console.log('Building Tauri application...');
    spawnSync('cargo', ['build', '--release'], { stdio: 'inherit' });

    console.log('Starting Tauri driver...');
    tauriDriver = spawn(
      path.resolve(os.homedir(), '.cargo', 'bin', 'tauri-driver'),
      [],
      { stdio: [null, process.stdout, process.stderr] }
    );

    const chromeOptions = new chrome.Options();
    chromeOptions.setChromeBinaryPath(application); 
    chromeOptions.addArguments('--start-maximized');
    chromeOptions.addArguments('--remote-debugging-port=9222'); 
    const capabilities = Capabilities.chrome();
    capabilities.set('goog:chromeOptions', {
      binary: application,
      args: ['--remote-debugging-port=9222', 'start-maximized']
    });

    console.log('Starting WebDriver client...');
    driver = await new Builder()
      .forBrowser('chrome')
      .withCapabilities(capabilities)
      .usingServer('http://localhost:4444/')
      .build();

    console.log('WebDriver client started successfully.');
  } catch (error) {
    console.error('Failed to initialize WebDriver or Tauri driver:', error);
    throw error;
  }
});

after(async function () {
  if (driver) {
    await driver.quit();
  }
  if (tauriDriver) {
    tauriDriver.kill();
  }
});

describe('Hello Tauri', function () {
  this.timeout(60000);

  it('should be cordial', async function () {
    const text = await driver.findElement(By.css('body > h1')).getText();
    expect(text).to.match(/^[hH]ello/);
  });

  it('should be excited', async function () {
    const text = await driver.findElement(By.css('body > h1')).getText();
    expect(text).to.match(/!$/);
  });

  it('should be easy on the eyes', async function () {
    const text = await driver
      .findElement(By.css('body'))
      .getCssValue('background-color');

    const rgb = text.match(/^rgb\((?<r>\d+), (?<g>\d+), (?<b>\d+)\)$/).groups;
    expect(rgb).to.have.all.keys('r', 'g', 'b');

    const luma = 0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b;
    expect(luma).to.be.lessThan(100);
  });
});

