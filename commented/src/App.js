import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
const { v4: uuidv4 } = require('uuid');

const LocalStorageKey = 'todoApp.todos';

function App() {
  //passing default state; destructuring array since useState returns array by default; ref: object destructuring https://www.youtube.com/watch?v=NIq3qLaHCIs (13:23); default Todo for useState {id: 1, name: 'Todo 1', complete: false}
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();
  //loading our todos upon load only hence [] of dependencies (only true once)
  useEffect(()=> {
    const storedTodos = JSON.parse(localStorage.getItem(LocalStorageKey))
    if(storedTodos) setTodos(storedTodos)
  }, [])
  //saving to local storage; setting todos what we get back from our stored todos; function called upon change; to avoid not being persisted upon page reload --> use localStorage; setting array of todos as dependency everytime it changes at end of useEffect
  useEffect(()=> {
    localStorage.setItem(LocalStorageKey, JSON.stringify(todos))
  }, [todos])
  
  //store change of todo (toggle on/off complete); newTodos = copy of current list so we don't lose any items (when when modifying the change of a state variable, it is always good practice to first make a copy of it to set the new state) explained at 25:13
  const toggleTodo = id => {
    //copy of state variable
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
    {/* HTML for App component, useRef allows us to access elements inside of our HTML, namely, our input */}
    <input ref={todoNameRef}type="text" />
    <button onClick={handleAddTodo}>Add Todo</button>
    <button onClick={handleClearTodos}>Clear Completed</button>
    <div>{todos.filter(todo => !todo.complete).length} Left to Do</div>
    {/* returning/passing TodoList component and todos prop */}
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