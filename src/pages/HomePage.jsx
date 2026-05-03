// src/pages/HomePage.jsx
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export default function HomePage() {
  const navigate = useNavigate()
  
  // ✅ Toggle State: 'user' or 'admin'
  const [viewMode, setViewMode] = useState("user")
  
  // ✅ Helper: Create login URL with redirect parameter
  const getLoginUrl = (quizPath, subject) => {
    const redirect = encodeURIComponent(`${quizPath}?subject=${subject}`)
    return `/login?redirect=${redirect}`
  }

  // ✅ Toggle Handler
  const toggleView = () => {
    const newMode = viewMode === "user" ? "admin" : "user"
    setViewMode(newMode)
    // Optional: Navigate to appropriate page on toggle
    if (newMode === "admin") {
      navigate("/admin")
    }
  }

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

          {/* Subject Categories Section */}
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
                </Link>
              ))}
            </div>
          </section>
        </>
      )}

      {/* ===== 🛠️ ADMIN VIEW (Quick Access from Home) ===== */}
      {viewMode === "admin" && (
        <section style={styles.adminSection}>
          <h2 style={styles.adminTitle}>🛠️ Admin Quick Access</h2>
          <p style={styles.adminSubtitle}>Manage your quiz app from here</p>
          
          <div style={styles.adminGrid}>
            <Link to="/admin" style={styles.adminCard}>
              <div style={styles.adminStatIcon}>📊</div>
              <h3 style={styles.adminStatTitle}>Dashboard</h3>
              <p style={styles.adminStatDesc}>View stats & analytics</p>
            </Link>
            <Link to="/admin/quizzes" style={styles.adminCard}>
              <div style={styles.adminStatIcon}>📚</div>
              <h3 style={styles.adminStatTitle}>Quizzes</h3>
              <p style={styles.adminStatDesc}>Create & manage quizzes</p>
            </Link>
            <Link to="/admin/users" style={styles.adminCard}>
              <div style={styles.adminStatIcon}>👥</div>
              <h3 style={styles.adminStatTitle}>Users</h3>
              <p style={styles.adminStatDesc}>Manage user accounts</p>
            </Link>
            <Link to="/admin/settings" style={styles.adminCard}>
              <div style={styles.adminStatIcon}>⚙️</div>
              <h3 style={styles.adminStatTitle}>Settings</h3>
              <p style={styles.adminStatDesc}>Configure app settings</p>
            </Link>
          </div>

          <div style={styles.adminActions}>
            <Link to="/admin/quizzes/new" style={styles.adminActionBtn}>
              <span style={styles.actionIcon}>➕</span>
              <span style={styles.actionText}>Create New Quiz</span>
            </Link>
            <Link to="/admin" style={styles.adminActionBtn}>
              <span style={styles.actionIcon}>📈</span>
              <span style={styles.actionText}>View Analytics</span>
            </Link>
          </div>
        </section>
      )}
      
    </div>
  )
}

/* ====================== 🎨 STYLES ====================== */
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
  
  // Categories Section
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
  adminTitle: { fontSize: "2rem", fontWeight: "700", color: "#1e3a5f", textAlign: "center", marginBottom: "12px" },
  adminSubtitle: { textAlign: "center", color: "#64748b", fontSize: "1rem", marginBottom: "35px" },
  adminGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", marginBottom: "40px" },
  adminCard: { 
    background: "#ffffff", padding: "25px 20px", borderRadius: "16px", 
    border: "1px solid #e2e8f0", textAlign: "center", textDecoration: "none",
    color: "#1e293b", boxShadow: "0 4px 15px rgba(59, 130, 246, 0.1)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease"
  },
  adminStatIcon: { fontSize: "2.5rem", marginBottom: "12px" },
  adminStatTitle: { fontSize: "1.1rem", fontWeight: "600", color: "#1e3a5f", marginBottom: "6px" },
  adminStatDesc: { fontSize: "0.85rem", color: "#64748b" },
  adminActions: { display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" },
  adminActionBtn: { 
    padding: "12px 24px", background: "#eff6ff", color: "#2563eb", 
    textDecoration: "none", borderRadius: "12px", fontSize: "0.95rem", 
    fontWeight: "500", display: "flex", alignItems: "center", gap: "8px",
    border: "2px solid #bfdbfe", transition: "all 0.2s ease"
  },
  actionIcon: { fontSize: "1.3rem" },
  actionText: { fontSize: "0.9rem" }
}

/* ====================== 🎨 HOVER + TOGGLE CSS ====================== */
const addInteractions = () => {
  if (typeof document !== "undefined") {
    const style = document.createElement("style")
    style.textContent = `
      /* Toggle Switch */
      .switch input { opacity: 0; width: 0; height: 0; }
      .switch input:checked + .slider { background: #2563eb !important; }
      .switch input:checked + .slider:before { transform: translateX(22px); }
      .slider:before {
        position: absolute; content: ""; height: 20px; width: 20px;
        left: 3px; bottom: 3px; background: #fff; transition: 0.3s; border-radius: 50%;
      }
      
      /* User View Hovers */
      a[style*="primaryBtn"]:hover { background: #1d4ed8 !important; transform: translateY(-2px); box-shadow: 0 8px 22px rgba(37, 99, 235, 0.5) !important; }
      a[style*="secondaryBtn"]:hover { background: #eff6ff !important; transform: translateY(-2px); }
      div[style*="featureCard"]:hover { transform: translateY(-4px); box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08) !important; border-color: #cbd5e1 !important; }
      a[style*="categoryCard"]:hover { transform: translateY(-3px); box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06) !important; border-color: #60a5fa !important; }
      
      /* Admin View Hovers */
      a[style*="adminCard"]:hover { transform: translateY(-4px); box-shadow: 0 12px 30px rgba(59, 130, 246, 0.2) !important; border-color: #3b82f6 !important; }
      a[style*="adminActionBtn"]:hover { background: #dbeafe !important; border-color: #3b82f6 !important; transform: translateY(-2px); }
    `
    document.head.appendChild(style)
  }
}
addInteractions()