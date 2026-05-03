// src/pages/admin/Dashboard.jsx
import { Link } from "react-router-dom"

export default function Dashboard() {
  // Demo stats data (replace with API call later)
  const stats = {
    totalQuizzes: 12,
    activeQuizzes: 8,
    totalUsers: 248,
    totalAttempts: 1542
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📊 Admin Dashboard</h1>
      
      {/* Stats Cards */}
      <div style={styles.statsGrid}>
        <StatCard icon="📚" label="Total Quizzes" value={stats.totalQuizzes} color="#3b82f6" link="/admin/quizzes" />
        <StatCard icon="✅" label="Active Quizzes" value={stats.activeQuizzes} color="#10b981" />
        <StatCard icon="👥" label="Total Users" value={stats.totalUsers} color="#8b5cf6" link="/admin/users" />
        <StatCard icon="🎯" label="Quiz Attempts" value={stats.totalAttempts} color="#f59e0b" />
      </div>

      {/* Quick Actions */}
      <h2 style={styles.sectionTitle}>⚡ Quick Actions</h2>
      <div style={styles.actionsGrid}>
        <Link to="/admin/quizzes/new" style={styles.actionBtn}>➕ Create Quiz</Link>
        <Link to="/admin/users" style={styles.actionBtn}>👥 Manage Users</Link>
        <Link to="/admin/quizzes" style={styles.actionBtn}>📋 View All Quizzes</Link>
        <Link to="/admin/settings" style={styles.actionBtn}>⚙️ Settings</Link>
      </div>

      {/* Recent Activity */}
      <h2 style={styles.sectionTitle}>🕐 Recent Activity</h2>
      <div style={styles.activityList}>
        {[
          { icon: "➕", text: "New quiz 'Python Advanced' created", time: "2 min ago" },
          { icon: "👤", text: "User 'john_doe' registered", time: "15 min ago" },
          { icon: "✏️", text: "Quiz 'DSA Basics' updated", time: "1 hour ago" },
          { icon: "📊", text: "50 new quiz submissions received", time: "3 hours ago" }
        ].map((item, i) => (
          <div key={i} style={styles.activityItem}>
            <span style={styles.activityIcon}>{item.icon}</span>
            <div style={styles.activityContent}>
              <span style={styles.activityText}>{item.text}</span>
              <span style={styles.activityTime}>{item.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ✅ Reusable Stat Card Component
function StatCard({ icon, label, value, color, link }) {
  const content = (
    <div style={{...styles.statCard, borderLeft: `4px solid ${color}`}}>
      <span style={styles.statIcon}>{icon}</span>
      <div>
        <span style={{...styles.statValue, color}}>{value}</span>
        <span style={styles.statLabel}>{label}</span>
      </div>
    </div>
  )
  return link ? <Link to={link} style={styles.statLink}>{content}</Link> : content
}

const styles = {
  container: { padding: "20px", maxWidth: "1200px", margin: "0 auto" },
  title: { fontSize: "1.8rem", fontWeight: "700", color: "#1e3a5f", marginBottom: "25px" },
  
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "30px" },
  statLink: { textDecoration: "none" },
  statCard: { background: "#fff", padding: "20px", borderRadius: "14px", display: "flex", alignItems: "center", gap: "14px", border: "1px solid #e2e8f0", boxShadow: "0 3px 10px rgba(0,0,0,0.04)", transition: "transform 0.2s" },
  statIcon: { fontSize: "2rem" },
  statValue: { display: "block", fontSize: "1.8rem", fontWeight: "700" },
  statLabel: { display: "block", fontSize: "0.85rem", color: "#64748b" },
  
  sectionTitle: { fontSize: "1.3rem", fontWeight: "600", color: "#1e3a5f", marginBottom: "16px", marginTop: "30px" },
  actionsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "12px" },
  actionBtn: { padding: "14px", background: "#fff", border: "2px solid #3b82f6", borderRadius: "12px", color: "#2563eb", textDecoration: "none", fontWeight: "500", textAlign: "center", transition: "all 0.2s" },
  
  activityList: { display: "flex", flexDirection: "column", gap: "12px" },
  activityItem: { display: "flex", alignItems: "center", gap: "12px", padding: "14px", background: "#fff", borderRadius: "10px", border: "1px solid #e2e8f0" },
  activityIcon: { fontSize: "1.5rem" },
  activityContent: { display: "flex", flexDirection: "column", gap: "4px" },
  activityText: { fontSize: "0.95rem", color: "#334155" },
  activityTime: { fontSize: "0.8rem", color: "#94a3b8" }
}