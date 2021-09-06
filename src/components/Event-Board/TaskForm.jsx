import React, { useState } from "react";
import { useEventBoard } from "../../contexts/EventBoardContext";
import "../Forms.scss";

const TaskForm = ({ columnId, column }) => {
  const { addTask } = useEventBoard();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [expenseBudget, setExpenseBudget] = useState();
  const [expenseActual, setExpenseActual] = useState();
  const [error, setError] = useState("");

  function add(title = "", content, expenseBudget, expenseActual) {
    const data = [column.length, columnId, 1, title, content, expenseBudget, expenseActual];
    // task_order, column_id(columnId), status(1), title, content, due_date(optional)
    addTask(data);
    reset();
  }

  const reset = () => {
    setTitle("");
    setContent("");
    setExpenseBudget("");
    setExpenseActual("");
  };

  function validate(title, content, expenseBudget, expenseActual) {
    let cleanBudget = formatMoneyInput(expenseBudget)
    let cleanActual = formatMoneyInput(expenseActual)
    if (!content) {
      setError("Please add a description");
      return;
    }
    setError("");
    add(title, content, cleanBudget, cleanActual);
  }

  const formatMoneyInput = (moneyInput) => {
    let input = String(moneyInput)
    input = input.includes('$') ? input = input.slice(1) : input
    return parseInt(input.replace(',',''))
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
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
