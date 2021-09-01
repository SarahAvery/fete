import React, { useState } from "react";
import Button from "../Button";
import { useEventBoard } from "../../contexts/EventBoardContext";

const ItemForm = ({ columnId, column }) => {
  console.log("column ", column.length);
  const { addTask } = useEventBoard();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  console.log("columnId ", columnId);
  // const id = columnId;

  async function add(title = "", content) {
    console.log(`New Task: task_order: ${column.length} columnId: ${columnId}, title: ${title}, content: ${content}`);
    const data = [column.length, columnId, 1, title, content];
    // task_order, column_id(columnId), status(1), title, content, due_date(optional)
    addTask(data);
  }

  // const reset = () => {
  //   setTitle("");
  //   setContent("");
  // };

  // const cancel = () => {
  //   reset();
  //   props.onCancel();
  // };

  // function validate() {

  //   if (!content) {
  //     setError("Please add some words");
  //     return;
  //   }
  //   setError("");
  //   props.onSave( content);
  // }

  // const [error, setError] = useState("");

  return (
    <div className="add-item-container wrapper">
      <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <div>
            <label htmlFor="task-title">Title: </label>
            <input
              className="create-input"
              name="task-title"
              type="text"
              placeholder="title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              data-testid="task-title-input"
            />
            {/* {error.email && <span className="error">This email was not found. Please signup.</span>} */}
          </div>
          <div>
            <label htmlFor="task-content">Content: </label>
            <input
              className="create-input"
              name="task-content"
              type="text"
              placeholder="Pick up suit"
              onChange={(e) => setContent(e.target.value)}
              value={content}
              data-testid="task-content-input"
            />
            {/* {error.authenticated && <span className="error">Incorrect password</span>} */}
          </div>
          <div className="btn-container">
            <Button onClick={() => add(title, content)}>Add Task</Button>
          </div>
          {/* <button danger onClick={cancel}>
            Cancel
          </button>
          <button confirm onClick={validate}>
            Save
          </button> */}
        </div>
      </form>
    </div>
  );
};

export default ItemForm;
