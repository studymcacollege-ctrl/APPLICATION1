// src/App.jsx - FIXED VERSION (Using imported admin components)
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"

// ✅ USER PAGES (Verified existing)
import HomePage from "./pages/HomePage"
import AboutPage from "./pages/AboutPage"
import ContactPage from "./pages/ContactPage"
import ScoresPage from "./pages/ScoresPage"
import QuizPage from "./pages/QuizPage"
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage"
import ForgotPasswordPage from "./pages/ForgotPasswordPage"

// ✅ ADMIN PAGES - Import from files (NO inline functions below!)
import Dashboard from "./pages/admin/Dashboard"
import QuizList from "./pages/admin/QuizList"
import QuizForm from "./pages/admin/QuizForm"
import UsersPage from "./pages/admin/UsersPage1"
import SettingsPage from "./pages/admin/SettingsPage"

// ✅ Navigation Component
function AppNav({ viewMode }) {
  const location = useLocation()
  const isActive = (path) => location.pathname === path 
    ? { background: "#eff6ff", color: "#1e40af", border: "2px solid #3b82f6" } 
    : {}

  if (viewMode === "user") {
    return (
      <>
        <Link to="/" style={{...styles.navLink, ...isActive("/")}}>🏠 Home</Link>
        <Link to="/quiz" style={{...styles.navLink, ...isActive("/quiz")}}>🎯 Quiz</Link>
        <Link to="/scores" style={{...styles.navLink, ...isActive("/scores")}}>🏆 Scores</Link>
        <Link to="/about" style={{...styles.navLink, ...isActive("/about")}}>ℹ️ About</Link>
        <Link to="/contact" style={{...styles.navLink, ...isActive("/contact")}}>📞 Contact</Link>
        <Link to="/login" style={{...styles.loginLink, ...isActive("/login")}}>🔐 Login</Link>
      </>
    )
  }
  return (
    <>
      <Link to="/admin" style={{...styles.adminLink, ...isActive("/admin")}}>📋 Dashboard</Link>
      <Link to="/admin/quizzes" style={{...styles.adminLink, ...isActive("/admin/quizzes")}}>📚 Quizzes</Link>
      <Link to="/admin/users" style={{...styles.adminLink, ...isActive("/admin/users")}}>👥 Users</Link>
      <Link to="/admin/settings" style={{...styles.adminLink, ...isActive("/admin/settings")}}>⚙️ Settings</Link>
    </>
  )
}

