import React, { useState } from "react";
import { useEventBoard } from "../../contexts/EventBoardContext";
import "../Login-Signup/Forms.scss";

const ModifyColumnForm = ({ column }) => {
  const { updateColumnName } = useEventBoard();
  const [title, setTitle] = useState(column.title);
  const [message, setMessage] = useState("");
  const [btnName, setbtnName] = useState("");

  const save = (title) => {
    const data = { id: column.id, title };
    // console.log(data);
    updateColumnName(data);
    saved();
    reset();
  };

  const reset = () => {
    setTitle(title);
    setTimeout(() => {
      setMessage("");
    }, 4000);
  };

  const saved = () => {
    setbtnName("saved");
    setMessage("Saved!");
  };

  const validate = (title) => {
    if (!title) {
      setMessage("A column must have a title");
      setbtnName("error");
      return;
    }
    setMessage("");
    save(title);
  };

  // const onDelete = () => {
  //   deleteColumn({ id: column.id });
  // };

  return (
    <div className="modify-column-container wrapper">
      <h2>Column Name</h2>
      <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <div>
            <label htmlFor="column-title">Title:</label>

            <input
              className="create-input"
              name="column-title"
              type="text"
              placeholder="title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              data-testid="col-title-input"
            />
            <p>{message && <span className={btnName}>{message}</span>}</p>
            {/* <p>{error && <span className="error">{error}</span>}</p> */}
            {/* {message && <span className="saved">{message}</span>} */}
          </div>
          <div className="btn-container">
            <button className="save-btn" onClick={() => validate(title)}>
              Save
            </button>

            {/* <button className="delete-btn" onClick={() => onDelete()}>
              Delete
            </button> */}
          </div>
        </div>
      </form>
    </div>
  );
};

export default ModifyColumnForm;
