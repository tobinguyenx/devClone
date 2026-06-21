import {useState} from 'react'

const AddTodoForm = ({onAdd}) => {
    
    const [name,setName] = useState("");
    const [description,setDescription] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()

        const trimmedName = name.trim()
        const trimmedDescription = description.trim()
        if (!trimmedName || !trimmedDescription) {
            setError("Please write the text for Name and Description")
            return
        }

        onAdd({name: trimmedName, description: trimmedDescription})

        setName("")
        setDescription("")
        setError("")

    }

  return (
    <div>

      <form className="todo-form" onSubmit={handleSubmit}>
        <div>
            <label htmlFor="task-name">Name</label>
            <input id="task-name"type="text" value={name} onChange={(e) => setName(e.target.value)}/>
        </div>

        <div>
            <label htmlFor="task-description">Description</label>
            <input id="task-description" type="text" value={description}onChange={(e) => setDescription(e.target.value)}/>
        </div>

        <button type="submit">Add Todo</button>
       
        {error && <p role="alert" style={{ color: "red" }}>{error}</p>}
        
        </form>

    </div>
  )
}

export default AddTodoForm