// ✅ MAIN APP
function App() {
  const [viewMode, setViewMode] = useState(() => localStorage.getItem("quizAppViewMode") || "user")
  useEffect(() => { localStorage.setItem("quizAppViewMode", viewMode) }, [viewMode])

  const toggleView = () => {
    setViewMode(prev => {
      const newMode = prev === "user" ? "admin" : "user"
      if (newMode === "user") window.location.href = "/"
      else window.location.href = "/admin"
      return newMode
    })
  }

  return (
    <Router>
      <div style={styles.appContainer}>
        <header style={styles.header}>
          <div style={styles.headerContent}>
            <h1 style={styles.logo}>{viewMode === "admin" ? "🛠️ Admin Panel" : "🎯 Quiz Master"}</h1>
            <nav style={styles.nav}><AppNav viewMode={viewMode} /></nav>
            <div style={styles.toggleContainer}>
              <span style={{...styles.toggleLabel, color: viewMode === "user" ? "#2563eb" : "#64748b", fontWeight: viewMode === "user" ? "700" : "500"}}>👤 User</span>
              <label style={styles.switch}>
                <input type="checkbox" checked={viewMode === "admin"} onChange={toggleView} />
                <span style={styles.slider}></span>
              </label>
              <span style={{...styles.toggleLabel, color: viewMode === "admin" ? "#2563eb" : "#64748b", fontWeight: viewMode === "admin" ? "700" : "500"}}>🛠️ Admin</span>
            </div>
          </div>
        </header>

        <main style={styles.main}>
          <Routes>
            {/* 👤 PUBLIC */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            
            {/* 👤 USER */}
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/scores" element={<ScoresPage />} />
            
            {/* 🛠️ ADMIN ROUTES - Using IMPORTED components */}
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/quizzes" element={<QuizList />} />
            <Route path="/admin/quizzes/new" element={<QuizForm />} />
            <Route path="/admin/quizzes/:id/edit" element={<QuizForm />} />
            <Route path="/admin/users" element={<UsersPage />} />
            <Route path="/admin/settings" element={<SettingsPage />} />
            
            {/* 404 */}
            <Route path="*" element={
              <div style={styles.card}>
                <h2 style={styles.cardTitle}>404 - Page Not Found 🔍</h2>
                <p style={styles.cardText}>The page you're looking for doesn't exist.</p>
                <Link to="/" style={styles.backHome}>← Back to Home</Link>
              </div>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

/* ====================== 🎨 STYLES ====================== */
const styles = {
  appContainer: { minHeight: "100vh", background: "linear-gradient(135deg,#f0f9ff 0%,#dbeafe 50%,#bfdbfe 100%)", color: "#1e3a5f", fontFamily: "'Segoe UI',Tahoma,Geneva,Verdana,sans-serif" },
  header: { background: "rgba(255,255,255,0.98)", backdropFilter: "blur(12px)", borderBottom: "2px solid #3b82f6", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 4px 20px rgba(59,130,246,0.15)" },
  headerContent: { maxWidth: "1280px", margin: "0 auto", padding: "12px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "15px" },
  logo: { fontSize: "1.8rem", fontWeight: "800", margin: 0, background: "linear-gradient(90deg,#1e40af,#3b82f6,#60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
  nav: { display: "flex", gap: "6px", flexWrap: "wrap" },
  navLink: { color: "#1e40af", textDecoration: "none", padding: "8px 14px", borderRadius: "50px", fontSize: "0.9rem", fontWeight: "500", transition: "all 0.2s", background: "transparent", border: "2px solid transparent" },
  loginLink: { color: "#2563eb", textDecoration: "none", padding: "8px 14px", borderRadius: "50px", fontSize: "0.9rem", fontWeight: "500", border: "2px solid #2563eb", transition: "all 0.2s" },
  adminLink: { color: "#fff", textDecoration: "none", padding: "8px 14px", borderRadius: "50px", fontSize: "0.9rem", fontWeight: "500", background: "linear-gradient(135deg,#3b82f6,#60a5fa)", border: "2px solid #3b82f6", transition: "all 0.2s" },
  toggleContainer: { display: "flex", alignItems: "center", gap: "8px", background: "#f1f5f9", padding: "6px 12px", borderRadius: "25px", border: "1px solid #e2e8f0" },
  toggleLabel: { fontSize: "0.8rem", fontWeight: "500", transition: "color 0.2s, font-weight 0.2s" },
  switch: { position: "relative", display: "inline-block", width: "44px", height: "24px" },
  slider: { position: "absolute", cursor: "pointer", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "#cbd5e1", transition: "0.3s", borderRadius: "24px" },
  main: { maxWidth: "1280px", margin: "0 auto", padding: "30px 20px", minHeight: "calc(100vh - 80px)", display: "flex", flexDirection: "column", alignItems: "center" },
  card: { width: "100%", maxWidth: "500px", background: "#fff", padding: "40px 30px", borderRadius: "20px", boxShadow: "0 8px 30px rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.2)", color: "#1e3a5f", textAlign: "center" },
  cardTitle: { fontSize: "1.5rem", fontWeight: "700", marginBottom: "12px", color: "#1e40af" },
  cardText: { fontSize: "1rem", color: "#475569", lineHeight: "1.6", marginBottom: "20px" },
  backHome: { display: "inline-block", padding: "10px 24px", background: "linear-gradient(135deg,#3b82f6,#60a5fa)", color: "#fff", textDecoration: "none", borderRadius: "50px", fontWeight: "600", fontSize: "0.95rem" }
}

const addInteractions = () => {
  if (typeof document !== "undefined") {
    const style = document.createElement("style")
    style.textContent = `
      .switch input { opacity: 0; width: 0; height: 0; }
      .switch input:checked + .slider { background: #2563eb !important; }
      .switch input:checked + .slider:before { transform: translateX(20px); }
      .slider:before { position: absolute; content: ""; height: 18px; width: 18px; left: 3px; bottom: 3px; background: #fff; transition: 0.3s; border-radius: 50%; }
      a[style*="navLink"]:hover, a[style*="loginLink"]:hover { background: #eff6ff !important; color: #1e40af !important; border-color: #3b82f6 !important; transform: translateY(-2px); }
      a[style*="adminLink"]:hover { background: linear-gradient(135deg,#60a5fa,#3b82f6) !important; box-shadow: 0 6px 20px rgba(59,130,246,0.4) !important; transform: translateY(-2px); }
      a[style*="backHome"]:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(59,130,246,0.4) !important; }
    `
    document.head.appendChild(style)
  }
}
addInteractions()

export default App