// TAB SWITCHING
function openTab(tabName){

    const tabs=document.querySelectorAll(".tab")
    
    tabs.forEach(tab=>{
    tab.style.display="none"
    })
    
    document.getElementById(tabName).style.display="block"
    
    }
    
    // show first tab
    openTab("password")
    
    
    
    /* =========================
       PASSWORD ANALYSIS
    ========================= */
    
    async function analyzePassword(){
    
    const loader=document.getElementById("scanLoader")
    const bar=document.getElementById("scanProgress")
    
    loader.style.display="block"
    
    bar.style.width="0%"
    
    let progress=0
    
    const interval=setInterval(()=>{
    
    progress+=10
    
    bar.style.width=progress+"%"
    
    if(progress>=100){
    
    clearInterval(interval)
    
    loader.style.display="none"
    
    runSecurityAnalysis()
    
    }
    
    },120)
    
    }
    
    
    
    function runSecurityAnalysis(){
    
    const password=document.getElementById("passwordInput").value
    
    if(password.length===0){
    alert("Enter a password first")
    return
    }
    
    const result=zxcvbn(password)
    
    const levels=["Very Weak","Weak","Fair","Strong","Very Strong"]
    
    // strength
    document.getElementById("strength").innerText=levels[result.score]
    
    // security score
    document.getElementById("score").innerText=result.score*20+"/100"
    
    // meter bar
    document.getElementById("meterBar").style.width=(result.score*25)+"%"
    
    // entropy
    calculateEntropy(password)
    
    // complexity
    showComplexity(password)
    
    // terminal animation
    simulateTerminal()
    
    }
    
    
    
    /* =========================
       ENTROPY CALCULATOR
    ========================= */
    
    function calculateEntropy(password){
    
    let charset=0
    
    if(/[a-z]/.test(password)) charset+=26
    if(/[A-Z]/.test(password)) charset+=26
    if(/[0-9]/.test(password)) charset+=10
    if(/[^a-zA-Z0-9]/.test(password)) charset+=32
    
    let entropy=Math.log2(Math.pow(charset,password.length))
    
    if(!entropy) entropy=0
    
    document.getElementById("entropy").innerText=Math.round(entropy)+" bits"
    
    }
    
    
    
    /* =========================
       COMPLEXITY CHECK
    ========================= */
    
    function showComplexity(password){
    
    const list=document.getElementById("complexity")
    
    list.innerHTML=""
    
    if(/[a-z]/.test(password))
    list.innerHTML+="<li>Lowercase letters</li>"
    
    if(/[A-Z]/.test(password))
    list.innerHTML+="<li>Uppercase letters</li>"
    
    if(/[0-9]/.test(password))
    list.innerHTML+="<li>Numbers</li>"
    
    if(/[^a-zA-Z0-9]/.test(password))
    list.innerHTML+="<li>Symbols</li>"
    
    }
    
    
    
    /* =========================
       TERMINAL ANIMATION
    ========================= */
    
    function simulateTerminal(){
    
    const terminal=document.getElementById("terminal")
    
    terminal.innerHTML=""
    
    const commands=[
    
    "> Initializing CyberGuard scan...",
    "> Loading password database...",
    "> Running brute force simulation...",
    "> Checking breach database...",
    "> Analyzing entropy...",
    "> Security scan complete."
    
    ]
    
    let i=0
    
    const interval=setInterval(()=>{
    
    terminal.innerHTML+=commands[i]+"<br>"
    
    terminal.scrollTop=terminal.scrollHeight
    
    i++
    
    if(i>=commands.length){
    
    clearInterval(interval)
    
    }
    
    },700)
    
    }
    
    
    
    /* =========================
       PASSWORD GENERATOR
    ========================= */
    
    function generatePassword(){
    
    const length=document.getElementById("length").value
    
    const chars="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*"
    
    let password=""
    
    for(let i=0;i<length;i++){
    
    password+=chars[Math.floor(Math.random()*chars.length)]
    
    }
    
    document.getElementById("generated").innerText=password
    
    }
    
    
    
    /* =========================
       HASH GENERATOR
    ========================= */
    
    async function generateHashes(){
    
    const text=document.getElementById("hashInput").value
    
    if(text.length===0){
    alert("Enter text first")
    return
    }
    
    const encoder=new TextEncoder()
    
    const data=encoder.encode(text)
    
    const hashBuffer=await crypto.subtle.digest("SHA-256",data)
    
    const hashArray=Array.from(new Uint8Array(hashBuffer))
    
    const hashHex=hashArray.map(b=>b.toString(16).padStart(2,"0")).join("")
    
    document.getElementById("sha256").innerText=hashHex
    
    }
    
    
    
    /* =========================
       EMAIL BREACH CHECK (DEMO)
    ========================= */
    
    function checkEmail(){
    
    const email=document.getElementById("emailInput").value
    
    if(email.length===0){
    alert("Enter email first")
    return
    }
    
    document.getElementById("emailResult").innerText="⚠️ Demo only: real breach check requires API key"
    
    }