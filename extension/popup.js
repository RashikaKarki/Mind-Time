  var rangeslider = document.getElementById("sliderRange");
  var output = document.getElementById("demo");
  output.innerHTML = rangeslider.value;

  rangeslider.oninput = function() {
  output.innerHTML = this.value;
}

 let starttime=.1;
 let time=starttime*60;
 const countdownEl=document.getElementById('counter');
 var resetbut=document.getElementById('resetbut');
  var interval= setInterval(updateCountdown,1000);

  function updateCountdown(){
     const min=Math.floor(time/60);
     let seconds=time%60;
     seconds=seconds=10?+seconds:seconds;
     countdownEl.innerHTML=`Remaining time ${min}:${seconds}`;
     time--;
     if(time<=-1){
      
      browser.notifications.create(options)
       clearInterval(interval);
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
  //Browser time
    

