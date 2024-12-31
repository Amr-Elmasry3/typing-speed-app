// Access To Elements We Need Them

let loadingPage= document.querySelector(".loading-page");
let myGame= document.querySelector(".my-game")
let levelAndTime= document.querySelector(".level-time");
let level= document.querySelector(".level");
let seconds= document.querySelector(".seconds");
let btnStart= document.querySelector(".start");
let input= document.querySelector("input");
let wordsAppere= document.querySelector(".words");
let timeLimit= document.querySelector(".time");
let counter= document.querySelector(".counter");
let score= document.querySelector(".score");
let num1= document.querySelector(".num1");
let btnsLevel= Array.from(document.querySelectorAll(".choose-level button"));

// The Element Is Created Through The Program

let div= document.createElement("div");
div.style.cssText= "width: 100% ; background-color: transparent ; padding: 20px ; text-align: center ; font-size: 50px ; font-weight: bold ; color: #0075ff";

let divToButtonAndState= document.createElement("div");
divToButtonAndState.style.cssText= "width: fit-content ; background-color: white ; padding: 15px ; border-radius: 10px ; position: absolute ; top: 50%; left: 50% ; transform: translate(-50%,-50%) ; display: flex ; flex-direction: column ; gap: 25px ; box-shadow: 0 0 10px 0 #0d69d5";

let finishWithPassed= document.createElement("span");
finishWithPassed.style.cssText= "text-align: center ; color: #0d69d5 ; font-size: 40px ; font-weight: bold";
finishWithPassed.appendChild(document.createTextNode("Congratolations"));

let finishWithFalid= document.createElement("span");
finishWithFalid.style.cssText= "text-align: center ; color: red ; font-size: 40px ; font-weight: bold";
finishWithFalid.appendChild(document.createTextNode("Game Over"));

let againButton= document.createElement("button");
againButton.appendChild(document.createTextNode("Again"));
againButton.style.cssText= "text-align: center ; padding: 10px 20px ; font-size: 30px ; fonr-weight: bold ; border: none ; border-radius: 10px ; color: white ; background-color: #009688 ; cursor: pointer";

// Array Of Words For Three Levels

  // 1-Array Of Words For Easy Level
  let arrayOfEasyWords= ["Hello","Watch","Learn","Want","Need","Ask","Read","World","Lock","Load"];
  // 2-Array Of Words For Medium Level
  let arrayOfMediumWords= ["Country","Youtube","Facebook","Script","Paython","Coding","Runner","Playing","Working","Styling"];
  // 3-Array Of Words For Hard Level
  let arrayOfHardWords= ["Destructuring","Javascript","Programming","Linkedin","Dependencies","Paradigm","Cascade","Fundemental","GitHub","Internet"];

// Variables

let btnLevelContent= "Easy";
let temp= arrayOfEasyWords;
let timer= 8;
let loadingCount= 8;

// Array To Add In Localstorage

let detailsArray= [];

if (window.localStorage.getItem("details")){
  detailsArray= JSON.parse(window.localStorage.getItem("details"));
}

// Start The Main Code

window.onload= function (){
  let loadingCounter= setInterval(() => {
    loadingCount--;
    if (loadingCount === 0){
      clearInterval(loadingCounter);
      loadingPage.style.cssText= "display: none";
      loadingCount= 8;
    }
  },1000);
}

btnStart.onclick= function (){
  if (btnLevelContent === "Easy"){
    temp= arrayOfEasyWords;
    timer= 8;
    getWordInDiv();
  }
  else if (btnLevelContent === "Medium"){
    temp= arrayOfMediumWords;
    timer= 6;
    getWordInDiv();
  }
  else if (btnLevelContent === "Hard"){
    temp= arrayOfHardWords;
    timer= 4;
    getWordInDiv();
  }
}

// event Click In Buttons Level

btnsLevel.forEach((ele) => {
  ele.addEventListener("click",(eve) => {
    btnsLevel.forEach((ele) => {
      ele.classList.remove("active");
    })
    eve.currentTarget.classList.add("active");

    if (eve.currentTarget.innerHTML === "Easy"){
      level.innerHTML= `[ ${eve.currentTarget.innerHTML} ]`;
      seconds.innerHTML= "[ 8 ]";
      counter.innerHTML= "8";
      btnLevelContent= "Easy";
    }
    else if (eve.currentTarget.innerHTML === "Medium"){
      level.innerHTML= `[ ${eve.currentTarget.innerHTML} ]`;
      seconds.innerHTML= "[ 6 ]";
      counter.innerHTML= "6";
      btnLevelContent= "Medium";
    }
    else if (eve.currentTarget.innerHTML === "Hard"){
      level.innerHTML= `[ ${eve.currentTarget.innerHTML} ]`;
      seconds.innerHTML= "[ 4 ]";
      counter.innerHTML= "4";
      btnLevelContent= "Hard";
    }
  })
})

againButton.onclick= function (){
  window.location.reload();
}

storageMyScores();

// Functions

// Main Function Form Other Functions

