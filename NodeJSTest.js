var wd = require('wd');
var assert = require('assert');
var asserters = wd.asserters;

desiredCaps = {
  'browserstack.user' : 'harryvanderveen_5FiwGa',
  'browserstack.key' : 'e4EbPv9rtnWVeTNhWV5T',
  'build' : 'Node Android',
  'name': 'single_test',
  'device' : 'Google Pixel 3',
  'app' : '<app_url>',
  'browserstack.debug' : true
};
driver = wd.promiseRemote("http://hub-cloud.browserstack.com/wd/hub");

driver
  .init(desiredCaps)
  .then(function () {
    return driver.waitForElementByAccessibilityId('Search Wikipedia', asserters.isDisplayed && asserters.isEnabled, 30000);
  })
  .then(function (searchElement) {
    return searchElement.click();
  })
  .then(function () {
    return driver.waitForElementById('org.wikipedia.alpha:id/search_src_text', asserters.isDisplayed && asserters.isEnabled, 30000);
  })
  .then(function (searchInput) {
    return searchInput.sendKeys("BrowserStack");
  })
  .then(function () {
    return driver.elementsByClassName('android.widget.TextView');   
  })
  .then(function (search_results) {
    assert(search_results.length > 0);
  })
  .fin(function() { return driver.quit(); })
  .done();