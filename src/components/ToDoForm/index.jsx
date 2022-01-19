import React, { useState } from "react";
import PropTypes from "prop-types";

ToDoForm.propTypes = {
  onSubmit: PropTypes.func,
};
ToDoForm.defaultProps = {
  onSubmit: null,
};

function ToDoForm(props) {
  const { onSubmit } = props;
  const [newTodo, setnewTodo] = useState("");
  function handleSubmit(event) {
    event.preventDefault();
    if (!onSubmit) return;
    const formValues = {
      title: newTodo,
    };
    onSubmit(formValues);
    setnewTodo("");
  }
  function handleOnChange(event) {
    setnewTodo(event.target.value);
  }
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" onChange={handleOnChange} value={newTodo} />
    </form>
  );
}

export default ToDoForm;
