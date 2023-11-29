

function addTodo() {
    let tit = document.getElementById("title").value;
    let desc = document.getElementById("des").value;
    let data = {
        title:tit,
        description:desc
    }
    console.log("Title:", tit, "Des:", desc);

    fetch("http://localhost:3000/todos", 
    {
        method:"post", 
        headers:{"content-type":"application/json"},
        body:JSON.stringify(data)
    }).then((res) => {
        res.json().then((data) => {
            console.log("get response:", data);
            getAll()
        })
    })
}

function displayTodos(data) {
    const parent = document.getElementById("tarea");
    parent.innerHTML = "";

    data.forEach(element => {
        const desctitle = document.createElement("li");
        desctitle.textContent = (`${element.title}:${element.description}`)
        console.log("display:", element.title, element.description);
        const editbtn = document.createElement("button")
        editbtn.textContent = ("Edit")
        editbtn.id = "edit"
        const deletebtn = document.createElement("button");
        deletebtn.textContent = ("Delete")
        deletebtn.id = "delete"
        desctitle.appendChild(editbtn);
        desctitle.appendChild(deletebtn)
        parent.appendChild(desctitle);
        
    });
}

function getAll() {
    console.log("Get all todos");
    fetch("http://localhost:3000/todos", {method:"get"}).then((res) => {
        res.json().then((data) => { 
            displayTodos(data)
            console.log("get:", data);
        })
    })
}

getAll()