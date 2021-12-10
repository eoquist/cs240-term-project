var problems = require('maths-problems');
var body = document.querySelector('body');

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

// MESSAGE BAR
async function mbar (msg, css, delay1,delay2) {
    return new Promise((resolve) => {
        setTimeout(async () => {
            // CREATE BAR
            var bar = document.createElement("div");
            bar.innerHTML = msg;
            bar.classList.add("mbar");
            if (css) { bar.classList.add(css); }
   
            // APPEND TO CONTAINER
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

  function mathGame(css){
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
    var multProblem = {
        "question" : "What is {x=randomInt(1,15)} * {y=randomInt(1,15)}?",
        "answer" : ["{x}*{y}"],
        "answerFormat" : "0"
    };
    // Generate an addition, subtraction, & a multiplication problem
    var questions = problems.generateQuestions([addProblem, subProblem, multProblem], [1,1,1]);
    console.log(questions);

    // CREATE TABLE
    var table = document.createElement("table");
    var thead = document.createElement("thead");
    var tr = document.createElement("tr");
    var trr = document.createElement("tr");
    var th = document.createElement("th");
    th.innerHTML = "You must complete these math equations in 30 seconds or the entire room will EXPLODE!!! HAHAHA!!!";
    tr.appendChild(th);
    thead.appendChild(tr);
    table.appendChild(thead);
    var tbody = document.createElement("tbody");
    var td = document.createElement("td");
    var randNum = Math.floor(Math.random() * 2);
    var theQ = questions[randNum].text;
    var first = questions[randNum].variables[0].value;
    var sec = questions[randNum].variables[1].value;
    td.innerHTML = theQ;
    trr.appendChild(td);
    tbody.appendChild(trr);
    table.appendChild(tbody);
    var input = document.createElement("input");
    table.appendChild(input);
    input.placeholder = "Input your answer here";
    var numQ = document.createElement("tr");
    var score = 10;
    numQ.innerHTML = "You have " + score + " questions left";
    table.appendChild(numQ);
    var timer = document.createElement('tr');
    var timeLeft = 30;
    var timerId = setInterval(countdown, 1000);
    function countdown() {
        if (timeLeft == -1) {
          clearTimeout(timerId);
        //   DO SOMETHING!!! GET YOU LOST HTML PAGE!! //
        } else {
          timer.innerHTML = timeLeft + ' seconds remaining';
          timeLeft--;
        }
    }
    table.appendChild(timer);

    var key = document.createElement('img');
    key.src = "images/key.png";
    key.id = "key";
    key.class = "interact";
    key.draggable = "true";
    key.ondragstart = DragEvent;

    input.addEventListener("keydown", async function(evt){
        // need to check if the return key was depressed
        if (evt.code === "Enter" && input.value !== "") {
            // check if the answer was correct
            if(randNum == 0){ // if it's an addition problem
                var theA = first + sec;
                if(input.value == theA){
                    await mbar('Correct!','mbar',0,1700);
                    score--;
                    numQ.innerHTML = "You have " + score + " questions left";
                }else{
                    await mbar('Incorrect!','mbar',0,1700);
                }
            }
            if(randNum == 1){ // if it's a subtraction problem
                var theA = first - sec;
                if(input.value == theA){
                    await mbar('Correct!','mbar',0,1700);
                    score--;
                    numQ.innerHTML = "You have " + score + " questions left";
                }else{
                    await mbar('Incorrect!','mbar',0,1700);
                }
            }
            if(randNum == 2){ // if it's a multiplication problem
                var theA = first * sec;
                if(input.value == theA){
                    await mbar('Correct!','mbar',0,1700);
                    score--;
                    numQ.innerHTML = "You have " + score + " questions left";
                }else{
                    await mbar('Incorrect!','mbar',0,1700);
                }
            }
            if(score == 0){
                table.parentNode.removeChild(table);
                let node = document.getElementById("chest");
                node.src = "images/open-chest.png";
                node.style.setProperty("height","43%");
                node.style.setProperty("left","890px");
                node.style.setProperty("top","460px");
                await mbar('AHA! I got the treasure chest to be opened!','mbar',0,3000);
                await mbar('Oh... there is nothing in there...','mbar',3000,3000);
                await mbar('WAIT! I see something!!!','mbar',3000,2000);
                body.appendChild(key);
            }
            // clear out the input field
            this.value = "";
            questions = problems.generateQuestions([addProblem, subProblem, multProblem], [1,1,1]);
            randNum = Math.floor(Math.random() * 2);
            theQ = questions[randNum].text;
            first = questions[randNum].variables[0].value;
            sec = questions[randNum].variables[1].value;
            td.innerHTML = theQ;
        }
    });
    table.classList.add("math-game");
    if (css) { table.classList.add(css); }

    // (B3) APPEND TO CONTAINER
    document.getElementById("math-game").appendChild(table);
  }


let chest = document.getElementById("chest");
chest.addEventListener("click", async function(){
    mathGame('math-game');
});
