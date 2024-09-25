// const { expect } = require('chai');

// describe('Window Management', () => {
//   it('should open a new window when "Open Secondary" is clicked', async () => {
//     // Open the page
//     await browser.url('http://yourwebsite.com'); // Replace with your URL

//     // Get the initial window handle
//     const initialWindowHandle = await browser.getWindowHandle();

//     // Click the button to open a new window
//     const openSecondaryButton = await $('button#open-secondary'); // Replace with the correct selector for the button
//     await openSecondaryButton.click();

//     // Wait for the new window to open
//     await browser.waitUntil(async () => {
//       const handles = await browser.getWindowHandles();
//       return handles.length > 1;
//     }, {
//       timeout: 5000, // Adjust as necessary
//       timeoutMsg: 'Expected new window to be opened'
//     });

//     // Get all window handles and switch to the new one
//     const windowHandles = await browser.getWindowHandles();
//     const newWindowHandle = windowHandles.find(handle => handle !== initialWindowHandle);
//     await browser.switchToWindow(newWindowHandle);

//     // Perform actions or assertions in the new window
//     const newWindowTitle = await browser.getTitle();
//     expect(newWindowTitle).to.include('Expected Title'); // Replace with an expected title or other assertions

//     // Optionally, switch back to the original window
//     await browser.switchToWindow(initialWindowHandle);
//   });
// });

const { expect } = require('chai');

describe('Window Management', () => {
  it('should open a new window when "Open Secondary" is clicked', async () => {
    // Open the page
    await browser.url('http://yourwebsite.com'); // Replace with your URL

    // Get the initial window handle
    const initialWindowHandle = await browser.getWindowHandle();

    // Click the button to open a new window
    const openSecondaryButton = await $('button#open-secondary'); // Replace with the correct selector for the button
    await openSecondaryButton.click();

    // Wait for the new window to open
    await browser.waitUntil(async () => {
      const handles = await browser.getWindowHandles();
      return handles.length > 1;
    }, {
      timeout: 5000, // Adjust as necessary
      timeoutMsg: 'Expected new window to be opened'
    });

    // Get all window handles and switch to the new one
    const windowHandles = await browser.getWindowHandles();
    const newWindowHandle = windowHandles.find(handle => handle !== initialWindowHandle);
    await browser.switchToWindow(newWindowHandle);

    // Perform actions or assertions in the new window
    const newWindowTitle = await browser.getTitle();
    expect(newWindowTitle).to.include('Expected Title'); // Replace with an expected title or other assertions

    // Optionally, switch back to the original window
    await browser.switchToWindow(initialWindowHandle);
  });
});
