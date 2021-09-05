import React, { useState } from "react";
import { useEventBoard } from "../../contexts/EventBoardContext";
import "../Login-Signup/Forms.scss";

const TaskForm = ({ columnId, column }) => {
  // console.log("column ", column.length);
  const { addTask } = useEventBoard();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [expenseBudget, setExpenseBudget] = useState();
  const [expenseActual, setExpenseActual] = useState();
  const [error, setError] = useState("");

  // console.log("columnId ", columnId);

  function add(title = "", content, expenseBudget, expenseActual) {
    // console.log(`New Task: task_order: ${column.length} columnId: ${columnId}, title: ${title}, content: ${content}`);
    const data = [column.length, columnId, 1, title, content, expenseBudget, expenseActual];
    // task_order, column_id(columnId), status(1), title, content, due_date(optional)
    addTask(data);
    reset();
  }

  const reset = () => {
    setTitle("");
    setContent("");
    setExpenseBudget();
    setExpenseActual();
  };

  function validate(title, content, expenseBudget, expenseActual) {
    if (!content) {
      setError("Please add a description");
      return;
    }
    setError("");
    add(title, content, expenseBudget, expenseActual);
  }

  return (
    <div className="add-item-container wrapper">
      {/* <h2>Add New Task</h2> */}
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

          <div className="btn-container">
            <button className="add-task-btn" onClick={() => validate(title, content, expenseBudget, expenseActual)}>
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
