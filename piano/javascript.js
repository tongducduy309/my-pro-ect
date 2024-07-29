let piano = {}
var notes = [
'A0',
'Bb0',
'B0',
'C1',//ĐÔ
'Db1',
'D1',//RÊ
'Eb1',
'E1',//MI
'F1',//FA
'Gb1',
'G1',//SOL
'Ab1',
'A1',//LA
'Bb1',
'B1',//SI
'C2',
'Db2',
'D2',
'Eb2',
'E2',
'F2',
'Gb2',
'G2',
'Ab2',
'A2',
'Bb2',
'B2',
'C3',
'Db3',
'D3',
'Eb3',
'E3',
'F3',
'Gb3',
'G3',
'Ab3',
'A3',
'Bb3',
'B3',
'C4',
'Db4',
'D4',
'Eb4',
'E4',
'F4',
'Gb4',
'G4',
'Ab4',
'A4',
'Bb4',
'B4',
'C5',
'Db5',
'D5',
'Eb5',
'E5',
'F5',
'Gb5',
'G5',
'Ab5',
'A5',
'Bb5',
'B5',
'C6',
'Db6',
'D6',
'Eb6',
'E6',
'F6',
'Gb6',
'G6',
'Ab6',
'A6',
'Bb6',
'B6',
'C7',
'Db7',
'D7',
'Eb7',
'E7',
'F7',
'Gb7',
'G7',
'Ab7',
'A7',
'Bb7',
'B7',
'C8',
];
var altNames = {
'A#0': 'Bb0',
'C#1': 'Db1',
'D#1': 'Eb1',
'F#1': 'Gb1',
'G#1': 'Ab1',
'A#1': 'Bb1',
'C#2': 'Db2',
'D#2': 'Eb2',
'F#2': 'Gb2',
'G#2': 'Ab2',
'A#2': 'Bb2',
'C#3': 'Db3',
'D#3': 'Eb3',
'F#3': 'Gb3',
'G#3': 'Ab3',
'A#3': 'Bb3',
'C#4': 'Db4',
'D#4': 'Eb4',
'F#4': 'Gb4',
'G#4': 'Ab4',
'A#4': 'Bb4',
'C#5': 'Db5',
'D#5': 'Eb5',
'F#5': 'Gb5',
'G#5': 'Ab5',
'A#5': 'Bb5',
'C#6': 'Db6',
'D#6': 'Eb6',
'F#6': 'Gb6',
'G#6': 'Ab6',
'A#6': 'Bb6',
'C#7': 'Db7',
'D#7': 'Eb7',
'F#7': 'Gb7',
'G#7': 'Ab7',
'A#7': 'Bb7',
};
const show_note = document.querySelector(".note")
notes.forEach((n)=>{
    piano[n]= new Audio(`./notes/${n}.mp3`)
    piano[n].load()

    // piano[n].addEventListener("playing",()=>{
    //     if (keyboards_key[n])
    //     {
    //         keyboards_key[n].classList.add("active")
    //     }
    // })

    // piano[n].addEventListener("ended",()=>{
    //     if (keyboards_key[n])
    //     {
    //         keyboards_key[n].classList.remove("active")
    //     }
    // })

    // piano[n].addEventListener("loadstart",()=>{
    //     if (keyboards_key[n])
    //     {
    //         keyboards_key[n].classList.remove("active")
    //     }
    // })
})

const keys = {
    q:'C1',
    w:'D1',
    e:'E1',//MI
    r:'F1',//FA
    t:'G1',//SOL
    y:'A1',//LA
    u:'B1',//SI
}

function PlayNote(note){
    piano[note].load()
    piano[note].play()
    show_note.innerHTML = note
}

const keyboards = document.querySelectorAll(".keyboards li")
let keyboards_key = {

}

keyboards.forEach((keyboard)=>{
    const note = keyboard.getAttribute("note")
    //keyboard.focus()
    
    keyboards_key[note]={
        key:keyboard,
        pressed:false
    }
    const div = document.createElement('div')
    div.className = 'nameNote'
    if (keyboard.className.indexOf('white')>-1)
        div.classList.add('nameNoteWhite')
    else div.classList.add('nameNoteBlack')
    div.textContent = note
    keyboard.append(div)

    keyboard.addEventListener("click",()=>{
        PlayNote(note)
        console.log(note);
        
    })

    keyboard.addEventListener("mousedown",()=>{
        if (!keyboards_key[note].pressed){
            
            if (keyboards_key[note].key)
            {
                keyboards_key[note].key.classList.add("active")
            }
            keyboards_key[note].pressed=true
        }
    })
    
    keyboard.addEventListener("mouseup",()=>{
        if (keyboards_key[note].pressed){
            if (keyboards_key[note].key)
            {
                keyboards_key[note].key.classList.remove("active")
            }
            keyboards_key[note].pressed=false
        }
    })

    keyboard.addEventListener("mouseleave",()=>{
        if (keyboards_key[note].pressed){
            if (keyboards_key[note].key)
            {
                keyboards_key[note].key.classList.remove("active")
            }
            keyboards_key[note].pressed=false
        }
    })
})

document.addEventListener('keydown', (event) => {
    if (!keyboards_key[keys[event.key]].pressed){
        keyboards_key[keys[event.key]].key.click()
        keyboards_key[keys[event.key]].key.classList.add("active")
        keyboards_key[keys[event.key]].pressed=true
    }
    
});

document.addEventListener('keyup', (event) => {
    keyboards_key[keys[event.key]].key.classList.remove("active")
    keyboards_key[keys[event.key]].pressed=false
    
});



