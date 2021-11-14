// Select the elements
const clear = document.querySelector(".clear")
const list = document.querySelector(".todo-list")
const input = document.querySelector("input")
const allbtn = document.querySelector(".all")
const pending = document.querySelector(".pending")
const completed = document.querySelector(".completed")
const items = document.querySelector(".items")


// Class names
const check = "fa-check-circle";
const uncheck = "fa-circle-thin";
const line_through = "lineThrough";

let done = "";

//variables
var LIST, id;

// function to update the number of items in the list
function displaynoofitems(){
  items.innerHTML = `${list.getElementsByClassName("item").length} items`
}

//get item from localstorage
let data = localStorage.getItem("TODO");

//check if data
if(data){
  LIST = JSON.parse(data);
  id = LIST.length; // set the id to the last one in the list 
  loadList(LIST); // load the list to the user interface
}else{
  //if data isn't empty
  LIST = [];
  id = 0;
}

//load items to the user's interface
function loadList(array){
  array.forEach(function(item){
    addToDo(item.name, item.id, item.done, item.trash);
  });
}

//clear the local storage
clear.addEventListener("click", function(){
  localStorage.clear();
  location.reload();
})

// add to do function

function addToDo(toDo, id, done, trash){

  if(trash){ return; }

  const DONE = done ? check : uncheck;
  const LINE = done ? line_through: "";
  

  var item =`<li class ="item" >
                <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                <p class="text ${LINE}"> ${toDo}</p>
                <i class="de fa fa-trash-o de" job="delete" id="${id}"></i>
              </li>`;
  const position = "beforeend";

  list.insertAdjacentHTML(position, item);
  displaynoofitems()
}

// add an item to the list 
document.addEventListener("keyup", function(even){
  if(event.keyCode == 13){
    const toDo = input.value;
    //if the input isn't empty
    if(toDo){
      addToDo(toDo, id ,false, false);

      LIST.push({
        name : toDo,
        id : id,
        done : false,
        trash : false
      });

      //add item to localstorage
      localStorage.setItem("TODO", JSON.stringify(LIST));

      id++;
    }
    input.value = "";
  }
  
});

// complete to do 
function completeToDo(element){
  element.classList.toggle(check);
  element.classList.toggle(uncheck);
  element.parentNode.querySelector(".text").classList.toggle(line_through);

  // element.id = 0;
  
  LIST[element.id].done = LIST[element.id].done ? false : true;

}

// remove to do
function removeToDo(element){
  element.parentNode.parentNode.removeChild(element.parentNode);

  // element.id = 0;
  displaynoofitems()
  LIST[element.id].trash = true;
}

// target the items creates dynamically
list.addEventListener("click", function(event){
  const element = event.target; //return the clicked element inside list 
  const elementJob = element.attributes.job.value; // complete or delete 

  if(elementJob == "complete"){
    completeToDo(element);
  }else if(elementJob == "delete"){
    removeToDo(element);
  }
  //add item to localstorage
  localStorage.setItem("TODO", JSON.stringify(LIST));
})

// navbar

// all button
allbtn.addEventListener("click", function(){location.reload()})


// pending button
pending.addEventListener("click", function(event){
  list.innerHTML = "";
  const toDo = input.value;
  for(i=0;i<LIST.length;i++){
    if(!LIST[i].done && !LIST[i].trash){

  var item =`<li class ="item" >
                <i class="fa fa-circle-thin co" job="complete" id="${i}"></i>
                <p class="text"> ${LIST[i].name} </p>
                <i class="de fa fa-trash-o de" job="delete" id="${i}"></i>
              </li>`;

  const position = "beforeend";

  list.insertAdjacentHTML(position, item);
    }
  }
})


// completed button
completed.addEventListener("click", function(event){
  list.innerHTML = "";
  const toDo = input.value;
  for(i=0;i<LIST.length;i++){
    if(LIST[i].done && !LIST[i].trash){

  var item =`<li class ="item" >
                <i class="fa co fa-check-circle" job="complete" id="${i}"></i>
                <p class="text lineThrough"> ${LIST[i].name} </p>
                <i class="de fa fa-trash-o de" job="delete" id="${i}"></i>
              </li>`;

  const position = "beforeend";

  list.insertAdjacentHTML(position, item);
    }
  }
})

// console.log(list.getElementsByClassName("item").length);