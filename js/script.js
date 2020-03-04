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
    // --> need to select the first color option after unhiding
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

