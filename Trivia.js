/**
 * Trivia.js Controls the game within trivia.html that opens after the door from index.html
 * Authors: Mitch Hurley and Madison Sanchez-Forman | Version: 12.15.21  */
const axios = require("axios"); //import axios

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
let questionNum = 5;
//add event listener to start button
button.addEventListener("mouseup", async function(){
    if (!playing){ //so that after the game starts, if the start button is hit again it will still only start once
        playing = true;
        await fade_in_david(400, "sfx/Old Man Sound Effects/Oh Hello.wav"); //bring in character
        startGame();
    }

})

/**
 * startGame() starts the trivia game once the start button has been clicked by sending and awaiting a request to the API that is generating the trivia questions.
 * It will also create html table elements, and then pass them to makeTable() where the full table will be generated
 */
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

/**
 * getAnswerOrder() takes the answers for a given question and assigns them to spots in the Trivia game.
 * @param {String} wrong - the incorrect answers for a given question
 * @param {String} right - the correct answer for a given question
 */
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
/**
 * makeQs sets the questions based on the category selected 
 * @param {String} questionsFlag - questions returned from API
 */
function makeQs(questionsFlag){
    document.getElementById(`cata`).innerHTML = questionsFlag.data[rounds].category;
    document.getElementById('question').innerHTML = questionsFlag.data[rounds].question;
    document.getElementById("qnum").innerHTML = `#${totalQs + 1}`;
    let wrong = getWrongAnswers(questionsFlag.data[rounds].incorrectAnswers);
    getAnswerOrder(wrong, questionsFlag.data[rounds].correctAnswer);
    console.log(questionsFlag.data[rounds].correctAnswer);
}
/**
 * getWrongAnswers() returns a randomized version of an array (used to randomize incorrect answers)
 * @param {Array} array - array of wrong answers
 * @returns temp - randomized array
 */
function getWrongAnswers(array){
    let temp = []
    for (let i = 0; i < 3; i++){
        let selected = array.splice(Math.floor(Math.random()*array.length), 1)
        temp[i] = selected[0]
        selected[0] = 0;
    }
    return temp;
}
/**
 * fade_in_david() will start with the wixardDavid.png at an opacity of 0, and increment it to give a fading in effect
 * @param {Int} ms - time in ms till david appears after click of start button
 * @param {String} sfx - sound file that david will "speak"
 */
async function fade_in_david(ms, sfx){
    var david = document.createElement("img"); //create david element
    david.src = "images/Davidwizard.png"; //set element img src
    david.style.opacity = 0; //set opacity to 0
    document.getElementById("mbar").appendChild(david);//append him to status bar
    david.style.position = "absolute";//positioning
    david.style.top= "150px";
    var op = parseFloat(0);
    let cont = false; //used for stopping condition
    
   
    david.style.setProperty("height", "500px"); //positioning
    david.style.setProperty("left", "1100px");
    david.style.setProperty("top", "200px");
    var david_greeting = new Audio(sfx).play(); //play sound 
    var timer = setInterval(function(){
     if(op >= 1.0){
         clearInterval(timer);
         cont = true;
     }
     op += 0.2;
     david.style.opacity = op;
    },ms);
    
    }

/**
 * wrongAns() is called if the user clicks the wrong answer to a question
 */
