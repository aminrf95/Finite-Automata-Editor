import {FA} from "./fa.js";
import {State} from "./state.js";
import {Transition} from "./transition.js";

/*
This class handles drawing elements to the canvas and
user input on the canvas.
*/
export let FAScene = class {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.ctx.font = "20px serif";

        this.mousePressed = false;
        this.ctrlPressed = false;
        this.selected = [];

        //This contains the different types of menus.
        this.menuContainer = null;
        this.menuContainer = document.createElement("div");
        this.menuContainer.style.position = "absolute";

        //The default menu is used when right clicking on a blank spot on the canvas.
        //It contains only the "Add State" option.

        let addStateOption = document.createElement("div");
        addStateOption.className = "menuItem";
        addStateOption.innerHTML = "Add State";

        this.defaultMenu = document.createElement("div");
        this.defaultMenu.appendChild(addStateOption);

        //The state menu is used when right clicking on a state.
        //It has options to add a transition, change this state's acceptance,
        //set this as the start state, and delete this state.

        let addTransitionOption = document.createElement("div");
        addTransitionOption.className = "menuItem";
        addTransitionOption.innerHTML = "Add Transition";

        let changeAcceptOption = document.createElement("div");
        changeAcceptOption.className = "menuItem";
        changeAcceptOption.innerHTML = "Change Acceptance";

        let setStartOption = document.createElement("div");
        setStartOption.className = "menuItem";
        setStartOption.innerHTML = "Make Start State";

        let deleteStateOption = document.createElement("div");
        deleteStateOption.className = "menuItem";
        deleteStateOption.innerHTML = "Delete State";


        this.stateMenu = document.createElement("div");
        this.stateMenu.appendChild(addTransitionOption);
        this.stateMenu.appendChild(changeAcceptOption);
        this.stateMenu.appendChild(setStartOption);
        this.stateMenu.appendChild(deleteStateOption);

        //The transition menu is used when right clicking on a transition.
        //It has options to delete this transition.

        let deleteTransitionOption = document.createElement("div");
        deleteTransitionOption.className = "menuItem";
        deleteTransitionOption.innerHTML = "Delete Transition";

        this.transitionMenu = document.createElement("div");
        this.transitionMenu.appendChild(deleteTransitionOption);

        //The Add State menu is used for state creation

        let addStateTitle = document.createElement("div");
        addStateTitle.innerHTML = "Add State";

        let stateLabelDiv = document.createElement("div");
        let stateLabelText = document.createElement("label");
        stateLabelText.innerHTML = "Label: ";
        let stateLabelInput = document.createElement("input");
        stateLabelInput.id = "stateLabelInput";
        stateLabelInput.maxLength = "1";
        stateLabelInput.style.width = "1rem";
        stateLabelDiv.appendChild(stateLabelText);
        stateLabelDiv.appendChild(stateLabelInput);

        let stateAcceptDiv = document.createElement("div");
        let stateAcceptText = document.createElement("label");
        stateAcceptText.innerHTML = "Accept";
        let stateAcceptInput = document.createElement("input");
        stateAcceptInput.type = "checkbox";
        stateAcceptInput.id = "stateAcceptInput";
        stateAcceptDiv.appendChild(stateAcceptText);
        stateAcceptDiv.appendChild(stateAcceptInput);

        let stateStartDiv = document.createElement("div");
        let stateStartText = document.createElement("label");
        stateStartText.innerHTML = "Start";
        let stateStartInput = document.createElement("input");
        stateStartInput.type = "checkbox";
        stateStartInput.id = "stateStartInput";
        stateStartDiv.appendChild(stateStartText);
        stateStartDiv.appendChild(stateStartInput);

        let stateButtonDiv = document.createElement("div");
        let stateCreateButton = document.createElement("button");
        stateCreateButton.innerHTML = "Create";
        stateCreateButton.id = "stateCreateButton";
        let stateCancelButton = document.createElement("button");
        stateCancelButton.innerHTML = "Cancel";
        stateCancelButton.id = "stateCancelButton";
        stateButtonDiv.appendChild(stateCreateButton);
        stateButtonDiv.appendChild(stateCancelButton);

        this.addStateMenu = document.createElement("div");
        this.addStateMenu.className = "menuItem";
        this.addStateMenu.appendChild(addStateTitle);
        this.addStateMenu.appendChild(stateLabelDiv);
        this.addStateMenu.appendChild(stateAcceptDiv);
        this.addStateMenu.appendChild(stateStartDiv);
        this.addStateMenu.appendChild(stateButtonDiv);

        //The Add Transition menu is used for transition creation

        let addTransitionTitle = document.createElement("div");
        addTransitionTitle.innerHTML = "Add Transition";

        let targetLabelDiv = document.createElement("div");
        let targetLabelText = document.createElement("label");
        targetLabelText.innerHTML = "To State: ";
        let targetInput = document.createElement("input");
        targetInput.maxLength = "1";
        targetInput.style.width = "1rem";
        targetInput.id = "targetInput";
        targetLabelDiv.appendChild(targetLabelText);
        targetLabelDiv.appendChild(targetInput);

        let symbolDiv = document.createElement("div");
        let symbolText = document.createElement("label");
        symbolText.innerHTML = "Symbol(s): ";
        let symbolInput = document.createElement("input");
        symbolInput.style.width = "1rem";
        symbolInput.id = "symbolInput";
        symbolDiv.appendChild(symbolText);
        symbolDiv.appendChild(symbolInput);

        let transitionButtonDiv = document.createElement("div");
        let transitionCreateButton = document.createElement("button");
        transitionCreateButton.innerHTML = "Create";
        transitionCreateButton.id = "transitionCreateButton";
        let transitionCancelButton = document.createElement("button");
        transitionCancelButton.innerHTML = "Cancel";
        transitionCancelButton.id = "transitionCancelButton";
        transitionButtonDiv.appendChild(transitionCreateButton);
        transitionButtonDiv.appendChild(transitionCancelButton);

        this.addTransitionMenu = document.createElement("div");
        this.addTransitionMenu.className = "menuItem";
        this.addTransitionMenu.appendChild(addTransitionTitle);
        this.addTransitionMenu.appendChild(targetLabelDiv);
        this.addTransitionMenu.appendChild(symbolDiv);
        this.addTransitionMenu.appendChild(transitionButtonDiv);

        //Bind functions
        this.drawAll = this.drawAll.bind(this);
        this.mouseUpHandle = this.mouseUpHandle.bind(this);
        this.mouseDownHandle = this.mouseDownHandle.bind(this);
        this.mouseMoveHandle = this.mouseMoveHandle.bind(this);
        this.openMenu = this.openMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        this.createState = this.createState.bind(this);
        this.checkForElement = this.checkForElement.bind(this);
        this.openAddStateMenu = this.openAddStateMenu.bind(this);
        this.cancelStateCreate = this.cancelStateCreate.bind(this);
        this.cancelTransitionCreate = this.cancelTransitionCreate.bind(this);
        this.changeAccept = this.changeAccept.bind(this);
        this.makeStart = this.makeStart.bind(this);
        this.openAddTransitionMenu = this.openAddTransitionMenu.bind(this);
        this.createTransition = this.createTransition.bind(this);
        this.deleteState = this.deleteState.bind(this);
        this.deleteTransition = this.deleteTransition.bind(this);
        this.ctrlDown = this.ctrlDown.bind(this);
        this.ctrlUp = this.ctrlUp.bind(this);

        //Register event listeners
        this.canvas.addEventListener("mousemove", this.mouseMoveHandle);
        this.canvas.addEventListener("mousedown", this.mouseDownHandle);
        this.canvas.addEventListener("mouseup", this.mouseUpHandle);
        this.canvas.addEventListener("contextmenu",this.openMenu);
        document.getElementsByTagName("html")[0].addEventListener("keydown", this.ctrlDown);
        document.getElementsByTagName("html")[0].addEventListener("keyup", this.ctrlUp);

        addStateOption.addEventListener("click", this.openAddStateMenu);
        stateCreateButton.addEventListener("click", this.createState);
        stateCancelButton.addEventListener("click", this.cancelStateCreate);
        changeAcceptOption.addEventListener("click",this.changeAccept);
        setStartOption.addEventListener("click", this.makeStart);
        addTransitionOption.addEventListener("click", this.openAddTransitionMenu);
        transitionCreateButton.addEventListener("click", this.createTransition);
        transitionCancelButton.addEventListener("click", this.cancelTransitionCreate);
        deleteStateOption.addEventListener("click", this.deleteState);
        deleteTransitionOption.addEventListener("click", this.deleteTransition);
    }

    //Checks where the right mouse button was clicked,
    //and opens the appropriate menu.
    openMenu(e) {
        e.preventDefault();
        this.menuContainer.x = e.offsetX;
        this.menuContainer.y = e.offsetY;
        this.menuContainer.selected = this.checkForElement(e.offsetX,e.offsetY);

        if(this.menuContainer.selected == null) {
            this.menuContainer.appendChild(this.defaultMenu);
        }
        else if(this.menuContainer.selected instanceof State) {
            this.menuContainer.appendChild(this.stateMenu);
        }
        else if(this.menuContainer.selected instanceof Transition) {
            this.menuContainer.appendChild(this.transitionMenu);
        }

        this.menuContainer.style.top = String(e.offsetY) + "px";
        this.menuContainer.style.left = String(e.offsetX) + "px";

        document.getElementById("canvasDiv").appendChild(this.menuContainer);
        this.drawAll()
    }

    closeMenu() {
        if(this.menuContainer.parentNode) {
            this.menuContainer.parentNode.removeChild(this.menuContainer);
            this.menuContainer.removeChild(this.menuContainer.firstChild);
        }
    }

    openAddStateMenu() {
        this.closeMenu();
        this.menuContainer.appendChild(this.addStateMenu);
        document.getElementById("canvasDiv").appendChild(this.menuContainer);
        this.drawAll();
    }

    createState() {
        let label = document.getElementById("stateLabelInput").value;
        document.getElementById("stateLabelInput").value = "";
        let accept = document.getElementById("stateAcceptInput").checked;
        document.getElementById("stateAcceptInput").checked = false;
        let start = document.getElementById("stateStartInput").checked;
        document.getElementById("stateStartInput").checked = false;
        let s = FA.findState(label);
        if(label == "") {
            alert("Error: The state label cannot be blank.")
        }
        else if(s != null) {
            alert("Error: A state already exists with label " + label + ".");
        }
        else {
            FA.addState(this.menuContainer.x,this.menuContainer.y,start,accept,label);
        }
        this.drawAll();
        this.closeMenu();
    }

    //Cancels the creation for both the addStateMenu
    cancelStateCreate() {
        //Clear addStateMenu inputs
        document.getElementById("stateLabelInput").value = "";
        document.getElementById("stateAcceptInput").checked = false;
        document.getElementById("stateStartInput").checked = false;
        this.closeMenu();
    }

    changeAccept() {
        this.menuContainer.selected.accept = !this.menuContainer.selected.accept;
        this.drawAll();
        this.closeMenu();
    }

    makeStart() {
        FA.setStart(this.menuContainer.selected);
        this.drawAll();
        this.closeMenu();
    }

    //Deletes all transitions connected to the selected state,
    //then deletes the state.
    deleteState() {
        FA.removeState(this.menuContainer.selected);
        this.drawAll();
        this.closeMenu();
    }

    openAddTransitionMenu() {
        this.closeMenu();
        this.menuContainer.appendChild(this.addTransitionMenu);
        document.getElementById("canvasDiv").appendChild(this.menuContainer);
        this.drawAll();
    }

    createTransition() {
        let toStateLabel = document.getElementById("targetInput").value;
        document.getElementById("targetInput").value = "";
        let toState = FA.findState(toStateLabel);
        let symbols = document.getElementById("symbolInput").value;
        document.getElementById("symbolInput").value = "";
        if(toStateLabel == "") {
            alert("Error: The state label cannot be blank.");
        }
        else if(symbols == "") {
            alert("Error: There must be at least one symbol.");
        }
        else if(toState == null) {
            alert("Error: There is no state with label " + toStateLabel +".");
        }
        else {
            FA.addTransition(this.menuContainer.selected, toState, symbols);
        }
        this.drawAll();
        this.closeMenu();
    }

    cancelTransitionCreate() {
        //Clear addTransitionMenu inputs
        document.getElementById("targetInput").value = "";
        document.getElementById("symbolInput").value = "";
        this.closeMenu();
    }

    //Deletes the selected transition
    deleteTransition() {
        FA.removeTransition(this.menuContainer.selected);
        this.drawAll();
        this.closeMenu();
    }

    //Clears the canvas and draws all components of the FA.
    drawAll() {
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        for(let s of FA.states) {
            s.draw(this.ctx);
        }
        for(let t of FA.transitions) {
            t.draw(this.ctx);
        }
        if(this.selectionBoxX != null) {
            this.ctx.beginPath();
            this.ctx.moveTo(this.selectionBoxX,this.selectionBoxY);
            this.ctx.lineTo(this.selectionBoxX,this.lastY);
            this.ctx.lineTo(this.lastX,this.lastY);
            this.ctx.lineTo(this.lastX,this.selectionBoxY);
            this.ctx.lineTo(this.selectionBoxX,this.selectionBoxY);
            this.ctx.stroke();
        }
    }

    mouseUpHandle(e) {
        if(this.selectionBoxX != null) {
            this.checkForElements(this.selectionBoxX,this.selectionBoxY,this.lastX,this.lastY);
            this.selectionBoxX = null;
            this.selectionBoxY = null;
        }
        else if(!this.ctrlPressed) {
            this.selected.length = 0;
        }
        this.mousePressed = false;
    }

    mouseMoveHandle(e) {
        this.deltaX = e.offsetX-this.lastX;
        this.deltaY = e.offsetY-this.lastY;
        this.lastX = e.offsetX;
        this.lastY = e.offsetY;
        if(this.mousePressed) {
            for(let element of this.selected) {
                element.move(element.x + (this.deltaX),element.y + (this.deltaY));
            }
            this.drawAll();
        }
    }

    mouseDownHandle(e) {
        this.closeMenu();
        if(e.button != 0) {return;}
        this.mousePressed = true;
        let target = this.checkForElement(e.offsetX,e.offsetY);
        if(target != null && !this.selected.includes(target)) {
            this.selected.push(target)
        }
        else if(!this.ctrlPressed) {
            this.selected.length = 0;
            this.selectionBoxX = e.offsetX;
            this.selectionBoxY = e.offsetY;
        }
    }

    ctrlDown(e) {
        if(e.key == "Control") {
            this.ctrlPressed = true;
        }
    }

    ctrlUp(e) {
        if(e.key == "Control") {
            this.selected.length = 0;
            this.ctrlPressed = false;
            this.drawAll();
        }
    }

    checkForElement(x,y) {
        for(let c of FA.states) {
            if(x < (c.x+c.radius) && x > (c.x-c.radius)
                && y < (c.y+c.radius) && y > (c.y-c.radius)) {
                    return c;
                }
        }
        for(let t of FA.transitions) {
            if(x < (t.x + (t.symbols.length*10)/2) && x > (t.x-(t.symbols.length*10)/2)
            && y < (t.y + 6) && y > (t.y - 6)) {
                return t;
            }
        }
        return null;
    }

    checkForElements(x1,y1,x2,y2) {
        let xMin = Math.min(x1,x2);
        let yMin = Math.min(y1,y2);
        let xMax = Math.max(x1,x2);
        let yMax = Math.max(y1,y2);
        for(let c of FA.states) {
            if(xMin < c.x && c.x < xMax
                && yMin < c.y && c.y < yMax) {
                    this.selected.push(c);
                }
        }
        for(let t of FA.transitions) {
            if(xMin < t.x && t.x < xMax
                && yMin < t.y && t.y < yMax) {
                this.selected.push(t);
            }
        }
    }
}