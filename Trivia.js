const axios = require("axios");

//variable that holds the questions
var questionsFlag;
//selector element for categories
let categories = document.querySelector("#categories");
//flag to see if a game is being played
let playing = false;
//start button
let button = document.querySelector("#button");
//list of rounds
let rounds = 0;
let hitPoints = 5;
let totalQs = 0;
button.addEventListener("mouseup", async function(){
    if (!playing){
        playing = true;
        await fade_in_david(400, "sfx/Old Man Sound Effects/This is Your Final Warning.wav");
        startGame();
    }

})
//Things to ask david
//Package for require

let questionNum = 5;
//TODO Keep track of questionNum and compare it to questions answered
//make a tally of right and wrong answers
//TODO Display basic Congratulations message


async function startGame(){
    //get questions from API
    questionsFlag = await getQuestions();

    //table making process
    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');

    table.appendChild(thead);
    table.appendChild(tbody);
    document.getElementById('body').appendChild(table);
    table.classList.add("table");
    //calls table maker to populate cells
    makeTable(table, thead, tbody);
    //dom manips the first question
    makeQs(questionsFlag);
    
}

//function that randomizes the answer order and attaches event listeners to right and wrong answers
function getAnswerOrder(wrong, right){
    //array of open spots
    let spots = [1,2,3,4]
    //loops to assign all the wrong answers to spots
    for (let i = 0; i < 3; i++){
        let chosenSpot =  spots.splice(Math.floor(Math.random()*spots.length), 1)
        let place = document.getElementById(`Ans${chosenSpot[0]}`)
        place.innerHTML = wrong[i];
        //clears leftover triggers
        place.replaceWith(place.cloneNode(true));
        document.getElementById(`Ans${chosenSpot[0]}`).addEventListener("mouseup", () =>{
            wrongAns();
        }, {once : true});
        //clearing chosen spot
        chosenSpot[0] = 0;
    }
    //puts right answer in remaining spots
    let rightSpot = document.getElementById(`Ans${spots[0]}`)
    //clears leftover triggers
    rightSpot.replaceWith(rightSpot.cloneNode(true));
    document.getElementById(`Ans${spots[0]}`).innerHTML = right;
    document.getElementById(`Ans${spots[0]}`).addEventListener("mouseup", () =>{
        rightAns();
    },{once : true});
}

//dom manipulates the catagory and questions in
function makeQs(questionsFlag){
    document.getElementById(`cata`).innerHTML = questionsFlag.data[rounds].category;
    document.getElementById('question').innerHTML = questionsFlag.data[rounds].question;
    document.getElementById("qnum").innerHTML = `#${totalQs + 1}`;
    let wrong = getWrongAnswers(questionsFlag.data[rounds].incorrectAnswers);
    getAnswerOrder(wrong, questionsFlag.data[rounds].correctAnswer);
    console.log(questionsFlag.data[rounds].correctAnswer);
}

function getWrongAnswers(array){
    let temp = []
    for (let i = 0; i < 3; i++){
        let selected = array.splice(Math.floor(Math.random()*array.length), 1)
        temp[i] = selected[0]
        selected[0] = 0;
    }
    return temp;
}
async function fade_in_david(ms, sfx){
    var david = document.createElement("img");
    david.src = "images/Davidwizard.png";
    david.style.opacity = 0;
    document.getElementById("mbar").appendChild(david);
    david.style.position = "absolute";
    david.style.top= "150px";
    var op = parseFloat(0);
    let cont = false;
    
    var david_greeting = new Audio(sfx).play();
    david.style.setProperty("height", "500px");
    david.style.setProperty("left", "1100px");
    david.style.setProperty("top", "200px");
    var timer = setInterval(function(){
     if(op >= 1.0){
         clearInterval(timer);
         cont = true;
     }
     op += 0.2;
     david.style.opacity = op;
    },ms);
    
    }
async function wrongAns(){
    if (hitPoints > 0){
        hitPoints--;
    await message_bar(`Wrong one, ${hitPoints} lives left`, "mbar", 0, 1700);
    var wrong_ans = new Audio("sfx/Old Man Sound Effects/Ouch 1.wav").play();
    if(hitPoints == 0){
         await message_bar("hahahah! you've died", "mbar", 0, 1700);
         location.pathname = "C:/Users/12064/Documents/0SoftEng/cs240-term-project/lose.html";
    }
     
}
    else await message_bar("You've Died!", "mbar", 0, 1700);
}
//winning condition isnt working properly

async function rightAns(){
    if (hitPoints > 0)
    {rounds++;
    totalQs++;
    if (rounds < questionNum){
        makeQs(questionsFlag);
        await message_bar(`Correct! ${totalQs} questions answered`, "mbar", 0, 1700);
        var right_ans = new Audio("sfx/Old Man Sound Effects/Yay.wav").play();
    }
    else if (rounds == questionNum) {
        await message_bar("You've Won!", "mbar", 0, 1700);
        var game_won = new Audio("sfx/Old Man Sound Effects/You Did It 1.wav").play();
        location.pathname = "C:/Users/12064/Documents/0SoftEng/cs240-term-project/win.html";
    };
    
}
 if (hitPoints == 0) {
     await message_bar("You've Died!", "mbar", 0, 1700);
     location.pathname = "C:/Users/12064/Documents/0SoftEng/cs240-term-project/lose.html";
    }

}

