var problems = require('maths-problems');
var node = document.getElementById("chest");


async function beginning(){
    await mbar('Hahahaha! You\'ve fallen into my trap! If you\'re smart enough, you will be able to leave this room. BUT I don\'t think you are...','beginning','beginning-remarks',0,7000);
    await mbar('Try your best to figure out how to leave this room!','beginning','beginning-remarks',7000,5000);
}

beginning();

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
async function mbar (msg, css, div, delay1,delay2) {
    return new Promise((resolve) => {
        setTimeout(async () => {
            // CREATE BAR
            var bar = document.createElement("div");
            bar.innerHTML = msg;
            bar.classList.add(div);
            if (css) { bar.classList.add(css); }

            // APPEND TO CONTAINER
            document.getElementById(div).appendChild(bar);
            resolve(); // promise is resolved
            await remBar(bar,div,delay2);
        }, delay1);
    });
  }

  // REMOVE BAR
  function remBar(bar,div,delay){
    return new Promise((resolve) => {
        setTimeout(() => {
            document.getElementById(div).removeChild(bar); 
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
    var score = 1;
    numQ.innerHTML = "You have " + score + " questions left";
    table.appendChild(numQ);
    var timer = document.createElement('tr');
    var timeLeft = 30;
    var timerId = setInterval(countdown, 1000);
    function countdown() {
        if (timeLeft == 0 && score > 0) {
            clearTimeout(timerId);
            window.location = "https://www.youtube.com/embed/fUXtjdMWUHM?autoplay=1";
        } else {
          timer.innerHTML = timeLeft + ' seconds remaining';
          timeLeft--;
        }
    }
    table.appendChild(timer);

    var key = document.getElementById('key');
    key.src = "images/key.png";
    key.class = "interact";
    key.draggable = "true";
    var puz1 = document.createElement('img');
    puz1.setAttribute("draggable",false);
    puz1.id = "puzzleL";
    puz1.src = "icons/puzzle-piece1.png";
    var puz2 = document.createElement('img');
    puz2.setAttribute("draggable",false);
    puz2.id = "puzzleR";
    puz2.src = "icons/puzzle-piece2.png";

    input.addEventListener("keydown", async function(evt){
        // need to check if the return key was depressed
        if (evt.code === "Enter" && input.value !== "") {
            // check if the answer was correct
            if(randNum == 0){ // if it's an addition problem
                var theA = first + sec;
                if(input.value == theA){
                    var correct_ans = new Audio("sfx/8bit-SFX-Library/Win/win-8.wav").play();
                    await mbar('Correct!','mbar','mbar',0,1700);
                    score--;
                    numQ.innerHTML = "You have " + score + " questions left";
                }else{
                    var wrong_ans = new Audio("sfx/8bit-SFX-Library/Lose/lose-6.wav").play();
                    await mbar('Incorrect!','mbar','mbar',0,1700);
                }
            }
            if(randNum == 1){ // if it's a subtraction problem
                var theA = first - sec;
                if(input.value == theA){
                    var correct_ans = new Audio("sfx/8bit-SFX-Library/Win/win-8.wav").play();
                    await mbar('Correct!','mbar','mbar',0,1700);
                    score--;
                    numQ.innerHTML = "You have " + score + " questions left";
                }else{
                    var wrong_ans = new Audio("sfx/8bit-SFX-Library/Lose/lose-6.wav").play();
                    await mbar('Incorrect!','mbar','mbar',0,1700);
                }
            }
            if(randNum == 2){ // if it's a multiplication problem
                var theA = first * sec;
                if(input.value == theA){
                    var correct_ans = new Audio("sfx/8bit-SFX-Library/Win/win-8.wav").play();
                    await mbar('Correct!','mbar','mbar',0,1700);
                    score--;
                    numQ.innerHTML = "You have " + score + " questions left";
                }else{
                    var wrong_ans = new Audio("sfx/8bit-SFX-Library/Lose/lose-6.wav").play();
                    await mbar('Incorrect!','mbar','mbar',0,1700);
                }
            }
            if(score == 0){
                table.parentNode.removeChild(table);
                playing = false;
                finished = true;
                node.src = "images/open-chest.png";
                node.style.setProperty("height","43%");
                node.style.setProperty("left","890px");
                node.style.setProperty("top","500px");
                await mbar('AHA! I got the treasure chest to be opened!','mbar','mbar',0,3000);
                await mbar('Oh... there is nothing in there...','mbar','mbar',3000,3000);
                await mbar('WAIT! I see something!!!','mbar','mbar',3000,2000);
                let body = document.querySelector("body");
                body.appendChild(key);
                body.appendChild(puz1);
                body.appendChild(puz2);
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
  var playing = false;
  var finished = false;

let chest = document.getElementById("chest");
chest.addEventListener("click", async function(){
    if(!playing && !finished){
        playing = true;
        mathGame('math-game');
    }
});