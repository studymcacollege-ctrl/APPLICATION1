// src/pages/QuizPage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function QuizPage() {
  const navigate = useNavigate();
  
  // ✅ Sample Quiz Data (Backend se replace karna)
  const quizData = {
    id: 1,
    title: "Science Basics Quiz",
    category: "science",
    timeLimit: 300, // 5 minutes in seconds
    questions: [
      {
        id: 1,
        question: "What is the chemical symbol for water?",
        options: ["H2O", "CO2", "NaCl", "O2"],
        correctAnswer: 0,
        explanation: "H2O represents two hydrogen atoms and one oxygen atom."
      },
      {
        id: 2,
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: 1,
        explanation: "Mars appears red due to iron oxide on its surface."
      },
      {
        id: 3,
        question: "What is the powerhouse of the cell?",
        options: ["Nucleus", "Ribosome", "Mitochondria", "Cytoplasm"],
        correctAnswer: 2,
        explanation: "Mitochondria produce ATP, the energy currency of cells."
      },
      {
        id: 4,
        question: "What is the speed of light in vacuum?",
        options: ["3×10⁶ m/s", "3×10⁸ m/s", "3×10¹⁰ m/s", "3×10⁴ m/s"],
        correctAnswer: 1,
        explanation: "Light travels at approximately 299,792,458 m/s in vacuum."
      },
      {
        id: 5,
        question: "Which gas do plants absorb during photosynthesis?",
        options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
        correctAnswer: 2,
        explanation: "Plants absorb CO2 and release oxygen during photosynthesis."
      }
    ]
  };

  // ✅ State Management
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(quizData.timeLimit);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);

  // ✅ Timer Logic
  useEffect(() => {
    if (submitted || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [submitted, timeLeft]);

  // ✅ Handle Answer Selection
  const handleAnswer = (questionId, optionIndex) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  // ✅ Calculate Score & Submit
  const handleSubmit = () => {
    let correctCount = 0;
    quizData.questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });
    const finalScore = Math.round((correctCount / quizData.questions.length) * 100);
    setScore({
      correct: correctCount,
      total: quizData.questions.length,
      percentage: finalScore,
      answers: answers
    });
    setSubmitted(true);
  };

  // ✅ Format Time Display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // ✅ Result Screen (After Submission)
  if (submitted && score) {
    return (
      <div style={styles.container}>
        <div style={styles.resultCard}>
          <h1 style={styles.resultTitle}>🎉 Quiz Completed!</h1>
          <div style={styles.scoreDisplay}>
            <span style={styles.scoreValue}>{score.percentage}%</span>
            <span style={styles.scoreText}>
              {score.correct}/{score.total} Correct
            </span>
          </div>
          
          {/* Answer Review */}
          <div style={styles.reviewSection}>
            <h3 style={styles.reviewTitle}>📋 Answer Review</h3>
            {quizData.questions.map((q, index) => {
              const userAns = answers[q.id];
              const isCorrect = userAns === q.correctAnswer;
              return (
                <div key={q.id} style={{
                  ...styles.reviewItem,
                  borderLeft: `4px solid ${isCorrect ? "#10b981" : "#ef4444"}`
                }}>
                  <p style={styles.reviewQuestion}>
                    <strong>Q{index + 1}:</strong> {q.question}
                  </p>
                  <p style={styles.reviewAnswer}>
                    Your answer:{" "}
                    <span style={{ color: isCorrect ? "#10b981" : "#ef4444", fontWeight: "600" }}>
                      {q.options[userAns] || "Not answered"}
                    </span>
                  </p>
                  {!isCorrect && (
                    <p style={styles.reviewCorrect}>
                      Correct: <span style={{ color: "#10b981" }}>{q.options[q.correctAnswer]}</span>
                    </p>
                  )}
                  <p style={styles.reviewExplanation}>💡 {q.explanation}</p>
                </div>
              );
            })}
          </div>

          <div style={styles.resultActions}>
            <button style={styles.retryBtn} onClick={() => window.location.reload()}>
              🔄 Retry Quiz
            </button>
            <button style={styles.homeBtn} onClick={() => navigate("/")}>
              🏠 Back to Home
            </button>
            <button style={styles.scoresBtn} onClick={() => navigate("/scores")}>
              🏆 View All Scores
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ✅ Quiz Taking Screen
  const question = quizData.questions[currentQuestion];

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.quizTitle}>{quizData.title}</h1>
        <div style={styles.timer}>
          ⏱️ {formatTime(timeLeft)}
        </div>
      </div>

      {/* Progress Bar */}
      <div style={styles.progressContainer}>
        <div style={styles.progressBar}>
          <div style={{ ...styles.progressFill, width: `${((currentQuestion + 1) / quizData.questions.length) * 100}%` }} />
        </div>
        <span style={styles.progressText}>
          Question {currentQuestion + 1} of {quizData.questions.length}
        </span>
      </div>

      {/* Question Card */}
      <div style={styles.questionCard}>
        <h3 style={styles.questionText}>{question?.question}</h3>
        
        <div style={styles.options}>
          {question?.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(question.id, index)}
              style={{
                ...styles.optionBtn,
                background: answers[question.id] === index 
                  ? "linear-gradient(135deg, #2563eb, #3b82f6)" 
                  : "#ffffff",
                color: answers[question.id] === index ? "#fff" : "#1e293b",
                border: answers[question.id] === index 
                  ? "2px solid #2563eb" 
                  : "1px solid #e2e8f0"
              }}
            >
              {String.fromCharCode(65 + index)}. {option}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div style={styles.navButtons}>
        <button
          onClick={() => setCurrentQuestion((prev) => Math.max(0, prev - 1))}
          disabled={currentQuestion === 0}
          style={{ ...styles.navBtn, opacity: currentQuestion === 0 ? 0.5 : 1 }}
        >
          ← Previous
        </button>
        
        {currentQuestion < quizData.questions.length - 1 ? (
          <button
            onClick={() => setCurrentQuestion((prev) => prev + 1)}
            disabled={!answers[question?.id]}
            style={{ ...styles.navBtn, opacity: !answers[question?.id] ? 0.5 : 1 }}
          >
            Next →
          </button>
        ) : (
          <button 
            onClick={handleSubmit} 
            disabled={Object.keys(answers).length < quizData.questions.length}
            style={{ 
              ...styles.submitBtn, 
              opacity: Object.keys(answers).length < quizData.questions.length ? 0.6 : 1 
            }}
          >
            ✅ Submit Quiz
          </button>
        )}
      </div>
    </div>
  );
}

