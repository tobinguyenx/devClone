import TaskItem from "./components/TaskItem"
import { useState } from "react"
import AddTodoForm from "./components/AddTodoForm"
import "./App.css"

function App() {
  const [todos,setTodos] = useState([
    { id: 1, name: "Task 1", description: "This is my task one", completed: false },
    { id: 2, name: "Task 2", description: "This is my task two", completed: true },
    { id: 3, name: "Task 3", description: "This is my task three", completed: false },
  ])

  const handleAddTodo = ({name,description}) => {
    const newTodo = {
      id: Date.now(),
      name,
      description,
      completed: false,
    }
    setTodos([...todos, newTodo])
  }

  const handleDelete = (id) => {
    setTodos(todos.filter((datadelete) => {
      return datadelete.id !== id
    }))
  }

  const handleonToggle = (id) => {
    setTodos(todos.map((dataToggle) => {
      return dataToggle.id === id ? {...dataToggle, completed: !dataToggle.completed} : dataToggle
    }))
  }
  

  return (
    <div className="container">
      <div className="mytodo">
        <h1>My todos</h1>
      </div>
      
      <AddTodoForm onAdd={handleAddTodo}></AddTodoForm>
      <ul>
        {todos.map((data) => (
          <TaskItem key={data.id} name={data.name} description={data.description} completed={data.completed} onDelete={handleDelete} id={data.id}
          onToggleComplete={handleonToggle}>
          </TaskItem>
        ))}
      </ul>
    </div>
  )
}

export default App
