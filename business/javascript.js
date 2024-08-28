import { Firestore } from "/firebase/connect-firebase.js";
console.log(window.location.href);
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
    s=n+"";
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

async function setQrcode(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const qrcode = urlParams.get('qrcode')
    const collection = urlParams.get('collection')
    //console.log(qrcode);
    if (qrcode){
        await fs.collection(collection).update(createID(),{qrcode:qrcode})
        window.location.href = "about:blank";
    }
}

setQrcode()

