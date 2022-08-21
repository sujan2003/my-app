import React from 'react'
import Form from 'react-bootstrap/Form';

export default function Todo({todo, toggleTodo}) {
    function handleTodoClick(){
        toggleTodo(todo.id)
    }
  return (
    <div>
        <label>
            {/* <input type="checkbox" /> */}
            <Form.Check checked={todo.complete} onChange={handleTodoClick} aria-label="option 1" label={todo.name}/>

            
        </label>
    </div>
  )
}
