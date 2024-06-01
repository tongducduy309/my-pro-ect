import { Firestore } from "/firebase/connect-firebase.js";
var cel = new celebration();

// cel.create();
const w=100;
const h =100;

const board = document.getElementById("board")
const fs = new Firestore({
    apiKey: "AIzaSyAXtmyMCcSb2lig6GqhFaM_0oKHHa09HWI",
    authDomain: "newapp-a6378.firebaseapp.com",
    projectId: "newapp-a6378",
    storageBucket: "newapp-a6378.appspot.com",
    messagingSenderId: "440187362295",
    appId: "1:440187362295:web:effbea8486bad7f95a6cf2",
    measurementId: "G-CCDEXW4RG9"
  });
let nameRoom=null

let turn, t = 0, mark, timeInterval, cells = {},running=true;
let table = {}
// block: Chặn 2 đầu 0-Không chặn, 2-Chặn
let settings = {
    block:2,
    off_online:'off'
}

// let ip = await getIPAddress();

// async function getIPAddress() {
//     try {
//       const response = await fetch('https://api.ipify.org?format=json');
//       const data = await response.json();
//       return data.ip;
//     } catch (error) {
//       console.error('Error fetching IP address:', error);
//       return 'Unknown IP';
//     }
//   }
function checkWinner(i,j){
    let turn = cells[`r${i}_c${j}`]

    let [r_1,r_2] = [i,i]
    while (cells[`r${r_1}_c${j}`]&&cells[`r${r_1}_c${j}`]==turn) r_1--;
    while (cells[`r${r_2}_c${j}`]&&cells[`r${r_2}_c${j}`]==turn) r_2++;
    if(settings.block==2){
        if (cells[`r${r_1}_c${j}`]&&cells[`r${r_1}_c${j}`]!=turn&&cells[`r${r_2}_c${j}`]&&cells[`r${r_2}_c${j}`]!=turn) {
            r_1++;
            r_2--;
        }
    }
    if (r_2-r_1-1>=5) return true

    let [c_1,c_2] = [j,j]
    while (cells[`r${i}_c${c_1}`]&&cells[`r${i}_c${c_1}`]==turn) c_1--;
    while (cells[`r${i}_c${c_2}`]&&cells[`r${i}_c${c_2}`]==turn) c_2++;
    if(settings.block==2){
        if (cells[`r${i}_c${c_1}`]&&cells[`r${i}_c${c_1}`]!=turn&&cells[`r${i}_c${c_2}`]&&cells[`r${i}_c${c_2}`]!=turn) {
            c_1++;
            c_2--;
        }
    }
    if (c_2-c_1-1>=5) return true;


    let [r_3,r_4,c_3,c_4] = [i,i,j,j]
    while (cells[`r${r_3}_c${c_3}`]&&cells[`r${r_3}_c${c_3}`]==turn) {
        r_3--;
        c_3--;
    }
    while (cells[`r${r_4}_c${c_4}`]&&cells[`r${r_4}_c${c_4}`]==turn){
        c_4++;
        r_4++;
    }
    if(settings.block==2){
        if (cells[`r${r_3}_c${c_3}`]&&cells[`r${r_3}_c${c_3}`]!=turn&&cells[`r${r_4}_c${c_4}`]&&cells[`r${r_4}_c${c_4}`]!=turn) {
            r_3++;
            c_3++;
            c_4--;
            r_4--;
        }
    }
    if ((r_4-r_3)==6&&(r_4-r_3)==(c_4-c_3)) return true;


    let [r_5,r_6,c_5,c_6] = [i,i,j,j]
    while (cells[`r${r_5}_c${c_5}`]&&cells[`r${r_5}_c${c_5}`]==turn) {
        r_5--;
        c_5++;
    }
    while (cells[`r${r_6}_c${c_6}`]&&cells[`r${r_6}_c${c_6}`]==turn){
        c_6--;
        r_6++;
    }
    if(settings.block==2){
        if (cells[`r${r_5}_c${c_5}`]&&cells[`r${r_5}_c${c_5}`]!=turn&&cells[`r${r_6}_c${c_6}`]&&cells[`r${r_6}_c${c_6}`]!=turn) {
            r_5++;
            c_5--;
            c_6++;
            r_6--;
        }
    }
    if ((r_6-r_5)==6&&(r_6-r_5)==(c_5-c_6)) return true;
    

    return false;
}

