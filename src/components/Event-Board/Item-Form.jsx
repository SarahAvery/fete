import React, { useState } from "react";

export default function ItemForm(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const reset = () => {
    setName("");
    setInterviewer(null);
  };

  const cancel = () => {
    reset();
    props.onCancel();
  };

  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    if (!interviewer) {
      setError("Please select an interviewer");
      return;
    }
    setError("");
    props.onSave(name, interviewer);
  }

  const [error, setError] = useState("");

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            data-testid="student-name-input"
          />
        </form>
        {/* <section className="appointment__validation">{error}</section> */}
        {/* <InterviewerList interviewers={props.interviewers} interviewer={interviewer} setInterviewer={setInterviewer} /> */}
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <button danger onClick={cancel}>
            Cancel
          </button>
          <button confirm onClick={validate}>
            Save
          </button>
        </section>
      </section>
    </main>
  );
}
