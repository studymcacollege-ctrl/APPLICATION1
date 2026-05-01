// src/pages/ScoresPage.jsx
import { Link } from "react-router-dom";

export default function ScoresPage() {
  // ✅ Sample Scores Data (Backend se replace karna)
  const scores = [
    { id: 1, quiz: "Science Basics", score: 85, total: 100, date: "2024-04-28", category: "science" },
    { id: 2, quiz: "World History", score: 72, total: 100, date: "2024-04-27", category: "history" },
    { id: 3, quiz: "Tech Trivia", score: 94, total: 100, date: "2024-04-26", category: "tech" },
    { id: 4, quiz: "Geography Quiz", score: 68, total: 100, date: "2024-04-25", category: "geography" }
  ];

  // ✅ Calculate Average Score
  const averageScore = scores.length > 0 
    ? Math.round(scores.reduce((acc, s) => acc + s.score, 0) / scores.length) 
    : 0;

  return (
    <div style={styles.container}>
      
      {/* ✅ Page Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>🏆 Your Scores</h1>
        <Link to="/quiz" style={styles.playBtn}>🎯 Play New Quiz</Link>
      </div>

      {/* ✅ Stats Overview */}
      <div style={styles.stats}>
        <div style={styles.statCard}>
          <span style={styles.statIcon}>📊</span>
          <div>
            <span style={styles.statValue}>{averageScore}%</span>
            <span style={styles.statLabel}>Average Score</span>
          </div>
        </div>
        <div style={styles.statCard}>
          <span style={styles.statIcon}>✅</span>
          <div>
            <span style={styles.statValue}>{scores.length}</span>
            <span style={styles.statLabel}>Quizzes Taken</span>
          </div>
        </div>
        <div style={styles.statCard}>
          <span style={styles.statIcon}>🎯</span>
          <div>
            <span style={styles.statValue}>
              {scores.filter(s => s.score >= 80).length}
            </span>
            <span style={styles.statLabel}>High Scores (80%+)</span>
          </div>
        </div>
      </div>

      {/* ✅ Scores List */}
      {scores.length === 0 ? (
        <div style={styles.empty}>
          <p style={styles.emptyText}>No quizzes attempted yet!</p>
          <Link to="/quiz" style={styles.startBtn}>🚀 Start Your First Quiz</Link>
        </div>
      ) : (
        <div style={styles.scoresPanel}>
          <div style={styles.scoresList}>
            {scores.map((s) => (
              <div key={s.id} style={styles.scoreCard}>
                <div style={styles.scoreHeader}>
                  <div>
                    <h3 style={styles.quizName}>{s.quiz}</h3>
                    <span style={{ ...styles.categoryBadge, background: getCategoryColor(s.category) }}>
                      {s.category}
                    </span>
                  </div>
                  {/* ✅ BIG SCORE BADGE */}
                  <span style={styles.scoreBadge}>{s.score}%</span>
                </div>
                
                {/* Progress Bar */}
                <div style={styles.progressBar}>
                  <div style={{ ...styles.progressFill, width: `${s.score}%` }} />
                </div>
                
                {/* Meta Info */}
                <div style={styles.scoreMeta}>
                  <span style={styles.date}>📅 {s.date}</span>
                  <span style={{ ...styles.resultText, color: s.score >= 80 ? "#10b981" : s.score >= 60 ? "#f59e0b" : "#ef4444" }}>
                    {s.score >= 80 ? "🌟 Excellent!" : s.score >= 60 ? "👍 Good" : "💪 Keep Practicing"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ✅ Category Color Helper
const getCategoryColor = (cat) => {
  const colors = {
    science: "#3b82f6",
    history: "#f59e0b",
    sports: "#10b981",
    tech: "#8b5cf6",
    movies: "#ec4899",
    geography: "#06b6d4"
  };
  return colors[cat] || "#64748b";
};

/* ====================== 🎨 CLEAN BLUE & WHITE THEME ====================== */
const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 30%, #bfdbfe 70%, #93c5fd 100%)",
    color: "#1e293b",
    fontFamily: "'Segoe UI', Tahoma, sans-serif",
    padding: "40px 25px",
    position: "relative",
    overflow: "hidden"
  },
  
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "35px",
    flexWrap: "wrap",
    gap: "15px",
    padding: "20px 25px",
    background: "rgba(255, 255, 255, 0.9)",
    borderRadius: "16px",
    border: "1px solid #e2e8f0",
    boxShadow: "0 4px 15px rgba(59, 130, 246, 0.1)"
  },
  
  title: {
    fontSize: "1.75rem",
    fontWeight: "700",
    color: "#1e3a5f",
    margin: 0
  },
  
  playBtn: {
    padding: "10px 24px",
    background: "#2563eb",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "50px",
    fontSize: "0.9rem",
    fontWeight: "500",
    transition: "background 0.2s ease"
  },
  
  stats: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "14px",
    marginBottom: "35px"
  },
  
  statCard: {
    background: "rgba(255, 255, 255, 0.95)",
    padding: "18px 20px",
    borderRadius: "14px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    border: "1px solid #e2e8f0",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.04)"
  },
  
  statIcon: { fontSize: "1.6rem" },
  
  statValue: {
    display: "block",
    fontSize: "1.4rem",
    fontWeight: "700",
    color: "#2563eb"
  },
  
  statLabel: {
    display: "block",
    fontSize: "0.8rem",
    color: "#64748b"
  },
  
  empty: {
    textAlign: "center",
    padding: "60px 30px",
    background: "rgba(255, 255, 255, 0.9)",
    borderRadius: "16px",
    maxWidth: "500px",
    margin: "0 auto",
    border: "1px solid #e2e8f0"
  },
  
  emptyText: {
    color: "#64748b",
    fontSize: "1rem",
    marginBottom: "25px"
  },
  
  startBtn: {
    display: "inline-block",
    padding: "12px 28px",
    background: "#2563eb",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "50px",
    fontSize: "0.95rem",
    fontWeight: "600"
  },
  
  scoresPanel: {
    maxWidth: "750px",
    margin: "0 auto",
    padding: "25px 20px",
    background: "rgba(255, 255, 255, 0.85)",
    backdropFilter: "blur(15px)",
    borderRadius: "20px",
    border: "1px solid rgba(59, 130, 246, 0.2)",
    boxShadow: "0 10px 40px rgba(59, 130, 246, 0.15)"
  },
  
  scoresList: {
    display: "flex",
    flexDirection: "column",
    gap: "18px"
  },
  
  scoreCard: {
    background: "rgba(255, 255, 255, 0.95)",
    padding: "22px 24px",
    borderRadius: "16px",
    border: "1px solid #e2e8f0",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)",
    transition: "transform 0.25s ease, box-shadow 0.25s ease"
  },
  
  scoreHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "14px"
  },
  
  quizName: {
    fontSize: "1rem",
    fontWeight: "600",
    color: "#1e3a5f",
    margin: "0 0 8px 0"
  },
  
  categoryBadge: {
    padding: "4px 12px",
    borderRadius: "18px",
    fontSize: "0.75rem",
    fontWeight: "500",
    color: "#fff"
  },
  
  scoreBadge: {
    background: "linear-gradient(135deg, #2563eb, #3b82f6)",
    padding: "10px 24px",
    borderRadius: "24px",
    fontWeight: "700",
    fontSize: "1.2rem",
    color: "#fff",
    boxShadow: "0 4px 15px rgba(37, 99, 235, 0.4)"
  },
  
  progressBar: {
    height: "10px",
    background: "#dbeafe",
    borderRadius: "6px",
    overflow: "hidden",
    marginBottom: "12px",
    border: "1px solid rgba(59, 130, 246, 0.1)"
  },
  
  progressFill: {
    height: "100%",
    background: "linear-gradient(90deg, #2563eb, #60a5fa)",
    borderRadius: "6px",
    transition: "width 0.5s ease"
  },
  
  scoreMeta: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "0.85rem"
  },
  
  date: {
    color: "#64748b"
  },
  
  resultText: {
    fontWeight: "500"
  }
};

/* ====================== 🎨 HOVER EFFECTS ====================== */
const addHoverEffects = () => {
  if (typeof document !== "undefined") {
    const style = document.createElement("style");
    style.textContent = `
      /* Play Button Hover */
      a[style*="playBtn"]:hover {
        background: #1d4ed8 !important;
        transform: translateY(-2px);
      }
      
      /* Start Button Hover */
      a[style*="startBtn"]:hover {
        background: #1d4ed8 !important;
        transform: translateY(-2px);
      }
      
      /* Score Card Hover */
      div[style*="scoreCard"]:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 35px rgba(59, 130, 246, 0.2) !important;
        border-color: #60a5fa !important;
      }
      
      /* Score Badge Hover */
      span[style*="scoreBadge"]:hover {
        transform: scale(1.05);
        box-shadow: 0 8px 25px rgba(37, 99, 235, 0.6) !important;
      }
    `;
    document.head.appendChild(style);
  }
};
addHoverEffects();