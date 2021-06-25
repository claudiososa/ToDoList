var list = [];
var id = 0;
var storageLength = localStorage.length;
//localStorage.clear();

if ( storageLength > 0){
    id = storageLength;

    let storageItem;
    
    for (let i = 0; i < localStorage.length; i++){        
        storageItem = JSON.parse(localStorage.getItem(localStorage.key(i)));
        list.push(storageItem);    
    }

    updateList();
}else{
    //Local storage is empty
    console.log('storage vacio');
}

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
        localStorage.setItem(id, JSON.stringify(task));
        //console.log('detalle',localStorage.getItem(id));
        updateList();

    } else {
        alert('Datos cargados incorrectamente');
    }

}

const validate = (form) => {
    if(form[0].value != '' && form[1].value != '') return true
    return false
}

//const updateList = () => {
function updateList(){
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
    localStorage.removeItem(id);
    updateList();
}

const doneItem = (id) => {
    list.find( item => item.id === id).status = 'realizada';
        
    let itemTemp = list.find( item => item.id === id);    
    localStorage.removeItem(id);
    localStorage.setItem(id,JSON.stringify(itemTemp));
    updateList();
}

