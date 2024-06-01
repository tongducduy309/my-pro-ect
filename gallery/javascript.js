import { Firestore } from "/firebase/connect-firebase.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js"
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "https://cdnjs.cloudflare.com/ajax/libs/firebase/10.8.0/firebase-storage.min.js";

let name =  null;
let btnCreateFolder = document.querySelector(".btnCreateFolder");
let listItem = document.getElementById("listItem");
let selectedFolderId = null, selectedFolder = null, selectedImageId= null, selectedImage=null;
let btnList = document.querySelector(".group .list")
let btnGrid = document.querySelector(".group .grid")
let btnBackFolder = document.querySelector(".groupLeft .backFolder")
let proccessing_createFolder = false;
let proccessing_rename = false;
let listImage = {};





const fs = new Firestore({
    apiKey: "AIzaSyCcSciNlWNlwcx52vaYjBtThmpCWQMEZ3E",
    authDomain: "local1-19885.firebaseapp.com",
    projectId: "local1-19885",
    storageBucket: "local1-19885.appspot.com",
    messagingSenderId: "396749476892",
    appId: "1:396749476892:web:608fd2e2968d21c6553bd9",
    measurementId: "G-EQL9HPG3VE"
});

fs.setStorage();


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
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const idFolder = urlParams.get('idF')
    const nameFolder = urlParams.get('nameF')
    if (idFolder!==null){
        document.querySelector(".nameSubFolder").textContent = nameFolder
        loadItems(idFolder)
        selectedFolderId = idFolder
    }
    else loadFolder()
}

let modeView = "grid"
let listItemView = {};
const sort = document.querySelector(".sort")
sort.addEventListener("click",()=>{
    sortItem();
})
async function loadFolder(){
    
    
    proccessing_rename = false;
    proccessing_createFolder = false;
    let listFolder = await fs.collection("folders").getCollection()
    listFolder = listFolder.array;
    listItem.innerHTML = ""
    listItemView = {}
    if (modeView=="grid"){
        listItem.classList.add("row")
        listItem.style.padding = '10px'
        
        listFolder.forEach(folder => {
            // if (folder.values.access){
            //     if (folder.values.access.indexOf(code)!=-1){
                    
            //     }
            // }
            console.log(folder);
            listItem.appendChild(getFolderGrid(folder.name,folder._id))
            listItemView[folder.name]=folder
        });
    }
    else{
        listItem.classList.remove("row")
        listItem.style.padding = '0'
        
            
        listFolder.forEach(folder => {
            // if (folder.values.access){
            //     if (folder.values.access.indexOf(code)!=-1){
                    
            //     }
            // }
            listItem.appendChild(getFolderList(folder.name,folder._id))
            listItemView[folder.name]=folder
        });
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
    const id = createID()
    document.getElementById("listItem").appendChild(getImageGrid(inputUploadImage.files[0].name,imageLink,inputUploadImage.files[0].name))

    const storageRef = fs.storage().getStorageRef();
    fs.storage().uploadBytesResumable('Images/'+id,inputUploadImage.files[0],(snapshot)=>{
        

    }, (uploadTask)=>{
        let value = {}
        let v ={}
        v[id]=inputUploadImage.files[0].name
        value["items"]={...listImage,...v}
        fs.collection('folders').update(selectedFolderId,value)
    })
    // const uploadTask =  uploadBytesResumable(storageRef,inputUploadImage.files[0]);
    // uploadTask.on('state_changed',
    // (snapshot)=> {
    //     const progress = (snapshot.bytesTransferred / snapshot.totalBytes);
    //     console.log('Upload is' + progress + '%done');
    // },
    // (error)=> {
    //     console.log("error");
    // },
    // () => {

    //     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //     //this.UrlFileImg = downloadURL;
    //     //this.file.path=downloadURL;
    //     //this.addProduct();
    //     //console.log('File available at',  this.UrlFileImg);

    //     });
    // }
    // )
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
        listImage = {...images}
        Object.keys(images).forEach(id => {
            getImage(storage,images[id],id,`gs://local1-19885.appspot.com/Images/${id}`)
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
        loadImage(nameImage,url,idImage)
    }
    image.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        contextmenuImage.style.display="block";
        contextmenuImage.style.top=event.y+window.scrollY+"px";
        contextmenuImage.style.left=event.x+"px";
        selectedImageId = idImage
        selectedImage=image
       

        
    });
    return image
}

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

