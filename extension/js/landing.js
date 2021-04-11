var rangeslider = document.getElementById("myRange");
var output = document.getElementById("freq-min");
output.innerHTML = rangeslider.value;

rangeslider.oninput = function() {
output.innerHTML = this.value;
}

let starttime=1;
let time=starttime*60;
const countdownEl=document.getElementById('countertime');
var resetbut=document.getElementById('resetbut');
var interval= setInterval(updateCountdown,1000);
var interval1 = browsing_time()


function updateCountdown(){
   const min=Math.floor(time/60);
   let seconds=time%60;
   seconds=seconds=10?+seconds:seconds;
   countdownEl.innerHTML=`${min}:${seconds}`;
   time--;
   if(time<=-1){
    try {
      browser.notifications.create(options);
    browser.notifications.onClicked.addListener(function() {
      browser.tabs.create({url: "breakidea.html"});
      });
      window.location.href = 'breakidea.html'
    }
    catch (exception_var) {
      //do nothing
    }
    finally {
      
      clearInterval(interval);
    }
    
    
    
    }
  }
  resetbut.onclick=changeTime;
  const options = {
    type: "basic",
    title: "Take a break",
    message:
      "Look Away From Your Computer",
    iconUrl: "images/notify.png"
  };
function changeTime() {
  starttime=rangeslider.value;
  time=starttime*60;
  interval= setInterval(updateCountdown,1000);

}

// Browser time
function browsing_time(){
  var duration = localStorage.getItem("user_detail");
  
  duration = Math.abs(parseInt(duration))
  console.log(duration)
    
  minutes = Math.floor((duration / (100 * 60)) % 60),
  hours = Math.floor((duration / (100 * 60 * 60)) % 24);

  var hoursused = document.getElementById('hours-used');
  var minused = document.getElementById('min-used');
  console.log(hours)

  hoursused.innerHTML=`${hours}`;
  minused.innerHTML= `${minutes}`;

  }