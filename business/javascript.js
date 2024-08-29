import { Firestore } from "/firebase/connect-firebase.js";



const fs = new Firestore({
    apiKey: "AIzaSyAXtmyMCcSb2lig6GqhFaM_0oKHHa09HWI",
    authDomain: "newapp-a6378.firebaseapp.com",
    projectId: "newapp-a6378",
    storageBucket: "newapp-a6378.appspot.com",
    messagingSenderId: "440187362295",
    appId: "1:440187362295:web:effbea8486bad7f95a6cf2",
    measurementId: "G-CCDEXW4RG9"
});

function formatEncode(n,a){
    let code=['A','B','C','D','E','F','G','H','I','J'];
    let s=n+"";
    while (s.length<a) s='0'+s;
    let x='';
    for (let i=0;i<a;i++) x+=code[parseInt(s[i])];
    
    
    return x;
}
function createID(){
    let date = new Date();
    let d=[date.getDate(),date.getMonth(),(date.getFullYear()+"").slice(2,4),date.getHours(),date.getMinutes(),date.getSeconds(),date.getMilliseconds()];
    let n=[2,2,2,2,2,2,4];
    let id='#';
    for (let i=0;i<d.length;i++) id+=formatEncode(d[i],n[i]);
    return id;
}



async function getIPAddress() {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      console.log(data);
      return data.ip;
    } catch (error) {
      console.error('Error fetching IP address:', error);
      return 'Unknown IP';
    }
}

let qrcode,urlParams;
let user = null;

function getParameterUrl(){
    const queryString = window.location.search;
    urlParams = new URLSearchParams(queryString);
    qrcode = urlParams.get('qrcode')
}

async function addQrCode(qrcode){
    if (qrcode){
        let value = {}
        let ip = await getIPAddress();
        value[createID()]={
            qrcode:qrcode,
            ip:ip
        }
        await fs.collection("business").update(user,value)
        return true;
    }
    return false
}


  
async function setQrcode(){
    getParameterUrl();
    console.log(user);
    if (user){
        
        if (await addQrCode(qrcode)) window.location.href = "./business.html";
    }
    else{
        authen();
        if(user)setQrcode();
    }
}
const container = document.getElementById("alert_container")
function alert_(message){
    const alert = document.createElement("div");
    alert.innerHTML = `<div class="alert">
        
        <span>${message}</span>
      </div>`

    setTimeout(()=>{
        if(alert){
            container.removeChild(alert)
        }
    },3600)

    container.appendChild(alert)
}



function authen(){
    
    user = localStorage.getItem("business-auth");
    console.log(user);
    if (!user) {
        alert_("Vui Lòng Xác Thực App")
    }
}

function onScanSuccess(decodedText, decodedResult) {
    console.log(decodedText,);
    if (!user&&decodedText.indexOf("cnt::")>-1){
        const ipApp = decodedText.slice(5,decodedText.length);
        localStorage.setItem("business-auth",ipApp)
        alert_("Đăng Nhập Thành Công")
        authen();
        setQrcode();
    }

    if (user&&decodedText.indexOf("https://tongducduy.id.vn/business/business.html?qrcode=")>-1){
        addQrCode(decodedText.replace("https://tongducduy.id.vn/business/business.html?qrcode=",""));

       }
    
    if (isValidUrl(decodedText)) {
      var scanResultLink = document.getElementById("scanResultUrl");
      scanResultLink.href = decodedText;
      scanResultLink.innerText = decodedText;
      
    } else {
      document.getElementById("scanResultText").textContent = `Scan result: ${decodedText}`;
    }
    //html5QrcodeScanner.clear();

    //document.getElementById("refreshButton").style.display = "block";
  }

  // Function to refresh the QR code scanner
  function refreshScanner() {
    location.reload(true);
  }

  // Function to validate URLs
  function isValidUrl(url) {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" +
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
        "((\\d{1,3}\\.){3}\\d{1,3}))" +
        "(\\:\\d+)?(\\/[-a-z\\d%@_.~+&:]*)*" +
        "(\\?[;&a-z\\d%@_.,~+&:=-]*)?" +
        "(\\#[-a-z\\d_]*)?$",
      "i"
    );
    return !!pattern.test(url);
  }

  // Initialize the QR code scanner
  var html5QrcodeScanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 });

  // Render the QR code scanner with the defined success callback
  html5QrcodeScanner.render(onScanSuccess);

  setQrcode();