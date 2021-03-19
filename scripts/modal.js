function editNav() {
    let x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

// DOM Elements
const modal = document.querySelector(".modal-body");
const modalbg = document.querySelector(".bground");
const subForm = document.getElementById("submit-form");
const modalConfirm = document.getElementById("confirmation");
const btnConfirm = document.getElementById("confirmation__btn");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const chkBoxIcn = document.getElementsByClassName("checkbox-icon");
let inputs = document.querySelectorAll("input");
let conditions = document.getElementById("checkbox1");
let newsletters = document.getElementById("checkbox2");

// DOM Elements added
const cloBtn = document.querySelectorAll(".close");
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
    subForm.style.display = "block";
}

// close modal event
cloBtn.forEach((btn) => btn.addEventListener("click", closeModal));
btnConfirm.addEventListener("click", closeModal);
// close modal form
function closeModal() {
    modalbg.style.display = "none";
    subForm.style.display = "none";
    modalConfirm.style.display = "none";
}

// launch confirmation event
function modalConfirmation() {
    modalbg.style.display = "block";
    subForm.style.display = "none";
    modalConfirm.style.display = "block";
}

// submit data
subBtn.addEventListener("click", validate);
// function triggered on submit
function validate(event) {
    event.preventDefault();
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value == '') {
            inputs[i].classList.add("error-border");
            inputs[i].nextElementSibling.textContent = 'Veuillez remplir ce champs';
            console.log('ERROR : DATAS ARE MISSING');
        } else {
            // check className for each inputs
            switch (inputs[i].className) {
                case 'value-first text-control':
                    if (inputs[0].value.length < 2) {
                        inputs[0].classList.add("error-border");
                        errorDisp[0].textContent = 'Minimum 2 caractères';
                    }
                case 'value-last text-control':
                    if (inputs[1].value.length < 2) {
                        inputs[1].classList.add("error-border");
                        errorDisp[1].textContent = 'Minimum 2 caractères';
                    }
                case 'value-email text-control':
                    if (!inputs[2].value.match(regExEmail)) {
                        inputs[2].classList.add("error-border");
                        errorDisp[2].textContent = 'Veuillez saisir un email valide';
                    }
                case 'value-birth text-control':
                    if (!inputs[3].value.match(regExDate)) {
                        inputs[3].classList.add("error-border");
                        errorDisp[3].textContent = 'Veuillez saisir une date valide';
                    }
                case 'value-quantity text-control':
                    if (!inputs[4].value.match(regExNb)) {
                        inputs[4].classList.add("error-border");
                        inputs[4].nextElementSibling.textContent = 'Veuillez saisir un nombre';
                    }
            }
            //if all is good create new object - we call the function addPlayer & clean fields & return thx modal
            if (conditions.checked == true && inputs[0].value.length >= 2 && inputs[1].value.length >= 2 && inputs[2].value.match(regExEmail) && inputs[3].value.match(regExDate) && inputs[4].value.match(regExNb)) {
                let newPlayer = new addPlayer(inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].value, inputs[4].value);
                console.log(newPlayer);
                // call function to close modal & show thank you
                modalConfirmation();
                //clean fields
                document.getElementById("reservForm").reset(newPlayer);
                // to check if checkbox is checked
            } else if (conditions.checked == false) {
                errorDisp[5].innerHTML = "Obligatoire";
                chkBoxIcn[6].style = "border:1px solid #e54858";
            }
            break;
        }
    }
}

// function to add a new object with players informations
function addPlayer(firstName, lastName, email, birthdate, tournaments) {
    this.Prenom = firstName.charAt(0).toUpperCase() + firstName.slice(1);
    this.Nom = lastName.toUpperCase();
    this.email = email.toLowerCase();
    this.Naissance = birthdate;
    this.Tournois = tournaments;
    if (this.Tournois > 0 && this.Tournois < 99) {
        formData[5].required = true;
        if (!document.querySelector('.value-city:checked') == undefined) {
            let city = document.querySelector('.value-city:checked').value;
            this.Ville = city.value;
        } else {
            this.Ville = "Inconnue";
        }
    } else {
        formData[5].required = false;
    }
    if (newsletters.checked) {
        this.Newsletter = "oui";
    } else {
        this.Newsletter = "non";
    }
}

// to remove stuff on input
inputs.forEach(function(element) {
    element.addEventListener("input", function(event) {
        event.target.classList.remove("error-border");
        // if following element class isn't error then delete content from span error
        if (this.nextElementSibling.className == "error") {
            this.nextElementSibling.innerHTML = '';
        }
    });
});

// to check change on checkbox conditions
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

// running on conditions checkbox
conditions.addEventListener("change", ifConditionsChecked);