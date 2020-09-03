import React from 'react';
import Todo from './Todo';

export default function TodoList({ todos, toggleTodo }) {
  return (
    // map over our array and return ToDo elements
    todos.map(todo => {
      //unique key prop "key={todo}" allows React to only render props that change
      return <Todo key={todo.id} todo={todo} toggleTodo={toggleTodo}/>
    })
  )
}
