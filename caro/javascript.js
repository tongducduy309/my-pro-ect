import { Firestore } from "/firebase/connect-firebase.js";
const w=100;
const h =100;

const board = document.getElementById("board")
const fs = new Firestore();
let nameRoom=null

let turn, t = 0, mark;


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

function createBoard(){
    board.innerHTML = ''
    for (let i=0;i<h;i++){
        const tr = document.createElement("tr")
        for (let j=0;j<w;j++){
            const td = document.createElement("td")
            const cls = `r${i}_c${j}`
            td.className = cls
            tr.appendChild(td)
            
            td.onclick = function(){
                if (nameRoom!=null)
                {
                    if (turn==mark)
                    if(td.className.indexOf("tick_x")==-1&&td.className.indexOf("tick_o")==-1){
                        td.classList.add(`tick_${turn}`)
                        let value = {}
                        value[`turn_${t+1}`]=`${cls}--${turn}`
                        fs.collection("caro").update(nameRoom,value)
                        //turn = (turn=="x")?"o":"x"
                    }
                }
                else showDialog()
                
            }
        }
        board.appendChild(tr)
    }
}

createBoard()



function setTurn(cell){
    if (cell){
        const [positon,turn]=cell.split("--")
        const td = document.querySelector(`.${positon}`)
        const cls = `tick_${turn}`;
        if(td.className.indexOf(cls)==-1){
            td.classList.add(cls)
        }
    }
    
    
}

async function joinRoom(nR){
    createBoard()
    if (!nR||nR.length==0) nR = ""
    //fs.collection("caro").add({number_of_rooms:n},"Main")
    nameRoom = `${nR}`;
    let room = await fs.collection("caro").get(nameRoom)
    
    let value = {}
    if (room!=null)
    {
        //Test 2 ip
        // const browser = {
        //     name: userAgent.match(/(firefox|msie|chrome|safari|trident|edge)/i)[1] || 'unknown',
        //     version: userAgent.match(/(?:firefox|chrome|safari|trident|msie|edge)\/(\d+)/i)[1] || 'unknown'
        //   };
        // console.log(browser.name);
        // if (browser.name=="Firefox")
        //     ip="123"
        if (!room["Turn"][ip]){
            let v ={}
            v[ip]="o"
            value["Turn"]={...room["Turn"],...v}
            await fs.collection("caro").update(nameRoom,value)
            mark = "o"
        }
        else {
            let n=(Object.keys(room)).length-1;
            for (let i=1;i<=n;i++){
                setTurn(room[`turn_${i}`])
            }
            mark = room["Turn"][ip]
            
        }
        createAlert("Tham gia phòng thành công")
    }
    else    
        {
            let v ={}
            v[ip]="x"
            value["Turn"]={...v}
            if (!nR||nR.length==0)
                nameRoom = await fs.collection("caro").add(value);
            else
                await fs.collection("caro").add(value,nameRoom)
            mark = "x"
            createAlert("Tạo phòng thành công")
        }
    

    getTurn();
    const copyRoom = document.querySelector(".copyRoom");
    document.getElementById("nameRoom").innerHTML = nameRoom
    copyRoom.addEventListener("click",()=>{
        navigator.clipboard.writeText(nameRoom);
    })

    
    
    
}

function getTurn(){
    fs.collection("caro").subscribe((turn_)=>{
        t=Object.keys(turn_).length;
        setTurn(turn_[`turn_${t}`])
        turn =  (t%2==0)?"o":"x"
    },nameRoom,false)
}

function createAlert(content){
    let container = document.getElementById("alert_container");
    let alert = document.createElement("div");
    alert.className="alert_ success";
    let cont = document.createElement("div");
    cont.className="content";
    cont.innerHTML = `<i class="fa-regular fa-circle-check"></i><span>`+content+`</span>`;
    let close = document.createElement("div");
    close.className="close";
    close.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    close.onclick = () => {
        container.removeChild(alert);
    }
    alert.appendChild(cont);
    alert.appendChild(close);

    
    container.appendChild(alert);
    setTimeout(()=>{
        container.removeChild(alert);
        
    },4000)
}

function showDialog(value={
    'room':'',
  }) {
    const bg = document.createElement("div");
    bg.id='bg'
    const dialog = document.createElement("div");
    dialog.id='dialog'
  
    if(device=="desktop")
      dialog.style.width = "400px"
    else dialog.style.width = screen.width*0.9+"px"
    
  
  
    const header = document.createElement("div");
    header.className="header";
    header.innerHTML=`<span>CHỌN PHÒNG</span>`
  
    const content = document.createElement("div");
    content.className="content";
  
  
    const close = document.createElement("div");
    close.className="close";
    close.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  
    const room = document.createElement("input");
    room.className = "room"
    room.type = "text"
    room.placeholder="Tên phòng"
    room.value=value.room
  
    
    close.onclick = function(){
        document.body.removeChild(bg);
    }
  
    
    header.appendChild(close);
    content.appendChild(room);
    
  
    const enter = document.createElement("div");
    enter.className="enter btn"
    enter.innerHTML='NHẬP'
    enter.addEventListener("click", async () => {
        document.body.removeChild(bg);
        await joinRoom(room.value);
        

        
    });
  
    content.appendChild(enter)
    dialog.appendChild(header);
    dialog.appendChild(content);
    // Đặt dialog ở vị trí trung tâm màn hình
    bg.appendChild(dialog)
    
    document.body.appendChild(bg);
  
  }



let device;
const userAgent = navigator.userAgent;
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
  //console.log("You are using a mobile device");
  device="mobile"
} else {
  //console.log("You are using a desktop device");
  device="desktop"
}

document.querySelector(".joinRoom").addEventListener("click",()=>{
    showDialog({room:nameRoom})
})

document.querySelector(".restart").addEventListener("click",async ()=>{
    await fs.collection("caro").deleteDoc(nameRoom)
    await joinRoom(nameRoom)
    createAlert("Bắt đầu ván mới!!!")
})

showDialog();

const scrollableElement = document.body;

let isDragging = false;
let startX,startY = 0;

scrollableElement.addEventListener('mousedown', (event) => {
  isDragging = true;
  startX = event.clientX;
  startY = event.clientY;
});

scrollableElement.addEventListener('mouseup', () => {
  isDragging = false;
});

scrollableElement.addEventListener('mousemove', (event) => {
    
  if (isDragging) {
    const deltaX = event.clientX - startX;
    const deltaY = event.clientY - startY;
    document.documentElement.scrollLeft += -deltaX;
    document.documentElement.scrollTop += -deltaY;
    startX = event.clientX;
    startY = event.clientY;
  }
});



