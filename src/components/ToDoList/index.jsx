import React from 'react';
import PropTypes from 'prop-types';

ToDoList.propTypes={
    todos: PropTypes.array,
    onTodoClick: PropTypes.func,
}
ToDoList.defaultProps={
    todos:[],
    onTodoClick: null,
}

function ToDoList(props) {
    const {todos, onTodoClick}= props;
    function handleClick(todo){
       if(onTodoClick){ onTodoClick(todo);}
    }
    return (
       <ul>
           {todos.map((todo)=> <li onClick={()=>handleClick(todo)} key={todo.id}>{todo.title}</li>)}
       </ul>
    );
}

export default ToDoList;