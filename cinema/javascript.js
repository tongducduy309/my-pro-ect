import { File } from 'https://unpkg.com/megajs/dist/main.browser-es.mjs'




const list =  document.getElementById("list");
let listVideo = [] 
fetch('./cinema/list.json')
.then((response) => response.json())
.then((json) => {listVideo = [...json];setListVideo(json)})
function toBase64(arr) {
    //arr = new Uint8Array(arr) if it's an ArrayBuffer
    return btoa(
       arr.reduce((data, byte) => data + String.fromCharCode(byte), '')
    );
 }
async function setListVideo(data){
    list.innerHTML = '';
    
    for (let d of data){
        const movie = document.createElement("div")
        movie.className='movie col-5 col-md-2'
        console.log(d.poster);
        // Get the file object from the URL
        if (d.poster!=undefined)
            {
                const file = File.fromURL(`https://mega.nz/file/${d.poster}`)

                file.api.userAgent = null

                await file.loadAttributes()
                //console.log(file);
                const data = await file.downloadBuffer()

                
                movie.innerHTML=`<img src="data:image/png;base64,${toBase64( data)}" class="imgMovie" alt="ẢNH VIDEO"><span>${d.title}</span>`
            }
        
        
        if (d.link=='')
        movie.innerHTML+=`<span class="comingSoon">Đang cập nhật</span>`
        list.appendChild(movie)
        
        movie.onclick = function(){
            if (d.link!="")
                {
                    if (d.type==1)
                        window.location.href = `./video/play_video.html?link=${d.link}&title=${d.title}&type=${d.type}&episode=1`
                    else
                        window.location.href = `./video/play_video.html?link=${d.link}&title=${d.title}&type=${d.type}`
                }
        }
    }
}

function removeAccents(str) {
str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
str = str.replace(/đ/g,"d");
str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
str = str.replace(/Đ/g, "D");
// Some system encode vietnamese combining accent as individual utf-8 characters
// Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
// Remove extra spaces
// Bỏ các khoảng trắng liền nhau
str = str.replace(/ + /g," ");
str = str.trim();
// Remove punctuations
// Bỏ dấu câu, kí tự đặc biệt
str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
return str;
}

const search_btn = document.querySelector(".button-search");
const input_search = document.getElementById("input_search");
let fl_s=false;
search_btn.addEventListener("click",()=>{
    if(!fl_s)search(input_search.value);
    else{
        input_search.value="";
        fl_s=false;
        setListVideo(listVideo);
        search_btn.classList.add("fa-magnifying-glass")
        search_btn.classList.remove("fa-x")
    }
})

input_search.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' || event.keyCode === 13) {
        search(input_search.value);
    }
});
function search(key){
        search_btn.classList.remove("fa-magnifying-glass")
        search_btn.classList.add("fa-x")
    fl_s=true;
    if(key.length==0) {
        setListVideo(listVideo);
        search_btn.classList.add("fa-magnifying-glass")
        search_btn.classList.remove("fa-x")
        fl_s = false;
        return;
    }
    const result = removeAccents(key).toUpperCase();
    
    const data = listVideo.filter((d={title:String})=>(removeAccents(d.title)).indexOf(result)>-1)
    setListVideo(data);
}