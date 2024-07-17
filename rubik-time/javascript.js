const timeH = document.querySelector('.time')
const hour = document.querySelector('.hour')
const minute = document.querySelector('.minute')
const second = document.querySelector('.second')
const ms = document.querySelector('.ms')

let running = false
let timerun;
let time = {
    hour : 0,
minute : 0,
second : 0,
ms : 0
}

function run(){
    running = true
    time = {
        hour : 0,
    minute : 0,
    second : 0,
    ms : 0
    }
    timerun = setInterval(()=>{
        time.ms++
        if (time.ms==10){
            time.ms=0;
            time.second++;
        }
        if (time.second==60){
            time.second=0;
            time.minute++;
        }
        if (time.minute==60){
            time.minute=0;
            time.hour++;
        }
        ms.textContent = time.ms
        second.textContent = (time.second>9)?time.second+".":"0"+time.second+"."
        if (time.minute>0||time.hour>0)
            minute.textContent = (time.minute>9)?time.minute+":":"0"+time.minute+":"
        if (time.hour>0)
            hour.textContent = (time.hour>9)?time.hour+":":"0"+time.hour+":"

    },100)
}

function stop(){
    running = false
}

function compare(time_1,time_2){
    const ms1 = (time_1.hour*3600+time_1.minute*60+time_1.second)*1000+time_1.ms
    const ms2 = (time_2.hour*3600+time_2.minute*60+time_2.second)*1000+time_2.ms
    console.log(ms1,time_1);
    console.log(ms2,time_2);
    return ms1<ms2
}

function In(){
    if (!isKeyPressed)
    {
        startTime = (new Date()).getSeconds();
        isKeyPressed=true;
        timeH.style.color='#028a0f'
    }
}

function Out(){
    const elapsedTime = (new Date()).getSeconds() - startTime;
    isKeyPressed=false;
    if (running){
        
        clearInterval(timerun)
        running=false
        if (getCookie("record-rubik")==""||compare(time,JSON.parse(getCookie("record-rubik")))){
            setCookie("record-rubik", JSON.stringify(time), 30);
            setRecord()
        }
    }
    else
    if (!running&&(elapsedTime>=1||elapsedTime<0)){
        run()
        
    }
    timeH.style.color='#000'
}

let startTime,isKeyPressed=false

document.addEventListener("keyup",()=>{
    if (event.code=='Space'){
        Out()
        
        
    }
})



document.addEventListener("touchend",()=>{
    Out()
})

document.addEventListener("keydown",()=>{
    if (event.code=='Space'){
        In() 
    }
})

document.addEventListener("touchstart",()=>{
    In()
    
})

document.addEventListener("contextmenu",()=>{
    event.preventDefault()
})

function getTimeString(time){
    let ms,second,minute,hour
    ms = time.ms
    second = (time.second>9)?time.second+".":"0"+time.second+"."
    minute = (time.minute>9)?time.minute+":":"0"+time.minute+":"
    hour = (time.hour>9)?time.hour+":":"0"+time.hour+":"
    return hour+minute+second+ms
}

function setRecord(){
    if (getCookie("record-rubik")!=""){
        document.querySelector('.record').textContent = getTimeString(JSON.parse(getCookie("record-rubik")))
    }
}

setRecord()


function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
  
  function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}
