const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('requestfailed', request => console.log('REQUEST FAILED:', request.url(), request.failure().errorText));
  page.on('response', response => {
    if(!response.ok()) {
      console.log('RESPONSE NOT OK:', response.url(), response.status());
    }
  });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
  // wait a bit for any async fetching
  await new Promise(r => setTimeout(r, 2000));
  await browser.close();
})();
