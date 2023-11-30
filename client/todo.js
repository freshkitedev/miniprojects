async function fetchData() {
    try {
        const response = await fetch('http://localhost:3000/todos');
        if (!response) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Data from the server:', data);

        // Clear the existing list items
        const todol = document.getElementById('todoList');
        todol.innerHTML = '';

        // Iterate over the data and create list items
        data.forEach(item => {
            let listItem = document.createElement('li');
            listItem.textContent = `${item.title}  : ${item.description}`;
            todol.appendChild(listItem);
            let editbutton = document.createElement('button');
            editbutton.textContent = "Edit"
            editbutton.id = "btne"
            editbutton.onclick = function () {
                clickedit(item);
            };
            
            listItem.appendChild(editbutton)
            let deletebutton = document.createElement('button');
            deletebutton.textContent = "Delete"
            deletebutton.id = "btnd"
            deletebutton.onclick = function () {
                clickdelete(item._id)
            }
            listItem.appendChild(deletebutton)
        });
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

/* fetch all todos from backend when this JS file is loaded by browser */
fetchData();

/* Below function is called when Save button is clicked. It does below actions
 * 1. Send POST http request to Backend to add the todo to the DB.
 * 2. Call fetchData to get all new todos and update the DOM to display new todos.
 */
 async function createtodo() {
    try {
        let ti = document.getElementById('title').value
        let des = document.getElementById('description').value
        let data = { title: ti, description: des }
        const response = await fetch('http://localhost:3000/todos', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(response => {
            if (!response) {
                throw new Error('Network response was not ok');
            }
            const res = response.json();
            console.log(res, "dfsdfs")
            fetchData()
        })
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

async function clickedit(item) {
    try {
        const id = item._id;
        console.log("fsdf", id)

        // Change the button text to "Update"
        const saveButton = document.getElementById('btn');
        saveButton.textContent = "Update";

        // Populate the input fields with the item data
        const tButton = document.getElementById('title');
        tButton.value = item.title;
        const dButton = document.getElementById('description');
        dButton.value = item.description;
        // Add a click event listener to the button for updating
        saveButton.onclick = async () => {
            try {
                let ti = tButton.value;
                let des = dButton.value;
                let data = { title: ti, description: des };

                const response = await fetch(`http://localhost:3000/todos/${id}`, {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });

                if (!response) {
                    throw new Error('Network response was not ok');
                }

                const res = await response.json();
                console.log(res, "dfsdfs");
                fetchData();

                // Reset the button text to "Save"
                saveButton.textContent = "Save";

                // Clear the input fields
                tButton.value = '';
                dButton.value = '';
            } catch (error) {
                console.error('Error updating data:', error.message);
            }
        };
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}
async function clickdelete(id) {
    let res = await fetch(`http://localhost:3000/todos/${id}`, {
        method: "DELETE",
    }).then((res) => {
        console.log(res, "res")
        fetchData();
    })
}