function createBoard(){
    board.innerHTML = ''
    
    // mark = 'x'
    
    let turn_view = document.querySelector('.turn-view');
    for (let i=0;i<h;i++){
        const tr = document.createElement("tr")
        for (let j=0;j<w;j++){
            const td = document.createElement("td")
            const cls = `r${i}_c${j}`
            td.className = cls
            tr.appendChild(td)
            
            td.onclick = function(){
                // if (nameRoom!=null)
                // {
                    // if (turn==mark)
                    if(td.className.indexOf("tick_x")==-1&&td.className.indexOf("tick_o")==-1){
                        td.classList.add(`tick_${turn}`)
                        
                        // let value = {}
                        // value[`turn_${t}`]=`${cls}--${turn}`
                        cells[`r${i}_c${j}`]=turn
                        if (turn=='x'){
                            td.innerHTML = '<i class="fa-solid fa-xmark"></i>'
                            turn='o'
                            turn_view.innerHTML = '<i class="fa-solid fa-o"></i>'
                        }
                        else{
                            td.innerHTML = '<i class="fa-solid fa-o"></i>'
                            turn = 'x'
                            turn_view.innerHTML = '<i class="fa-solid fa-xmark"></i>'
                        }
                        
                        cells['turn']=turn
                        localStorage.setItem('caro-cells', JSON.stringify(cells));
                        if (checkWinner(i,j)) {
                            console.log('Win');
                            cel.start(restart);
                            running=false;
                        }
                        //fs.collection("caro").update(nameRoom,value)
                    }
                // }
                // else showDialog()
                
            }
        }
        board.appendChild(tr)
    }
}


function loadData(){
    createBoard()
    cells = localStorage.getItem("caro-cells");
    turn = 'x'
    let turn_view = document.querySelector('.turn-view');
    turn_view.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    if (cells){
        cells = JSON.parse(cells)
        console.log(cells);
        
        Object.keys(cells).forEach(c=>{
            if(c!='turn'){
                const td = document.querySelector(`.${c}`)
                turn = cells[c]
                td.classList.add(`tick_${turn}`)
                
                if (turn=='x'){
                    td.innerHTML = '<i class="fa-solid fa-xmark"></i>'
                }
                else{
                    td.innerHTML = '<i class="fa-solid fa-o"></i>'
                }
            }
        })
        turn=cells['turn']
        if (turn=='x'){
            turn_view.innerHTML = '<i class="fa-solid fa-xmark"></i>'
        }
        else{
            turn_view.innerHTML = '<i class="fa-solid fa-o"></i>'
        }
    }
    else
    {
        cells={}
        turn='x'
    }
    
}
loadData()



function setTurn(cell){
    if (cell){
        
        const [positon,turn]=cell.split("--")
        cells[positon]=turn;
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
    let join=false;
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
        //     ip="12345"
        if (Object.keys(room["Turn"]).length<2&&!room["Turn"][ip]){
            


            let v ={}
            v[ip]="o"
            value["Turn"]={...room["Turn"],...v}
            await fs.collection("caro").update(nameRoom,value)
            mark = "o"
            createAlert("Tham gia phòng thành công")
            join=true;
        }
        else {
            if (room["Turn"][ip])
            {
                let n=(Object.keys(room)).length-1;
                for (let i=1;i<=n;i++){
                    setTurn(room[`turn_${i}`])
                }
                mark = room["Turn"][ip]
                createAlert("Tham gia phòng thành công")
                join=true;
            }
            
        }
        
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
            value = {}
            value[nameRoom] = [ip]
            await fs.collection("caro").add(value,"Main")
            mark = "x"
            join=true;
            //createAlert("Tạo phòng thành công")
        }
    
    if (join){
        getTurn();
        const copyRoom = document.querySelector(".copyRoom");
        document.getElementById("nameRoom").innerHTML = nameRoom
        copyRoom.addEventListener("click",()=>{
            navigator.clipboard.writeText(nameRoom);
        })
        
    }
    else {
        nameRoom = null;
        createAlert("Bạn không được phép vào phòng này","error")
    }

    // fs.collection("caro").subscribe((res)=>{
    //     if (res){
    //         if (!res[nameRoom].includes(ip)){
    //             value = {}
    //             value[nameRoom]=[...res[nameRoom],ip]
    //             fs.collection("caro").update("Main",value)
    //         }
    //     }
    // },"Main",false)

    
    
    
}

function getTurn(){
    fs.collection("caro").subscribe((turn_)=>{
        if(turn_){
            t=Object.keys(turn_).length;
            setTurn(turn_[`turn_${t-1}`])
            if (t>1)
                if (checkWinner(turn_[`turn_${t-1}`])) {
                    cel.start(restart);
                    running=false;
                }
            turn =  (t%2==0)?"o":"x"
            if (turn=="x")
                document.getElementById("mark").innerHTML = "&#10060"
            else
                document.getElementById("mark").innerHTML = "&#128903"
            
        }
        else turn = "x"
        if (t>1&&turn==mark){
            document.getElementById("turnName").innerHTML = "Bạn"
            startTime(45)
        }else {
            if (t==1&&turn==mark){
                document.getElementById("turnName").innerHTML = "Bạn"
                document.querySelector("#information .bg-time").style.display = "none"
            }
            else{
                document.getElementById("turnName").innerHTML = "TỚI LƯỢT </br> ĐỐI THỦ"
                document.querySelector("#information .bg-time").style.display = "none"
            }
            
            
        }
    },nameRoom,false)
}

