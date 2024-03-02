import { Firestore } from "/firebase/connect-firebase.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js"
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "https://cdnjs.cloudflare.com/ajax/libs/firebase/10.8.0/firebase-storage.min.js";

let name =  null;
let btnCreateFolder = document.querySelector(".btnCreateFolder");
let listItem = document.getElementById("listItem");
let selectedFolderId = null, selectedFolder = null;
let btnList = document.querySelector(".group .list")
let btnGrid = document.querySelector(".group .grid")
let proccessing_createFolder = false;
let proccessing_rename = false;


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
console.log(ip);
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

async function checkCode(cod){
    let code = await fs.collection("codes").get(cod)
    if (code){
        loadData()
    }
    else{
        document.getElementById("message").innerHTML = "Mã còn tồn tại vui lòng nhập mã khác <a href = './gallery/login.html'>tại đây</a> "
    }
    
}

let cookie = getCookie("gallery_2402")
let code = null
if (cookie==null)
{
    window.location.href = "./gallery/login.html"
}
else{
    code = cookie
    checkCode(code)
}

function loadData(){

    document.getElementById("message").style.display = 'none';
    document.getElementById("container_").style.display = 'block';
    document.getElementById("code").textContent = code;
    loadFolder()
}

let modeView = "grid"
let listItemView = {};
const sort = document.querySelector(".sort")
sort.addEventListener("click",()=>{
    sortItem();
})
function loadFolder(){
    
    
    proccessing_rename = false;
    proccessing_createFolder = false;
    if (modeView=="grid"){
        listItem.classList.add("row")
        listItem.style.padding = '10px'
        fs.collection("folders").subscribe((folders)=>{
            listItem.innerHTML = ""
            listItemView = {}
            folders.forEach(folder => {
                // if (folder.values.access){
                //     if (folder.values.access.indexOf(code)!=-1){
                        
                //     }
                // }
                listItem.appendChild(getFolderGrid(folder.values.name,folder.id))
                listItemView[folder.values.name]=folder
            });
        })
    }
    else{
        listItem.classList.remove("row")
        listItem.style.padding = '0'
        fs.collection("folders").subscribe((folders)=>{
            listItem.innerHTML = ""
            listItemView = {}
            folders.forEach(folder => {
                // if (folder.values.access){
                //     if (folder.values.access.indexOf(code)!=-1){
                        
                //     }
                // }
                listItem.appendChild(getFolderList(folder.values.name,folder.id))
                listItemView[folder.values.name]=folder
            });
        })
    }
}

const dropImage = document.querySelector(".drop-area")
const inputUploadImage = dropImage.querySelector("input")
dropImage.addEventListener("dragenter", (event) => {
    // prevent default to allow drop
    event.preventDefault();
    dropImage.style.borderStyle = 'solid'
});
dropImage.addEventListener("dragleave", (event) => {
    // prevent default to allow drop
    event.preventDefault();
    dropImage.style.border = 'dashed'
});
dropImage.addEventListener("dragover", (event) => {
    // prevent default to allow drop
    event.preventDefault();
});
dropImage.addEventListener("drop", (event) => {
    setFiles(event.dataTransfer.files[0]);
    event.preventDefault();
});
dropImage.addEventListener("click", (event) => { 
    inputUploadImage.click();
});

