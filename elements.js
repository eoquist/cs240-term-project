 let body = document.querySelector("body");
 // taken from https://www.sitepoint.com/create-one-time-events-javascript/
 function onetime(node, type, srcToSwap) { // create a one-time event
     node.addEventListener(type, function(e) { // create event
         e.target.src = srcToSwap;
         e.target.removeEventListener(e.type, arguments.callee); // remove event
     });
 }
 function onetimeClickSwap(node, srcToSwap) {
    node.addEventListener("click", function(e) { // create event
        e.target.src = srcToSwap;
        e.target.removeEventListener("click", arguments.callee); // remove event
    });
 }
 function clickSwap(node, src1, src2) {
    node.addEventListener("click", function(e){
        if(node.getAttribute("src") == src1){
            node.src = src2; 
        }
        else{
            node.src = src1;
        }
    }
    )}

function allowDrop(ev){
    ev.preventDefault();
}
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
  
async function drop(ev) {
    ev.preventDefault();
    document.querySelector("#lock").src = "images/open-lock.png";
    document.querySelector("#lock").height = "5%";
    await enlarge(document.querySelector("#lock"),"6%",60);
    await enlarge(document.querySelector("#lock"),"7%",60);
    await enlarge(document.querySelector("#lock"),"8%",60);
    await removeImg(document.querySelector("#lock"),1000);
    await removeImg(document.querySelector("#key"),0);
    let node = document.getElementById("door");
    let src2 = "images/door-openv4.png";
    node.src = src2; // set to open
    node.style.setProperty("height","592px");
    node.style.setProperty("left","563.5px");
    node.style.setProperty("top","192.5px");
}

function removeImg(ele, delay){
    return new Promise((resolve) => {
        setTimeout(() => {
            ele.parentNode.removeChild(ele);
            resolve(); // promise is resolved
        }, delay);
    });
}
function enlarge(ele,height,delay){
    return new Promise((resolve) => {
        setTimeout(() => {
            ele.style.setProperty("height",height);
            resolve(); // promise is resolved
        }, delay);
    });
}

function message(ele,message,delay){
    return new Promise((resolve) => {
        setTimeout(() => {
            ele.innerHTML = message;    
            resolve(); // promise is resolved
        }, delay);
    });
}

document.querySelector("#chest").addEventListener("click", async function(){
    let node = document.getElementById("chest");
    node.src = "images/open-chest.png";
    node.style.setProperty("height","43%");
    node.style.setProperty("left","890px");
    node.style.setProperty("top","460px");
});

// (B) MESSAGE BAR
async function mbar (msg, css, delay1,delay2) {
    return new Promise((resolve) => {
        setTimeout(async () => {
            // (B1) CREATE BAR
            var bar = document.createElement("div");
            bar.innerHTML = msg;
            bar.classList.add("mbar");
            if (css) { bar.classList.add(css); }
   
            // (B3) APPEND TO CONTAINER
            document.getElementById("mbar").appendChild(bar);
            resolve(); // promise is resolved
            await remBar(bar,delay2);
        }, delay1);
    });
  }

  function remBar(bar,delay){
    return new Promise((resolve) => {
        setTimeout(() => {
            document.getElementById("mbar").removeChild(bar); 
            resolve(); // promise is resolved
        }, delay);
    });
  }


let chest = document.getElementById("chest");
chest.addEventListener("click", async function(){
    await mbar('Oh... there is nothing in there...','mbar',0,3000);
    await mbar('WAIT! I see something!!!','mbar',3000,2000);
});

var problems = require('maths-problems');

var addProblem = {
  "question" : "What is {x=randomInt(1,15)} + {y=randomInt(1,15)}?",
  "answer" : ["{x}+{y}"],
  "answerFormat" : "0"
};
var subProblem = {
  "question" : "What is {x=randomInt(1,15)} - {y=randomInt(1,15)}?",
  "answer" : ["{x}-{y}"],
  "answerFormat" : "0"
};
// Generate 5 addition questions and 5 subtraction questions
var questions = problems.generateQuestions([additionProblem, subtractionProblem], [5,5]);
console.log(questions);