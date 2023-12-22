function drawPercentInCircle(ctx,radius,color,start,per){
  
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.moveTo(0, 0);
  ctx.arc(0, 0,radius,0,per,true);
  ctx.fill()
  
}

function addText(ctx,content,color,rotate,r){
  ctx.rotate(r)
  ctx.fillStyle = color;
  ctx.fillText(content, rotate, 0);
  ctx.rotate(-r)
}

const canvas = document.getElementById('my-canvas');

let side = 0;

function draw(x,y,radius, users){
  
  
  const ctx = canvas.getContext('2d');
  if (users.length>0)
  {
    ctx.translate(-x,-y);
    ctx.moveTo(0,0);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, x*2, y*2);
  }
  

  //Bóng
  ctx.shadowColor = '#c7c7c8'; // Màu sắc của bóng
  ctx.shadowOffsetX = 0; // Khoảng cách bóng theo trục x
  ctx.shadowOffsetY = 0;
  ctx.font = '20px Arial';
  ctx.textAlign = 'right';
  

   // Khoảng cách bóng theo trục y

  ctx.beginPath();
  ctx.shadowBlur = 20;
  ctx.arc(x, y, radius, 0 , Math.PI * 2);
  ctx.fillStyle = '#bcbcbc';
  ctx.closePath();
  ctx.fill();
  ctx.shadowBlur = 0;

  const l = Math.PI*2/users.length;
  side=l*180/Math.PI;
  const r = -l/2

  ctx.translate(300,300);
  
  for (let i=0;i<users.length;i++){
    let c = (i%4==0&&i==users.length-1)?4:i%4;
    drawPercentInCircle(ctx,radius,colors[c],0,Math.PI*2-l)
    addText(ctx,users[i],"#ffffff",220,r)
    ctx.rotate(-l)
    
  }

  //Vẽ vòng tròn trắng ở giữa
  
  ctx.beginPath();
  ctx.arc(0, 0, 50, 0, 2 * Math.PI);
  ctx.fillStyle = '#ffffff';
  ctx.fill();



}

const colors = ["#3369e8","#d50f25","#eeb211","#009925","#26a69a"]
let users = [];

draw(300,300,250,users);

function random(min=0,max=1){
  return Math.floor((Math.random() * (max-min+1)) + min);
}

const audio = new Audio("./random/sound.mp3");

let running = false,j=0;

function turn_wheel(){
  if (!running && users.length>0){
    //canvas.classList.add("turn_wheel")
    running=true;
    input.disabled = true;
    derange.setAttribute("disabled",true);
    sort.setAttribute("disabled",true);
    let i=0,turn=0,speed=20,c=2000,time=random(5000,10000);
    if (time<9000) speed = 18
    if (time<7000) speed = 14
    if (time<6000) speed = 12
    c=parseInt((10000-time)/1000)
    const loop = setInterval(()=>{
      canvas.style.transform=`rotate(${i}deg)`;
      i+=speed
      j+=speed
      if (j>=side){
        audio.play();
        j=0
      }
      if(turn>200&&(turn+c)%50==0&&speed>2) speed-=2;
      if (turn==(time/10)-20) speed=1
      if (turn==(time/10)-10) speed=0.5
      turn++;
    },10)
    setTimeout(()=>{
      clearInterval(loop);
      running=false;
      result();
      input.disabled = false;
      derange.setAttribute("disabled",false);
      sort.setAttribute("disabled",false);
    },time)
  }
}
canvas.addEventListener("click",()=>{
  turn_wheel()
})


