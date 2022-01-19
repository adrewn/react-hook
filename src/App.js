import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import queryString from "query-string";
import ColorBox from "./components/ColorBox";
import ToDoList from "./components/ToDoList";
import ToDoForm from "./components/ToDoForm";
import PostList from "./components/PostList";
import Pagination from "./components/Pagination";
import PostFiltersForm from "./components/PostFiltersForm";

function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: "Reading a book" },
    { id: 2, title: "Program a function on the existing project" },
    { id: 3, title: "Cleaning the whole house" },
    { id: 4, title: "Bring the car to the body shop" },
  ]);
  const [PostLists, setPostLists] = useState([]);
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows: 1,
  });
  const [filters, setFilters] = useState({
    _limit: 10,
    _page: 1,
  title_like:'',
 });

  useEffect(() => {
    async function fetcPostList() {
      try {
        const paramsString = queryString.stringify(filters);
        const requestUrl = `https://js-post-api.herokuapp.com/api/posts?_limit=${paramsString}`;
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();
        setPostLists(responseJSON.data);
        setPagination(responseJSON.pagination);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetcPostList();
  }, [filters]);

  function handleTodoClick(todo) {
    const index = todoList.findIndex((x) => x.id === todo.id);
    if (index < 0) return;

    const newTodoList = [...todoList];
    newTodoList.splice(index, 1);
    setTodoList(newTodoList);
  }

  function handleSubmit(formValues) {
    const newTodoList = [...todoList];
    newTodoList.push({ id: newTodoList.length + 1, title: formValues.title });
    setTodoList(newTodoList);
  }
  function handlePageChange(newPage) {
    setFilters({ ...filters, _page: newPage });
  }
  function handleFiltersChange(newFilters) {
    console.log(newFilters);
    setFilters({
      ...filters,
      _page:1,
      title_like: newFilters.searchTerm
    })
  }
  return (
    <div className="App">
      <ColorBox />
      <ToDoList todos={todoList} onTodoClick={handleTodoClick} />
      <ToDoForm onSubmit={handleSubmit} />
      <PostFiltersForm onSubmit={handleFiltersChange} />
      <PostList posts={PostLists} />
      <Pagination pagination={pagination} onPageChange={handlePageChange} />
    </div>
  );
}

export default App;
