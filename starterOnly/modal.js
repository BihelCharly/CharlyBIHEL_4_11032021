function editNav() {
    let x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
let inputs = document.getElementsByClassName("text-control");
const inputs2 = document.querySelectorAll("text-control");

// DOM Elements added
const cloBtn = document.querySelector(".close");
const subBtn = document.getElementById('submitForm');
const errorDisp = document.getElementsByClassName('error');
// RegEx added
const regExEmail = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
const regExDate = new RegExp(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/);
const regExNb = new RegExp(/^[0-9]+$/);

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
// launch modal form
function launchModal() {
    modalbg.style.display = "block";
}

// close modal event
cloBtn.addEventListener("click", closeModal);
// close modal form
function closeModal() {
    //document.getElementById("reservForm").reset();
    modalbg.style.display = "none";
}


// submit data
subBtn.addEventListener("click", validate);
// function triggered on submit
function validate(event) {
    // new array
    let array = [];
    // loop trought inputs and push them to the array
    for (let i = 0; i < inputs.length; i++) {
        // check all required fields
        // if one mandatory input is empty -> cancel
        if (inputs[i].value === '') {
            inputs[i].classList.add("error-border");
            console.log('ERROR : data missing');
            // ne fonctionne pas ; pourquoi ?

        }
        // otherwise if it's all good push them to the array
        let value = inputs[i].value;
        array.push(value);
    }
    // and do the verifications
    // step 1 : check if first name length >= 2
    if (array[0].length < 2) {
        inputs[0].classList.add("error-border");
        errorDisp[0].textContent = 'Veuillez entrer 2 caractères ou plus pour le champ du nom.';
        event.preventDefault();
        // step 2 : check if last name length >= 2
    } else if (array[1].length < 2) {
        inputs[1].classList.add("error-border");
        errorDisp[1].textContent = 'Veuillez entrer 2 caractères ou plus pour le champ du nom.';
        event.preventDefault();
        // step 3 : check if email match regex
    } else if (!array[2].match(regExEmail)) {
        inputs[2].classList.add("error-border");
        errorDisp[2].textContent = 'Veuillez définir un email valide';
        event.preventDefault();
        // step 4 : check if the value is a date
        // regex ne fonctionne pas ; trouver une regex date qui fonctionne !
    } else if (array[3] === '') {
        inputs[3].classList.add("error-border");
        errorDisp[3].textContent = 'Veuillez séléctioner une date de naissance';
        event.preventDefault();
        // step 5 : check if tournament value is a number
    } else if (!array[4].match(regExNb)) {
        inputs[4].classList.add("error-border");
        errorDisp[4].innerHTML = 'Veuillez rentrer une valeur numérique';
        event.preventDefault();
    } else {
        // if all is good create new object - we call the function addPlayer
        let newPlayer = new addPlayer(array[0], array[1], array[2], array[3], array[4]);
        //document.getElementById("reservForm").reset(newPlayer);
        console.log(newPlayer);

    }
}

// function to add a new object with players informations
function addPlayer(firstName, lastName, email, birthdate, tournaments) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.birthdate = birthdate;
    this.tournaments = tournaments;
}

// clear inputs after click
// comment faire ça en moins de lignes ?
inputs[0].addEventListener("input", cleanFields0);
inputs[1].addEventListener("input", cleanFields1);
inputs[2].addEventListener("input", cleanFields2);
inputs[3].addEventListener("input", cleanFields3);
inputs[4].addEventListener("input", cleanFields4);


function cleanFields0() {
    inputs[0].classList.remove("error-border");
    errorDisp[0].textContent = null;
}

function cleanFields1() {
    inputs[1].classList.remove("error-border");
    errorDisp[1].textContent = null;
}

function cleanFields2() {
    inputs[2].classList.remove("error-border");
    errorDisp[2].textContent = null;
}

function cleanFields3() {
    inputs[3].classList.remove("error-border");
    errorDisp[3].textContent = null;
}

function cleanFields4() {
    inputs[4].classList.remove("error-border");
    errorDisp[4].textContent = null;
}