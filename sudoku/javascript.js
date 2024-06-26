import { Firestore } from "/firebase/connect-firebase.js";

const fs = new Firestore({
    apiKey: "AIzaSyAXtmyMCcSb2lig6GqhFaM_0oKHHa09HWI",
    authDomain: "newapp-a6378.firebaseapp.com",
    projectId: "newapp-a6378",
    storageBucket: "newapp-a6378.appspot.com",
    messagingSenderId: "440187362295",
    appId: "1:440187362295:web:effbea8486bad7f95a6cf2",
    measurementId: "G-CCDEXW4RG9"
  });

const board = document.getElementById("board")

let selected_cell = {i:-1,j:-1}
let cells=[]
let status_board = []
let writing = true;
let problem = [[0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],]
let groupDivBoard = {
    element:
    {
        square:{},
        col:{},
        row:{}
    },
    position:{
        square:{},
        col:{},
        row:{}
    }
}

let stack = []

const COLOR ={
    fore_fault:'red',
    fore_default:'#000',
    fore_write:'#0d95f0'
}

let numbers = {
    1:9,
    2:9,
    3:9,
    4:9,
    5:9,
    6:9,
    7:9,
    8:9,
    9:9

}

let needed = 9
let problems = {}

const levels = document.querySelectorAll(".levels .level")
const btnsGroupNumber=document.querySelectorAll('.groupBtnNumber div')
let level = "easy"



function getRandomInt(min, max) {
    if (max==min) return min
    return Math.floor((Math.random() * (max - min + 1)) + min); 
}

let storage_sudoku_status = null

async function getProblems(){
    let storage_sudoku = localStorage.getItem("storage_sudoku")
    storage_sudoku_status = localStorage.getItem("storage_sudoku_status")
    storage_sudoku = JSON.parse(storage_sudoku)
    if(storage_sudoku=='null'||storage_sudoku==null) storage_sudoku = {}
    problems = await fs.collection("sudoku").get("problems")
    let len = Object.keys(problems[level]).length
    let number_problem = getRandomInt(1,len)
    let number_problem_old = storage_sudoku.number_problem_old
    
    while (number_problem==number_problem_old)number_problem = getRandomInt(1,len)
    
    storage_sudoku['number_problem_old']=number_problem
    localStorage.setItem("storage_sudoku",JSON.stringify(storage_sudoku))
    createBoard(JSON.parse(problems[level][number_problem]))
    //createBoard(problem)
}
getProblems();
function createBoard(problem){
    board.innerHTML = ''
    numbers = {
        1:9,
        2:9,
        3:9,
        4:9,
        5:9,
        6:9,
        7:9,
        8:9,
        9:9
    
    }
    groupDivBoard = {
        element:
        {
            square:{},
            col:{},
            row:{}
        },
        position:{
            square:{},
            col:{},
            row:{}
        }
    }
    stack = []
    selected_cell = {i:-1,j:-1}
    cells = []
    status_board = []
    for (let i=0;i<9;i++){
        const tr = document.createElement("tr")
        let rows=[],rs=[]
        for (let j=0;j<9;j++){
            let number_group = Math.ceil((i+1)/3)*3+Math.ceil((j+1)/3)-3
            rs.push({write:(problem[i][j]==0),number:problem[i][j],note:[],g_square:number_group,g_col:j,g_row:i,valid:true})
            const td = document.createElement("td")
            if(problem[i][j]!=0 && numbers[problem[i][j]]>0) {
                td.textContent = problem[i][j]
                numbers[problem[i][j]]--;
                
            }
            const cls = `r${i}_c${j}`
            td.className = cls
            tr.appendChild(td)
            
            td.onclick = function(){
                selectedCell({i:i,j:j})
                
            }
            if (j==0){
                td.style.borderLeft = '2px solid #000'
            }
            if (i==0){
                td.style.borderTop = '2px solid #000'
            }
            if ((j+1)%3==0){
                td.style.borderRight = '2px solid #000'
            }
            if ((i+1)%3==0){
                td.style.borderBottom = '2px solid #000'
            }
            
            if (!(number_group in groupDivBoard.element.square)){
                groupDivBoard.element.square[number_group] = [td]
                groupDivBoard.position.square[number_group] = [{i:i,j:j}]
            }
            else {
                groupDivBoard.element.square[number_group].push(td)
                groupDivBoard.position.square[number_group].push({i:i,j:j})
            }
            if (!(j in groupDivBoard.element.col)){
                groupDivBoard.element.col[j] = [td]
                groupDivBoard.position.col[j] = [{i:i,j:j}]
            }
            else {
                groupDivBoard.element.col[j].push(td)
                groupDivBoard.position.col[j].push({i:i,j:j})
            }
            
            if (!(i in groupDivBoard.element.row)) {
                groupDivBoard.element.row[i] = [td]
                groupDivBoard.position.row[i] = [{i:i,j:j}]
            }
            else {
                groupDivBoard.element.row[i].push(td)
                groupDivBoard.position.row[i].push({i:i,j:j})
            }
            rows.push(td)
        }
        
        cells.push(rows)
        status_board.push(rs)
        board.appendChild(tr)
    }
    for(let i=0;i<9;i++){
        if (numbers[i+1]<=0) {
            needed--;
            btnsGroupNumber[i].style.visibility = 'hidden'
        }
    }
}

