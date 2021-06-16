import {FA} from "./fa.js";
import {FAScene} from "./fa-scene.js";

let cWidth = document.getElementById("controlBar").clientWidth;
let cHeight = document.getElementById("canvasDiv").clientHeight;

let canvas = document.createElement("canvas");
canvas.width = cWidth;
canvas.height = cHeight;
canvas.style.border = "1px solid #000000";
document.getElementById("canvasDiv").appendChild(canvas);

let scene = new FAScene(canvas);
let autoTimer = null;

let autoButton = document.getElementById("autoButton");
autoButton.addEventListener("click",autoStep);

let pauseButton = document.getElementById("pauseButton");
pauseButton.addEventListener("click",pause);

let stepButton = document.getElementById("step");
stepButton.addEventListener("click",stepButtonHandler);

let setInputButton = document.getElementById("set");
setInputButton.addEventListener("click",setInputHandler);

let resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click",reset);

let newButton = document.getElementById("newButton");
newButton.addEventListener("click",newFA);

let loadButton = document.getElementById("loadButton");
loadButton.addEventListener("click",load);

let saveButton = document.getElementById("saveButton");
saveButton.addEventListener("click",save);

function setStatus(statusMessage) {
    let statusDisplay = document.getElementById("statusDisplay");
    statusDisplay.innerHTML = statusMessage;
}

function verifyStartExists() {
    if(FA.startState == null) {
        alert("Error: There is no start state");
        return false;
    }
    setStatus("Start");
    return true;
}

function setInputHandler() {
    if(!verifyStartExists()) {return;}
    let stringInput = document.getElementById("stringInput");
    FA.reset(stringInput.value);
    scene.drawAll();
    let stepDisplay = document.getElementById("stepDisplay");

    while(stepDisplay.firstChild) {
        stepDisplay.removeChild(stepDisplay.firstChild);
    }

    for(let c of stringInput.value) {
        let characterDiv = document.createElement("div");
        characterDiv.innerHTML = c;
        stepDisplay.appendChild(characterDiv);
    }
    stringInput.value = "";
}

function reset() {
    if(!verifyStartExists()) {return;}
    FA.reset();
    scene.drawAll();
    let stepDisplay = document.getElementById("stepDisplay");
    while(stepDisplay.firstChild) {
        stepDisplay.removeChild(stepDisplay.firstChild);
    }
    for(let c of FA.input) {
        let characterDiv = document.createElement("div");
        characterDiv.innerHTML = c;
        stepDisplay.appendChild(characterDiv);
    }
}

//Starts automatically stepping through the input string
//every timeInterval milliseconds.
function autoStep() {
    pause();
    let speed = Number(document.getElementById("speedSelect").value);
    let timeInterval = 1000/speed;
    autoTimer = setInterval(stepButtonHandler,timeInterval);
}

function pause() {
    if(autoTimer != null) {
        clearTimeout(autoTimer);
        autoTimer = null;
    }
}

function stepButtonHandler() {
    let stepDisplay = document.getElementById("stepDisplay");
    if(FA.inputIndex > 0) {
            stepDisplay.childNodes[FA.inputIndex-1].style.color = "black";
    }
    if(FA.inputIndex >= FA.input.length) {
        pause();
        let accepted = false;
        for(let state of FA.states) {
            if(state.current && state.accept) {
                accepted = true;
                break;
            }
        }
        if(accepted) {
            setStatus("String Accepted")
        }
        else {
            setStatus("String Rejected")
        }
        return;
    }
    FA.step();
    scene.drawAll()

    stepDisplay.childNodes[FA.inputIndex].style.color = "blue";

    FA.inputIndex++;
    setStatus("Testing...");
}

function newFA() {
    if(confirm("Are you sure you want to start a new FA?\nAny unsaved work will be lost.")) {
        FA.newFA();
        scene.drawAll();
    }
}

function load(e) {
    if(confirm("Are you sure you want to load a new FA?\nAny unsaved work will be lost.")) {
        let file = document.getElementById("fileInput").files[0];
        let fileReader = new FileReader();
        fileReader.onloadend = function(e) {
            FA.newFA();
            let lines = fileReader.result.split("\n");
            let i = 1;
            while(i < lines.length && lines[i] != "Transitions") {
                let state = lines[i].split(",");
                let x = Number(state[0]);
                let y = Number(state[1]);
                let start = (state[2] === "true");
                let accept = (state[3] === "true");
                let label = state[4];
                FA.addState(x,y,start,accept,label);
                i++;
            }
            i++;
            while(i < lines.length) {
                let transition = lines[i].split(",");
                let fromState = FA.findState(transition[0]);
                let toState = FA.findState(transition[1]);
                let symbols = transition[2];
                let x = Number(transition[3]);
                let y = Number(transition[4]);
                FA.addTransition(fromState,toState,symbols,x,y);
                i++;
            }
            scene.drawAll();
        };
        fileReader.readAsText(file);
    }
    else {
        e.preventDefault();
    }
}

function save() {
    download(FA.toString());
}

function download(text) {
    let downloadLink = document.createElement('a');
    downloadLink.setAttribute('href','data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    downloadLink.setAttribute('download', "newFA");
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

FA.addState(200,200,true,false,"S");
FA.addState(400,100,false,true,"A");
FA.addState(600,100,false,false,"B");
FA.addState(400,300,false,true,"C");
FA.addState(600,300,false,false,"D");

FA.addTransition(FA.states[0],FA.states[1],"0");
FA.addTransition(FA.states[0],FA.states[3],"1");

FA.addTransition(FA.states[1],FA.states[1],"0");
FA.addTransition(FA.states[1],FA.states[2],"1");

FA.addTransition(FA.states[2],FA.states[2],"1");
FA.addTransition(FA.states[2],FA.states[1],"0");

FA.addTransition(FA.states[3],FA.states[3],"1");
FA.addTransition(FA.states[3],FA.states[4],"0");

FA.addTransition(FA.states[4],FA.states[4],"0");
FA.addTransition(FA.states[4],FA.states[3],"1");

FA.transitions[0].x = 260;
FA.transitions[0].y = 112;

FA.transitions[1].x = 269;
FA.transitions[1].y = 287;

FA.transitions[2].x = 400;
FA.transitions[2].y = 55;

FA.transitions[3].x = 499;
FA.transitions[3].y = 62;

FA.transitions[4].x = 600;
FA.transitions[4].y = 55;

FA.transitions[5].x = 501;
FA.transitions[5].y = 148;

FA.transitions[6].x = 400;
FA.transitions[6].y = 255;

FA.transitions[7].x = 499;
FA.transitions[7].y = 332;

FA.transitions[8].x = 600;
FA.transitions[8].y = 255;

FA.transitions[9].x = 495;
FA.transitions[9].y = 267;

scene.drawAll();