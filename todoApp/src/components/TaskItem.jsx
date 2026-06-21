const TaskItem = ({ id, name, description, completed, onDelete, onToggleComplete }) => {
  return (
    <li className="task-item">
      <div>
        <h3 style={{ textDecoration: completed ? "line-through" : "none" }}>{name}</h3>
        <p>{description}</p>
      </div>
      <div>
        <button
          onClick={() => onToggleComplete(id)}
          aria-pressed={completed}
          aria-label={completed ? `Mark "${name}" as not complete` : `Mark "${name}" as complete`}
        >
          {completed ? "Undo" : "Complete"}
        </button>
        <button
          onClick={() => onDelete(id)}
          aria-label={`Delete task "${name}"`}
        >
          Delete
        </button>
      </div>
    </li>
  )
}

export default TaskItem