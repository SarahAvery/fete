import React, { useState } from "react";
import Button from "../Button";
import { useEventBoard } from "../../contexts/EventBoardContext";
import "../Login-Signup/Forms.scss";

const ModifyTaskForm = ({ task }) => {
  const { updateTask, deleteTask } = useEventBoard();
  const [title, setTitle] = useState(task.title);
  const [content, setContent] = useState(task.content);
  const [error, setError] = useState("");

  const save = () => {
    const data = { id: task.id, title, content };
    updateTask(data);
    reset();
  };

  const reset = () => {
    setTitle("");
    setContent("");
  };

  const validate = (title, content) => {
    if (!content) {
      setError("Please add a description");
      return;
    }
    setError("");
    save(title, content);
  };

  const onDelete = () => {
    deleteTask({ id: task.id });
  };

  return (
    <div className="modify-task-container wrapper">
      <h2>Edit Task</h2>
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
            <button className="save-btn" onClick={() => validate(title, content)}>
              Save
            </button>
            <button className="delete-btn" onClick={() => onDelete()}>
              Delete
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

export default ModifyTaskForm;
