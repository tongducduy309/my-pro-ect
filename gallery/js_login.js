import { Firestore } from "/firebase/connect-firebase.js";

let name =  null;

const fs = new Firestore({
    apiKey: "AIzaSyCcSciNlWNlwcx52vaYjBtThmpCWQMEZ3E",
    authDomain: "local1-19885.firebaseapp.com",
    projectId: "local1-19885",
    storageBucket: "local1-19885.appspot.com",
    messagingSenderId: "396749476892",
    appId: "1:396749476892:web:608fd2e2968d21c6553bd9",
    measurementId: "G-EQL9HPG3VE"
  });


let ip = await getIPAddress();

async function getIPAddress() {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.error('Error fetching IP address:', error);
      return 'Unknown IP';
    }
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return null;
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

async function checkUser(cod){
    let code = await fs.collection("codes").get(cod)
    if (code){
        setCookie("gallery_2402",cod,365)
        window.location.href = "../gallery.html"
    }
    else{
        document.getElementById("message").textContent = "Mã đăng nhập không hợp lệ"
    }
    
}

document.getElementById("btnLogin").addEventListener("click",()=>{
    let input = document.getElementById("inputLogin").value;
    let message = document.getElementById("message");
    if (input.length===0) message.textContent = "Mã không được để trống"
    else{
        checkUser(input)
    }
    
})

let cookie = getCookie("gallery_2402")
if (cookie!=null)
{
    let code = await fs.collection("codes").get(code)
    if (code) window.location.href = "../gallery.html"
}
else{
    code = cookie
}


