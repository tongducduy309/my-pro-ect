

// const colors = ["#3369e8","#d50f25","#eeb211","#009925","#26a69a"]

/* --------------- Spin Wheel  --------------------- */
const spinWheel = document.getElementById("spinWheel");
const text = document.getElementById("text");
const spinBtn = document.getElementById('spin_btn');
const bgSpinBtn = document.querySelector('.bg_spin_btn');
const btnEditInput = document.querySelector('.btn-edit-input');
const btnResult = document.querySelector('.btn-result');
const divWheel = document.querySelector('.wheel');
const divOptions = document.querySelector('.options');
const divEditInput = document.querySelector('.options .editInput');
const divResult = document.querySelector('.options .result');
const btnCloseOptions = document.querySelector('.options .close-options');

/* --------------- Minimum And Maximum Angle For A value  --------------------- */
let spinValues;
/* --------------- Size Of Each Piece  --------------------- */

/* --------------- Background Colors  --------------------- */


let spinChart=null; 

function draw(users){
  let spinColors = ["#2b580c","#afa939","#f7b71d","#fdef96"]
  spinValues = []
  let i=0, step = 360/users.length, j=0
  // console.log(step);
  // console.log(users);
  let size = [];
  for (u of users){
    let g= { index:j, minDegree: i, maxDegree:i+step, value: u , color: spinColors[j++]}
    if(i>0) g.minDegree+=1
    if (j==4) j=0
    spinValues.push(g)
    
      
    size.push(10)
    i+=step
  } 
  // console.log(size);
  // console.log(spinValues);
  if (spinChart!=null)
  {
    spinChart.destroy()
  }
  spinChart = new Chart(spinWheel, {
    plugins: [ChartDataLabels],
    type: "pie",
    data: {
      labels: users,
      datasets: [
        {
          backgroundColor: spinColors,
          data: size,
        },
      ],
    },
    options: {
      animation: { duration: 0 },
      plugins: {
        tooltip: false,
        legend: {
          display: false,
        },
        datalabels: {
          rotation: 0,
          color: "#ffffff",
          formatter: (_, context) => context.chart.data.labels[context.dataIndex],
          font: { size: 24 },
          anchor: 'end', // Position labels at the end of arcs
          align: 'start', // Align labels to the start of the arc
          distance: 0
        },
      },
      elements: {
        arc: {
          borderWidth: 0 // Set borderWidth to 0 to remove the border
        }
      }
    },
  });
  
  
}

draw(["Yes","No","Yes","No","Yes","No"])


const audio = new Audio("./random/sound.mp3");

let running = false,j=0;


const generateValue = (angleValue) => {
  angleValue=450-angleValue
  if (angleValue>=360)angleValue=angleValue-360
  console.log(spinValues,angleValue);
  for (let i of spinValues) {
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      spinBtn.disabled = false;
      bgSpinBtn.style.animation='zoom-in-out 0.6s 0.5s infinite ease-in alternate'
      result(i,i.value,i.color)
      break;
    }
  }
};
/* --------------- Spinning Code --------------------- */
let resultValue = 101;
let c = 0
spinBtn.addEventListener("click", () => {
  turn_wheel()
});

function turn_wheel(){
  spinBtn.disabled = true;
  bgSpinBtn.style.animation='none'
  console.log("Rotate: "+spinChart.options.rotation);
  let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);

  let rotationInterval = window.setInterval(() => {
    spinChart.options.rotation = spinChart.options.rotation + resultValue;
    spinChart.update();
    if (spinChart.options.rotation >= 360) {
      c += 1;
      resultValue -= 5;
      spinChart.options.rotation = 0;
    } else if (c > 15 && spinChart.options.rotation == randomDegree) {
      generateValue(randomDegree);
      clearInterval(rotationInterval);
      c = 0;
      resultValue = 101;
    }
  }, 10);
}


function result(res){
  
  const div = document.createElement("div")
  div.innerHTML = res.value;
  rs.appendChild(div)
  if(count.value.trim().length>0&&count.value>=0) 
  {
    if (auto_delete.checked){
      users=input.value.split('\n');
      users.splice(res.index,1)
      input.value = users.join("\n");
      
    }
  }
  if(count.value>0){
    count.value--;
    
    setTimeout(()=>{
      
      turn_wheel()
    },1000)
    
  }
  else
    {
      showDialog({
        name:res.value,
        index:res.index,
        color:res.color
      })
      if (auto_delete.checked){
        users=input.value.split('\n');
        users.splice(res.index,1)
        input.value = users.join("\n");
        
        draw(users);
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

  if(device=="desktop")
    dialog.style.width = "400px"
  else dialog.style.width = screen.width*0.9+"px"

  const container = document.createElement("div");
  container.id='container'
  


  const header = document.createElement("div");
  header.className="header";
  header.innerHTML=`<span>KẾT QUẢ</span>`
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
    draw(cx,cy,radius,users);
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
    draw(users)
  }
  
})


derange.addEventListener("click",()=>{
  
  if (!running){
    users=input.value.split('\n');
    users.sort(() => Math.random() - 0.5);
    input.value = users.join("\n");
    draw(users);
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
    draw(users);
  }
})

function checkCount(){
  if (auto_delete.checked&&count.value.trim().length>0&&count.value>users.length-1)count.value=users.length-1
  if (count.value.trim().length>0&&count.value<1) count.value=1
  if (count.value==0) count.value=""
}

btnEditInput.addEventListener("click",()=>{
  divWheel.style.display='none'
  divOptions.style.display='block'
  divEditInput.style.display='block'
  divResult.style.display='none'
   
})

btnResult.addEventListener("click",()=>{
  divWheel.style.display='none'
  divOptions.style.display='block'
  divEditInput.style.display='none'
  divResult.style.display='block'
   
})

btnCloseOptions.addEventListener("click",()=>{
  divWheel.style.display='block'
  divOptions.style.display='none'
   
})


count.addEventListener("blur",()=>{
  checkCount()
})

document.querySelector(".result .header .btn").addEventListener("click",()=>{
  document.querySelector(".result .main-result").innerHTML = ""
})

auto_delete.addEventListener("click",()=>{
  checkCount()
})




let users = [];



const userAgent = navigator.userAgent;
let device;

if (/mobile/i.test(userAgent)) {
  //console.log("You are using a mobile device");
  spinWheel.style.height=screen.width+"px !important"
  spinWheel.style.width=screen.width+"px !important"
  document.querySelector(".main").style.height = document.querySelector(".main .title")+screen.width+"px"
  device="mobile"
} else {
  //console.log("You are using a desktop device");
  spinWheel.style.height=screen.width+"px !important"
  spinWheel.style.width=screen.width+"px !important"
  console.log(screen.width);
  document.querySelector(".main .content").style.height = window.innerHeight-document.querySelector(".main .title").getBoundingClientRect().height+"px"
  device="desktop"
}
