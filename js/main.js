function setAttributes(el, attrs) {
    for(var key in attrs) {
      el.setAttribute(key, attrs[key]);
    }
}
/* window.addEventListener("load",()=>{
    canvas.width = screen.width / 1.5;
    document.body.style.minWidth = `${screen.width / 1.5}`;
}) */
const canvasContainer = document.querySelector(".canvas-container")
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const inputColor = document.querySelector(".input-color");
const inputRange = document.querySelector(".input-range");
const clearButton = document.querySelector(".option-clear");

const container =document.getElementById("container")
clearButton.addEventListener("click",()=>{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
})


inputColor.addEventListener("input",()=>{
    ctx.strokeStyle = inputColor.value;
})

inputRange.addEventListener("input",(e)=>{
    ctx.lineWidth = inputRange.value;
    document.getElementById("range-value").textContent = inputRange.value
})

let x, y,color;
let click = false;

canvas.addEventListener("mousedown",(evt)=>{
    let ClientRect = canvas.getBoundingClientRect();
    const xInicial = evt.clientX - ClientRect.left;
    const yInicial = evt.clientY - ClientRect.top;
    ctx.lineWidth = inputRange.value;
    ctx.beginPath();
    ctx.lineTo(xInicial,yInicial);
    click = true;
})

canvas.addEventListener("mousemove",(evt)=>{
    let ClientRect = canvas.getBoundingClientRect();
    x = evt.clientX - ClientRect.left;
    y = evt.clientY - ClientRect.top;
    if (click){
        ctx.lineTo(x,y);
        ctx.stroke();
    }

})

canvas.addEventListener("mouseup",()=>{
    ctx.closePath();
    click = false;
})


canvas.addEventListener("mouseleave",()=>{
    ctx.closePath();
    click = false;
})



document.querySelector(".modal-button").addEventListener("click",()=>{
    document.getElementById("modal").style.height = "100px"

    document.querySelector(".modal-title").style.marginTop ="20px"
    document.querySelector(".modal-title").style.fontSize ="50px"
    document.querySelector(".modal-button").style.opacity = "0"
    document.querySelector(".modal-desc").style.opacity = "0"
})

const downloadModal = document.querySelector(".download-modal")
const imgPreview = document.querySelector(".img-preview")

function downloadCanvas(){
    const dataURL = canvas.toDataURL()
    imgPreview.src = dataURL;
    confirmDownloadBtn.href = dataURL
    
}

const downloadBtn = document.querySelector(".download-btn")
const confirmDownloadBtn = document.querySelector(".confirm-download-btn")

downloadBtn.addEventListener("click",(e)=>{
    downloadModal.classList.remove("hidden")
    downloadCanvas()
})

document.querySelector(".cancel-btn").addEventListener("click",()=>{
    downloadModal.classList.add("hidden")
    artTitle.value = ""
})

const artTitle = document.querySelector(".art-title")
artTitle.addEventListener("input",(e)=>{
    if(e.target.value.length > 0 && e.target.value.trim().length > 0){
        confirmDownloadBtn.download= e.target.value + ".png"
        
    }else{

        confirmDownloadBtn.download= "canvaspainter.png"
    }
})

const eraserBtn = document.querySelector(".option-eraser")
const pencilBtn = document.querySelector(".option-pencil")
const pencilBox = document.querySelector(".option-pencilBox")
const eraserBox = document.querySelector(".option-eraserBox")

pencilBtn.addEventListener("click",()=>{
    eraserBox.classList.toggle("hidden")
    pencilBox.classList.toggle("hidden")
    canvas.style.cursor = "url('/cursors/pencil.ico'),auto"
    ctx.globalCompositeOperation="source-over";
})

eraserBtn.addEventListener("click",()=>{
    eraserBox.classList.toggle("hidden")
    pencilBox.classList.toggle("hidden")
    ctx.globalCompositeOperation="destination-out";
    canvas.style.cursor = "url('/cursors/eraser.ico'),auto"
})
const positions = document.querySelector(".positions")


