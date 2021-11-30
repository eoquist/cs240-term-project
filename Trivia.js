const axios = require("axios");
let categories = document.querySelector("#categories")
let questions = 10;
//TODO Add button to start game and event listener for that
//TODO Once game starts, make new html elements for the options, including 3(?) incorrect options and the correct but randomized order
//TODO Give them a submit answer button that checks the selection is the same as the JSON objects correct answer
//TODO Display basic Congratulations message

//Function that grabs the questions of a random category from the api and returns a JSON object 
async function getQuestionsAny(){
    try{
        let endpoint = `https://api.trivia.willfry.co.uk/questions?limit=${questions}`
        let response = await axios.get(endpoint);
        return response;
    } catch(err) {
        alert(err)
        return;}}
//Function that grabs the questions of a specific category from the api and returns a JSON object       
async function getQuestionsSpec(){
        try{
            let endpoint = `https://api.trivia.willfry.co.uk/questions?categories=${categories}&limit=${questions}`
            let response = await axios.get(endpoint);
            return response;
        } catch(err) {
            alert(err)
            return;}}     
        


