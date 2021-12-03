const axios = require("axios");
let categories = document.querySelector("#categories")
<<<<<<< HEAD
let questions = 10;
=======
let playing = false;
let button = document.querySelector("#button")
button.addEventListener("mouseup", () =>{
    if (!playing){
        playing = true;
        startGame();
    }
})
//Things to ask david
//Package for require

let questionNum = 10;
>>>>>>> 04b7e7e4706c444941349e80f1b066584801a2bc
//TODO Add button to start game and event listener for that
//TODO Once game starts, make new html elements for the options, including 3(?) incorrect options and the correct but randomized order
//TODO Give them a submit answer button that checks the selection is the same as the JSON objects correct answer
//TODO Display basic Congratulations message

async function startGame(){
    let questionsFlag = await getQuestions();

    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');

    table.appendChild(thead);
    table.appendChild(tbody);
    document.getElementById('body').appendChild(table);
    makeTable(table, thead, tbody);
    document.getElementById('question').innerHTML = questionsFlag.data[0].question;
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
        


