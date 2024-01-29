import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js'
import { getStorage, ref, getDownloadURL} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";


function setEnvironmentDB(){
  const firebaseConfig = {
      apiKey: "AIzaSyAXtmyMCcSb2lig6GqhFaM_0oKHHa09HWI",
      authDomain: "newapp-a6378.firebaseapp.com",
      projectId: "newapp-a6378",
      storageBucket: "newapp-a6378.appspot.com",
      messagingSenderId: "440187362295",
      appId: "1:440187362295:web:effbea8486bad7f95a6cf2",
      measurementId: "G-CCDEXW4RG9"
    };
  
    // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  return getStorage(app);
}

let projects = []
fetch('../projects.json')
        .then((response) => response.json())
        .then((json) => getData(json))


function getData(projects){
  console.log(projects);
    const table = document.getElementById("table_body");
    let i = 0;
    for (let project of projects){
        if(project.status==1){
          i++;
          let tr = document.createElement("tr")
          
          tr.innerHTML = `
                  <td width="5%">${i}</td>
                  <td width="50%">${project.name}</td>
                  <td width="40%"><div class="link" app="${(project.type=="APP")}" link="${project.link}">${(project.type=="APP")?"Tải":"Đường dẫn"}</a></td>
                  <td width="5%">${project.type}</td>
          `
          table.appendChild(tr)
        }
        
    }

    document.querySelectorAll(".link").forEach((l)=>{
      l.addEventListener("click",()=>{
        const app= l.getAttribute("app");
        const link = l.getAttribute("link");
        if (app=="true"){
          downloadApp(link)
        }
        else window.location.href = link;
      })

    })


}

const storage = setEnvironmentDB();
function downloadApp(link){
  
const starsRef = ref(storage, link);
//const storage = setEnvironmentDB('gs://newapp-a6378.appspot.com/BusinessApp-TamDucCuong/BusinessApp - Setup.msi');
getDownloadURL(starsRef)
  .then((url) => {
    // Insert url into an <img> tag to "download"
    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.click();
  })
  .catch((error) => {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/object-not-found':
        // File doesn't exist
        break;
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;
      case 'storage/canceled':
        // User canceled the upload
        break;

      // ...

      case 'storage/unknown':
        // Unknown error occurred, inspect the server response
        break;
    }
  });
}
