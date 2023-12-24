//const html2canvasMin = require("./html2canvas.min.js");

//import * as html2canvas from  "./html2canvas.min.js";
function changeColor_1(color){
  document.getElementById("color_1").style.backgroundColor=color
  document.getElementById("color_1").setAttribute("default",color)
}
function changeColor_2(color){
  document.getElementById("color_2").style.backgroundColor=color
  document.getElementById("color_2").setAttribute("default",color)
}
$(document).ready(async () => {
  
  let list_tkb=[]
 


    
    
    const getTimeStart = (section) => {
      switch (section) {
        case 1:
          return '7:00';
        case 2:
          return '7:50';
        case 3:
          return '9:00';
        case 4:
          return '9:50';
        case 5:
          return '10:40';
        case 6:
          return '13:00';
        case 7:
          return '13:50';
        case 8:
          return '15:00';
        case 9:
          return '15:50';
        case 10:
          return '16:40';
        case 11:
          return '17:40';
        case 12:
          return '18:30';
        case 13:
          return '19:20';
      }
    };
  
    const getTimeEnd = (section) => {
      switch (section) {
        case 1:
          return '7:50';
        case 2:
          return '8:40';
        case 3:
          return '9:50';
        case 4:
          return '10:40';
        case 5:
          return '11:30';
        case 6:
          return '13:50';
        case 7:
          return '14:40';
        case 8:
          return '15:50';
        case 9:
          return '16:40';
        case 10:
          return '17:30';
        case 11:
          return '18:30';
        case 12:
          return '19:20';
        case 13:
          return '20:10';
      }
    };

    const validateJson = (data)=>{
      return true
    }

    const listToCourse = (list)=>{
      return {
        "id": parseInt(list[0]),
        "name":list[1],
        "weekdayNumber":list[5],
        "room":list[8],
        "teacherName":list[9],
        "sectionStart":list[6],
        "sectionEnd": parseInt(list[6]) + parseInt(list[7]),
        "totalSection":list[7]
        
      
      }
    }

    const tableToJson = (data) =>{
      let list = data.split("\n");
      let d = [];
      let ids = [];
      for (l of list){
        let course = l.split('\t')
        let n=ids.indexOf(course[0]);
        
        if (n!=-1)
          course[0]=n+1;
        else {
          ids.push(course[0]);
          course[0]=ids.length;
        }
        
        d.push(listToCourse(course));
      }
      return d;
    }

    // Tạo và chỉnh sửa khóa học
  function showDialog(value={
      'name':'',
      'room':'',
      'teacherName':'',
      'id':'',
      "color_1":"#ffffff",
      "color_2":"#ffffff"
    },has=false) {
      const bg = document.createElement("div");
      bg.id='bg'
      const dialog = document.createElement("div");
      dialog.id='dialog'

      const close = document.createElement("div");
      close.className="close";
      close.innerHTML = '<i class="fa-solid fa-xmark"></i>';

      const name = document.createElement("input");
      name.className = "name_course"
      name.placeholder="Tên môn học"
      name.type="text"
      name.value=value.name

      const room = document.createElement("input");
      room.className = "room_course"
      room.placeholder="Phòng học"
      room.type="text"
      room.value=value.room

      const teacherName = document.createElement("input");
      teacherName.className = "teacherName_course"
      teacherName.placeholder="Tên giảng viên (Không bắt buộc)"
      teacherName.type="text"
      teacherName.value=value.teacherName



      // const color_1 = getComputedStyle(document.documentElement).getPropertyValue('--primary-'+value.id+'-color');
      // const color_2 = getComputedStyle(document.documentElement).getPropertyValue('--course-'+value.id+'-color');

 

      const color = document.createElement("div");
      color.className = "groupColor"
      const color_1 = document.createElement("div");
      color_1.className = "color"
      color_1.id='color_1'
      color_1.setAttribute("color-picked", "true")
      color_1.setAttribute("default",value.color_1)
      color_1.setAttribute("close","changeColor_1")
      color_1.style.backgroundColor = value.color_1
      const color_2 = document.createElement("div");
      color_2.className = "color"
      color_2.id='color_2'
      color_2.setAttribute("color-picked", "true")
      color_2.setAttribute("default",value.color_2)
      color_2.setAttribute("close","changeColor_2")
      color_2.style.backgroundColor = value.color_2
      color.appendChild(color_1)
      color.appendChild(color_2)
      
      close.onclick = function(){
        document.body.removeChild(bg);
      }

      

      dialog.appendChild(close);
      dialog.appendChild(name);
      dialog.appendChild(room);
      dialog.appendChild(teacherName);
      dialog.appendChild(color)

      const button = document.createElement("div");
      button.className="button"
      button.innerHTML='Xác nhận'
      button.addEventListener("click", () => {
        document.body.removeChild(bg);
        console.log(color_1.getAttribute("default"),color_2.getAttribute("default"));
        if (!has)
          addCourse({
            "name":name.value,
            "room":room.value,
            "teacherName":teacherName.value,
            "color_1":color_1.getAttribute("default"),
            "color_2":color_2.getAttribute("default")
          })
        else {
          value.name=name.value
          value.room=room.value
          value.teacherName=teacherName.value
          value.color_1 = color_1.getAttribute("default")
          value.color_2 = color_2.getAttribute("default")
          drawTimetable(list_tkb)
        }
        

      });
      
      dialog.appendChild(button);

      // Đặt dialog ở vị trí trung tâm màn hình
      bg.appendChild(dialog)
      
      document.body.appendChild(bg);
      cp.addEventListenerForColorPicker();
    }

    

    //Thêm tkb bằng mã
    function showAddCodeDialog() {
      const bg = document.createElement("div");
      bg.id='bg'
      const dialog = document.createElement("div");
      dialog.id='dialogAdd'

      const close = document.createElement("div");
      close.className="close";
      close.innerHTML = '<i class="fa-solid fa-xmark"></i>';

      const label = document.createElement('label')
      label.setAttribute('for','laguage')

      const laguage = document.createElement("select");
      laguage.className = "laguage"
      laguage.id = "laguage"
      laguage.innerHTML=`
      <option value='table'>Table</option>
      <option value='json'>JSON</option>
      `

      const code = document.createElement("textarea");
      code.rows=50
      code.cols=200
      code.className = "code"
      code.placeholder="Nhập văn bản"
      code.type="text"
      code.style.resize = "none"

      close.onclick = function(){
        document.body.removeChild(bg);
      }

      dialog.appendChild(close);
      dialog.appendChild(laguage);
      dialog.appendChild(code);

      const button = document.createElement("div");
      button.className="button"
      button.innerHTML='Xác nhận'
      button.addEventListener("click", () => {
        document.body.removeChild(bg);
        try {
          if (laguage.value=="json")
          {
            const data = JSON.parse(code.value)
            if (validateJson(data))
              {
                list_tkb = [...data]
                drawTimetable(list_tkb)
              }
          }
          else{
            if (laguage.value=="table")
            {
              const data = tableToJson(code.value)
              list_tkb = [...data];
              console.log(list_tkb);
              drawTimetable(list_tkb)
            }
          }
          
        } catch (error) {
          console.log(error);
        }
        

      });

      dialog.appendChild(button);

      // Đặt dialog ở vị trí trung tâm màn hình
      bg.appendChild(dialog)
      
      document.body.appendChild(bg);
    }
  // create a div wrapper time table
  const rootDivPanel = document.createElement('div');
  rootDivPanel.setAttribute('id', 'container_HKIT');
  rootDivPanel.style.height = $(window).height();

  let menu_hidden=true;
 

  $('body').append(rootDivPanel);
  const menu = document.createElement('div');
  menu.className="menu";
  menu.innerHTML=`
  <div id="drop_menu">
    <i class="fa-solid fa-chevron-down"></i>
  </div>
  `;
  
  
  const list_button = document.createElement('div');
  list_button.className="list_button";
  menu.append(list_button)
  $('body').append(menu);
  
  const download = document.createElement('div');
  download.innerHTML = `<div id="download">Tải TKB</div>`;
  
 
  list_button.append(download);
  

  const group = document.createElement('div');
  group.id = "group"
  group.className = "btn"
  group.innerHTML = `Tạo khóa`;
  list_button.append(group);

  const ungroup = document.createElement('div');
  ungroup.id = "ungroup"
  ungroup.innerHTML = `Xóa khóa`;
  ungroup.className = "btn"
  list_button.append(ungroup);

  const exportJSON = document.createElement('div');
  exportJSON.innerHTML = `<div id="exportJSON">Xuất Json</div>`;
  list_button.append(exportJSON);

  const importCode = document.createElement('div');
  importCode.id = "importCode"
  importCode.innerHTML = `Nhập mã`;
  importCode.className = "btn"
  importCode.setAttribute("disabled","true")
  list_button.append(importCode);


  const contextmenu = document.createElement("div")
  contextmenu.id="contextmenu"
  contextmenu.innerHTML=`
  <li id="modify"><i class="fa-solid fa-pen-to-square"></i><span>Chỉnh sửa</span></li>
  <li id="delete"><i class="fa-solid fa-trash-can"></i><span>Xóa</span></li>
  <li id="cut"><i class="fa-solid fa-scissors"></i><span>Cắt</span></li>
  <li id="copy"><i class="fa-regular fa-copy"></i><span>Sao chép</span></li>
  `
 


  // create table element
  const table = document.createElement('table');
  table.setAttribute('id', 'table_HKIT');
  table.innerHTML = `
    <thead>
        <td class="stt bg-white"></td>
        <td class="thead_td">Thứ Hai</td>
        <td class="thead_td">Thứ Ba</td>
        <td class="thead_td">Thứ Tư</td>
        <td class="thead_td">Thứ Năm</td>
        <td class="thead_td">Thứ Sáu</td>
        <td class="thead_td">Thứ Bảy</td>
        <td class="stt bg-white"></td>
      </thead>
    <tbody id="body_HKIT"></tbody>
  `;
  rootDivPanel.append(table);
  rootDivPanel.append(contextmenu);
  $('#contextmenu #modify').click(()=>{
    showDialog(list_tkb[courseInListByIndex(list_selected[0].getAttribute("no"))],has=true)
  })
  $('#contextmenu #delete').click(()=>{
    if (list_selected.length==1){
      list_tkb = list_tkb.filter((course)=>course.index!=list_selected[0].getAttribute("no"))
      drawTimetable(list_tkb)
    }
  })
  $('#contextmenu #cut').click(()=>{
    cut()
  })
  $('#contextmenu #copy').click(()=>{
    copy()
  })

  const tooltip = document.createElement("div");
  tooltip.innerHTML=`
  <h3 style="font-size:16px !important">Phím tắt</h3>
  <span style="font-size:14px !important">
    Để sao chép sử dụng <strong style="font-size:16px !important">Ctrl + C</strong> <br>
    Để dán khóa học vừa sao chép <strong style="font-size:16px !important">Ctrl + V</strong> <br>
    Di chuyển khóa học bằng cách <strong style="font-size:16px !important">Ctrl + X</strong> để cắt, dùng <strong style="font-size:16px !important">Ctrl + V</strong> để dán <br>
    Để thị thêm chức năng <strong style="font-size:16px !important">Nhấn Chuột Phải</strong> vào khóa học
  </span>
  `
  rootDivPanel.append(tooltip);


  // Vẽ bảng rỗng
  const table_body = $('#body_HKIT');
  // vẽ 12 hàng ngang
  function drawTable(){
    document.getElementById("body_HKIT").innerHTML=" ";
    for (let i = 1; i <= 12; i++) {
      const row = document.createElement('tr');
      for (let j = 1; j <= 8; j++) {
        const className = 'col_basic';
        const col = document.createElement('td');
        if (j == 1 || j == 8) {
          if (j==1){
            col.className = 'stt';
            col.innerHTML = '<div>' + 'Tiết ' + i + '</div>';
          }
          else{
            col.className = 'stt';
            col.innerHTML = '<div>' + getTimeStart(i) + " - " +getTimeEnd(i)+ '</div>';
          }
        } else {
          col.id = `d${j}_s${i}`;
          col.className = className;
        }
        row.append(col);
      }
      table_body.append(row);
    }
  }

  const courseInListByIndex = (index)=>{
    let i = 0;
    for (c of list_tkb){
      
      if (index==c.index) return i;
      i++;
    }
    return -1;
  }

  

  const processData = (tkb) => {
    listResults = [...tkb]


    // Sort lại môn học theo mã môn
    const courseCount = listResults.length;
    for (let i = 0; i < courseCount - 1; i++) {
      for (let j = i + 1; j < courseCount; j++) {
        if (listResults[i].id < listResults[j].id) {
          swap(listResults[i], listResults[j]);
        }
      }
    }

    // Sort theo ngày học (thứ)
    for (let i = 0; i < courseCount - 1; i++) {
      for (let j = i + 1; j < courseCount; j++) {
        if (listResults[i].weekdayNumber > listResults[j].weekdayNumber) {
          swap(listResults[i], listResults[j]);
        }
      }
    }

    // Sort theo tiết bắt đầu
    for (let i = 0; i < courseCount - 1; i++) {
      for (let j = i + 1; j < courseCount; j++) {
        if (listResults[i].sectionStart > listResults[j].sectionStart) {
          swap(listResults[i], listResults[j]);
        }
      }
    }

    return listResults;
  };

  const swap = (a, b) => {
    const temp = a;
    a = b;
    b = temp;
  };

  const position = (td)=> {
    return {
      "i":parseInt(td.id.split("_")[1].replace('s','')),
      "j":parseInt(td.id.split("_")[0].replace('d',''))
    }
  }

  const new_id= ()=>{
    if (list_tkb.length==0) return 1;
    let list=[]
    for (l of list_tkb){
      list.push(parseInt(l.id))
    }
    return (Math.max(...list)+1);
  }

  
  function addCourse(course){
    const weekdayNumber = position(list_selected[0]).j;
    let list = []
    for (l of list_selected){
      list.push(position(l).i)
    }
    const max = Math.max(...list);
    const min = Math.min(...list);
    const group = {
      "id": new_id(),
      "name": course.name,
      "weekdayNumber": weekdayNumber,
      "sectionStart": min,
      "sectionEnd": max,
      "totalSection": max-min+1,
      "room": course.room,
      "teacherName": course.teacherName,
      "color_1":course.color_1,
      "color_2":course.color_2
    }

    list_tkb.push({...group})
    drawTimetable(list_tkb)
  }

const colorCourseDefault_1=["#f75c1e", "#369925" ,"#0665e0" ,"#32abc6", "#ec9f3f" ,"#985bc7" , "#ea1e63" ,"#009788", "#795547" ,"#607d8" , "#f2f2f2"]
const colorCourseDefault_2=["#fee1d6",  "#ebf4e9",  "#e4eefc",  "#e7f7f5",  "#fdecd8",  "#f1e3fd",  "#fcdae5",  "#d5eeeb",  "#e9e3e1",  "#e5eae" , "#ffffff"]
const drawTimetable = (tkb) => {
  drawTable();
  let i=0;
  const data = processData(tkb);
  data.map((item, index) => {
    item['index']=index;
    const start = item.sectionStart;
    const day = item.weekdayNumber;
    const total = item.totalSection;

    const cell = $(`#d${day}_s${start}`);
    if (cell) {
      // cell.classList == 'course' : bị bỏ qua vì className không chỉ có mỗi course
      // API v2 đã fix lỗi này
      const classList = cell.attr('class') + '';
      if (classList == 'col_basic') {
        cell.attr('rowspan', total);

        cell.html(
          "<span class='text-color'>" +
            item.name +
            '</span>' +
            '<br />' +
            "<i class='text-mutted'>Phòng: </i>" +
            "<span class='text-color'>" +
            item.room +
            '</span>' +
            '<br />' +
            "<i class='text-mutted'>Giảng viên: </i>" +
            "<span class='text-color'>" +
            item.teacherName +
            '</span>'
        );

        const courseType = item.id;
        cell.addClass('course');
        //cell.addClass(`course-${courseType}`);

        if (!item['color_1']&&!item['color_2'])
        {
          item['color_1'] = colorCourseDefault_1[i]
          item['color_2'] = colorCourseDefault_2[i]
          if (i<colorCourseDefault_1.length)i++;
        }
        cell.css({'background-color': item["color_2"],"color":item["color_1"],"padding-left":"2px","border-left": "2px solid "+item['color_1']})

        let affected = item.sectionStart;
        for (let j = 0; j < item.totalSection - 1; j++) {
          affected++;
          const row = $(`#d${day}_s${affected}`);
          if (row != null) {
            row.remove();
          }
        }
        cell.attr('no',item.index);
        cell.attr('id_',item.id);
      }
    }
  });
  // thêm hàng thứ vào cuối
  const lastRow = document.createElement('tr');
  lastRow.innerHTML =
    '<td class="stt bg-white"></td>' +
    '<td class="thead_td">Thứ Hai</td>' +
    '<td class="thead_td">Thứ Ba</td>' +
    '<td class="thead_td">Thứ Tư</td>' +
    '<td class="thead_td">Thứ Năm</td>' +
    '<td class="thead_td">Thứ Sáu</td>' +
    '<td class="thead_td">Thứ Bảy</td>' +
    '<td class="stt bg-white"></td>';
  table_body.append(lastRow);


  document.querySelectorAll(".course").forEach((course)=>{
    course.addEventListener('dblclick',()=>{
      showDialog(list_tkb[courseInListByIndex(course.getAttribute("no"))],has=true)
    })
    course.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      if (list_selected.length==1)
      {
        contextmenu.style.display="block";
        contextmenu.style.top=event.y+window.scrollY+"px";
        contextmenu.style.left=event.x+"px";
      }
      
    });
    
  })

};

  


