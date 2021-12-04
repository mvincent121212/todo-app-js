let draggables = [];
let containers = [];

const handleSubmitForm = (e) => {
    e.preventDefault();
    let input = document.querySelector('input');
    if (input.value != '') {
        addToDo(input.value);
    input.value = '';
    }
}

const handleClickCheckOrDelete = (e) => {
    if (e.target.getAttribute('name') == 'fa-check') {
        checkToDo(e);
    }
    else if (e.target.getAttribute('name') == 'fa-trash') {
        deleteToDo(e);
    }
}

const handleClearList = (e) => {
    document.querySelector('ul').innerHTML = '';
}

const addToDo = (toDo) => {
    let ul = document.querySelector('ul');
    let li = document.createElement('li');

    li.innerHTML = `
        <span class="todo-item">${toDo}</span>
        <div class="buttons">
            <button name = "checkButton" class="button"><i name='fa-check' class="fas fa-check"></i></button>
            <button name = "trashButton" class="button"><i name='fa-trash' class="fas fa-trash"></i></button>
        </div>    
    `;

    li.classList.add('todo-list-item');
    li.classList.add('draggable');
    li.setAttribute('draggable', true);
    ul.appendChild(li);
    dragAndDropListElements();
}

const checkToDo = (e) => {
    let itemButton = e.target.parentNode;
    let buttons = itemButton.parentNode;
    let item = buttons.parentNode;
    console.log(item);

    if (item.style.textDecoration == 'line-through 10px red') {
        item.style.textDecoration = 'none';
    }
    else {
        item.style.textDecoration = 'line-through';
        item.style.textDecorationThickness = '10px';
        item.style.textDecorationColor = 'red';
    }
}

const deleteToDo = (e) => {
    let itemButton = e.target.parentNode;
    let buttons = itemButton.parentNode;
    let item = buttons.parentNode;

    item.classList.add('todo-list-fall');
    
    item.addEventListener('transitionend', () => {
        item.remove();
    })



}

document.querySelector('form').addEventListener('submit', handleSubmitForm);
console.log(document.querySelector('ul').addEventListener('click', handleClickCheckOrDelete));
document.getElementById('clearAll').addEventListener('click', handleClearList);

const dragAndDropListElements = () => {  
    draggables = document.querySelectorAll('.draggable');
    const containers = document.querySelectorAll('.container');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', () => {
            draggable.classList.add('dragging')
        })
    
        draggable.addEventListener('dragend', () => {
            draggable.classList.remove('dragging')
        })
    })
    
    containers.forEach(container => {
        container.addEventListener('dragover', e => {
            e.preventDefault();
            // e.stopPropagation();
            const afterElement = getDragAfterElement(container, e.clientY);
            const currentlyDraggable = document.querySelector('.dragging');
            if (afterElement == null) {
                container.appendChild(currentlyDraggable);
            } else {
                container.insertBefore(currentlyDraggable, afterElement);
            }
    })
    })
}

function getDragAfterElement(container, y) {
    const draggableElements =  [...container.querySelectorAll('.draggable:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect()
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return {offset: offset, element: child}
        }
        else {
            return closest;
        }
        
    }, { offset: Number.NEGATIVE_INFINITY }).element
} 