function createAlert(content,type="success"){
    let container = document.getElementById("alert_container");
    let alert = document.createElement("div");
    const types = {
        success:{
            icon:`<i class="fa-regular fa-circle-check"></i>`,
            class:`alert_ success`
        },
        error:{
            icon:`<i class="fa-solid fa-circle-exclamation"></i>`,
            class:`alert_ error`
        }
    }
    alert.className=`${types[type].class}`;
    let cont = document.createElement("div");
    cont.className="content";
    cont.innerHTML = `${types[type].icon}<span>`+content+`</span>`;
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
        try{
            container.removeChild(alert);
        }catch{}
        
        
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
const scrollableElement = document.body;

let isDragging = false;
let startX,startY = 0;

if (/mobile/i.test(userAgent)) {
  //console.log("You are using a mobile device");
  device="mobile"
  scrollableElement.addEventListener('touchstart', (event) => {
    isDragging = true;
    const touch = event.touches[0];
    startX = touch.clientX;
    startY = touch.clientY;
  });
  
  scrollableElement.addEventListener('touchend', () => {
    isDragging = false;
  });
  
  scrollableElement.addEventListener('touchmove', (event) => {
      
    if (isDragging && running) {
        const touch = event.touches[0];
        const deltaX = touch.clientX - startX;
        const deltaY = touch.clientY - startY;
        document.documentElement.scrollLeft += -deltaX;
        document.documentElement.scrollTop += -deltaY;
        startX = touch.clientX;
        startY = touch.clientY;
    }
  });

} else {
  //console.log("You are using a desktop device");
  device="desktop"
  


//Desktop

scrollableElement.addEventListener('mousedown', (event) => {
  isDragging = true;
  startX = event.clientX;
  startY = event.clientY;
});

scrollableElement.addEventListener('mouseup', () => {
  isDragging = false;
});

scrollableElement.addEventListener('mousemove', (event) => {
    
  if (isDragging && running) {
    const deltaX = event.clientX - startX;
    const deltaY = event.clientY - startY;
    document.documentElement.scrollLeft += -deltaX;
    document.documentElement.scrollTop += -deltaY;
    startX = event.clientX;
    startY = event.clientY;
  }
});
}

document.querySelector(".joinRoom").addEventListener("click",()=>{
    showDialog({room:nameRoom})
})

document.querySelector(".restart").addEventListener("click",async ()=>{
    restart();
})

async function restart(){
    // 
    localStorage.removeItem('caro-cells');
    loadData()
    createAlert("Bắt đầu ván mới!!!")
    running=true;
}

// showDialog();


function startTime(time_){
    document.querySelector("#information .bg-time").style.display = "block"
    const time_down = document.querySelector("#information .time-down")
    const time_view = document.querySelector("#information .time-view")
    time_down.style.transform=`rotate(0deg)`;
    time_view.innerHTML = time_
    time_down.style.display = "inline"
    const sub = 1.8/time_
    let i=1,j=1;
    if(timeInterval) clearInterval(timeInterval)
    timeInterval = setInterval(()=>{
        time_down.style.transform=`rotate(${sub*i++}deg)`;
        if (sub*i>180) {
            clearInterval(timeInterval)
        }
        j++
        if (j==100){
            j=0;
            time_view.innerHTML = --time_
        }
    },10)
}

// function checkWinner(cell){
//     const [positon,turn] = cell.split("--")
//     const [row,col] = positon.split("_")
//     const [i,j] = [parseInt(row.replace("r","")),parseInt(col.replace("c",""))]
//     let [r_1,r_2] = [i,i]
    // while (cells[`r${r_1}_c${j}`]&&cells[`r${r_1}_c${j}`]==turn) r_1--;
    // while (cells[`r${r_2}_c${j}`]&&cells[`r${r_2}_c${j}`]==turn) r_2++;
    // if (r_2-r_1-1>=5) return true

    // let [c_1,c_2] = [j,j]
    // while (cells[`r${i}_c${c_1}`]&&cells[`r${i}_c${c_1}`]==turn) c_1--;
    // while (cells[`r${i}_c${c_2}`]&&cells[`r${i}_c${c_2}`]==turn) c_2++;
    // if (c_2-c_1-1>=5) return true;


    // let [r_3,r_4,c_3,c_4] = [i,i,j,j]
    // while (cells[`r${r_3}_c${c_3}`]&&cells[`r${r_3}_c${c_3}`]==turn) {
    //     r_3--;
    //     c_3--;
    // }
    // while (cells[`r${r_4}_c${c_4}`]&&cells[`r${r_4}_c${c_4}`]==turn){
    //     c_4++;
    //     r_4++;
    // }
    // if ((r_4-r_3)==6&&(r_4-r_3)==(c_4-c_3)) return true;


    // let [r_5,r_6,c_5,c_6] = [i,i,j,j]
    // while (cells[`r${r_5}_c${c_5}`]&&cells[`r${r_5}_c${c_5}`]==turn) {
    //     r_5--;
    //     c_5++;
    // }
    // while (cells[`r${r_6}_c${c_6}`]&&cells[`r${r_6}_c${c_6}`]==turn){
    //     c_6--;
    //     r_6++;
    // }
    // if ((r_6-r_5)==6&&(r_6-r_5)==(c_5-c_6)) return true;
    

    // return false;
// }






