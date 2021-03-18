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
const chkBoxIcn = document.getElementsByClassName("checkbox-icon");
let inputs = document.querySelectorAll(".formData input");
let inputs2 = document.querySelectorAll("input");
let conditions = document.getElementById("checkbox1");

// DOM Elements added
const cloBtn = document.querySelector(".close");
const subBtn = document.getElementById('submitForm');
const errorDisp = document.getElementsByClassName('error');
// RegEx added
const regExEmail = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
const regExDate = new RegExp(/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/)
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
    event.preventDefault();
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value == '') {
            inputs[i].classList.add("error-border");
            console.log('ERROR : some datas are missing');
        } else {
            // check the type for each inputs
            switch (inputs[i].className) {
                case 'value-first':
                    if (inputs[0].value.length < 2) {
                        inputs[0].classList.add("error-border");
                        errorDisp[0].textContent = 'Veuillez entrer 2 caractères ou plus pour le champ du prénom';
                    }
                case 'value-last':
                    if (inputs[1].value.length < 2) {
                        inputs[1].classList.add("error-border");
                        errorDisp[1].textContent = 'Veuillez entrer 2 caractères ou plus pour le champ du nom';
                    }
                case 'value-email':
                    if (!inputs[2].value.match(regExEmail)) {
                        inputs[2].classList.add("error-border");
                        errorDisp[2].textContent = 'Veuillez définir un email valide';
                    }
                case 'value-birthdate':
                    if (!inputs[3].value.match(regExDate)) {
                        inputs[3].classList.add("error-border");
                        errorDisp[3].textContent = 'Veuillez séléctionner une date valide';
                    }
                case 'value-quantity':
                    if (!inputs[4].value.match(regExNb)) {
                        inputs[4].classList.add("error-border");
                        errorDisp[4].textContent = 'Veuillez rentrer un nombre';
                    }
            }
            break;
        }
    }
    //if all is good create new object - we call the function addPlayer & clean fields & return thx modal
    if (conditions.checked == true) {
        let newPlayer = new addPlayer(inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].value, inputs[4].value);
        console.log(newPlayer);
        // close inputs modal
        //closeModal();
        //clean fields
        //document.getElementById("reservForm").reset(newPlayer);
    } else {
        console.log("FATAL ERROR");
        errorDisp[5].innerHTML = "Obligatoire";
        chkBoxIcn[6].style = "border:1px solid #e54858";
    }
}


// function to add a new object with players informations
function addPlayer(firstName, lastName, email, birthdate, tournaments) {
    this.Nom = firstName;
    this.Prénom = lastName;
    this.eMail = email;
    this.Naissance = birthdate;
    this.Tournois = tournaments;
    if (this.Tournois > 0 && this.Tournois < 99) {
        formData[5].required = true;
        //formData[5].style = "color:red";
        if (!document.querySelector('.value-city:checked') == undefined) {
            let city = document.querySelector('.value-city:checked').value;
            this.Ville = city.value;
        } else {
            this.Ville = "Non selectionné";
        }
    } else {
        formData[5].required = false;
        //formData[5].style = "color:inherit";
    }
}

// to remove stuff on input
inputs2.forEach(function(element) {
    element.addEventListener("input", function(event) {
        event.target.classList.remove("error-border");
        // if following element class isn't error then delete content from span error
        if (this.nextElementSibling.className == "error") {
            this.nextElementSibling.innerHTML = '';
        }
    });
});

// to check change on checkbox conditions
conditions.addEventListener("change", ifConditionsChecked);

function ifConditionsChecked(element) {
    if (element.target.checked) {
        // enable submit button if mandatory conditions are checked
        subBtn.disabled = false;
        subBtn.style = "opacity:1";
        errorDisp[5].innerHTML = "";
        chkBoxIcn[6].style = "border:0px";
    } else {
        // disable submit button if mandatory conditions are unchecked
        subBtn.disabled = true;
        subBtn.style = "opacity:0.5";
        errorDisp[5].innerHTML = "Obligatoire";
        chkBoxIcn[6].style = "border:1px solid #e54858";
    }
    false;
};