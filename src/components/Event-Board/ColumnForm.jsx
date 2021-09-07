import React, { useState } from "react";
import { useEventBoard } from "../../contexts/EventBoardContext";
import "../Forms.scss";

const TaskForm = ({ columnId, column, onClose }) => {
  const { addTask } = useEventBoard();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [btnName, setbtnName] = useState("");
  const [message, setMessage] = useState("");

  function add(title = "", content) {
    const data = [column.length, columnId, 1, title, content];
    addTask(data);
    saved();
    reset();
    onClose();
  }

  const reset = () => {
    setTitle("");
    setContent("");
    setTimeout(() => {
      setMessage("");
    }, 1000);
  };

  const saved = () => {
    setbtnName("saved");
    setMessage("Saved!");
  };

  function validate(title, content) {
    if (!content) {
      setMessage("Please add a description");
      setbtnName("error");
      return;
    }
    setMessage("");
    add(title, content);
  }

  return (
    <div className="add-item-container wrapper">
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

            {message && <span className={btnName}>{message}</span>}
          </div>
          <div className="btn-container">
            <button className="add-task-btn" onClick={() => validate(title, content)}>
              Add Task
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
