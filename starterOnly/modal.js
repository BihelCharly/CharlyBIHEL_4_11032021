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
const inputs = document.getElementsByClassName("text-control");
const inputs2 = document.querySelectorAll("text-control");

// DOM Elements added
const cloBtn = document.querySelector(".close");
const subBtn = document.getElementById('submitForm');
const errorDisp = document.getElementsByClassName('error');
// RegEx email added
const regEx = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

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

function validate(event) {
    // new array
    let array = [];
    // loop trought inputs
    for (let i = 0; i < inputs.length; i++) {
        // check all required fields first
        // if one mandatory input is empty
        if (inputs[i].value == '' ||  inputs[i].value == null || inputs[i].value == undefined) {
            inputs[i].classList.add("error-border");
            event.preventDefault();
            // otherwise pushing datas from inputs into the array
        } else {
            // comment cibler uniquement les champs vides ? forEach ?
            array.push(inputs[i].value);
        }
    }
    // check first name length >2
    if (array[0] == null || array[0].length < 2) {
        errorDisp[0].textContent = 'Minimum deux charactères';
        inputs[0].classList.add("error-border");
        event.preventDefault();
        // check last name length >2
    } else if (array[1].length < 2) {
        errorDisp[1].textContent = 'Minimum deux charactères';
        inputs[1].classList.add("error-border");
        event.preventDefault();
        // check if email match regex
    } else if (!array[2].match(regEx)) {
        errorDisp[2].textContent = 'Veuillez définir un email valide';
        inputs[2].classList.add("error-border");
        event.preventDefault();
    } else {
        // if all is good create new object - we call the function addPlayer
        let newPlayer = new addPlayer(array[0], array[1], array[2], array[3], array[4]);
        console.log(newPlayer);
    }
};
// remove CSS properties after adding something in indexed field
// Comment faire ça pour tout les éléments sans avoir à choisir chaque index ?


// function to add a new object with players informations
function addPlayer(firstName, lastName, email, birthdate, tournaments) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.birthdate = birthdate;
    this.tournaments = tournaments;
}


// comment faire ça pour tout les champs selon celui qui est cliqué ?
inputs[0].addEventListener("input", cleanFields);

function cleanFields() {
    inputs[0].classList.remove("error-border");
    inputs[0].textContent = '';
}