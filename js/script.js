// set focus on name input
const nameInput = document.querySelector('#name');
nameInput.focus();

// toggle display of #other-title
const jobOther = document.querySelector('#other-title');
jobOther.style.display = 'none';

const jobRole = document.querySelector('#title');
jobRole.addEventListener('change', (e) => {
    let optionValue = e.target.value;
    if (optionValue === 'other'){
        jobOther.style.display = 'block';
    } else {
        jobOther.style.display = 'none';
    }
});

// "T-Shirt Info" section
const colorMenu = document.querySelector('#color');
const colorOptions = colorMenu.children;
// hide all the other options
for (i = 0; i < colorOptions.length; i ++){
    colorOptions[i].hidden = true;
}
// add default
const colorDefault = document.createElement('option');
colorDefault.value = 'default';
colorDefault.textContent = 'Please select a T-shirt theme';
colorDefault.selected = true;
colorMenu.appendChild(colorDefault);


const designMenu = document.querySelector('#design');
designMenu.addEventListener('change', (e) => {
    let themeVal = e.target.value;
    let themeChoice = document
        .querySelector('option[value="' + themeVal + '"]')
        .textContent.replace(/^Theme - /, '');
    
    // associate color and theme menus
    for (i = 0; i < colorOptions.length; i ++){
        let listItem = colorOptions[i];
        if (listItem.textContent.includes(themeChoice)){
            listItem.hidden = false;
        } else {
            listItem.hidden = true;
        }
    }
});



// Register for Activities Section
const activityFieldset = document.querySelector('.activities');
const activities = document.querySelectorAll('.activities input');
const costLabel = document.createElement('label');
let totalCost = 0;

activityFieldset.addEventListener('change', (e) => {
    let clicked = e.target;
    let clickedCost = parseInt(e.target.dataset.cost);
    let clickedDate = e.target.dataset.dayAndTime;
    let clickedCheck = e.target.checked;

    for (i = 0; i < activities.length; i ++){
        let checkboxDate = activities[i].dataset.dayAndTime;
        
        // disable same date/time
        if (clickedDate === checkboxDate && clicked !== activities[i]){
            if (clickedCheck){
                activities[i].disabled = true;
            } else {
                activities[i].disabled = false;
            }
        }
        
    };
    
    // summarize cost
    if (clickedCheck){
        totalCost += clickedCost;
    } else {
        totalCost -= clickedCost;
    }

    // append total cost after any change
    costLabel.textContent = 'Total: $' + totalCost;
    activityFieldset.appendChild(costLabel);
});

// "Payment Info" section
const paymentOptions = document.querySelector('#payment');
const creditCardDiv = document.querySelector('#credit-card');
const paypalDiv = document.querySelector('#paypal');
const bitcoinDiv = document.querySelector('#bitcoin');

const payShow = {
    paypal: () => {
        paypalDiv.hidden = false;
        creditCardDiv.hidden = true;
        bitcoinDiv.hidden = true;
    },
    bitcoin: () => {
        bitcoinDiv.hidden = false;
        creditCardDiv.hidden = true;
        paypalDiv.hidden = true;
    },
    'credit card': () => {
        creditCardDiv.hidden = false;
        bitcoinDiv.hidden = true;
        paypalDiv.hidden = true;
    }
};

for (i = 0; i < paymentOptions.children.length; i ++){
    // hide first option
    if (i === 0){
        paymentOptions[i].hidden = true;
    // select Credit Card option by default, hide other divs
    } else if (i === 1){
        paymentOptions[i].selected = true;
        payShow['credit card']();
    }
};

paymentOptions.addEventListener('change', (e) => {
    let payChoice = e.target.value;
    payShow[payChoice]();
});


// form validation
function nameValid(name){
    return /^$/.test(name);
};

function emailValid(email){
    return /^[^@]+@[^@.]+\.\w+/.test(email);
}

function atLeastOne(){
    let checked = 0;
    for (i = 0; i < activities.length; i ++){
        checked += activities[i].checked;
    }

    return checked > 0 ? true : false;
}

function creditNumValid(creditNum){
    return /^\d{13,16}$/.test(creditNum);
}

function zipValid(zipCode){
    return /^\d{5}$/.test(zipCode);
}

function cvvValid(cvv){
    return /^\d{3}$/.test(cvv);
}


const emailInput = document.querySelector('#mail');
const ccNum = document.querySelector('#cc-num');
const zipCode = document.querySelector('#zip');
const cvv = document.querySelector('#cvv');

// real-time error messages
nameInput.addEventListener('focusout', (e) => {
    const name = nameInput.value;
    const tooltip = e.target.nextElementSibling;
    if (nameValid(name)){
        tooltip.hidden = false;
    } else {
        tooltip.hidden = true;
    }
});

// add listener to submit button
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    if (creditCardDiv.hidden){
        allow = !nameValid(nameInput) &&
                    emailValid(emailInput) &&
                    atLeastOne();
    } else {
        allow = !nameValid(nameInput) &&
                    emailValid(emailInput) &&
                    atLeastOne() &&
                    creditNumValid(ccNum) &&
                    zipValid(zipCode) &&
                    cvvValid(cvv);
    }

    if (allow){
        e.preventDefault();
        console.log("you're all set! good job");
    } else {
        e.preventDefault();
        console.log('fix it');
    }
});