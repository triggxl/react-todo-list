import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
const { v4: uuidv4 } = require('uuid');

const LocalStorageKey = 'todoApp.todos';

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();
  useEffect(()=> {
    const storedTodos = JSON.parse(localStorage.getItem(LocalStorageKey))
    if(storedTodos) setTodos(storedTodos)
  }, [])
  useEffect(()=> {
    localStorage.setItem(LocalStorageKey, JSON.stringify(todos))
  }, [todos])
  
  const toggleTodo = id => {
    const newTodos = [...todos];
    //modified todo
    const todo = newTodos.find(todo => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  const handleAddTodo = (e) => {
    const name = todoNameRef.current.value;
    if(name === '') return;
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false}];
    })
    //clear input
    todoNameRef.current.value = null;
  }

  const handleClearTodos = () => {
    const newTodos = todos.filter(todo => !todo.complete);
    setTodos(newTodos);
  }

  return (
  <>
    <h3>My To-Do List</h3>
    <input ref={todoNameRef}type="text" />
    <button onClick={handleAddTodo}>Add Todo</button>
    <button onClick={handleClearTodos}>Clear Completed</button>
    <div>{todos.filter(todo => !todo.complete).length} Left to Do</div>
    <TodoList todos={todos} toggleTodo={toggleTodo}/>
  </>
  )
}

export default App;

/*
1. Write HTML for Application (App.js)
2. Create file for new component
3. create function + return statement with markup/props
4. rfc to create function component
5. Import new component to App


Why Is Array/Object Destructuring So Useful And How To Use It + Spread Operator
  to take an object or array and convert it to smaller objects, elements or variables
+ returning multiple params from a function
+ grabbing nested objects
+ inside of function calls
https://www.youtube.com/watch?v=NIq3qLaHCIs


const [elementToSupply1, anotherElement, ...restOfElements] = myArray
const [elementToSupply1, , anotherElement, ...restOfElements] = myObject
const [a, ,, c] = myArray === skip second element
console.log(myArray, myObject)
stopped at 3:07 on 9/1

//stopped at 15:23 on 8/31- https://www.youtube.com/watch?v=hQAHSlTtcmY

*/