async function wrongAns(){
    if (hitPoints > 0){
        hitPoints--; //decrement lives
    await message_bar(`Wrong one, ${hitPoints} lives left`, "mbar", 0, 1700);
    var wrong_ans = new Audio("sfx/Old Man Sound Effects/Ouch 1.wav").play();
    if(hitPoints == 0){
         await message_bar("hahahah! you've died", "mbar", 0, 1700); //if out of lives end game
         location.pathname = "lose.html";
    }
     
}
    else await message_bar("You've Died!", "mbar", 0, 1700);
}
/**
 * rightAns() is called if the user clicks the correct answer to a question
 */
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
        await message_bar("You've Won!", "mbar", 0, 1700); //check winning condition (if 5 correct answers have been given)
        var game_won = new Audio("sfx/Old Man Sound Effects/You Did It 1.wav").play();
        location.pathname = "win.html";
    };
    
}
 if (hitPoints == 0) {
     await message_bar("You've Died!", "mbar", 0, 1700);
     location.pathname = "lose.html";
    }

}
/**
 * message_bar() will create and display a div element that will be used as a status bar to update the user about the 
 * lives they have remaining and right/wrong answers
 * @param {String} msg - message to be displayed
 * @param {String} css - css class to be associated with the status bar
 * @param {Int} delay1 - wait time until message appears (in ms)
 * @param {Int} delay2 - how long until it will be removed (in ms)
 * @returns 
 */
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
/**
 * Called within message bar to allow it to be reomved after a certain amount of time
 * @param {DOM Element} bar - element created in messgae_bar
 * @param {Int} delay -  how long until it will be removed (in ms)
 * @returns 
 */
  function remove_bar(bar,delay){
    return new Promise((resolve) => {
        setTimeout(() => {
            document.getElementById("mbar").removeChild(bar); 
            resolve(); // promise is resolved
        }, delay);
    });
  }
/**
 * Method that creates the trivia game table
 * @param {*} table - HTML table element
 * @param {*} thead - header of table element
 * @param {*} tbody - body of table element
 */
function makeTable(table, thead, tbody){
    let row_1 = document.createElement('tr'); //create main headings
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



    row_3.appendChild(row_3_data_1);
    row_3.appendChild(row_3_data_2);
    tbody.appendChild(row_3);

    let row_4 = document.createElement('tr');
    let row_4_data_1 = document.createElement('td');
    row_4_data_1.innerHTML = "2.";
    let row_4_data_2 = document.createElement('td');
    row_4_data_2.innerHTML = "Answer2";
    row_4_data_2.id = "Ans2"

    row_4.appendChild(row_4_data_1);
    row_4.appendChild(row_4_data_2);
    
    tbody.appendChild(row_4);

    let row_5 = document.createElement('tr');
    let row_5_data_1 = document.createElement('td');
    row_5_data_1.innerHTML = "3.";
    let row_5_data_2 = document.createElement('td');
    row_5_data_2.innerHTML = "Answer3";
    row_5_data_2.id = "Ans3"

    row_5.appendChild(row_5_data_1);
    row_5.appendChild(row_5_data_2);

    tbody.appendChild(row_5);

    let row_6 = document.createElement('tr');
    let row_6_data_1 = document.createElement('td');
    row_6_data_1.innerHTML = "4.";
    let row_6_data_2 = document.createElement('td');
    row_6_data_2.innerHTML = "Answer4";
    row_6_data_2.id = "Ans4"



    row_6.appendChild(row_6_data_1);
    row_6.appendChild(row_6_data_2);
    tbody.appendChild(row_6);
}

/**
 * getQuestions() is called ONLY if the category chosen was all
 * @returns JSON object from API
 */
async function getQuestions(){
    if (categories.value == "All"){
        let obj = await getQuestionsAny();
        return obj;
    } else {
        let obj = await getQuestionsSpec(categories.value);
        return obj;
    }
}
/**
 * getQuestionsAny() requests and returns JS object from the API if the chosen category was all
 * @returns - JSON object of questions
 */
async function getQuestionsAny(){
    try{
        let endpoint = `https://api.trivia.willfry.co.uk/questions?limit=${questionNum}`
        let response = await axios.get(endpoint);
        return response;
    } catch(err) {
        alert(err)
        return;}}

/**
 * getQuestionsSpec will return a JSON object of questions if cateogy wasnt all
 * @param {*} cate - category in select
 * @returns JSON object of specific questions if category isnt all
 */
async function getQuestionsSpec(cate){
        try{
            let endpoint = `https://api.trivia.willfry.co.uk/questions?categories=${cate}&limit=${questionNum}`
            let response = await axios.get(endpoint);
            return response;
        } catch(err) {
            alert(err)
            return;}}     
            
