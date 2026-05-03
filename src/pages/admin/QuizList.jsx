// src/pages/admin/QuizList.jsx
import { useState } from "react"  // ✅ THIS WAS MISSING!
import { Link, useNavigate } from "react-router-dom"

export default function QuizList() {
  const navigate = useNavigate()
  
  // Filter state
  const [filter, setFilter] = useState("all")  // ✅ Now useState works!
  
  // Demo data
  const quizzes = [
    { id: "1", title: "Python Basics", subject: "python", questions: 15, attempts: 234, avgScore: 78, status: "active", lastUpdated: "2 hours ago" },
    { id: "2", title: "DSA Fundamentals", subject: "dsa", questions: 20, attempts: 156, avgScore: 65, status: "draft", lastUpdated: "1 day ago" },
    { id: "3", title: "Web Dev Quiz", subject: "fullstack", questions: 12, attempts: 89, avgScore: 82, status: "active", lastUpdated: "3 days ago" },
    { id: "4", title: "Operating Systems", subject: "os", questions: 18, attempts: 312, avgScore: 71, status: "active", lastUpdated: "1 week ago" },
    { id: "5", title: "Computer Networks", subject: "networks", questions: 16, attempts: 198, avgScore: 68, status: "draft", lastUpdated: "2 weeks ago" }
  ]

  const filteredQuizzes = filter === "all" ? quizzes : quizzes.filter(q => q.status === filter)

  const handleDelete = (id, title) => {
    if (window.confirm(`Delete "${title}"?`)) {
      alert(`✅ "${title}" deleted!`)
    }
  }

  const handleToggleStatus = (quiz) => {
    const newStatus = quiz.status === "active" ? "draft" : "active"
    alert(`✅ "${quiz.title}" ${newStatus === "active" ? "activated" : "drafted"}!`)
  }

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        
        {/* Header */}
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>📚 Manage Quizzes</h1>
            <p style={styles.subtitle}>Create, edit, and organize your quiz content</p>
          </div>
          <Link to="/admin/quizzes/new" style={styles.createBtn}>
            <span style={styles.createIcon}>➕</span>
            <span style={styles.createText}>Create New Quiz</span>
          </Link>
        </div>

        {/* Stats */}
        <div style={styles.statsGrid}>
          <StatBox icon="📊" label="Total" value={quizzes.length} color="#3b82f6" />
          <StatBox icon="🟢" label="Active" value={quizzes.filter(q => q.status === "active").length} color="#10b981" />
          <StatBox icon="🟡" label="Drafts" value={quizzes.filter(q => q.status === "draft").length} color="#f59e0b" />
          <StatBox icon="🎯" label="Attempts" value={quizzes.reduce((s, q) => s + q.attempts, 0)} color="#8b5cf6" />
        </div>

        {/* Toolbar */}
        <div style={styles.toolbar}>
          <div style={styles.filters}>
            {["all", "active", "draft"].map(status => (
              <button key={status} onClick={() => setFilter(status)} style={{...styles.filterBtn, ...(filter === status ? styles.filterActive : {})}}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
          <div style={styles.searchBox}>
            <span style={styles.searchIcon}>🔍</span>
            <input type="text" placeholder="Search..." style={styles.searchInput} />
          </div>
        </div>

        {/* Quiz List */}
        <div style={styles.list}>
          {filteredQuizzes.length === 0 ? (
            <div style={styles.emptyState}>
              <span style={styles.emptyIcon}>📭</span>
              <h3 style={styles.emptyTitle}>No quizzes found</h3>
              <Link to="/admin/quizzes/new" style={styles.emptyBtn}>➕ Create Quiz</Link>
            </div>
          ) : (
            filteredQuizzes.map(quiz => (
              <div key={quiz.id} style={styles.card}>
                <div style={styles.cardHeader}>
                  <div style={styles.cardTitleSection}>
                    <h3 style={styles.cardTitle}>{quiz.title}</h3>
                    <span style={{...styles.badge, background: quiz.status === "active" ? "#10b981" : "#94a3b8"}}>{quiz.status}</span>
                  </div>
                  <div style={styles.cardActions}>
                    <Link to={`/admin/quizzes/${quiz.id}/edit`} style={styles.iconBtn}>✏️</Link>
                    <button onClick={() => handleToggleStatus(quiz)} style={styles.iconBtn}>{quiz.status === "active" ? "🔴" : "🟢"}</button>
                    <button onClick={() => handleDelete(quiz.id, quiz.title)} style={{...styles.iconBtn, ...styles.deleteIcon}}>🗑️</button>
                  </div>
                </div>
                <div style={styles.cardBody}>
                  <div style={styles.cardMeta}>
                    <MetaItem icon="📁" label="Subject" value={quiz.subject} />
                    <MetaItem icon="❓" label="Questions" value={quiz.questions} />
                    <MetaItem icon="🎯" label="Attempts" value={quiz.attempts} />
                    <MetaItem icon="⭐" label="Avg Score" value={`${quiz.avgScore}%`} />
                  </div>
                  <div style={styles.cardFooter}>
                    <span style={styles.lastUpdated}>Updated {quiz.lastUpdated}</span>
                    <Link to={`/admin/quizzes/${quiz.id}/edit`} style={styles.viewBtn}>View Details →</Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

// ✅ StatBox Component
function StatBox({ icon, label, value, color }) {
  return (
    <div style={{...styles.statBox, borderLeft: `4px solid ${color}`}}>
      <span style={styles.statIcon}>{icon}</span>
      <div>
        <span style={{...styles.statValue, color}}>{value}</span>
        <span style={styles.statLabel}>{label}</span>
      </div>
    </div>
  )
}

// ✅ MetaItem Component
function MetaItem({ icon, label, value }) {
  return (
    <div style={styles.metaItem}>
      <span style={styles.metaIcon}>{icon}</span>
      <div>
        <span style={styles.metaLabel}>{label}</span>
        <span style={styles.metaValue}>{value}</span>
      </div>
    </div>
  )
}

/* ====================== 🎨 STYLES ====================== */
const styles = {
  pageWrapper: { minHeight: "100vh", background: "linear-gradient(135deg, #667eea 0%, #764ba2 30%, #f093fb 70%, #f5576c 100%)", padding: "40px 20px", display: "flex", alignItems: "flex-start", justifyContent: "center" },
  container: { width: "100%", maxWidth: "1000px", background: "#ffffff", padding: "40px 35px", borderRadius: "24px", border: "1px solid rgba(59, 130, 246, 0.2)", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px", paddingBottom: "20px", borderBottom: "2px solid #f1f5f9", flexWrap: "wrap", gap: "15px" },
  title: { fontSize: "2rem", fontWeight: "800", color: "#1e3a5f", margin: "0 0 6px 0", background: "linear-gradient(90deg, #3b82f6, #7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
  subtitle: { fontSize: "1rem", color: "#64748b", margin: 0 },
  createBtn: { display: "flex", alignItems: "center", gap: "8px", padding: "14px 28px", background: "linear-gradient(135deg, #3b82f6, #6366f1)", color: "#fff", textDecoration: "none", borderRadius: "50px", fontWeight: "600", fontSize: "1rem", boxShadow: "0 8px 25px rgba(59, 130, 246, 0.4)" },
  createIcon: { fontSize: "1.2rem" },
  createText: { whiteSpace: "nowrap" },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px", marginBottom: "30px" },
  statBox: { background: "linear-gradient(145deg, #ffffff, #f8fafc)", padding: "20px", borderRadius: "14px", display: "flex", alignItems: "center", gap: "14px", border: "1px solid #e2e8f0" },
  statIcon: { fontSize: "2rem" },
  statValue: { display: "block", fontSize: "1.8rem", fontWeight: "800" },
  statLabel: { display: "block", fontSize: "0.85rem", color: "#64748b" },
  toolbar: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "15px" },
  filters: { display: "flex", gap: "10px" },
  filterBtn: { padding: "10px 20px", background: "#fff", border: "2px solid #cbd5e1", borderRadius: "25px", cursor: "pointer", fontSize: "0.9rem", fontWeight: "500", color: "#64748b" },
  filterActive: { background: "linear-gradient(135deg, #3b82f6, #6366f1)", color: "#fff", border: "none", boxShadow: "0 4px 15px rgba(59, 130, 246, 0.4)" },
  searchBox: { display: "flex", alignItems: "center", gap: "10px", background: "#f8fafc", padding: "10px 18px", borderRadius: "50px", border: "2px solid #e2e8f0" },
  searchIcon: { fontSize: "1.1rem", color: "#94a3b8" },
  searchInput: { border: "none", background: "transparent", fontSize: "0.95rem", color: "#1e293b", outline: "none", width: "180px" },
  list: { display: "flex", flexDirection: "column", gap: "18px" },
  emptyState: { textAlign: "center", padding: "60px 40px", background: "linear-gradient(145deg, #f8fafc, #ffffff)", borderRadius: "16px", border: "2px dashed #cbd5e1" },
  emptyIcon: { fontSize: "4rem", display: "block", marginBottom: "16px" },
  emptyTitle: { fontSize: "1.4rem", fontWeight: "700", color: "#1e3a5f", marginBottom: "8px" },
  emptyBtn: { display: "inline-flex", alignItems: "center", gap: "6px", padding: "12px 24px", background: "linear-gradient(135deg, #3b82f6, #6366f1)", color: "#fff", textDecoration: "none", borderRadius: "50px", fontWeight: "600", fontSize: "0.95rem" },
  card: { background: "linear-gradient(145deg, #ffffff, #f8fafc)", padding: "24px 28px", borderRadius: "18px", border: "2px solid #e2e8f0", boxShadow: "0 8px 25px rgba(0, 0, 0, 0.06)" },
  cardHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", paddingBottom: "14px", borderBottom: "1px solid #f1f5f9" },
  cardTitleSection: { display: "flex", alignItems: "center", gap: "12px" },
  cardTitle: { fontSize: "1.3rem", fontWeight: "700", color: "#1e3a5f", margin: 0 },
  badge: { padding: "6px 14px", borderRadius: "20px", fontSize: "0.8rem", color: "#fff", fontWeight: "600", textTransform: "capitalize" },
  cardActions: { display: "flex", gap: "6px" },
  iconBtn: { width: "38px", height: "38px", display: "flex", alignItems: "center", justifyContent: "center", background: "#f1f5f9", border: "none", borderRadius: "10px", fontSize: "1.1rem", cursor: "pointer" },
  deleteIcon: { background: "#fef2f2", color: "#ef4444" },
  cardBody: {},
  cardMeta: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: "14px", marginBottom: "18px" },
  metaItem: { display: "flex", alignItems: "center", gap: "10px", padding: "10px 14px", background: "#fff", borderRadius: "10px", border: "1px solid #e2e8f0" },
  metaIcon: { fontSize: "1.2rem" },
  metaLabel: { display: "block", fontSize: "0.75rem", color: "#94a3b8", fontWeight: "500" },
  metaValue: { display: "block", fontSize: "1rem", fontWeight: "600", color: "#1e3a5f" },
  cardFooter: { display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "14px", borderTop: "1px solid #f1f5f9" },
  lastUpdated: { fontSize: "0.85rem", color: "#94a3b8" },
  viewBtn: { color: "#3b82f6", textDecoration: "none", fontWeight: "600", fontSize: "0.95rem" }
}

/* ====================== 🎨 HOVER EFFECTS ====================== */
const addInteractions = () => {
  if (typeof document !== "undefined") {
    const style = document.createElement("style")
    style.textContent = `
      div[style*="card"]:hover { transform: translateY(-4px); border-color: #3b82f6 !important; box-shadow: 0 15px 40px rgba(59, 130, 246, 0.2) !important; }
      a[style*="createBtn"]:hover { transform: translateY(-3px); box-shadow: 0 12px 35px rgba(59, 130, 246, 0.55) !important; }
      button[style*="filterBtn"]:hover:not([style*="filterActive"]) { background: #f1f5f9 !important; border-color: #94a3b8 !important; }
      button[style*="iconBtn"]:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important; }
      button[style*="deleteIcon"]:hover { background: #fecaca !important; color: #dc2626 !important; }
      a[style*="viewBtn"]:hover { color: #1d4ed8 !important; }
      div[style*="statBox"]:hover { transform: translateY(-3px); box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08) !important; }
    `
    document.head.appendChild(style)
  }
}
addInteractions()