function bitmapToImageDataURL(bitmapData,width,height) {
    // ... (parse bitmap data and convert to pixel information)
  
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
  
    // Set canvas dimensions based on bitmap data
    canvas.width = width; // Replace with width extracted from bitmap data
    canvas.height = height; // Replace with height extracted from bitmap data
  
    const imageData = context.createImageData(canvas.width, canvas.height);
  
    context.putImageData(imageData, 0, 0);
  
    const dataURL = canvas.toDataURL('image/png'); // Replace with desired format (e.g., 'image/jpeg')
    return dataURL;
  }

function loadImage(nameImage,url,idImage){
    const bgImage = document.querySelector(".bgImage")
    bgImage.style.display = "block"
    const close = bgImage.querySelector(".close")
    const download = bgImage.querySelector(".download")
    const source = bgImage.querySelector(".sourceImage")
    const image = bgImage.querySelector("img")
    close.onclick = function(){
        bgImage.style.display = 'none'
    }
    //console.log(url);
    source.onclick = function(){
        const downloadLink = document.createElement("a");
        downloadLink.target="_blank"
        downloadLink.href = url;
        downloadLink.click();
    }
    image.src = url
    console.log(url);
    download.onclick = function(){
        const firebaseImageUrl = url; // Replace with your Firebase image URL
        const xhr = new XMLHttpRequest(); // Or use Fetch API with libraries like Axios

        xhr.open('GET', './gallery.html', true); // Replace '/download-image' with your server-side script endpoint
        xhr.responseType = 'blob'; // Request image data as a blob

        xhr.onload = function() {
            if (this.status === 200) { // Check for successful response
            const blob = this.response;
            const url = bitmapToImageDataURL(blob,500,500)
            console.log(url);// Create temporary URL

            const link = document.createElement('a');
            link.href = url;
            link.download = 'downloaded_image.jpg'; // Set desired filename (optional)
            link.click();

            // Revoke temporary URL after download to avoid memory leaks
            window.URL.revokeObjectURL(url);
            } else {
            console.error('Error downloading image:', this.statusText);
            // Handle download errors gracefully (optional)
            }
        };

        xhr.send(JSON.stringify({ firebaseImageUrl }));
    }
    
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
        selectedFolderId = idFolder
        window.location.href = `./gallery.html?idF=${idFolder}&nameF=${nameFolder}`
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
        document.querySelector(".nameSubFolder").textContent = nameFolder
        loadItems(idFolder)
        selectedFolderId = idFolder
        window.location.href = `./gallery.html?idF=${idFolder}&nameF=${nameFolder}`
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
const contextmenuImage = document.createElement("div");


createContextMenuFolder()
createContextMenuImage()

function createContextMenuFolder(){
    
    contextmenuFolder.id="contextmenuFolder"
    contextmenuFolder.innerHTML=`
    <li class="rename"><i class="fa-solid fa-pen-to-square"></i><span>Đổi tên</span></li>
    <li class="delete"><i class="fa-solid fa-trash-can"></i><span>Xóa thư mục</span></li>
    `
    document.getElementById("container_").append(contextmenuFolder)
    contextmenuFolder.querySelector(".delete").addEventListener("click",()=>{
        fs.collection("folders").deleteDoc(selectedFolderId)
    })
    contextmenuFolder.querySelector(".rename").addEventListener("click",()=>{
        renameFolder();
    })
}

function createContextMenuImage(){
    
    contextmenuImage.id="contextmenuImage"
    contextmenuImage.innerHTML=`
    <li class="delete"><i class="fa-solid fa-download"></i><span>Tải về</span></li>
    <li class="rename"><i class="fa-solid fa-pen-to-square"></i><span>Đổi tên</span></li>
    <li class="delete"><i class="fa-solid fa-trash-can"></i><span>Xóa ảnh</span></li>
    
    `
    document.getElementById("container_").append(contextmenuImage)
    contextmenuImage.querySelector(".delete").addEventListener("click",()=>{
        fs.collection("Images").deleteDoc(selectedFolderId)
    })
    contextmenuImage.querySelector(".rename").addEventListener("click",()=>{
        renameImage();
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

function renameImage(){
    
    let imageName = selectedImage.querySelector(".nameFile");
    selectedImage.removeChild(imageName)
    const input = document.createElement('input')
    input.className = 'inputFolderName'
    
    input.value = imageName.textContent
    
    input.autofocus = true
    input.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            fs.collection("folders").update(selectedFolderId,{name:input.value})
            proccessing_rename = false;
        }
    });
    selectedImage.append(input)
    input.select()
    input.focus();
}

document.addEventListener("mouseup",function(e){
    contextmenuFolder.style.display="none";
    contextmenuImage.style.display="none";
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

btnBackFolder.addEventListener("click",()=>{
    window.location.href = `./gallery.html`
})

