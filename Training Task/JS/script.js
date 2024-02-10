let AddTodoBtn = document.querySelector(".btn1");
let popup = document.querySelector(".popup");
let saveBtn = document.querySelector(".saveBtn");
let cancelBtn = document.querySelector(".cancelBtn");
let TodoName = document.querySelector("#name");
let Description = document.querySelector("#text");
let Priority = document.querySelector("#priority");
let section = document.querySelector(".todo-list");

AddTodoBtn.addEventListener("click", () => {
  popup.classList.remove("d-none");
});

cancelBtn.addEventListener("click", () => {
  popup.classList.add("d-none");
});

saveBtn.addEventListener("click", () => {
  let list = {
    id: Date.now(),
    name: TodoName.value,
    description: Description.value,
    priority: Priority.value,
  };

  let TodoList = localStorage.getItem("lists");

  TodoList = TodoList === null ? [] : JSON.parse(TodoList);

  TodoList.push(list);
  localStorage.setItem("lists", JSON.stringify(TodoList));

  section.innerHTML = TodoList.map((value) => {
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
                        <div class="flex-item">
                            <p class="list-para">${value.description}</p>
                            <div><button class="deleteBtn" style="color:red;" data-id="${value.id}"><i class="fa fa-trash" aria-hidden="true" ></i></button></div>
                        </div>
                    </section>
                    <hr>   
            </section>`;

  }).join("");
  deletelist();
  popup.classList.add("d-none");
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Your list has been saved",
    showConfirmButton: false,
    timer: 2000,
  }).then((result) => {
    popup.classList.add("d-none");
  });
});

function printData() {
  let lists = localStorage.getItem("lists");
  let todoList = document.querySelector(".todo-list");

  lists = JSON.parse(lists);

  let list = lists.map((value) => {
    return `
        <section class="list-items">
                    <section class="list-sec">
                        <span class="list-heading">${value.name}</span>
                        <span class="priority" style="background-color: ${pri};">${value.priority}</span>
                        <div class="flex-item">
                            <p class="list-para">${value.description}</p>
                            <div><button class="deleteBtn" style="color:red;" data-id="${value.id}"><i class="fa fa-trash" aria-hidden="true" ></i></button></div>
                        </div>
                    </section>
                    <hr>   
                </section>`;
  });
  todoList.innerHTML = list.join("");
  deletelist();
}

function deletelist() {
  let current_tasks = document.querySelectorAll(".deleteBtn");
  current_tasks.forEach((button) => {
    button.addEventListener("click", () => {
      let id = button.dataset.id;
      console.log(id);
      let lists = JSON.parse(localStorage.getItem("lists"));
      let lists1 = lists.filter((value) => {
        return value.id != id;
      });
      Swal.fire({
        title: "Are you sure?",
        text: "Are you sure to delete",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.setItem("lists", JSON.stringify(lists1));
          printData();
        }
      });
    });
  });
}
