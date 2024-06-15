window.onload = function () {
    //sets a checkbox on or off
    oOC("sfx", "cBSFX");

    //changes website background on hover
    document.getElementById("oVOB").onmouseover = function () { mouseOver() };
    document.getElementById("oVOB").onmouseout = function () { mouseOut() };

    //turns bot on and off
    document.getElementById("botB").onmouseover = function () { mouseOver() };
    document.getElementById("botB").onmouseout = function () { mouseOut() };
}


//creates popup
function openPopup() {
    let popup = document.getElementById("popup");
    popup.classList.add("open-popup");
}
function closePopup() {
    let popup = document.getElementById("popup");
    popup.classList.remove("open-popup");
}


//truns sfx on and off in local storage
function sfxOO() {
    if (localStorage.getItem("sfx", "on") == null && localStorage.getItem("sfx", "off") == null) {
        localStorage.setItem("sfx", "on");
    }
    var sfxSw = localStorage.getItem("sfx", "off");

    if (sfxSw == null || sfxSw != "off ") {
        sfxSw = localStorage.getItem("sfx", "on");
    }
    if (sfxSw == "on") {
        localStorage.removeItem("sfx", "on");
        localStorage.setItem("sfx", "off");
    }
    else if (sfxSw == "off") {
        localStorage.removeItem("sfx", "off");
        localStorage.setItem("sfx", "on");
    }
    console.log(sfxSw + " sfx")
}

//makes a box checked or unchecked
function oOC(x, y) {
    if (localStorage.getItem(x, "off") == "off") {
        document.getElementById(y).checked = false;
    }
    else if (localStorage.getItem(x, "on") == "on") {
        document.getElementById(y).checked = true;
    }
}

//Sets game as either single player bot or 1v1
function singleP(x) {
    if (x == 'off') {
        localStorage.removeItem("sP", "on")
    }
    else if (x == 'on') {
        localStorage.removeItem("sP", "off")
    }
    localStorage.setItem("sP", x);
    document.location = 'connectG.html';
}



//Changes whole websites background after hovering on buttons
function mouseOver() {
    document.getElementById("body").style.color = "white";
    document.getElementById("body").style.background = "black";
    document.getElementById("body").style.transition = "background-color 0.5s, color 0.4s";
}

//undoes change after you stop hovering your mouse
function mouseOut() {
    document.getElementById("body").style.color = "black";
    document.getElementById("body").style.background = "white";
    document.getElementById("body").style.transition = "background-color 0.5s, color 0.4s";
}