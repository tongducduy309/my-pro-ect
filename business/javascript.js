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

async function setQrcode(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const qrcode = urlParams.get('qrcode')
    console.log(qrcode);
    if (qrcode){
        await fs.collection("bs-tamduccuong").update("qrcode",{code:qrcode})
        window.location.href = "about:blank";
    }
}

setQrcode()

