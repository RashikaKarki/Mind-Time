browser.tabs.onActivated.addListener(function (activeInfo) {
  browser.tabs.get(activeInfo.tabId, function (tab) {
      y = tab.url;
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
              console.log(this.responseText);
          }
      };
      //flask server link
      xhttp.open("POST", "http://127.0.0.1:5000/send_url");
      xhttp.send("url=" + y);

  });
});
//switching
browser.tabs.onUpdated.addListener((tabId, change, tab) => {
  if (tab.active && change.url) {

      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
              console.log(this.responseText);
          }
      };
      xhttp.open("POST", "http://127.0.0.1:5000/send_url");
      xhttp.send("url=" + change.url);

  }
});
// define a mapping between tabId and url:
var tabToUrl = {};

browser.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    //store tabId and tab url as key value pair:
    tabToUrl[tabId] = tab.url;
});

browser.tabs.onRemoved.addListener(function (tabId, removeInfo) {
    //since tab is not available inside onRemoved,
    //we have to use the mapping we created above to get the removed tab url:
    console.log(tabToUrl[tabId]);

    var xhttp2 = new XMLHttpRequest();
    xhttp2.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        }
    };
    xhttp2.open("POST", "http://127.0.0.1:5000/quit_url");
    xhttp2.send("url=" + tabToUrl[tabId]);

    // Remove information for non-existent tab
    delete tabToUrl[tabId];

});