/* ====================== 🎨 CLEAN BLUE & WHITE THEME ====================== */
const styles = {
  container: {
    minHeight: "100vh",
    background: "#f8fbff",
    color: "#1e293b",
    fontFamily: "'Segoe UI', Tahoma, sans-serif",
    padding: "30px 20px"
  },
  
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
    padding: "15px 20px",
    background: "rgba(255, 255, 255, 0.9)",
    borderRadius: "14px",
    border: "1px solid #e2e8f0",
    boxShadow: "0 3px 12px rgba(0, 0, 0, 0.04)"
  },
  
  quizTitle: {
    fontSize: "1.4rem",
    fontWeight: "700",
    color: "#1e3a5f",
    margin: 0
  },
  
  timer: {
    fontSize: "1.1rem",
    fontWeight: "600",
    color: "#2563eb",
    background: "#dbeafe",
    padding: "8px 16px",
    borderRadius: "20px"
  },
  
  progressContainer: {
    marginBottom: "25px"
  },
  
  progressBar: {
    height: "8px",
    background: "#e2e8f0",
    borderRadius: "4px",
    overflow: "hidden",
    marginBottom: "8px"
  },
  
  progressFill: {
    height: "100%",
    background: "linear-gradient(90deg, #2563eb, #60a5fa)",
    borderRadius: "4px",
    transition: "width 0.3s ease"
  },
  
  progressText: {
    fontSize: "0.85rem",
    color: "#64748b",
    textAlign: "center"
  },
  
  questionCard: {
    background: "#ffffff",
    padding: "25px",
    borderRadius: "16px",
    border: "1px solid #e2e8f0",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)",
    marginBottom: "25px"
  },
  
  questionText: {
    fontSize: "1.15rem",
    fontWeight: "600",
    color: "#1e3a5f",
    marginBottom: "20px",
    lineHeight: "1.4"
  },
  
  options: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  
  optionBtn: {
    padding: "14px 18px",
    borderRadius: "12px",
    fontSize: "0.95rem",
    fontWeight: "500",
    textAlign: "left",
    cursor: "pointer",
    transition: "all 0.2s ease",
    border: "1px solid #e2e8f0"
  },
  
  navButtons: {
    display: "flex",
    justifyContent: "space-between",
    gap: "12px"
  },
  
  navBtn: {
    flex: 1,
    padding: "12px 20px",
    background: "#ffffff",
    color: "#2563eb",
    border: "2px solid #2563eb",
    borderRadius: "50px",
    fontSize: "0.9rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease"
  },
  
  submitBtn: {
    flex: 1,
    padding: "12px 20px",
    background: "linear-gradient(135deg, #2563eb, #3b82f6)",
    color: "#fff",
    border: "none",
    borderRadius: "50px",
    fontSize: "0.9rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 4px 15px rgba(37, 99, 235, 0.3)"
  },
  
  // Result Screen Styles
  resultCard: {
    background: "#ffffff",
    padding: "35px 30px",
    borderRadius: "20px",
    border: "1px solid #e2e8f0",
    boxShadow: "0 8px 30px rgba(59, 130, 246, 0.15)",
    maxWidth: "700px",
    margin: "0 auto",
    textAlign: "center"
  },
  
  resultTitle: {
    fontSize: "1.8rem",
    fontWeight: "700",
    color: "#1e3a5f",
    marginBottom: "25px"
  },
  
  scoreDisplay: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "30px",
    padding: "20px",
    background: "linear-gradient(135deg, #dbeafe, #bfdbfe)",
    borderRadius: "16px"
  },
  
  scoreValue: {
    fontSize: "3rem",
    fontWeight: "800",
    color: "#2563eb",
    lineHeight: "1"
  },
  
  scoreText: {
    fontSize: "1rem",
    color: "#475569",
    marginTop: "8px"
  },
  
  reviewSection: {
    textAlign: "left",
    marginBottom: "30px",
    maxHeight: "350px",
    overflowY: "auto",
    paddingRight: "10px"
  },
  
  reviewTitle: {
    fontSize: "1.2rem",
    fontWeight: "600",
    color: "#1e3a5f",
    marginBottom: "15px",
    paddingBottom: "10px",
    borderBottom: "2px solid #e2e8f0"
  },
  
  reviewItem: {
    padding: "15px",
    marginBottom: "12px",
    background: "#f8fafc",
    borderRadius: "10px",
    border: "1px solid #e2e8f0"
  },
  
  reviewQuestion: {
    fontSize: "0.95rem",
    fontWeight: "600",
    color: "#1e3a5f",
    marginBottom: "8px"
  },
  
  reviewAnswer: {
    fontSize: "0.9rem",
    color: "#475569",
    marginBottom: "4px"
  },
  
  reviewCorrect: {
    fontSize: "0.9rem",
    color: "#475569",
    marginBottom: "6px"
  },
  
  reviewExplanation: {
    fontSize: "0.85rem",
    color: "#64748b",
    fontStyle: "italic",
    marginTop: "6px"
  },
  
  resultActions: {
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  
  retryBtn: {
    padding: "12px 24px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "50px",
    fontSize: "0.9rem",
    fontWeight: "600",
    cursor: "pointer"
  },
  
  homeBtn: {
    padding: "12px 24px",
    background: "#ffffff",
    color: "#2563eb",
    border: "2px solid #2563eb",
    borderRadius: "50px",
    fontSize: "0.9rem",
    fontWeight: "600",
    cursor: "pointer"
  },
  
  scoresBtn: {
    padding: "12px 24px",
    background: "#64748b",
    color: "#fff",
    border: "none",
    borderRadius: "50px",
    fontSize: "0.9rem",
    fontWeight: "600",
    cursor: "pointer"
  }
};

/* ====================== 🎨 HOVER EFFECTS ====================== */
const addHoverEffects = () => {
  if (typeof document !== "undefined") {
    const style = document.createElement("style");
    style.textContent = `
      /* Option Button Hover */
      button[style*="optionBtn"]:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 15px rgba(37, 99, 235, 0.2) !important;
        border-color: #2563eb !important;
      }
      
      /* Nav Button Hover */
      button[style*="navBtn"]:hover {
        background: #eff6ff !important;
        transform: translateY(-2px);
      }
      
      /* Submit Button Hover */
      button[style*="submitBtn"]:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 25px rgba(37, 99, 235, 0.5) !important;
      }
      
      /* Result Action Buttons Hover */
      button[style*="retryBtn"]:hover { background: #1d4ed8 !important; }
      button[style*="homeBtn"]:hover { background: #eff6ff !important; }
      button[style*="scoresBtn"]:hover { background: #475569 !important; }
    `;
    document.head.appendChild(style);
  }
};
addHoverEffects();