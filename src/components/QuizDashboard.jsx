import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./QuizDashboard.css";
import axios from "axios";

const QuizDashboard = () => {
  const navigation = useNavigate();
  const [quizQns, setQuizQns] = useState([]);
  const [quizConfig, setQuizConfig] = useState({
    numQuestions: "",
    numOptions: "",
  });
  const [questions, setQuestions] = useState([]);
  const [step, setStep] = useState(1);

  const getUserLogin = async () => {
    let userDetails = localStorage.getItem("user");
    try {
      let user = await axios.get(
        `http://localhost:5500/api/v1/user/${userDetails}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (err) {
      console.error(err);
      if(err.response.data.error===true){
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        alert("Login Required");
        navigation("/");
      }
    }
    // console.log(user)
  };

  useEffect(() => {
    getUserLogin();
  }, []);

  const handleLogout = () => {
    navigation("/");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuizConfig({ ...quizConfig, [name]: Number(value) });
  };

  const handleCreateQuizSubmit = (e) => {
    e.preventDefault();
    const { numQuestions, numOptions } = quizConfig;
    if (numQuestions > 0 && numOptions > 0) {
      setQuestions(
        Array.from({ length: numQuestions }, () => ({
          question: "",
          options: Array(numOptions).fill(""),
        }))
      );
      setStep(2);
    }
  };

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[oIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleQuizSubmit = (e) => {
    e.preventDefault();
    console.log("Quiz Data:", questions);
    setQuizQns([...quizQns, { id: quizQns.length + 1, title: "New Quiz" }]);
    setStep(1);
  };

  return (
    <div className="dashboard-container">
      <div className="header">
        <div className="user-greeting">Hello, Kishan</div>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="content">
        <h2>Welcome to the Quiz Dashboard</h2>
        {step === 1 ? (
          <form className="quiz-form" onSubmit={handleCreateQuizSubmit}>
            <p>How Many Questions?</p>
            <input
              type="number"
              placeholder="Questions"
              name="numQuestions"
              value={quizConfig.numQuestions}
              onChange={handleInputChange}
            />
            <p>How many Options for Each Question?</p>
            <input
              type="number"
              placeholder="Options per Question"
              name="numOptions"
              value={quizConfig.numOptions}
              onChange={handleInputChange}
            />
            <button type="submit">Create Quiz</button>
          </form>
        ) : (
          <form className="quiz-form" onSubmit={handleQuizSubmit}>
            {questions.map((q, qIndex) => (
              <div key={qIndex} className="question-container">
                <p>Question {qIndex + 1}:</p>
                <input
                  type="text"
                  placeholder="Enter question"
                  value={q.question}
                  onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                />
                {q.options.map((option, oIndex) => (
                  <input
                    key={oIndex}
                    type="text"
                    placeholder={`Option ${oIndex + 1}`}
                    value={option}
                    onChange={(e) =>
                      handleOptionChange(qIndex, oIndex, e.target.value)
                    }
                  />
                ))}
              </div>
            ))}
            <button type="submit">Submit Quiz</button>
          </form>
        )}
        <ul className="quiz-list">
          <h2>My Quizzes</h2>
          <p>Take Quiz</p>
          {quizQns.map((quiz) => (
            <li key={quiz.id}>{quiz.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default QuizDashboard;
