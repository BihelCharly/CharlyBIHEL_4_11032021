function editNav() {
    let x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

// RegEx email
const regEx = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const inputs = document.getElementsByClassName("text-control");
const cloBtn = document.querySelector(".close");
const subBtn = document.querySelectorAll("btn-submit");
const errorDisp = document.getElementsByClassName('error');



// TESTS
subBtn.forEach((btn) => btn.addEventListener("click", validation));
// subBtn.forEach((btn) => btn.addEventListener("click", validate));

function validation(event) {
    const firstName = document.getElementById('first').value;
    if (firstName.length < 2) {
        event.preventDefault();
        errorDisp[0].innerHTML = 'erreur';
        errorDisp[0].style = 'color:red; font-size:14px';
    } else {
        errorDisp[0].innerHTML = '';
    }
}







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




// function triggered by submit click
function validate() {
    // function to check datas on submit
    getData();

}

function getData() {
    // create 1 array
    let array = [];
    // pushing datas from inputs into the array
    for (let i = 0; i < inputs.length; i++) {
        let value = inputs[i].value;
        array.push(value);
    }
    // checking each index
    if (array[0, 1, 2, 3, 4] == "" || array[0, 1, 2, 3, 4] == undefined || array[0, 1, 2, 3, 4] == null) {
        console.log('Champs vides');
    } else if (array[0].length < 2 || array[1].length < 2) {
        console.log('Il y a moins de deux charactères');
        errorDisp[0].innerHTML = 'erreur';
        errorDisp[0].style = 'color:red; font-size:14px';
    } else if (!array[2].match(regEx)) {
        console.log("Ce n'est pas un email");
    } else {
        console.log('Prénom : ' + array[0]);

    }
}