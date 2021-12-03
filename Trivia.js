const axios = require("axios");
let categories = document.getElementById("categories")
let playing = false;
let button = document.querySelector("button");
let questionNum = 10;
button.addEventListener("mouseup", () =>{
    console.log("clicked");
    if (!playing){
        playing = true;
        console.log("starting");
        startGame();
    }
    fade_in_david(400);
})
function sleep(d){
    return new Promise((resolve)=> setTimeout(resolve, d));
   }

async function fade_in_david(ms){
var david = document.createElement("img");
david.src = "images/Davidwizard.png";
david.style.opacity = 0;
document.getElementById("trivia_table").appendChild(david);
david.style.position = "absolute";
david.style.top= "150px";
var op = parseFloat(0);
let cont = false;

var david_greeting = new Audio("/sfx/Old Man Sound Effects/This is Your Final Warning.wav").play();
var timer = setInterval(function(){
 if(op >= 1.0){
     clearInterval(timer);
     cont = true;
     david.remove();
 }
 op += 0.2;
 david.style.opacity = op;
},ms);

}

async function startGame(){
    let questionsFlag =  getQuestions();
    console.log(questionsFlag);
    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');
    table.appendChild(thead);
    table.appendChild(tbody);
    document.getElementById("trivia_table").appendChild(table);

    makeTable(table, thead, tbody);
    document.getElementById('question').innerHTML = questionsFlag.data[0].question;
    console.log(table);
}

function makeTable(table, thead, tbody){
    let row_1 = document.createElement('tr');
    let heading_1 = document.createElement('th');
    heading_1.innerHTML = "Category:";
    let heading_2 = document.createElement('th');
    heading_2.innerHTML = "";
    let heading_3 = document.createElement('th');
    heading_3.innerHTML = "Question";


    row_1.appendChild(heading_1);
    row_1.appendChild(heading_2);
    row_1.appendChild(heading_3);

    thead.appendChild(row_1);


    // Creating and adding data to second row of the table
    let row_2 = document.createElement('tr');
    let row_2_data_1 = document.createElement('td');
    
    let row_2_data_2 = document.createElement('td');
 
    let row_2_data_3 = document.createElement('td');
    row_2_data_3.innerHTML = "FillerQ";
    row_2_data_3.id = "question";

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
    let row_3_data_3 = document.createElement('td');
    row_3_data_3.innerHTML = "Select button";
    row_3_data_3.id = "op1"


    row_3.appendChild(row_3_data_1);
    row_3.appendChild(row_3_data_2);
    row_3.appendChild(row_3_data_3);
    tbody.appendChild(row_3);

    let row_4 = document.createElement('tr');
    let row_4_data_1 = document.createElement('td');
    row_4_data_1.innerHTML = "2.";
    let row_4_data_2 = document.createElement('td');
    row_4_data_2.innerHTML = "Answer2";
    row_4_data_2.id = "Ans2"
    let row_4_data_3 = document.createElement('td');
    row_4_data_3.innerHTML = "Select button";
    row_4_data_3.id = "op2"


    row_4.appendChild(row_4_data_1);
    row_4.appendChild(row_4_data_2);
    row_4.appendChild(row_4_data_3);
    tbody.appendChild(row_4);

    let row_5 = document.createElement('tr');
    let row_5_data_1 = document.createElement('td');
    row_5_data_1.innerHTML = "3.";
    let row_5_data_2 = document.createElement('td');
    row_5_data_2.innerHTML = "Answer3";
    row_5_data_2.id = "Ans3"
    let row_5_data_3 = document.createElement('td');
    row_5_data_3.innerHTML = "Select button";
    row_5_data_3.id = "op3"

    row_5.appendChild(row_5_data_1);
    row_5.appendChild(row_5_data_2);
    row_5.appendChild(row_5_data_3);
    tbody.appendChild(row_5);

    let row_6 = document.createElement('tr');
    let row_6_data_1 = document.createElement('td');
    row_6_data_1.innerHTML = "4.";
    let row_6_data_2 = document.createElement('td');
    row_6_data_2.innerHTML = "Answer4";
    row_6_data_2.id = "Ans4"
    let row_6_data_3 = document.createElement('td');
    row_6_data_3.innerHTML = "Select button";
    row_6_data_3.id = "op4"


    row_6.appendChild(row_6_data_1);
    row_6.appendChild(row_6_data_2);
    row_6.appendChild(row_6_data_3);
    tbody.appendChild(row_6);

    console.log(table.no);
}
async function getQuestions(){
    if (categories.value == "All"){
        let obj = await getQuestionsAny();
        return obj;
    } else {
        let obj = await getQuestionsSpec(categories.value);
        return obj;
    }
}

//Function that grabs the questions of a random category from the api and returns a JSON object 
async function getQuestionsAny(){
    try{
        let endpoint = `https://api.trivia.willfry.co.uk/questions?limit=${questionNum}`
        let response = await axios.get(endpoint);
        return response;
    } catch(err) {
        console(err)
        return;
    }}
//Function that grabs the questions of a specific category from the api and returns a JSON object       
async function getQuestionsSpec(cate){
        try{
            let endpoint = `https://api.trivia.willfry.co.uk/questions?categories=${cate}&limit=${questionNum}`
            let response = await axios.get(endpoint);
            return response;
        } catch(err) {
            alert(err)
            return;
        }}     
        


