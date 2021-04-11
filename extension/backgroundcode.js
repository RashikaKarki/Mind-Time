browser.tabs.onActivated.addListener(function (activeInfo) {
    browser.tabs.get(activeInfo.tabId, function (tab) {
        y = tab.url;
        if (localStorage.getItem("token") !== null) {
        
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText);
            }
        };
        xhttp.open("POST", "https://womenhack1.herokuapp.com/api/userlog/send_url");
        xhttp.setRequestHeader("Content-Type", "application/json");
        // Retrieve
        if (localStorage.getItem("recent_url") === null) {
            xhttp.send(JSON.stringify({"url": y, "token":localStorage.getItem("token")}));
          }
        else{
            xhttp.send(JSON.stringify({"url": y, "token":localStorage.getItem("token"),"prev_url":localStorage.getItem("recent_url")}));
        }
        // Store
        localStorage.setItem("recent_url", y);
    }
    
        
        
   });
  });
  //switching
  browser.tabs.onUpdated.addListener((tabId, change, tab) => {
    if (tab.active && change.url) {
        if (localStorage.getItem("token") !== null) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText);
            }
        };
        
        xhttp.open("POST", "https://womenhack1.herokuapp.com/api/userlog/send_url");
        xhttp.setRequestHeader("Content-Type", "application/json");
        // Retrieve
        if (localStorage.getItem("recent_url") === null) {
            xhttp.send(JSON.stringify({"url": change.url, "token":localStorage.getItem("token")}));
          }
        else{
            xhttp.send(JSON.stringify({"url": change.url, "token":localStorage.getItem("token"),"prev_url":localStorage.getItem("recent_url")}));
        }
        // Store
        localStorage.setItem("recent_url", change.url);
       
  
    }}
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
      if (localStorage.getItem("token") !== null) {
  
      var xhttp2 = new XMLHttpRequest();
      xhttp2.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
              console.log(this.responseText);
          }
      };
      
      xhttp2.open("POST", "https://womenhack1.herokuapp.com/api/userlog/quit_url");
      xhttp2.setRequestHeader("Content-Type", "application/json");
      xhttp2.send(JSON.stringify({"url":tabToUrl[tabId], "token":localStorage.getItem("token")}));
      
      // Remove information for non-existent tab
      delete tabToUrl[tabId];}
  
  });