let mousedown = false;
let list_selected = []
let col_selected = -1;

function onMouseMove(event) {
  if (mousedown){
    if (event.target.className.indexOf("col_basic")!=-1)
      {
        let n = position(event.target).j
        if (event.target.nodeName=="TD" && n==col_selected)
        {
          if (event.target.className.indexOf("selected")==-1){
              event.target.classList.add("selected");
              list_selected.push(event.target);
            
          }
        }
      }

  }
}

// Lắng nghe sự kiện mousedown
table.addEventListener("mousedown", (event) => {
  mousedown= true;
  
  if (event.target.nodeName=="TD")
    {
      if (event.target.className.indexOf("col_basic")!=-1)
        {
          removeAllSelected()
          col_selected = position(event.target).j
      
          event.target.classList.add("selected");
          list_selected.push(event.target);
        }
    }
  
});

table.addEventListener("mouseup", (event) => {
  mousedown= false;
});

// Lắng nghe sự kiện mousemove
table.addEventListener("mousemove", onMouseMove);

function copy(){
  if (list_selected.length==1){
    if (list_selected[0].className.indexOf("course")!=-1){
      navigator.clipboard.writeText(JSON.stringify(list_tkb[courseInListByIndex(list_selected[0].getAttribute("no"))]));
    }
  }
}

