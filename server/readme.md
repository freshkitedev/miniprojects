## TODO application
### Routes:
- POST /todos
   Description: Creates a todo entry
   Input: { title: 'Gym', description: 'Go to gym at 6 am' }
   Output: { message: 'Todo created successfully'}

- GET /todos
   Description: Get all todos entry
   Output: { todos: [{title: 'Gym', description: 'Go to gym at 6 am'}, {....}]}

 DELETE /todos
   Description: Delete a todo item
   Output: { message: 'Todo deleted successfully'}

### Collections
todo : {title:"", description:""}