function getWordInDiv(){
  input.focus();
  let randomIndex= Math.floor(Math.random() * temp.length);
  div.innerHTML= temp[randomIndex];
  btnStart.after(div);
  btnStart.style.cssText= "display: none";
  temp.splice(randomIndex,1);
  printWordsLevel();
  calcTimeAndScore(8);
}

// 1- Function To Print Words In The Array Level

function printWordsLevel (){
  wordsAppere.innerHTML= "";
  for (let i=0 ; i<temp.length ; i++){
    let span= document.createElement("span");
    span.innerHTML= temp[i];
    wordsAppere.appendChild(span);
  }
}

// 2- Function To Calc The Time And Score

function calcTimeAndScore(){
  counter.innerHTML= timer;
  let count= setInterval(() => {
    counter.innerHTML--;
    if (counter.innerHTML > 0){
      if (div.innerHTML === input.value){
        num1.innerHTML++;
        clearInterval(count);
        checkLenghtOfArray();
      }
    }
    if (counter.innerHTML == 0){
      clearInterval(count);
      if (div.innerHTML === input.value){
        num1.innerHTML++;
        checkLenghtOfArray();
      }
      else {
        storeDetailsRound();
        input.value="";
        divToButtonAndState.appendChild(finishWithFalid);
        divToButtonAndState.appendChild(againButton);
        myGame.appendChild(divToButtonAndState);
      }
    }
  },1000)
}

// 3- Function To Check The Lenght Of Array

function checkLenghtOfArray(){
  if (temp.length > 0){
    input.value= "";
    getWordInDiv();
  }
  else {
    storeDetailsRound();
    input.value="";
    wordsAppere.innerHTML= "The Words Are Finished";
    divToButtonAndState.appendChild(finishWithPassed);
    divToButtonAndState.appendChild(againButton);
    myGame.appendChild(divToButtonAndState);
  }
}

// 4- Function To Store The Details Of Round

function storeDetailsRound(){
  let detailsOfRound= {
    score: num1.innerHTML,
    level: btnLevelContent,
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
    hours: new Date().getHours(),
    minutes: new Date().getMinutes(),
    seconds: new Date().getSeconds(),
  };
  detailsArray.push(detailsOfRound);
  window.localStorage.setItem("details",JSON.stringify(detailsArray));
}

// 5- Function To Storage My Scores

function storageMyScores(){
  let notFound= document.querySelector(".not-found");
  if (detailsArray.length > 0){
    notFound.style.cssText= "display: none";
    for (let i=0 ; i<detailsArray.length ; i++){
      let myScore= document.querySelector(".my-scores");
      // Creat Element

      let roundDiv= document.createElement("div");
      let dateAndTimeAndLevelDiv= document.createElement("div");
      let dateDiv= document.createElement("div");
      let timeDiv= document.createElement("div");
      let scoreDiv= document.createElement("div");
      let levelDiv= document.createElement("div");

      // Creat Text In Element
  
      dateDiv.appendChild(document.createTextNode(`Expiry Date: ${detailsArray[i].year} / ${detailsArray[i].month} / ${detailsArray[i].day}`));
      timeDiv.appendChild(document.createTextNode(`End Time: ${detailsArray[i].hours} : ${detailsArray[i].minutes} : ${detailsArray[i].seconds}`));
      scoreDiv.appendChild(document.createTextNode(`Score: ${detailsArray[i].score}`));
      levelDiv.appendChild(document.createTextNode(`Level: ${detailsArray[i].level}`))

      // Adjust Elements By CSS

      roundDiv.style.cssText= "display: flex ; align-items: center ; justify-content: space-between ; padding: 10px ; background-color: white ; border-radius: 15px";
      dateAndTimeAndLevelDiv.style.cssText= "display: flex ; flex-direction: column ; align-items: flex-start ; gap: 10px";
      levelDiv.style.cssText= "background-color: #009688 ; color: white ; font-size: 14px ; padding: 5px ; border-radius: 6px ; box-shadow: 2px -2px 2px #0000007d";
      dateDiv.style.cssText= "background-color: #009688 ; color: white ; font-size: 14px ; padding: 5px ; border-radius: 6px ; box-shadow: 2px -2px 2px #0000007d";
      timeDiv.style.cssText= "background-color: #009688 ; color: white ; font-size: 14px ; padding: 5px ; border-radius: 6px ; box-shadow: 2px -2px 2px #0000007d";
      scoreDiv.style.cssText= "background-color: #009688 ; color: white ; font-size: 20px ; padding: 5px ; border-radius: 6px ; box-shadow: inset -5px -5px 10px #006c63,inset 5px 5px 10px #006c63";

      // Append Childs To Their Father
  
      dateAndTimeAndLevelDiv.appendChild(levelDiv);
      dateAndTimeAndLevelDiv.appendChild(dateDiv);
      dateAndTimeAndLevelDiv.appendChild(timeDiv);
      roundDiv.appendChild(scoreDiv);
      roundDiv.appendChild(dateAndTimeAndLevelDiv);
      myScore.appendChild(roundDiv);
    }
  }
  else {
    notFound.style.cssText= "display: block";
  }
}

// 3