function paste(pastedData){
  
  if (list_selected.length>0)
  try {
    const course = JSON.parse(pastedData)
    const weekdayNumber = position(list_selected[0]).j;
    let list = []
    for (l of list_selected){
      list.push(position(l).i)
    }
    const min = Math.min(...list);
    course.sectionStart=min;
    course.weekdayNumber=weekdayNumber
    list_tkb.push({...course})
    drawTimetable(list_tkb)
  } catch (error) {
    alert("Chỉ được dán khóa học")
  }
}

function cut(){
  try {
    if (list_selected.length==1){
      if (list_selected[0].className.indexOf("course")!=-1){
        navigator.clipboard.writeText(JSON.stringify(list_tkb[courseInListByIndex(list_selected[0].getAttribute("no"))]));
        list_tkb = list_tkb.filter((course)=>course.index!=list_selected[0].getAttribute("no"))
        drawTimetable(list_tkb)
      }
    }
  } catch (error) {
    console.log("Lỗi cắt")
  }
}

function removeAllSelected(){
  for (td of list_selected)
      td.classList.remove("selected")
  list_selected = [];
}

//Copy Course
document.addEventListener("keydown", (event) => {
  // Kiểm tra xem phím được nhấn có phải là ctrl+c không
  if (event.ctrlKey && event.keyCode === 67) {
    copy()
  }
});

