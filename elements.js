var problems = require('maths-problems');
var node = document.getElementById("chest");

/**
 * This function creates a message bar that contains the beginning messages of the game. 
 * @param {String} msg The message to be displayed on the screen
 * @param {String} css The css class element for the message
 * @param {String} div The div to attach the message bar to
 */
function mesBar (msg, css, div) {
    // CREATE BAR
    var button = document.createElement("button");
    var theBar = document.createElement("div");
    theBar.innerHTML = msg;
    theBar.classList.add(div);
    if (css) { theBar.classList.add(css); }
    button.innerHTML = "next";
    button.classList.add("button");
    theBar.appendChild(button);

    // APPEND TO CONTAINER
    document.getElementById(div).appendChild(theBar);
    button.addEventListener("click", function(){
        if(theBar.innerHTML = "Hahahaha! You\'ve fallen into my trap! If you\'re smart enough, you will be able to leave this room. BUT I don\'t think you are..."){
            theBar.innerHTML = "Try your best to figure out how to leave this room!";
            theBar.appendChild(button);
            button.addEventListener("click", function(){
                if(theBar.innerHTML = "Try your best to figure out how to leave this room!"){
                    theBar.parentNode.removeChild(theBar);
                }
            });
        }
    });
  }
mesBar('Hahahaha! You\'ve fallen into my trap! If you\'re smart enough, you will be able to leave this room. BUT I don\'t think you are...','beginning','beginning-remarks');

/**
 * This function creates a Promise that creates a message bar after delay1 amount of
 * milliseconds, and then deletes it after delay2 amount of milliseconds
 * @param {String} msg The message to be displayed
 * @param {String} css The css class element for the message
 * @param {String} div The div to attach the message bar to
 * @param {Int} delay1 The delay before the message appears
 * @param {Int} delay2 The delay before the message is deleted
 * @returns The Promise to create a message bar
 */
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

/**
 * This function creates a Promise to delete the message bar
 * @param {String} bar The bar to be removed
 * @param {String} div The div element that contains the bar
 * @param {Int} delay The amount of time the Promise should be delayed before the bar is removed
 * @returns The Promise to remove the message bar
 */
  function remBar(bar,div,delay){
    return new Promise((resolve) => {
        setTimeout(() => {
            document.getElementById(div).removeChild(bar); 
            resolve(); // promise is resolved
        }, delay);
    });
  }

/**
 * This function creates the math game. This function creates a div that holds the math game and 
 * uses the maths-problems API to generate random math equations. They must finish a total of 10
 * math equations within 30 seconds or else the user will be sent to a Youtube video of an 
 * explosion.
 * @param {String} css The css element to connect the table to
 */
function mathGame(css){

    // CREATE MATH EQUATIONS
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

    // GENERATE AN ADDITION, SUBTRACTION, & MULTIPLICATION PROBLEM
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
<<<<<<< HEAD
    var score = 10;
=======
    var score = 10; // THE AMOUNT OF QUESTIONS TO BE ANSWERED
>>>>>>> e18629e (commented elements.js and index.html & deleted unnecessary files - potionroom and header files)
    numQ.innerHTML = "You have " + score + " questions left";
    table.appendChild(numQ);
    var timer = document.createElement('tr');
    var timeLeft = 30;
    var timerId = setInterval(countdown, 1000);
    /**
     * This function creates a timer that counts down, and when it reaches 0, it sends the user
     * to a Youtube video of an explosion
     */
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

    // CREATED THE KEY IMG ELEMENT
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

    /**
     * This event listener checks to see if the player's input was correct
     */
    input.addEventListener("keydown", async function(evt){
        // NEED TO CHECK IF RETURN KEY IS PRESSED
        if (evt.code === "Enter" && input.value !== "") {
            // CHECK IF ANSWER IS CORRECT
            if(randNum == 0){ // IF IT'S AN ADDITION PROBLEM
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
            if(randNum == 1){ // IF IT'S A SUBTRACTION PROBLEM
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
            if(randNum == 2){ // IF IT'S A MULTIPLICATION PROBLEM
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
            // IF SCORE IS 0, THEN REMOVE THE MATH GAME DIV AND OPEN THE TREASURE CHEST AND ALLOW PLAYER TO GET KEY
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
            // CLEAR OUT INPUT FIELD
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

    // APPEND TO CONTAINER
    document.getElementById("math-game").appendChild(table);
}

var playing = false; // CHECK IF PLAYER IS PLAYING
var finished = false; // CHECK IF PLAYER IS FINISHED

/**
 * This event listener checks to make sure the player is not already playing the math game and is not
 * already finished with the math game to be able to play the math game when the treasure chest is clicked
 */
let chest = document.getElementById("chest");
chest.addEventListener("click", async function(){
    if(!playing && !finished){
        playing = true;
        mathGame('math-game');
    }
});