inputUploadImage.addEventListener("change",()=>{
    let imageLink = URL.createObjectURL(inputUploadImage.files[0])
    document.getElementById("listItem").appendChild(getImageGrid(inputUploadImage.files[0].name,imageLink,inputUploadImage.files[0].name))

    const firebaseConfig = {
        apiKey: "AIzaSyCcSciNlWNlwcx52vaYjBtThmpCWQMEZ3E",
        authDomain: "local1-19885.firebaseapp.com",
        projectId: "local1-19885",
        storageBucket: "local1-19885.appspot.com",
        messagingSenderId: "396749476892",
        appId: "1:396749476892:web:608fd2e2968d21c6553bd9",
        measurementId: "G-EQL9HPG3VE"
    };
      // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const storage = getStorage(app);
    const storageRef = ref(storage,'Images/'+inputUploadImage.files[0].name);
    const uploadTask =  uploadBytesResumable(storageRef,inputUploadImage.files[0]);
    uploadTask.on('state_changed',
    (snapshot)=> {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes);
        console.log('Upload is' + progress + '%done');
    },
    (error)=> {
        console.log("error");
    },
    () => {

        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        //this.UrlFileImg = downloadURL;
        //this.file.path=downloadURL;
        //this.addProduct();
        //console.log('File available at',  this.UrlFileImg);

        });
    }
    )
})

function setFiles(file){
    let imageLink = URL.createObjectURL(file)
    document.getElementById("listItem").appendChild(getImageGrid(file.name,imageLink,"123"))
}
function loadItems(idFolder){
    btnCreateFolder.style.display = 'none'
    
    const firebaseConfig = {
        apiKey: "AIzaSyCcSciNlWNlwcx52vaYjBtThmpCWQMEZ3E",
        authDomain: "local1-19885.firebaseapp.com",
        projectId: "local1-19885",
        storageBucket: "local1-19885.appspot.com",
        messagingSenderId: "396749476892",
        appId: "1:396749476892:web:608fd2e2968d21c6553bd9",
        measurementId: "G-EQL9HPG3VE"
    };
      // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const storage = getStorage(app);
    fs.collection("folders").subscribe((folder)=>{
        const images = folder.items;
        document.getElementById("listItem").innerHTML = ""
        console.log(document.getElementById("listItem").innerHTML);
        images.forEach(imageLink => {
            console.log(imageLink);
            getImage(storage,imageLink,folder.id,imageLink)
        });
        
    },idFolder,false)
    document.querySelector(".groupLeft").style.display = "inline-block"
    
}

function getImage(storage,name,idImage,link){
    
    const storageRef = ref(storage, link);

    // Get the download URL
    getDownloadURL(storageRef)
    .then((url) => {
        if (modeView==="grid"){
            document.getElementById("listItem").appendChild(getImageGrid(name,url,idImage))
        }
    })
    .catch((error) => {
        // Handle errors
        console.error('Error getting image URL:', error);
    });
}

function getImageGrid(nameImage,url,idImage){
    const image = document.createElement("div")
    image.className='imageGrid col-md-1'
    image.innerHTML = `
    <img src="${url}" alt="">
    <span class="nameFile">${nameImage}</span>
    `
    image.onclick = function(){
        //loadItems(idImage)
        loadImage(url)
    }
    image.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        contextmenuFolder.style.display="block";
        contextmenuFolder.style.top=event.y+window.scrollY+"px";
        contextmenuFolder.style.left=event.x+"px";
        selectedFolderId = idFolder
        selectedFolder = folder

        
    });
    return image
}

function loadImage(url){
    const bgImage = document.querySelector(".bgImage")
    bgImage.style.display = "block"
    const close = bgImage.querySelector(".close")
    const image = bgImage.querySelector("img")
    close.onclick = function(){
        bgImage.style.display = 'none'
    }
    image.src = url
    var width = image.clientWidth;
    var height = image.clientHeight;
    if (width>height)
    {
        image.style.width = "70%"
        image.style.height = "auto"
    }
    else{
        image.style.width = "auto"
        image.style.height = "70%"
    }
}

function sortItem(){
    // listItem.innerHTML = ""
    // const entries = Object.entries(listItemView);
    // console.log(entries);
    // entries.sort((x, y) => y[0] - x[0]);
    // console.log(JSON.stringify(entries));
    // items.forEach((item)=>{
    //     listItem.appendChild(createFolder(item.id))
    // })
    console.log("sort");
}