async function message_bar (msg, css, delay1,delay2) {
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
            await remove_bar(bar,delay2);
        }, delay1);
    });
  }

  function remove_bar(bar,delay){
    return new Promise((resolve) => {
        setTimeout(() => {
            document.getElementById("mbar").removeChild(bar); 
            resolve(); // promise is resolved
        }, delay);
    });
  }
//method that makes the q&a table and assigns ID's to specific elements
function makeTable(table, thead, tbody){
    let row_1 = document.createElement('tr');
    let heading_1 = document.createElement('th');
    heading_1.innerHTML = "Category:";
    let heading_2 = document.createElement('th');
    heading_2.id = "cata";

    let heading_3 = document.createElement('th');
    heading_3.id = "qnum";
    heading_3.colSpan = 5;

    row_1.appendChild(heading_1);
    row_1.appendChild(heading_2);
    row_1.appendChild(heading_3);

    thead.appendChild(row_1);


    // Creating and adding data to second row of the table
    let row_2 = document.createElement('tr');
    let row_2_data_1 = document.createElement('td');
    
    let row_2_data_2 = document.createElement('td');
 
    let row_2_data_3 = document.createElement('td');
    row_2_data_2.innerHTML = "FillerQ";
    row_2_data_2.id = "question";

    row_2.appendChild(row_2_data_1);
    row_2.appendChild(row_2_data_2);

    row_2.appendChild(row_2_data_3);
    tbody.appendChild(row_2);


    // Creating and adding data to third row of the table
    let row_3 = document.createElement('tr');
    let row_3_data_1 = document.createElement('td');
    row_3_data_1.innerHTML = "1.";
    let row_3_data_2 = document.createElement('td');
    row_3_data_2.innerHTML = "Answer1";
    row_3_data_2.id = "Ans1"
/*  let row_3_data_3 = document.createElement('td');
    row_3_data_3.innerHTML = "Select button";
    row_3_data_3.id = "op1" */


    row_3.appendChild(row_3_data_1);
    row_3.appendChild(row_3_data_2);
//  row_3.appendChild(row_3_data_3);
    tbody.appendChild(row_3);

    let row_4 = document.createElement('tr');
    let row_4_data_1 = document.createElement('td');
    row_4_data_1.innerHTML = "2.";
    let row_4_data_2 = document.createElement('td');
    row_4_data_2.innerHTML = "Answer2";
    row_4_data_2.id = "Ans2"
/*   let row_4_data_3 = document.createElement('td');
    row_4_data_3.innerHTML = "Select button";
    row_4_data_3.id = "op2"
 */

    row_4.appendChild(row_4_data_1);
    row_4.appendChild(row_4_data_2);
//  row_4.appendChild(row_4_data_3);
    tbody.appendChild(row_4);

    let row_5 = document.createElement('tr');
    let row_5_data_1 = document.createElement('td');
    row_5_data_1.innerHTML = "3.";
    let row_5_data_2 = document.createElement('td');
    row_5_data_2.innerHTML = "Answer3";
    row_5_data_2.id = "Ans3"
/*     let row_5_data_3 = document.createElement('td');
    row_5_data_3.innerHTML = "Select button";
    row_5_data_3.id = "op3" */

    row_5.appendChild(row_5_data_1);
    row_5.appendChild(row_5_data_2);
//    row_5.appendChild(row_5_data_3);
    tbody.appendChild(row_5);

    let row_6 = document.createElement('tr');
    let row_6_data_1 = document.createElement('td');
    row_6_data_1.innerHTML = "4.";
    let row_6_data_2 = document.createElement('td');
    row_6_data_2.innerHTML = "Answer4";
    row_6_data_2.id = "Ans4"
  /*   let row_6_data_3 = document.createElement('td');
    row_6_data_3.innerHTML = "Select button";
    row_6_data_3.id = "op4" */


    row_6.appendChild(row_6_data_1);
    row_6.appendChild(row_6_data_2);
//    row_6.appendChild(row_6_data_3);
    tbody.appendChild(row_6);
}
//method to determine what url to use for the api
async function getQuestions(){
    if (categories.value == "All"){
        let obj = await getQuestionsAny();
        return obj;
    } else {
        let obj = await getQuestionsSpec(categories.value);
        return obj
    }
}

//Function that grabs the questions of a random category from the api and returns a JSON object 
async function getQuestionsAny(){
    try{
        let endpoint = `https://api.trivia.willfry.co.uk/questions?limit=${questionNum}`
        let response = await axios.get(endpoint);
        return response;
    } catch(err) {
        alert(err)
        return;}}
//Function that grabs the questions of a specific category from the api and returns a JSON object       
async function getQuestionsSpec(cate){
        try{
            let endpoint = `https://api.trivia.willfry.co.uk/questions?categories=${cate}&limit=${questionNum}`
            let response = await axios.get(endpoint);
            return response;
        } catch(err) {
            alert(err)
            return;}}     
            