//Paste Course
document.addEventListener("paste", (event) => {
  const pastedData = event.clipboardData.getData("text/plain");
  paste(pastedData)
  
  
});

document.addEventListener("cut", () => {
  cut()
});

document.addEventListener("mouseup",function(e){
  contextmenu.style.display="none";
  if (e.target.id==="container_HKIT")
    removeAllSelected()
  
  ungroup.setAttribute("disabled","true")
  if (list_selected.length==0){
    group.setAttribute("disabled","true")
    ungroup.setAttribute("disabled","true")
    
  } 
  else{
    group.removeAttribute("disabled")
    
    if (list_selected.length==1)
      if (list_selected[0].className.indexOf("course")!=-1)
        ungroup.removeAttribute("disabled")
  }


})


document.querySelectorAll(".btn").forEach((btn)=>{
  btn.addEventListener("click",()=>{
    if(btn.getAttribute("disabled")!="true"||btn.getAttribute("disabled")==null) btn.click();
  })
}
  
)

const disabledKeys = ["J", "u", "I"];
document.addEventListener("keydown", e => {
  if((e.ctrlKey && disabledKeys.includes(e.key)) || e.key === "F12") {
    e.preventDefault();
  }
});
document.addEventListener("contextmenu", e => {
  e.preventDefault();
});
window.addEventListener("load",function(){
  try {
    !function t(n) {
      1 === ("" + n / n).length && 0 !== n || function() {}.constructor("debugger")(), t(++n)
    }(0)
  } catch (n) {
    setTimeout(t, 100)
  }
});


