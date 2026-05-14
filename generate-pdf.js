const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const htmlPath = 'file:///' + path.resolve(__dirname, 'resume.html').replace(/\\/g, '/');
  await page.goto(htmlPath, { waitUntil: 'networkidle0', timeout: 30000 });
  await page.pdf({
    path: path.join(__dirname, 'images', '徐艺锦简历.pdf'),
    format: 'A4',
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
    printBackground: true,
    preferCSSPageSize: true,
  });
  await browser.close();
  console.log('Done: images/徐艺锦简历.pdf');
})().catch(err => { console.error('Error:', err.message); process.exit(1); });
