const list = document.querySelector('.taskList');
const addButton = document.querySelector('.addButton');
const inputElement = document.querySelector('.inputArea');
const allButton = document.querySelector('.allButton');
const activeButton = document.querySelector('.activeButton');
const completedButton = document.querySelector('.completedButton');

let tasksArray = [];
let currentFilter = 'all';

addButton.addEventListener('click', addTodoItems);
allButton.addEventListener('click', () => setFilter('all'));
activeButton.addEventListener('click', () => setFilter('active'));
completedButton.addEventListener('click', () => setFilter('completed'));

function setFilter(newFilter) {
    currentFilter = newFilter;
    renderIntoHTML();
}

function renderIntoHTML(){

    list.innerHTML = "";
    
    let tasksToRender = tasksArray.filter(task => {
        if (currentFilter === 'active') {
            return task.Done === false;
        } else if (currentFilter === 'completed') {
            return task.Done === true;
        }
        return true; 
    });


    for(let i = 0; i<tasksToRender.length ; i++){
        const task = tasksToRender[i];
        const originalIndex = tasksArray.findIndex(item => item === task);
        let divElement = document.createElement('div');
        divElement.id = "itemDiv";
        
        
        let listElement = document.createElement('li');
        listElement.textContent = task.Text;
        listElement.id = "listItem";
        
        
        let completionBox = document.createElement('input');
        completionBox.type = 'checkbox';
        completionBox.checked = task.Done;
        completionBox.id = "completionBox";
        completionBox.addEventListener('change', function() {
            toggleTaskCompletion(originalIndex);
        });
        
        let deleteButton = document.createElement('button');
        deleteButton.id = "deleteButton";
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener('click', function()
        {
            deleteItem(originalIndex);
        });

        divElement.appendChild(listElement);
        divElement.appendChild(completionBox);
        divElement.appendChild(deleteButton);
        list.appendChild(divElement);
        
    }
}

function addTodoItems(){
    console.log("Button Clicked");
    let inputText = inputElement.value;
    if (inputText === "" || inputText === " "){
        return;
    }
    let input = {Text: inputText, Done: false};
    console.log("Input = ", input);

    tasksArray.push(input);

    renderIntoHTML();

    inputElement.value = "";
}

function deleteItem(index){
    tasksArray.splice(index, 1);
    renderIntoHTML();
}

function toggleTaskCompletion(index){
    tasksArray[index].Done = !tasksArray[index].Done;
    renderIntoHTML();
}

