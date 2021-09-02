import React, { useState } from "react";
import Button from "../Button";
import { useEventBoard } from "../../contexts/EventBoardContext";
import "../Login-Signup/Forms.scss";

const TaskForm = ({ columnId, column }) => {
  console.log("column ", column.length);
  const { addTask } = useEventBoard();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  console.log("columnId ", columnId);
  // const id = columnId;

  function add(title = "", content) {
    console.log(`New Task: task_order: ${column.length} columnId: ${columnId}, title: ${title}, content: ${content}`);
    const data = [column.length, columnId, 1, title, content];
    // task_order, column_id(columnId), status(1), title, content, due_date(optional)
    addTask(data);
    reset();
  }

  const reset = () => {
    setTitle("");
    setContent("");
  };

  function validate(title, content) {
    if (!content) {
      setError("Please add a description");
      return;
    }
    setError("");
    add(title, content);
  }

  return (
    <div className="add-item-container wrapper">
      {/* <h2>New Task</h2> */}
      <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <div>
            <label htmlFor="task-title">
              Title:
              <span className="optional">
                <em> (optional)</em>
              </span>
            </label>
            <input
              className="create-input"
              name="task-title"
              type="text"
              placeholder="title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              data-testid="task-title-input"
            />
          </div>
          <div className="textarea-container">
            <p className="label" htmlFor="task-content">
              Content:
            </p>
            <textarea
              name="task-content"
              id="task-content"
              placeholder="Pick up suit"
              onChange={(e) => setContent(e.target.value)}
              value={content}
              data-testid="task-content-input"
            ></textarea>

            {error && <span className="error">{error}</span>}
          </div>
          <div className="btn-container">
            <button className="add-task-btn" onClick={() => validate(title, content)}>
              Add Task
            </button>
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

export default TaskForm;
