// src/pages/AdminPanel.jsx
import { Link } from "react-router-dom";

export default function AdminPanel() {
  // Placeholder quiz data
  const quizzes = [
    { id: 1, title: "Science Basics", category: "science", questions: 20, status: "active" },
    { id: 2, title: "World History", category: "history", questions: 25, status: "active" },
    { id: 3, title: "Tech Trivia", category: "tech", questions: 15, status: "draft" }
  ];

  return (
    <div style={styles.container}>
      
      {/* ✅ Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>🛠️ Admin Panel</h1>
        <Link to="/admin/quizzes/new" style={styles.createBtn}>➕ Create Quiz</Link>
      </div>

      {/* ✅ Stats Cards */}
      <div style={styles.stats}>
        <div style={styles.statCard}>
          <span style={styles.statIcon}>📚</span>
          <div>
            <span style={styles.statValue}>{quizzes.length}</span>
            <span style={styles.statLabel}>Total Quizzes</span>
          </div>
        </div>
        <div style={styles.statCard}>
          <span style={styles.statIcon}>✅</span>
          <div>
            <span style={styles.statValue}>{quizzes.filter(q => q.status === "active").length}</span>
            <span style={styles.statLabel}>Active</span>
          </div>
        </div>
        <div style={styles.statCard}>
          <span style={styles.statIcon}>✏️</span>
          <div>
            <span style={styles.statValue}>{quizzes.filter(q => q.status === "draft").length}</span>
            <span style={styles.statLabel}>Drafts</span>
          </div>
        </div>
      </div>

      {/* ✅ Quiz List Section */}
      <h2 style={styles.sectionTitle}>📋 Manage Quizzes</h2>
      <div style={styles.quizList}>
        {quizzes.map((quiz) => (
          <div key={quiz.id} style={styles.quizCard}>
            <div style={styles.quizInfo}>
              <h3 style={styles.quizTitle}>{quiz.title}</h3>
              <span style={{...styles.categoryBadge, background: getCategoryColor(quiz.category)}}>
                {quiz.category}
              </span>
            </div>
            <div style={styles.quizMeta}>
              <span>❓ {quiz.questions} Questions</span>
              <span style={{...styles.statusBadge, background: quiz.status === "active" ? "#10b981" : "#94a3b8"}}>
                {quiz.status}
              </span>
            </div>
            <div style={styles.quizActions}>
              <Link to={`/admin/quizzes/${quiz.id}/edit`} style={styles.editBtn}>✏️ Edit</Link>
              <button style={styles.toggleBtn}>
                {quiz.status === "active" ? "🔴 Deactivate" : "🟢 Activate"}
              </button>
              <button style={styles.deleteBtn}>🗑️ Delete</button>
            </div>
          </div>
        ))}
      </div>
      
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

/* ====================== 🎨 CLEAN BLUE & WHITE THEME - ADMIN PANEL ====================== */
const styles = {
  // ✅ Container - Soft Light Background (Matches HomePage)
  container: {
    minHeight: "100vh",
    background: "#f8fbff",  // ✅ Soft light blue (no dark gradient)
    color: "#1e293b",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: "35px 20px"
  },
  
  // ✅ Header
  header: { 
    display: "flex", 
    justifyContent: "space-between", 
    alignItems: "center", 
    marginBottom: "30px", 
    flexWrap: "wrap", 
    gap: "15px",
    padding: "20px 25px",
    background: "rgba(255, 255, 255, 0.9)",
    borderRadius: "16px",
    border: "1px solid #e2e8f0",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.04)"
  },
  title: { 
    fontSize: "1.75rem",  // ✅ Smaller font
    fontWeight: "700",
    color: "#1e3a5f",
    margin: 0
  },
  createBtn: {
    padding: "10px 24px", 
    background: "#2563eb",  // ✅ Solid blue (no gradient)
    color: "#fff", 
    textDecoration: "none", 
    borderRadius: "50px", 
    fontSize: "0.9rem",  // ✅ Smaller font
    fontWeight: "500",
    transition: "background 0.2s ease"
  },
  
  // ✅ Stats Section
  stats: { 
    display: "grid", 
    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", 
    gap: "12px", 
    marginBottom: "35px" 
  },
  statCard: {
    background: "#ffffff",  // ✅ White card
    padding: "16px 18px", 
    borderRadius: "14px",
    display: "flex", 
    alignItems: "center", 
    gap: "12px", 
    border: "1px solid #e2e8f0",  // ✅ Subtle gray border
    boxShadow: "0 3px 10px rgba(0, 0, 0, 0.04)",
    transition: "transform 0.2s ease"
  },
  statIcon: { fontSize: "1.5rem" },  // ✅ Smaller icon
  statValue: { 
    display: "block", 
    fontSize: "1.3rem",  // ✅ Smaller font
    fontWeight: "700", 
    color: "#2563eb"  // ✅ Blue instead of purple
  },
  statLabel: { 
    display: "block", 
    fontSize: "0.8rem",  // ✅ Smaller font
    color: "#64748b"  // ✅ Readable gray
  },
  
  // ✅ Section Title
  sectionTitle: { 
    fontSize: "1.4rem",  // ✅ Smaller font
    fontWeight: "600", 
    marginBottom: "20px",
    color: "#1e3a5f",
    paddingLeft: "5px"
  },
  
  // ✅ Quiz List
  quizList: { 
    display: "flex", 
    flexDirection: "column", 
    gap: "14px"  // ✅ Slightly more gap
  },
  quizCard: {
    background: "#ffffff",  // ✅ White card
    padding: "18px 20px", 
    borderRadius: "14px",
    border: "1px solid #e2e8f0",
    boxShadow: "0 3px 12px rgba(0, 0, 0, 0.04)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease"
  },
  quizInfo: { 
    display: "flex", 
    justifyContent: "space-between", 
    alignItems: "center", 
    marginBottom: "10px" 
  },
  quizTitle: { 
    fontSize: "0.95rem",  // ✅ Smaller font
    fontWeight: "600", 
    color: "#1e3a5f",
    margin: 0
  },
  categoryBadge: { 
    padding: "4px 12px", 
    borderRadius: "18px", 
    fontSize: "0.75rem",  // ✅ Smaller font
    fontWeight: "500",
    color: "#fff"
  },
  quizMeta: { 
    display: "flex", 
    justifyContent: "space-between", 
    fontSize: "0.85rem",  // ✅ Smaller font
    color: "#64748b", 
    marginBottom: "14px" 
  },
  statusBadge: { 
    padding: "3px 10px", 
    borderRadius: "12px", 
    fontSize: "0.75rem",  // ✅ Smaller font
    fontWeight: "500",
    color: "#fff"
  },
  
  // ✅ Action Buttons
  quizActions: { 
    display: "flex", 
    gap: "8px", 
    flexWrap: "wrap" 
  },
  editBtn: {
    padding: "7px 14px", 
    background: "#3b82f6", 
    color: "#fff", 
    border: "none",
    borderRadius: "10px", 
    textDecoration: "none", 
    fontSize: "0.8rem",  // ✅ Smaller font
    fontWeight: "500",
    cursor: "pointer",
    transition: "background 0.2s ease"
  },
  toggleBtn: {
    padding: "7px 14px", 
    background: "#64748b", 
    color: "#fff", 
    border: "none",
    borderRadius: "10px", 
    fontSize: "0.8rem", 
    cursor: "pointer",
    transition: "background 0.2s ease"
  },
  deleteBtn: {
    padding: "7px 14px", 
    background: "#ef4444", 
    color: "#fff", 
    border: "none",
    borderRadius: "10px", 
    fontSize: "0.8rem", 
    cursor: "pointer",
    transition: "background 0.2s ease"
  }
};

/* ====================== 🎨 HOVER EFFECTS ====================== */
const addHoverEffects = () => {
  if (typeof document !== "undefined") {
    const style = document.createElement("style");
    style.textContent = `
      /* Create Button Hover */
      a[style*="createBtn"]:hover {
        background: #1d4ed8 !important;
        transform: translateY(-2px);
      }
      
      /* Stat Card Hover */
      div[style*="statCard"]:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08) !important;
        border-color: #cbd5e1 !important;
      }
      
      /* Quiz Card Hover */
      div[style*="quizCard"]:hover {
        transform: translateY(-3px);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08) !important;
        border-color: #cbd5e1 !important;
      }
      
      /* Edit Button Hover */
      a[style*="editBtn"]:hover {
        background: #2563eb !important;
      }
      
      /* Toggle Button Hover */
      button[style*="toggleBtn"]:hover {
        background: #475569 !important;
      }
      
      /* Delete Button Hover */
      button[style*="deleteBtn"]:hover {
        background: #dc2626 !important;
      }
    `;
    document.head.appendChild(style);
  }
};
addHoverEffects();