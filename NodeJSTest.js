var wd = require('wd');
var assert = require('assert');
var asserters = wd.asserters;

desiredCaps = {
  'browserstack.user' : process.env.BROWSERSTACK_USERNAME,
  'browserstack.key' : process.env.BROWSERSTACK_ACCESS_KEY,
  'build' : 'Ran from GitHub',
  'name': 'sample_test_with_bug',
  'device' : 'Google Pixel 3',
  'app' : 'bs://c700ce60cf13ae8ed97705a55b8e022f13c5827c',
  'browserstack.debug' : true,
  'browserstack.networkLogs': true
};
driver = wd.promiseRemote("http://hub-cloud.browserstack.com/wd/hub");

driver
  .init(desiredCaps)
  .then(function () {
    return driver.waitForElementByAccessibilityId('ThisTextDoesntExist', asserters.isDisplayed && asserters.isEnabled, 30000);
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
     // Setting the status of test as 'passed' or 'failed' based on the condition if results are found for the search
    if(search_results.length > 0){
      return driver.execute('browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"passed","reason": "Results found!"}}');
    } else {
      driver.execute('browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"failed","reason": "No results available!"}}');
    }
  })
  .fin(function() { 
    return driver.quit(); 
  })
  .done();
