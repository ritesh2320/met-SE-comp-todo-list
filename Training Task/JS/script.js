let AddTodoBtn = document.querySelector(".btn1");
let popup = document.querySelector(".popup")
let saveBtn = document.querySelector(".saveBtn")
let cancelBtn = document.querySelector(".cancelBtn")
let TodoName = document.querySelector("#name")
let Description = document.querySelector("#text")
let Priority = document.querySelector("#priority")
let section = document.querySelector(".todo-list")

console.log(AddTodoBtn)
console.log(saveBtn)

AddTodoBtn.addEventListener("click",()=>{
    popup.classList.remove('d-none');
})

cancelBtn.addEventListener("click",()=>{
    popup.classList.add('d-none');
})

saveBtn.addEventListener("click",()=>{
    let list = {
        id:Date.now(),
        name:TodoName.value,
        description:Description.value,
        priority:Priority.value
    }
    
    console.log(Priority.value)
    

    let TodoList = localStorage.getItem('lists');
    
    TodoList = TodoList===null? []:JSON.parse(TodoList);

    TodoList.push(list)
    localStorage.setItem('lists',JSON.stringify(TodoList));
    

    section.innerHTML = TodoList.map((value)=>{
        if (value.priority == "!") {
            pri = "green";
          } else if (value.priority == "!!") {
            pri = "blue";
          } else {
            pri = "red";
          }
        return `<section class="list-items">
                    <section class="list-sec">
                        <span class="list-heading">${value.name}</span>
                        <span class="priority" style="background-color: ${pri};">${value.priority}</span>
                        <p class="list-para">${value.description}</p>
                    </section>
                    <hr>
                    <div class="icon" data-id="${value.id}">
                    <p><i class="fa fa-trash" aria-hidden="true"></i></p>
                    </div>    
                </section>`
    }).join("");
    popup.classList.add('d-none');
})
