// src/pages/HomePage.jsx
import { useState } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  
  // ✅ Toggle State: 'user' or 'admin'
  const [viewMode, setViewMode] = useState("user");
  
  // ✅ Helper: Create login URL with redirect parameter
  const getLoginUrl = (quizPath, subject) => {
    const redirect = encodeURIComponent(`${quizPath}?subject=${subject}`);
    return `/login?redirect=${redirect}`;
  };

  // ✅ Toggle Handler
  const toggleView = () => {
    setViewMode(prev => prev === "user" ? "admin" : "user");
  };

  return (
    <div style={styles.container}>
      
      {/* ✅ Toggle Switch Header */}
      <div style={styles.toggleHeader}>
        <div style={styles.toggleContainer}>
          <span style={{...styles.toggleLabel, color: viewMode === "user" ? "#2563eb" : "#64748b", fontWeight: viewMode === "user" ? "700" : "500"}}>
            👤 User Side
          </span>
          
          <label style={styles.switch}>
            <input
              type="checkbox"
              checked={viewMode === "admin"}
              onChange={toggleView}
            />
            <span style={styles.slider}></span>
          </label>
          
          <span style={{...styles.toggleLabel, color: viewMode === "admin" ? "#2563eb" : "#64748b", fontWeight: viewMode === "admin" ? "700" : "500"}}>
            🛠️ Admin Side
          </span>
        </div>
      </div>

      {/* ===== 👤 USER VIEW ===== */}
      {viewMode === "user" && (
        <>
          {/* Hero Section */}
          <section style={styles.hero}>
            <div style={styles.heroContent}>
              <h1 style={styles.heroTitle}>
                🎯 Welcome to <span style={styles.highlight}>Quiz Master</span>
              </h1>
              <p style={styles.heroSubtitle}>
                Test your knowledge in CS fundamentals, programming & development!
              </p>
              <div style={styles.ctaGroup}>
                <Link to={getLoginUrl("/quiz", "mixed")} style={styles.primaryBtn}>
                  🚀 Start Quiz Now
                </Link>
                <Link to="/login?redirect=/scores" style={styles.secondaryBtn}>
                  🏆 View Scores
                </Link>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section style={styles.features}>
            <h2 style={styles.sectionTitle}>✨ Why Choose Us?</h2>
            <div style={styles.featuresGrid}>
              {[
                { icon: "⚡", title: "Instant Results", desc: "Get feedback immediately after each quiz" },
                { icon: "📚", title: "CS Fundamentals", desc: "OS, Networks, DSA & more core topics" },
                { icon: "🐍", title: "Programming Focus", desc: "Python, JavaScript, Full Stack practice" },
                { icon: "🏆", title: "Track Progress", desc: "Monitor your improvement over time" },
              ].map((feature, index) => (
                <div key={index} style={styles.featureCard}>
                  <div style={styles.featureIcon}>{feature.icon}</div>
                  <h3 style={styles.featureTitle}>{feature.title}</h3>
                  <p style={styles.featureDesc}>{feature.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ===== ✅ SUBJECTS SECTION - Only Subject Name & Description ===== */}
          <section style={styles.categories}>
            <h2 style={styles.sectionTitle}>📚 Explore Subjects</h2>
            <div style={styles.categoriesGrid}>
              {[
                { id: "os", emoji: "💻", name: "Operating System", desc: "Processes • Memory • File Systems" },
                { id: "python", emoji: "🐍", name: "Python", desc: "Syntax • OOP • Libraries • Projects" },
                { id: "networks", emoji: "🌐", name: "Computer Networks", desc: "TCP/IP • HTTP • Security • Protocols" },
                { id: "dsa", emoji: "🗂️", name: "Data Structures", desc: "Arrays • Trees • Graphs • Algorithms" },
                { id: "fullstack", emoji: "⚛️", name: "Full Stack Dev", desc: "React • Node • MongoDB • Deployment" },
                { id: "mixed", emoji: "🎯", name: "Mixed Practice", desc: "Random questions from all subjects" },
              ].map((cat) => (
                <Link
                  key={cat.id}
                  to={getLoginUrl("/quiz", cat.id)}
                  style={styles.categoryCard}
                >
                  <div style={styles.categoryEmoji}>{cat.emoji}</div>
                  <div style={styles.categoryName}>{cat.name}</div>
                  <div style={styles.categoryDesc}>{cat.desc}</div>
                  {/* ✅ Question count removed */}
                </Link>
              ))}
            </div>
          </section>
        </>
      )}

      {/* ===== 🛠️ ADMIN VIEW ===== */}
      {viewMode === "admin" && (
        <section style={styles.adminSection}>
          <h2 style={styles.adminTitle}>🛠️ Admin Dashboard</h2>
          <p style={styles.adminSubtitle}>Manage quizzes, users, and settings from here</p>
          
          <div style={styles.adminGrid}>
            <div style={styles.adminCard}>
              <div style={styles.adminStatIcon}>📊</div>
              <h3 style={styles.adminStatTitle}>Total Quizzes</h3>
              <p style={styles.adminStatValue}>12</p>
              <Link to="/login?redirect=/admin/quizzes" style={styles.adminLink}>View All →</Link>
            </div>
            <div style={styles.adminCard}>
              <div style={styles.adminStatIcon}>👥</div>
              <h3 style={styles.adminStatTitle}>Active Users</h3>
              <p style={styles.adminStatValue}>248</p>
              <Link to="/login?redirect=/admin/users" style={styles.adminLink}>Manage →</Link>
            </div>
            <div style={styles.adminCard}>
              <div style={styles.adminStatIcon}>✅</div>
              <h3 style={styles.adminStatTitle}>Completed Quizzes</h3>
              <p style={styles.adminStatValue}>1,542</p>
              <Link to="/login?redirect=/admin/analytics" style={styles.adminLink}>Analytics →</Link>
            </div>
            <div style={styles.adminCard}>
              <div style={styles.adminStatIcon}>⚙️</div>
              <h3 style={styles.adminStatTitle}>Settings</h3>
              <p style={styles.adminStatValue}>Configure</p>
              <Link to="/login?redirect=/admin/settings" style={styles.adminLink}>Open →</Link>
            </div>
          </div>

          <div style={styles.adminActions}>
            <h3 style={styles.adminActionsTitle}>⚡ Quick Actions</h3>
            <div style={styles.adminActionsGrid}>
              <Link to="/login?redirect=/admin/quizzes/new" style={styles.adminActionBtn}>
                <span style={styles.actionIcon}>➕</span>
                <span style={styles.actionText}>Create New Quiz</span>
              </Link>
              <Link to="/login?redirect=/admin/users" style={styles.adminActionBtn}>
                <span style={styles.actionIcon}>👥</span>
                <span style={styles.actionText}>Manage Users</span>
              </Link>
              <Link to="/login?redirect=/admin/analytics" style={styles.adminActionBtn}>
                <span style={styles.actionIcon}>📈</span>
                <span style={styles.actionText}>View Reports</span>
              </Link>
              <Link to="/login?redirect=/admin/settings" style={styles.adminActionBtn}>
                <span style={styles.actionIcon}>⚙️</span>
                <span style={styles.actionText}>App Settings</span>
              </Link>
            </div>
          </div>

          <div style={styles.adminRecent}>
            <h3 style={styles.adminRecentTitle}>🕐 Recent Activity</h3>
            <div style={styles.adminRecentList}>
              {[
                { action: "New quiz 'Python Advanced' created", user: "Admin", time: "2 min ago", type: "success" },
                { action: "User 'john_doe' registered", user: "john_doe", time: "15 min ago", type: "info" },
                { action: "Quiz 'DSA Basics' updated", user: "Admin", time: "1 hour ago", type: "warning" },
                { action: "50 new submissions received", user: "System", time: "3 hours ago", type: "success" },
              ].map((item, i) => (
                <div key={i} style={{...styles.adminRecentItem, borderLeftColor: item.type === "success" ? "#10b981" : item.type === "warning" ? "#f59e0b" : "#3b82f6"}}>
                  <div style={styles.recentContent}>
                    <span style={styles.adminRecentAction}>{item.action}</span>
                    <span style={styles.adminRecentUser}>by {item.user}</span>
                  </div>
                  <span style={styles.adminRecentTime}>{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      
    </div>
  );
}

/* ====================== 🎨 CLEAN BLUE & WHITE THEME ====================== */
const styles = {
  container: {
    minHeight: "100vh",
    background: "#f8fbff",
    color: "#1e293b",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: "20px 0",
  },
  
  // Toggle Switch Header
  toggleHeader: {
    padding: "15px 20px",
    background: "#ffffff",
    borderBottom: "1px solid #e2e8f0",
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
    boxShadow: "0 2px 8px rgba(59, 130, 246, 0.08)"
  },
  toggleContainer: {
    display: "flex", alignItems: "center", gap: "12px",
    background: "#f1f5f9", padding: "8px 16px",
    borderRadius: "30px", border: "1px solid #e2e8f0"
  },
  toggleLabel: {
    fontSize: "0.85rem", fontWeight: "500", transition: "color 0.2s, font-weight 0.2s"
  },
  switch: {
    position: "relative", display: "inline-block", width: "48px", height: "26px"
  },
  slider: {
    position: "absolute", cursor: "pointer",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "#cbd5e1", transition: "0.3s", borderRadius: "26px"
  },
  
  // Hero Section
  hero: {
    display: "flex", alignItems: "center", justifyContent: "center",
    minHeight: "65vh", padding: "50px 40px", textAlign: "center",
  },
  heroContent: { maxWidth: "700px" },
  heroTitle: {
    fontSize: "3rem", fontWeight: "800", marginBottom: "18px",
    lineHeight: "1.1", color: "#1e3a5f",
  },
  highlight: { color: "#2563eb", fontWeight: "800" },
  heroSubtitle: {
    fontSize: "1.15rem", color: "#475569",
    marginBottom: "35px", lineHeight: "1.6",
  },
  ctaGroup: { display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" },
  primaryBtn: {
    padding: "13px 28px", background: "#2563eb", color: "#fff",
    textDecoration: "none", borderRadius: "50px", fontWeight: "600",
    fontSize: "1rem", boxShadow: "0 5px 18px rgba(37, 99, 235, 0.3)",
    transition: "all 0.25s ease",
  },
  secondaryBtn: {
    padding: "13px 28px", background: "transparent", color: "#2563eb",
    textDecoration: "none", borderRadius: "50px", fontWeight: "600",
    fontSize: "1rem", border: "2px solid #2563eb",
    transition: "all 0.25s ease",
  },
  
  // Features Section
  features: { padding: "70px 40px", maxWidth: "1400px", margin: "0 auto" },
  sectionTitle: {
    fontSize: "2rem", textAlign: "center", marginBottom: "40px",
    color: "#1e3a5f", fontWeight: "700",
  },
  featuresGrid: {
    display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
    gap: "22px", maxWidth: "1200px", margin: "0 auto",
  },
  featureCard: {
    background: "#ffffff", padding: "26px 18px", borderRadius: "16px",
    textAlign: "center", border: "1px solid #e2e8f0",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.04)",
    transition: "transform 0.25s ease",
  },
  featureIcon: { fontSize: "2.6rem", marginBottom: "14px" },
  featureTitle: { fontSize: "1.2rem", fontWeight: "600", marginBottom: "10px", color: "#1e3a5f" },
  featureDesc: { color: "#64748b", fontSize: "0.95rem", lineHeight: "1.5" },
  
  // Categories Section - ✅ Updated (No question count)
  categories: { padding: "70px 40px", background: "#ffffff" },
  categoriesGrid: {
    display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
    gap: "18px", maxWidth: "1200px", margin: "0 auto",
  },
  categoryCard: {
    background: "#ffffff", padding: "24px 18px", borderRadius: "14px",
    textDecoration: "none", color: "#1e293b", border: "1px solid #e2e8f0",
    display: "flex", flexDirection: "column", alignItems: "center",
    gap: "10px", transition: "transform 0.25s ease", textAlign: "center"
  },
  categoryEmoji: { fontSize: "2.5rem", marginBottom: "6px" },
  categoryName: { 
    fontWeight: "600", fontSize: "1rem", color: "#1e3a5f",
    textAlign: "center"
  },
  categoryDesc: { 
    fontSize: "0.82rem", color: "#64748b", textAlign: "center", lineHeight: "1.4" 
  },
  
  // Admin Section Styles
  adminSection: { padding: "50px 30px", maxWidth: "1400px", margin: "0 auto" },
  adminTitle: { fontSize: "2.2rem", fontWeight: "800", color: "#1e3a5f", textAlign: "center", marginBottom: "12px" },
  adminSubtitle: { textAlign: "center", color: "#64748b", fontSize: "1.15rem", marginBottom: "45px" },
  adminGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "28px", marginBottom: "50px" },
  adminCard: { background: "#ffffff", padding: "35px 30px", borderRadius: "20px", border: "1px solid #e2e8f0", textAlign: "center", boxShadow: "0 8px 30px rgba(59, 130, 246, 0.12)", transition: "transform 0.3s ease" },
  adminStatIcon: { fontSize: "3rem", marginBottom: "18px" },
  adminStatTitle: { fontSize: "1.1rem", fontWeight: "700", color: "#1e3a5f", marginBottom: "10px" },
  adminStatValue: { fontSize: "2.5rem", fontWeight: "800", color: "#2563eb", marginBottom: "18px", lineHeight: "1" },
  adminLink: { color: "#2563eb", textDecoration: "none", fontSize: "0.95rem", fontWeight: "600" },
  adminActions: { background: "#ffffff", padding: "35px 30px", borderRadius: "20px", border: "1px solid #e2e8f0", marginBottom: "40px", boxShadow: "0 8px 30px rgba(59, 130, 246, 0.12)" },
  adminActionsTitle: { fontSize: "1.4rem", fontWeight: "700", color: "#1e3a5f", marginBottom: "24px" },
  adminActionsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "18px" },
  adminActionBtn: { padding: "20px 24px", background: "#eff6ff", color: "#2563eb", textDecoration: "none", borderRadius: "14px", fontSize: "1rem", fontWeight: "600", textAlign: "center", border: "2px solid #bfdbfe", transition: "all 0.25s ease", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" },
  actionIcon: { fontSize: "1.8rem" },
  actionText: { fontSize: "0.95rem" },
  adminRecent: { background: "#ffffff", padding: "35px 30px", borderRadius: "20px", border: "1px solid #e2e8f0", boxShadow: "0 8px 30px rgba(59, 130, 246, 0.12)" },
  adminRecentTitle: { fontSize: "1.4rem", fontWeight: "700", color: "#1e3a5f", marginBottom: "24px" },
  adminRecentList: { display: "flex", flexDirection: "column", gap: "18px" },
  adminRecentItem: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 22px", background: "#f8fafc", borderRadius: "12px", borderLeft: "4px solid #3b82f6" },
  recentContent: { display: "flex", flexDirection: "column", gap: "4px" },
  adminRecentAction: { fontSize: "1rem", color: "#334155", fontWeight: "600" },
  adminRecentUser: { fontSize: "0.85rem", color: "#64748b", fontStyle: "italic" },
  adminRecentTime: { fontSize: "0.9rem", color: "#94a3b8", fontWeight: "500" }
};

/* ====================== 🎨 HOVER EFFECTS + TOGGLE CSS ====================== */
const addInteractions = () => {
  if (typeof document !== "undefined") {
    const style = document.createElement("style");
    style.textContent = `
      .switch input { opacity: 0; width: 0; height: 0; }
      .switch input:checked + .slider { background: #2563eb !important; }
      .switch input:checked + .slider:before { transform: translateX(22px); }
      .slider:before { position: absolute; content: ""; height: 20px; width: 20px; left: 3px; bottom: 3px; background: #fff; transition: 0.3s; border-radius: 50%; }
      a[style*="primaryBtn"]:hover { background: #1d4ed8 !important; transform: translateY(-2px); box-shadow: 0 8px 22px rgba(37, 99, 235, 0.5) !important; }
      a[style*="secondaryBtn"]:hover { background: #eff6ff !important; transform: translateY(-2px); }
      div[style*="featureCard"]:hover { transform: translateY(-4px); box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08) !important; border-color: #cbd5e1 !important; }
      a[style*="categoryCard"]:hover { transform: translateY(-3px); box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06) !important; border-color: #60a5fa !important; }
      div[style*="adminCard"]:hover { transform: translateY(-6px); box-shadow: 0 15px 45px rgba(59, 130, 246, 0.25) !important; border-color: #60a5fa !important; }
      a[style*="adminActionBtn"]:hover { background: #dbeafe !important; border-color: #3b82f6 !important; transform: translateY(-4px); }
      a[style*="adminLink"]:hover { color: #1d4ed8 !important; }
      div[style*="adminRecentItem"]:hover { background: #f1f5f9 !important; transform: translateX(4px); border-left-color: #2563eb !important; }
    `;
    document.head.appendChild(style);
  }
};
addInteractions();