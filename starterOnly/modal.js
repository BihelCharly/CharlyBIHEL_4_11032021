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

// DOM Elements added
const cloBtn = document.querySelector(".close");
const subBtn = document.getElementById('submitForm');
const errorDisp = document.getElementsByClassName('error');
const errorDisp2 = document.getElementsByClassName('formData[data - error]::after');
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
    let array = [];
    // pushing datas from inputs into the array
    for (let i = 0; i < inputs.length; i++) {
        let value = inputs[i].value;
        array.push(value);
    }
    array.forEach(function() {
        if (array[0, 1, 2, 3] == null || array[0, 1, 2, 3] == undefined || array[0, 1, 2, 3] == '') {
            inputs[0].placeholder = 'Veuillez remplir ce champs';
            inputs[1].placeholder = 'Veuillez remplir ce champs';
            inputs[2].placeholder = 'Veuillez remplir ce champs';
            inputs[3].style = ('color:#e54858');
            event.preventDefault();
        } else if (array[0] == null || array[0].length < 2) {
            errorDisp[0].textContent = 'Minimum deux charactères';
            inputs[0].classList.add("error-border");
            event.preventDefault();
        } else if (array[1].length < 2) {
            errorDisp[1].textContent = 'Minimum deux charactères';
            inputs[1].classList.add("error-border");
            event.preventDefault();
        } else if (!array[2].match(regEx)) {
            errorDisp[2].textContent = 'Veuillez rentrer un email valide';
            inputs[2].classList.add("error-border");
            event.preventDefault();
        }
    });



};
// remove CSS properties after adding something in indexed field
// Comment faire ça pour tout les éléments sans avoir à choisir chaque index ?
inputs[0].addEventListener("input", () => {
    inputs[0].placeholder = '';
    inputs[0].classList.remove("error-border");
    errorDisp[0].textContent = '';
});