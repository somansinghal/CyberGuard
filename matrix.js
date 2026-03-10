const canvas=document.getElementById("matrix")
const ctx=canvas.getContext("2d")

function resize(){
canvas.width=window.innerWidth
canvas.height=window.innerHeight
}

resize()

window.addEventListener("resize",resize)

const letters="01CYBERSECURITY"

const fontSize=14

const columns=canvas.width/fontSize

const drops=[]

for(let x=0;x<columns;x++){

drops[x]=1

}

function draw(){

ctx.fillStyle="rgba(0,0,0,0.05)"
ctx.fillRect(0,0,canvas.width,canvas.height)

ctx.fillStyle="#00ff9c"
ctx.font=fontSize+"px monospace"

for(let i=0;i<drops.length;i++){

const text=letters[Math.floor(Math.random()*letters.length)]

ctx.fillText(text,i*fontSize,drops[i]*fontSize)

if(drops[i]*fontSize>canvas.height&&Math.random()>0.975)

drops[i]=0

drops[i]++

}

}

setInterval(draw,33)