function selectedCell(cell){
    if (selected_cell.i!=-1)
        {
            let number_group = status_board[selected_cell.i][selected_cell.j].g_square;
            for (let i=0;i<9;i++){
                cells[i][selected_cell.j].style.backgroundColor = 'transparent'
                cells[selected_cell.i][i].style.backgroundColor = 'transparent'
                groupDivBoard.element.square[number_group][i].style.backgroundColor = 'transparent'
            }
        }
    
    let number_group = status_board[cell.i][cell.j].g_square;
    for (let i=0;i<9;i++){
        cells[i][cell.j].style.backgroundColor = 'rgba(202, 202, 202, 0.342)'
        cells[cell.i][i].style.backgroundColor = 'rgba(202, 202, 202, 0.342)'
        groupDivBoard.element.square[number_group][i].style.backgroundColor = 'rgba(202, 202, 202, 0.342)'
    }
    cells[cell.i][cell.j].style.backgroundColor = 'rgba(202, 202, 202, 0.8)'
    selected_cell = cell
    

}

function check(cell){
    let value = status_board[cell.i][cell.j].number
    let g_square = groupDivBoard.position.square[status_board[cell.i][cell.j].g_square]
    let g_col = groupDivBoard.position.col[status_board[cell.i][cell.j].g_col]
    let g_row = groupDivBoard.position.row[status_board[cell.i][cell.j].g_row]
    let fl=true
    let i=0
    for(let i=0;i<9;i++){
        if (cell.i!=g_square[i].i || cell.j!=g_square[i].j)
            {
                //stack[i_stack].cells.push({position:g_square[i],color:cells[g_square[i].i][g_square[i].j].style.color,valid:status_board[s.position.i][s.position.j].valid})
                if (value==status_board[g_square[i].i][g_square[i].j].number) {
                    //cells[g_square[i].i][g_square[i].j].style.color = COLOR.fore_fault
                    //status_board[g_square[i].i][g_square[i].j].valid=false
                    fl=false;
                }
                else {
                    //status_board[g_square[i].i][g_square[i].j].valid=false
                    if(status_board[g_square[i].i][g_square[i].j].write)//cells[g_square[i].i][g_square[i].j].style.color = COLOR.fore_default
                    //else 
                    {
                        cells[g_square[i].i][g_square[i].j].style.color = COLOR.fore_write
                    }
                }
            }
        if (cell.i!=g_col[i].i || cell.j!=g_col[i].j)
            {
                //stack[i_stack].cells.push({position:g_col[i],color:cells[g_col[i].i][g_col[i].j].style.color,valid:status_board[s.position.i][s.position.j].valid})
                if (value==status_board[g_col[i].i][g_col[i].j].number) {
                    //cells[g_col[i].i][g_col[i].j].style.color = COLOR.fore_fault
                    fl=false;
                }
                else if(status_board[g_col[i].i][g_col[i].j].write) //cells[g_col[i].i][g_col[i].j].style.color = COLOR.fore_default
                //else 
                cells[g_col[i].i][g_col[i].j].style.color = COLOR.fore_write
            }
        if (cell.i!=g_row[i].i || cell.j!=g_row[i].j)
            {
                //stack[i_stack].cells.push({position:g_row[i],color:cells[g_row[i].i][g_row[i].j].style.color,valid:status_board[s.position.i][s.position.j].valid})
                if (value==status_board[g_row[i].i][g_row[i].j].number) {
                    //cells[g_row[i].i][g_row[i].j].style.color = COLOR.fore_fault
                    fl=false;
                }
                else if(status_board[g_row[i].i][g_row[i].j].write) //cells[g_row[i].i][g_row[i].j].style.color = COLOR.fore_default
                //else 
                cells[g_row[i].i][g_row[i].j].style.color = COLOR.fore_write
            }
        i++;
    }
    //stack[i_stack].cells.push({position:cell,color:cells[cell.i][cell.j].style.color})
    if (!fl) {
        cells[cell.i][cell.j].style.color = COLOR.fore_fault
    }
    else 
        if(status_board[cell.i][cell.j].write) //cells[cell.i][cell.j].style.color = COLOR.fore_default
        //else 
        {
            cells[cell.i][cell.j].style.color = COLOR.fore_write
            

        }
    status_board[cell.i][cell.j].valid=fl
    return fl

}