function result(){
  
  const match = canvas.style.transform.match(/rotate\((.*?deg)\)/)
  let deg = match ? parseFloat(match[1]) : 0;
  while (deg>=360)deg-=360;
  let index=parseInt(deg/(360/users.length))
  const div = document.createElement("div")
  div.innerHTML = users[index];
  rs.appendChild(div)
  if(count.value.trim().length>0&&count.value>=0) 
  {
    if (auto_delete.checked){
      users=input.value.split('\n');
      users.splice(index,1)
      input.value = users.join("\n");
      
      draw(300,300,250,users);
    }
    console.log(index);
  }
  if(count.value>0){
    count.value--;
    
    setTimeout(()=>{
      
      turn_wheel()
    },1000)
    
  }
  else
    {
      if(count.value.trim()=="")
      showDialog({
        name:users[index],
        index:index,
        color:'#006eff'
      })
      if (auto_delete.checked){
        users=input.value.split('\n');
        users.splice(index,1)
        input.value = users.join("\n");
        
        draw(300,300,250,users);
      }
      if (count.value==0) count.value=""
    }
}

function showDialog(value={
  'name':'',
  'color':'',
  'index':-1,
}) {
  const bg = document.createElement("div");
  bg.id='bg'
  const dialog = document.createElement("div");
  dialog.id='dialog'

  const container = document.createElement("div");
  container.id='container'
  


  const header = document.createElement("div");
  header.className="header";
  header.innerHTML=`<span>WINNER</span>`
  header.style.backgroundColor = value.color;

  const content = document.createElement("div");
  content.className="content";


  const close = document.createElement("div");
  close.className="close";
  close.innerHTML = '<i class="fa-solid fa-xmark"></i>';

  const name = document.createElement("span");
  name.className = "name_winner"
  name.innerHTML=value.name

  
  close.onclick = function(){
    document.body.removeChild(bg);
  }

  
  header.appendChild(close);
  content.appendChild(name);
  container.appendChild(header);
  container.appendChild(content);

  const groupBTN = document.createElement("div");
  groupBTN.className="groupBTN"

  const button = document.createElement("div");
  button.className="button btn"
  button.innerHTML='Đóng'
  button.addEventListener("click", () => {
    document.body.removeChild(bg);
  });

  const remove = document.createElement("div");
  remove.className="remove btn"
  remove.innerHTML='Xóa'
  remove.addEventListener("click", () => {
    document.body.removeChild(bg);
    users=input.value.split('\n');
    users.splice(value.index,1)
    input.value = users.join("\n");
    draw(300,300,250,users);
  });

  groupBTN.appendChild(button)
  groupBTN.appendChild(remove)
  content.appendChild(groupBTN)
  dialog.appendChild(container)

  // Đặt dialog ở vị trí trung tâm màn hình
  bg.appendChild(dialog)
  
  document.body.appendChild(bg);

  if (count.value==0) count.value=""
}

const auto_delete = document.getElementById("auto_delete")
const count = document.querySelector(".count")
const sort = document.querySelector(".sort")
const derange = document.querySelector(".derange")
const input= document.getElementById("input");
const rs = document.querySelector(".result .main-result")


input.addEventListener("input",()=>{
  if (!running){
    users = input.value.split('\n');
    draw(300,300,250,users);
  }
  
})


derange.addEventListener("click",()=>{
  
  if (!running){
    users=input.value.split('\n');
    users.sort(() => Math.random() - 0.5);
    input.value = users.join("\n");
    draw(300,300,250,users);
  }
})

let desc = true;
sort.addEventListener("click",()=>{
  
  if (!running){
    users=input.value.split('\n');
    users.sort();
    if (desc) users.reverse();
    desc=!desc
    input.value = users.join("\n");
    draw(300,300,250,users);
  }
})




count.addEventListener("blur",()=>{
 // console.log(count.value);
  if (count.value.trim().length>0&&count.value>users.length-1)count.value=users.length-1
  if (count.value.trim().length>0&&count.value<1) count.value=1
  if (count.value>0)auto_delete.checked=true
  if (count.value==0) count.value=""
})

document.querySelector(".result .header .btn").addEventListener("click",()=>{
  document.querySelector(".result .main-result").innerHTML = ""
})
