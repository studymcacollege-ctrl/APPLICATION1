// src/pages/admin/QuizList.jsx
import { Link } from "react-router-dom"

export default function QuizList() {
  // Demo data (replace with API call later)
  const quizzes = [
    { id: "1", title: "Python Basics", subject: "python", questions: 15, status: "active" },
    { id: "2", title: "DSA Fundamentals", subject: "dsa", questions: 20, status: "draft" },
    { id: "3", title: "Web Dev Quiz", subject: "fullstack", questions: 12, status: "active" }
  ]

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>📚 Manage Quizzes</h1>
        <Link to="/admin/quizzes/new" style={styles.createBtn}>➕ Create Quiz</Link>
      </div>

      {/* Filters */}
      <div style={styles.filters}>
        {["all", "active", "draft"].map(status => (
          <button key={status} style={styles.filterBtn}>{status}</button>
        ))}
      </div>

      {/* Quiz List */}
      <div style={styles.list}>
        {quizzes.map(quiz => (
          <div key={quiz.id} style={styles.card}>
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>{quiz.title}</h3>
              <span style={{...styles.badge, background: quiz.status === "active" ? "#10b981" : "#94a3b8"}}>
                {quiz.status}
              </span>
            </div>
            <div style={styles.cardMeta}>
              <span>📁 {quiz.subject}</span>
              <span>❓ {quiz.questions} questions</span>
            </div>
            <div style={styles.cardActions}>
              <Link to={`/admin/quizzes/${quiz.id}/edit`} style={styles.editBtn}>✏️ Edit</Link>
              <button style={styles.deleteBtn}>🗑️ Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const styles = {
  container: { padding: "20px", maxWidth: "1000px", margin: "0 auto" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "10px" },
  title: { fontSize: "1.6rem", fontWeight: "700", color: "#1e3a5f", margin: 0 },
  createBtn: { padding: "10px 22px", background: "#2563eb", color: "#fff", textDecoration: "none", borderRadius: "50px", fontWeight: "500" },
  filters: { display: "flex", gap: "8px", marginBottom: "20px" },
  filterBtn: { padding: "8px 16px", background: "#fff", border: "1px solid #cbd5e1", borderRadius: "20px", cursor: "pointer" },
  list: { display: "flex", flexDirection: "column", gap: "14px" },
  card: { background: "#fff", padding: "18px", borderRadius: "14px", border: "1px solid #e2e8f0", boxShadow: "0 3px 10px rgba(0,0,0,0.04)" },
  cardHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" },
  cardTitle: { fontSize: "1.1rem", fontWeight: "600", color: "#1e3a5f", margin: 0 },
  badge: { padding: "4px 12px", borderRadius: "15px", fontSize: "0.75rem", color: "#fff", fontWeight: "500" },
  cardMeta: { display: "flex", gap: "16px", fontSize: "0.9rem", color: "#64748b", marginBottom: "14px" },
  cardActions: { display: "flex", gap: "8px" },
  editBtn: { padding: "7px 14px", background: "#3b82f6", color: "#fff", border: "none", borderRadius: "8px", textDecoration: "none", fontSize: "0.85rem", cursor: "pointer" },
  deleteBtn: { padding: "7px 14px", background: "#ef4444", color: "#fff", border: "none", borderRadius: "8px", fontSize: "0.85rem", cursor: "pointer" }
}