var assert = require('assert');
var webdriver = require('selenium-webdriver');

describe('Search Wikipedia Functionality', () => {
  it('can find search results', async () => {
    var searchSelector = await webdriver($(`~Search Wikipedia`));
    await searchSelector.waitForDisplayed({ timeout: 30000 });
    await searchSelector.click();

    var insertTextSelector = await webdriver($('android=new UiSelector().resourceId("org.wikipedia.alpha:id/search_src_text")'));
    await insertTextSelector.waitForDisplayed({ timeout: 30000 });

    await insertTextSelector.addValue("Browsertack");
    await browser.pause(5000);

    var allProductsName = await webdriver($$(`android.widget.TextView`));
    assert(allProductsName.length > 0);
  });
});
