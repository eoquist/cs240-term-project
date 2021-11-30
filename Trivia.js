const axios = require("axios");
let categories = document.querySelector("#categories")
let questions = 10;


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
        


