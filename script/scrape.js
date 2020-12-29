// Import the playwright library into our scraper.
const playwright = require('playwright');

const recipesSelector =
  '#content > div > div > div > section.has_ae_slider.elementor-section.elementor-top-section.elementor-element.elementor-element-e8d7b59.elementor-section-boxed.elementor-section-height-default.elementor-section-height-default.ae-bg-gallery-type-default > div > div > div > div > div > div.elementor-element.elementor-element-db2e8b3.ae-post-layout-grid.elementor-widget.elementor-widget-ae-post-blocks > div > div.ae-post-widget-wrapper.ae-ias-load-with-button-.ae-ias-yes.ae-masonry-.ae-hpos-.ae-vpos-.no-ajax';

async function main() {
  const browser = await playwright.chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://brinkenbakar.se/recept/desserter/');

  await page.waitForSelector(recipesSelector, { state: 'attached' });
  await page.evaluate(() => window.scrollTo(0, 10000000));
  await page.waitForTimeout(2000);
  const recipesContainer = await page.$(recipesSelector);
  const items = await recipesContainer.$$('.elementor-widget-wrap');
  const all = [];
  for (const item of items) {
    const title = await item.innerText('h1');
    const image = await item.$('img');
    const imageUrl = await image.getAttribute('src');
    const anchor = await item.$('a');
    const url = await anchor.getAttribute('href');
    all.push(title, imageUrl, url);
  }
  console.log(all);
  await browser.close();
}

main();
