// QuestionItem.js
import React from "react";

function QuestionItem({ question, onDeleteQuestion, onUpdateQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:4000/questions/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        onDeleteQuestion();
      }
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  const handleCorrectAnswerChange = async (event) => {
    const newCorrectIndex = parseInt(event.target.value);

    try {
      const response = await fetch(`http://localhost:4000/questions/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          correctIndex: newCorrectIndex,
        }),
      });

      if (response.ok) {
        onUpdateQuestion();
      }
    } catch (error) {
      console.error("Error updating question:", error);
    }
  };

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select
          defaultValue={correctIndex}
          onChange={handleCorrectAnswerChange}
        >
          {options}
        </select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
