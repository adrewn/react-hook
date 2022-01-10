import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import ColorBox from "./components/ColorBox";
import ToDoList from "./components/ToDoList";

function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: "Reading a book" },
    { id: 2, title: "Program a function on the existing project" },
    { id: 3, title: "Cleaning the whole house" },
    { id: 4, title: "Bring the car to the body shop" },
  ]);
  function handleTodoClick(todo) {
    const index = todoList.findIndex((x) => x.id === todo.id);
    if (index < 0) return;

    const newTodoList = [...todoList];
    newTodoList.splice(index, 1);
    setTodoList(newTodoList);
  }
  return (
    <div className="App">
      <ColorBox />
      <ToDoList todos={todoList} onTodoClick={handleTodoClick} />
    </div>
  );
}

export default App;