function checkFinish(){
    for (let i=0;i<9;i++){
        for (let j=0;j<9;j++){
            if (status_board[i][j].valid==false) return false
        }
    }
    return true
}
function finishGame(){
    if (checkFinish())
        console.log("Finish");
    
}

function fill(index){
    console.log(needed,numbers);
    stack.push({position:selected_cell,number:status_board[selected_cell.i][selected_cell.j].number,note:[...status_board[selected_cell.i][selected_cell.j].note],numbers:{...numbers},needed:needed,cells:[],valid:status_board[selected_cell.i][selected_cell.j].valid})
    if (writing){
        if(status_board[selected_cell.i][selected_cell.j].write&&numbers[index+1]>0){
            cells[selected_cell.i][selected_cell.j].innerHTML=''
            cells[selected_cell.i][selected_cell.j].textContent = index +1
            //stack.push({position:selected_cell,number:status_board[selected_cell.i][selected_cell.j].number,note:status_board[selected_cell.i][selected_cell.j].note,numbers:numbers})
            if (status_board[selected_cell.i][selected_cell.j].number!=0) {
                numbers[status_board[selected_cell.i][selected_cell.j].number]++;
            }
            numbers[index+1]--;

            if (numbers[index+1]==0) {
                btnsGroupNumber[index].style.visibility='hidden'
                needed--;
            }
            else 
                if (status_board[selected_cell.i][selected_cell.j].number>0
                    &&btnsGroupNumber[status_board[selected_cell.i][selected_cell.j].number-1].style.visibility==='hidden') 
                    {
                        btnsGroupNumber[status_board[selected_cell.i][selected_cell.j].number-1].style.visibility='visible'
                        needed++;
                    }
            
            cells[selected_cell.i][selected_cell.j].classList.add('write')
            
            status_board[selected_cell.i][selected_cell.j].number=index +1
            status_board[selected_cell.i][selected_cell.j].note = []
            check(selected_cell)
            if (needed==0) finishGame()
        }
    }
    else{
        if(status_board[selected_cell.i][selected_cell.j].write){
            let n = status_board[selected_cell.i][selected_cell.j].note.indexOf(index+1)
            if (n==-1)
            {
                let note = document.createElement('div')
                note.className = `note_${index+1} note`
                note.textContent = index+1
                if (status_board[selected_cell.i][selected_cell.j].number!=0) {
                    cells[selected_cell.i][selected_cell.j].innerHTML=''
                    numbers[status_board[selected_cell.i][selected_cell.j].number]++;
                    if (numbers[index+1]==0) {
                        btnsGroupNumber[index].style.visibility='hidden'
                        needed--;
                    }
                    else 
                        if (status_board[selected_cell.i][selected_cell.j].number>0
                            &&btnsGroupNumber[status_board[selected_cell.i][selected_cell.j].number-1].style.visibility==='hidden') 
                            {
                                btnsGroupNumber[status_board[selected_cell.i][selected_cell.j].number-1].style.visibility='visible'
                                needed++
                            }
                    status_board[selected_cell.i][selected_cell.j].number=0
                    
                }
                cells[selected_cell.i][selected_cell.j].appendChild(note)
                status_board[selected_cell.i][selected_cell.j].note.push(index+1)
            }else{
                cells[selected_cell.i][selected_cell.j].removeChild(cells[selected_cell.i][selected_cell.j].querySelector(`.note_${index+1}`))
                status_board[selected_cell.i][selected_cell.j].note.splice(n,1)
            }   
        }
        
    }
}