function getFolderGrid(nameFolder,idFolder){
    const folder = document.createElement("div")
    folder.className='folderGrid col-md-1'
    folder.innerHTML = `
    <i class="fa-solid fa-folder"></i>
    <span class="folderName">${nameFolder}</span>
    `
    folder.onclick = function(){
        document.querySelector(".nameSubFolder").textContent = nameFolder
        loadItems(idFolder)
    }
    folder.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        contextmenuFolder.style.display="block";
        contextmenuFolder.style.top=event.y+window.scrollY+"px";
        contextmenuFolder.style.left=event.x+"px";
        selectedFolderId = idFolder
        selectedFolder = folder

        
    });
    return folder
}

function getFolderList(nameFolder,idFolder){
    const folder = document.createElement("div")
    folder.className='folderList'
    folder.innerHTML = `
    <i class="fa-solid fa-folder"></i>
    <span class="folderName">${nameFolder}</span>
    `
    folder.onclick = function(){

    }
    folder.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        if (!proccessing_rename)
        {
            contextmenuFolder.style.display="block";
            contextmenuFolder.style.top=event.y+window.scrollY+"px";
            contextmenuFolder.style.left=event.x+"px";
            selectedFolderId = idFolder
            selectedFolder = folder
        }

        
    });
    return folder
}

btnCreateFolder.addEventListener("click",()=>{
    proccessing_createFolder = true;
    const folder = document.createElement("div")
    if (modeView==="grid"){
        folder.className='folderGrid col-md-1'
        folder.innerHTML = `
        <i class="fa-solid fa-folder"></i>
        
        `
        var input = document.createElement('input')
        input.className = 'inputFolderName'
    }
    else{
        folder.className='folderList'
        folder.innerHTML = `
        <i class="fa-solid fa-folder"></i>
        
        `
        var input = document.createElement('input')
        input.className = 'inputFolderName'
    }
    input.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            addFolderToDB(input.value);
            
        }
    });
    folder.append(input)
    listItem.appendChild(folder)
    input.focus();
})

function addFolderToDB(name){
    fs.collection("folders").add({name:name,items:[]})
}

const contextmenuFolder = document.createElement("div");
createContextMenuFolder()

function createContextMenuFolder(){
    
    contextmenuFolder.id="contextmenuFolder"
    contextmenuFolder.innerHTML=`
    <li id="rename"><i class="fa-solid fa-pen-to-square"></i><span>Đổi tên</span></li>
    <li id="delete"><i class="fa-solid fa-trash-can"></i><span>Xóa thư mục</span></li>
    `
    document.getElementById("container_").append(contextmenuFolder)
    contextmenuFolder.querySelector("#delete").addEventListener("click",()=>{
        fs.collection("folders").deleteDoc(selectedFolderId)
    })
    contextmenuFolder.querySelector("#rename").addEventListener("click",()=>{
        renameFolder();
    })
}



function renameFolder(){
    proccessing_rename = true;
    let folderName = selectedFolder.querySelector(".folderName");
    selectedFolder.removeChild(folderName)
    const input = document.createElement('input')
    input.className = 'inputFolderName'
    
    input.value = folderName.textContent
    
    input.autofocus = true
    input.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            fs.collection("folders").update(selectedFolderId,{name:input.value})
            proccessing_rename = false;
        }
    });
    selectedFolder.append(input)
    input.select()
    input.focus();
}

document.addEventListener("mouseup",function(e){
    contextmenuFolder.style.display="none";
    if(proccessing_rename===true||proccessing_createFolder===true){
        
        loadFolder()
        
    }

});

document.addEventListener("contextmenu", e => {
    if(proccessing_rename===true){
        
        loadFolder()
        
    }
});

btnGrid.addEventListener("click",()=>{
    btnGrid.classList.add("selected")
    btnList.classList.remove("selected")
    modeView = "grid"
    loadFolder()
})
btnList.addEventListener("click",()=>{
    btnList.classList.add("selected")
    btnGrid.classList.remove("selected")
    modeView = "list"
    loadFolder()
})

