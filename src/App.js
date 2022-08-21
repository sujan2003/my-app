
import React,{useState, useRef, useEffect} from 'react';
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid'; // gets a random id number 
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';


const LOCAL_STORAGE_KEY = 'todoApp.todos';

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef(); // to get the input from the user 

  useEffect(() => { // to load our todos when the component loads
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);
  },[]);

  useEffect(() => { // allows the todos to be saved to local storage 
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]); //activates when the todos change


  function toggleTodo(id) {
    const newTodos = [...todos] //copy of our todos array, alway create a duplicate of the array(don't modify a state variable directly)
    const todo = newTodos.find((todo) => todo.id === id)
    todo.complete = !todo.complete;
    // todo.body.style.textDecoration = 'line-through'; // strike through the text when the todo is completed
    setTodos(newTodos);
  }


  function handleAddTodo(e){
    const name = todoNameRef.current.value
    if (name === '') return
    setTodos((prevTodos) => { //sets the todos to the previous todos and adds the new todo to the end of the array
      return [...prevTodos, {id: uuidv4(), name: name, complete: false}]
    })
    todoNameRef.current.value = null;

  }

  function handleClearTodo(e){
    const newTodos = todos.filter((todo) => !todo.complete)
    setTodos(newTodos);
  }

  function clearAllTodo(e){
    const newTodos = [];
    setTodos(newTodos);
  }

  return (
    <div style={{height: '100vh', width: '100vw', display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexDirection: 'column' }}>
      <div style={{ height: '20%', width: '50%', padding: '40px '}}>
          <InputGroup className="mb-3">
            <Form.Control
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              ref={todoNameRef}
              type="text"
              placeholder="Tasks"
            />
            <Button variant="primary" id="button-addon2" onClick={handleAddTodo}>Add Todo</Button>
          </InputGroup>
      </div>

      <div style={{ height: '54px',border: '1px solid black', height: 'auto', width: '50%', padding: '40px '}}>
        <h1 margin="12px" align="center">Todos</h1>
        <div >
          <TodoList todos = {todos} toggleTodo={toggleTodo}/>
          <div><span style={{ color: 'red'}}>{todos.filter((todo) =>{
          return !todo.complete
        }).length}</span> left to do</div>
        </div>
        <div style={{height: 'auto', width: '70%', marginTop: '10px'}}>
          <Button style={{marginRight: '10px'}} variant="success" onClick={handleClearTodo}>Clear Completed Todos</Button>
          <Button variant="danger" onClick={clearAllTodo}>Clear All</Button>
        </div>

      </div>
      
      

    </div>
    
    
  );
}

export default App;