function undo(){
    let last = stack.length
    if (last>0){
        let s = stack[last-1]
        selectedCell(s.position)
        numbers = s.numbers
        needed = s.needed
        if (s.note.length==0){
            if (s.number>0)
                cells[s.position.i][s.position.j].textContent = s.number
            else cells[s.position.i][s.position.j].textContent = ''
            
            
        }
        else{
            cells[s.position.i][s.position.j].innerHTML = ''
            for (let n in s.note){
                let note = document.createElement('div')
                note.className = `note_${n} note`
                note.textContent = n
                cells[s.position.i][s.position.j].appendChild(note)
                //status_board[s.position.i][s.position.j].valid = cells[s.position.i][s.position.j].valid
            }
            
        }
        //console.log(s.cells);
        // for (let cell of s.cells){
        //     cells[cell.position.i][cell.position.j].style.color=cell.color
        // }
        if (s.valid) cells[s.position.i][s.position.j].style.color = COLOR.fore_write
        else cells[s.position.i][s.position.j].style.color = COLOR.fore_fault
        status_board[s.position.i][s.position.j].note = s.note
        status_board[s.position.i][s.position.j].number = s.number
        status_board[s.position.i][s.position.j].valid = s.valid
        Object.keys(numbers).forEach((n)=>{
            btnsGroupNumber[n-1].style.visibility='visible'
            if (!writing) btnsGroupNumber[n-1].style.visibility='visible'
            else{
                if (numbers[n]<=0) btnsGroupNumber[n-1].style.visibility='hidden'
            }
        })
        //check(s.position)
        stack.splice(last-1,1)
    }
}



btnsGroupNumber.forEach((c,index)=>{
    c.addEventListener('click',()=>{
        setTimeout(()=>{
            if (selected_cell.i!=-1) fill(index)
        },100)
        
    })
})

document.addEventListener("keydown", async function(event) {
    const isNumber = /^[1-9]$/.test(event.key);
    if (isNumber){
        setTimeout(()=>{
            fill(event.key-1)
        },100)
    }
    else
    if (event.key === "Delete") {
        stack.push({position:selected_cell,number:status_board[selected_cell.i][selected_cell.j].number,note:[...status_board[selected_cell.i][selected_cell.j].note],numbers:{...numbers},needed:needed,cells:[],valid:status_board[selected_cell.i][selected_cell.j].valid})
        if(selected_cell.i!=-1&&status_board[selected_cell.i][selected_cell.j].write){
            
            if (status_board[selected_cell.i][selected_cell.j].number>0
                &&btnsGroupNumber[status_board[selected_cell.i][selected_cell.j].number-1].style.visibility==='hidden') 
                {
                    btnsGroupNumber[status_board[selected_cell.i][selected_cell.j].number-1].style.visibility='visible'
                    needed++
                }
            status_board[selected_cell.i][selected_cell.j].number = 0
            status_board[selected_cell.i][selected_cell.j].valid = true
            cells[selected_cell.i][selected_cell.j].textContent=''
        }
    }
    else
    if (event.ctrlKey && event.keyCode === 90) {
        setTimeout(()=>{
            undo()
        },100)
    }
  });

const toggleBtn = document.querySelector(".toggle");
toggleBtn.addEventListener("click", () => {
    toggleBtn.classList.toggle("active")
    writing=!writing
    if (writing){
        document.documentElement.style.setProperty('--c-btnNumber', '#5fb6f0');
    }else{
        document.documentElement.style.setProperty('--c-btnNumber', '#607a8b65');
    }
    Object.keys(numbers).forEach((n)=>{
        if (!writing) btnsGroupNumber[n-1].style.visibility='visible'
        else{
            if (numbers[n]<=0) btnsGroupNumber[n-1].style.visibility='hidden'
        }
    })
    
});
//createBoard(problem)

document.querySelector('.btnExport').addEventListener('click',async ()=>{
    let rows = '['
    for(let i=0;i<9;i++){
        let row='['
        for(let j=0;j<9;j++){
            row+=status_board[i][j].number
            if (j<8) row+=','
        }
        row+=']'
        rows+=row
        if (i<8) rows+=','
    }
    rows+=']'
    let value = {}
    let newProblem = {}
    newProblem[Object.keys(problems[level]).length+1]= rows
    value[level]={...problems[level],...newProblem}
    await fs.collection("sudoku").update("problems",value)
})


levels.forEach((eLevel)=>{
    
    eLevel.addEventListener('click',()=>{
        levels.forEach((btn)=>{
            if (eLevel.getAttribute("value")!=btn.getAttribute("value"))
                btn.style.backgroundColor = '#0d95f0'
            else {
                btn.style.backgroundColor = '#065488'
                level = eLevel.getAttribute("value")
                getProblems()
            }
        })
    
    })
})