//Bắt sự kiện click

$('#drop_menu').click(() => {
  if (menu_hidden){
    $('.list_button').css('height','100vh')
  }
  else $('.list_button').css('height','0')
  menu_hidden= !menu_hidden
});

$('#download').click(() => {
  removeAllSelected()
  const table = document.querySelector("#table_HKIT");
  html2canvas(table).then(canvas => {
    
    const imageDataUrl = canvas.toDataURL("image/png");
  
    const downloadLink = document.createElement("a");
    downloadLink.href = imageDataUrl;
    downloadLink.download = "Thời khóa biểu.png";
    downloadLink.click();
  });
});

group.click = function (){
  showDialog();
}

ungroup.click = function(){
  if (list_selected.length==1){
    ungroup.setAttribute("disabled","true")
    list_tkb = list_tkb.filter((course)=>course.index!=list_selected[0].getAttribute("no"))
    drawTimetable(list_tkb)
  }
}

$('#exportJSON').click(() => {
  const a= document.createElement('a');
  var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify([...list_tkb]));
  a.setAttribute("href", "data:"+data);
  a.setAttribute("download", "tkb.json"); 
  a.click();
});

importCode.click = function(){
  showAddCodeDialog();
}

drawTimetable(list_tkb);

const cp = new ColorPicker();
  
  

  
});
