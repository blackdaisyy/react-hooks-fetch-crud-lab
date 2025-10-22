// App.js
import React, { useState, useEffect } from "react";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState("List");

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch("http://localhost:4000/questions");
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  return (
    <main>
      <h1>Quiz Admin</h1>
      <button onClick={() => setPage("Form")}>New Question</button>
      <button onClick={() => setPage("List")}>View Questions</button>

      {page === "Form" ? (
        <QuestionForm onAddQuestion={fetchQuestions} />
      ) : (
        <QuestionList
          questions={questions}
          onDeleteQuestion={fetchQuestions}
          onUpdateQuestion={fetchQuestions}
        />
      )}
    </main>
  );
}

export default App;
