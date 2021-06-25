var list = [];
var id = 0;

const addTask = (event,form) => {
    event.preventDefault();

    if(validate(form)){
        id++;
        let item = form[0].value;
        let dateTask = form[1].value;
        let task = {
            id: id,
            task: item,
            dateTask: dateTask,
            status:'no_realizada',
        }

        list.push(task);
        updateList();

    } else {
        alert('Datos cargados incorrectamente');
    }

}

const validate = (form) => {
    if(form[0].value != '' && form[1].value != '') return true
    return false
}

const updateList = () => {
    console.log(list);

    let listContainer = document.querySelector('#list');
    listContainer.innerText = '';
    list.forEach( item => {
        listContainer.innerHTML+=`<div class='${item.status}'>
            ${item.id} ${item.dateTask} Tarea: ${item.task}
        <button onClick="doneItem(${item.id})">Realizada</button>
        <button onClick="deleteItem(${item.id})">Quitar</button>
        </div>`
    })
}

const deleteItem = (id) => {
    list = list.filter( item => item.id != id);
    updateList();
}

const doneItem = (id) => {
    list.find( item => item.id === id).status = 'realizada';
    updateList();
}

