import React, { useState } from "react";
import { useEventBoard } from "../../contexts/EventBoardContext";

const ModifyTaskForm = ({ task }) => {
  const { updateTask, deleteTask } = useEventBoard();
  const [title, setTitle] = useState(task.title);
  const [content, setContent] = useState(task.content);
  const [expenseBudget, setExpenseBudget] = useState(task.expense_budget);
  const [expenseActual, setExpenseActual] = useState(task.expense_actual);

  const [error, setError] = useState("");

  const save = () => {
    const data = { id: task.id, title, content, expense_budget: expenseBudget, expense_actual: expenseActual };
    updateTask(data);
    reset();
  };

  const reset = () => {
    setTitle("");
    setContent("");
    setExpenseBudget("");
    setExpenseActual("");
  };

  const validate = (title, content, expenseBudget, expenseActual) => {
    if (!content) {
      setError("Please add a description");
      return;
    }
    setError("");
    save(title, content, expenseBudget, expenseActual);
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




          <div className="budget container">
            <div className="task_expense_budget">
              <label htmlFor="task_expense_budget">Budget: </label>
              <input
                type="text"
                name="task_expense_budget"
                value={expenseBudget}
                onChange={(e) => setExpenseBudget(e.target.value)}
              />
            </div>

            <div className="task_expense_actual">
              <label htmlFor="task_expense_actual">True Cost: </label>
              <input
                type="text"
                name="task_expense_actual"
                value={expenseActual}
                onChange={(e) => setExpenseActual(e.target.value)}
              />
            </div>
          </div>



            {error && <span className="error">{error}</span>}
          </div>
          <div className="btn-container">
            <button className="save-btn" onClick={() => validate(title, content, expenseBudget, expenseActual)}>
              Save
            </button>
            <button className="delete-btn" onClick={() => onDelete()}>
              Delete
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ModifyTaskForm;
