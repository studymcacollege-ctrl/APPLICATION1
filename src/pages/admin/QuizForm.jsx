// src/pages/HomePage.jsx
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

export default function HomePage() {
  const navigate = useNavigate()
  const [quizzes, setQuizzes] = useState([])
  const [filteredQuizzes, setFilteredQuizzes] = useState([])
  const [selectedSubject, setSelectedSubject] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  // ✅ Subject options with icons
  const subjects = [
    { value: "all", label: "🎯 All Quizzes", color: "#6366f1" },
    { value: "os", label: "💻 Operating System", color: "#3b82f6" },
    { value: "python", label: "🐍 Python", color: "#fbbf24" },
    { value: "networks", label: "🌐 Computer Networks", color: "#10b981" },
    { value: "dsa", label: "📊 Data Structures", color: "#8b5cf6" },
    { value: "fullstack", label: "⚡ Full Stack", color: "#ec4899" },
    { value: "mixed", label: "🔀 Mixed Practice", color: "#f97316" }
  ]

  // ✅ Check login status & load quizzes
  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }

    // Load quizzes from localStorage OR backend API
    loadQuizzes()
  }, [])

  // ✅ Filter quizzes when subject or search changes
  useEffect(() => {
    let result = [...quizzes]
    
    // Filter by subject
    if (selectedSubject !== "all") {
      result = result.filter(q => q.subject === selectedSubject)
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(q => 
        q.title.toLowerCase().includes(query) || 
        q.description?.toLowerCase().includes(query)
      )
    }
    
    // Only show active quizzes on homepage
    result = result.filter(q => q.status === "active")
    
    setFilteredQuizzes(result)
  }, [quizzes, selectedSubject, searchQuery])

  // ✅ Load quizzes from localStorage or backend
  const loadQuizzes = async () => {
    try {
      setLoading(true)
      
      // 🔹 Try backend API first (if available)
      const API_URL = getApiUrl()
      const response = await fetch(`${API_URL}/quizzes`)
      
      if (response.ok) {
        const data = await response.json()
        setQuizzes(data.quizzes || data.data || [])
        console.log('✅ Quizzes loaded from backend')
      } else {
        // 🔹 Fallback to localStorage
        loadFromLocalStorage()
      }
    } catch (err) {
      console.log('📦 Using localStorage (backend not available)')
      loadFromLocalStorage()
    } finally {
      setLoading(false)
    }
  }

  // ✅ Load from localStorage (demo mode)
  const loadFromLocalStorage = () => {
    const stored = localStorage.getItem("quizzes")
    if (stored) {
      const parsed = JSON.parse(stored)
      setQuizzes(parsed)
    } else {
      // ✅ Demo quizzes (agar koi quiz nahi hai)
      setQuizzes(getDemoQuizzes())
    }
  }

  // ✅ Auto-detect API URL for Local + Codespaces
  const getApiUrl = () => {
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname
      if (hostname.includes('github.dev')) {
        const parts = hostname.split('.')
        return `https://${parts[0]}-5000.app.github.dev/api`
      }
    }
    return "http://localhost:5000/api"
  }

  // ✅ Demo quizzes for first-time users
  const getDemoQuizzes = () => [
    {
      id: "1", _id: "1",
      title: "Python Basics", subject: "python",
      description: "Test your Python fundamentals with 10 questions",
      timeLimit: 15, passingScore: 60, status: "active",
      questions: 10, attempts: 1250, rating: 4.8
    },
    {
      id: "2", _id: "2",
      title: "Operating System Concepts", subject: "os",
      description: "Process management, memory, file systems & more",
      timeLimit: 20, passingScore: 65, status: "active",
      questions: 15, attempts: 890, rating: 4.6
    },
    {
      id: "3", _id: "3",
      title: "Computer Networks", subject: "networks",
      description: "TCP/IP, HTTP, DNS, and network protocols",
      timeLimit: 18, passingScore: 60, status: "active",
      questions: 12, attempts: 654, rating: 4.7
    },
    {
      id: "4", _id: "4",
      title: "Data Structures & Algorithms", subject: "dsa",
      description: "Arrays, linked lists, trees, sorting & searching",
      timeLimit: 25, passingScore: 70, status: "active",
      questions: 20, attempts: 2100, rating: 4.9
    },
    {
      id: "5", _id: "5",
      title: "Full Stack Development", subject: "fullstack",
      description: "React, Node.js, MongoDB, and deployment",
      timeLimit: 30, passingScore: 65, status: "active",
      questions: 18, attempts: 432, rating: 4.5
    },
    {
      id: "6", _id: "6",
      title: "Mixed Practice Test", subject: "mixed",
      description: "Random questions from all subjects",
      timeLimit: 20, passingScore: 60, status: "active",
      questions: 15, attempts: 3200, rating: 4.4
    }
  ]

  // ✅ Handle start quiz
  const handleStartQuiz = (quizId) => {
    // Check if user is logged in
    const token = localStorage.getItem("token")
    if (!token) {
      alert("🔐 Please login first to start a quiz!")
      navigate("/login")
      return
    }
    navigate(`/quiz/${quizId}`)
  }

  // ✅ Get subject color
  const getSubjectColor = (subject) => {
    const sub = subjects.find(s => s.value === subject)
    return sub?.color || "#6366f1"
  }

  // ✅ Get subject label
  const getSubjectLabel = (subject) => {
    const sub = subjects.find(s => s.value === subject)
    return sub?.label || subject
  }

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p style={styles.loadingText}>Loading quizzes...</p>
      </div>
    )
  }

  return (
    <div style={styles.container}>
      
      {/* ✅ Header Section */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>🎯 Quiz Master</h1>
          <p style={styles.subtitle}>Test your knowledge with subject-wise quizzes</p>
        </div>
        {user ? (
          <div style={styles.userInfo}>
            <span style={styles.userName}>👋 Hi, {user.name}</span>
            <button 
              onClick={() => {
                localStorage.removeItem("token")
                localStorage.removeItem("user")
                setUser(null)
                navigate("/login")
              }}
              style={styles.logoutBtn}
            >
              Logout
            </button>
          </div>
        ) : (
          <div style={styles.authButtons}>
            <Link to="/login" style={styles.loginBtn}>Sign In</Link>
            <Link to="/signup" style={styles.signupBtn}>Sign Up</Link>
          </div>
        )}
      </div>

      {/* ✅ Search Bar */}
      <div style={styles.searchSection}>
        <input
          type="text"
          placeholder="🔍 Search quizzes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      {/* ✅ Subject Filters */}
      <div style={styles.filterSection}>
        <span style={styles.filterLabel}>Filter by Subject:</span>
        <div style={styles.filterChips}>
          {subjects.map(subject => (
            <button
              key={subject.value}
              onClick={() => setSelectedSubject(subject.value)}
              style={{
                ...styles.filterChip,
                ...(selectedSubject === subject.value 
                  ? { ...styles.filterChipActive, background: subject.color }
                  : {})
              }}
            >
              {subject.label}
            </button>
          ))}
        </div>
      </div>

      {/* ✅ Results Count */}
      <div style={styles.resultsInfo}>
        Showing {filteredQuizzes.length} of {quizzes.filter(q => q.status === "active").length} active quizzes
      </div>

      {/* ✅ Quiz Cards Grid */}
      {filteredQuizzes.length > 0 ? (
        <div style={styles.quizGrid}>
          {filteredQuizzes.map(quiz => (
            <div key={quiz.id || quiz._id} style={styles.quizCard}>
              
              {/* Subject Badge */}
              <div style={{
                ...styles.subjectBadge,
                background: getSubjectColor(quiz.subject)
              }}>
                {getSubjectLabel(quiz.subject).split(' ')[0]}
              </div>

              {/* Quiz Content */}
              <div style={styles.quizContent}>
                <h3 style={styles.quizTitle}>{quiz.title}</h3>
                <p style={styles.quizDesc}>{quiz.description}</p>
                
                {/* Quiz Stats */}
                <div style={styles.quizStats}>
                  <span style={styles.stat}>⏱️ {quiz.timeLimit} min</span>
                  <span style={styles.stat}>📝 {quiz.questions || quiz.questions?.length || 10} Qs</span>
                  <span style={styles.stat}>⭐ {quiz.rating || 4.5}</span>
                </div>

                {/* Passing Score */}
                <div style={styles.passingScore}>
                  Passing Score: <strong>{quiz.passingScore}%</strong>
                </div>

                {/* Start Button */}
                <button
                  onClick={() => handleStartQuiz(quiz.id || quiz._id)}
                  style={styles.startBtn}
                >
                  🚀 Start Quiz
                </button>
              </div>

            </div>
          ))}
        </div>
      ) : (
        /* ✅ Empty State */
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}>📭</div>
          <h3 style={styles.emptyTitle}>No quizzes found</h3>
          <p style={styles.emptyDesc}>
            {searchQuery 
              ? `No results for "${searchQuery}". Try a different search.`
              : selectedSubject !== "all"
                ? `No active quizzes in "${getSubjectLabel(selectedSubject)}".`
                : "No quizzes available yet. Check back later!"}
          </p>
          {(searchQuery || selectedSubject !== "all") && (
            <button 
              onClick={() => { setSearchQuery(""); setSelectedSubject("all") }}
              style={styles.clearFiltersBtn}
            >
              Clear Filters
            </button>
          )}
        </div>
      )}

      {/* ✅ Admin Link (if user is admin) */}
      {user?.email === "admin@quizapp.com" && (
        <div style={styles.adminSection}>
          <Link to="/admin/quizzes" style={styles.adminBtn}>
            ⚙️ Manage Quizzes (Admin)
          </Link>
        </div>
      )}

    </div>
  )
}

/* ====================== 🎨 STYLES ====================== */
const styles = {
  container: { 
    width: "100%", maxWidth: "1200px", margin: "0 auto", padding: "20px",
    background: "#f8fbff", minHeight: "100vh"
  },
  
  // Header
  header: { 
    display: "flex", justifyContent: "space-between", alignItems: "center", 
    marginBottom: "24px", flexWrap: "wrap", gap: "12px",
    padding: "16px 20px", background: "#fff", borderRadius: "16px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
  },
  title: { fontSize: "1.8rem", fontWeight: "800", color: "#1e40af", margin: "0 0 4px 0" },
  subtitle: { fontSize: "0.95rem", color: "#64748b", margin: 0 },
  
  userInfo: { display: "flex", alignItems: "center", gap: "12px" },
  userName: { fontSize: "0.95rem", color: "#334155", fontWeight: "500" },
  logoutBtn: { 
    padding: "8px 16px", background: "#ef4444", color: "#fff", border: "none", 
    borderRadius: "8px", cursor: "pointer", fontSize: "0.9rem", fontWeight: "500"
  },
  
  authButtons: { display: "flex", gap: "8px" },
  loginBtn: { 
    padding: "10px 20px", background: "#fff", color: "#2563eb", 
    border: "2px solid #2563eb", borderRadius: "8px", textDecoration: "none",
    fontWeight: "600", fontSize: "0.95rem"
  },
  signupBtn: { 
    padding: "10px 20px", background: "#2563eb", color: "#fff", 
    border: "none", borderRadius: "8px", textDecoration: "none",
    fontWeight: "600", fontSize: "0.95rem"
  },

  // Search
  searchSection: { marginBottom: "20px" },
  searchInput: {
    width: "100%", padding: "14px 20px", borderRadius: "12px",
    border: "2px solid #e2e8f0", fontSize: "1rem", outline: "none",
    background: "#fff", transition: "border-color 0.2s"
  },

  // Filters
  filterSection: { marginBottom: "20px", display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" },
  filterLabel: { fontSize: "0.9rem", fontWeight: "500", color: "#334155" },
  filterChips: { display: "flex", gap: "8px", flexWrap: "wrap" },
  filterChip: {
    padding: "8px 16px", background: "#f1f5f9", color: "#475569",
    border: "none", borderRadius: "20px", cursor: "pointer",
    fontSize: "0.85rem", fontWeight: "500", transition: "all 0.2s"
  },
  filterChipActive: { color: "#fff", transform: "scale(1.05)" },

  // Results Info
  resultsInfo: { 
    fontSize: "0.9rem", color: "#64748b", marginBottom: "16px",
    padding: "8px 12px", background: "#f1f5f9", borderRadius: "8px",
    display: "inline-block"
  },

  // Quiz Grid
  quizGrid: { 
    display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", 
    gap: "20px", marginBottom: "30px"
  },
  quizCard: {
    background: "#fff", borderRadius: "16px", border: "1px solid #e2e8f0",
    overflow: "hidden", transition: "transform 0.2s, box-shadow 0.2s",
    position: "relative"
  },
  subjectBadge: {
    position: "absolute", top: "12px", right: "12px",
    padding: "4px 12px", borderRadius: "20px", color: "#fff",
    fontSize: "0.75rem", fontWeight: "600", textTransform: "uppercase"
  },
  quizContent: { padding: "20px" },
  quizTitle: { 
    fontSize: "1.2rem", fontWeight: "700", color: "#1e293b", 
    margin: "0 0 8px 0", paddingRight: "80px"
  },
  quizDesc: { 
    fontSize: "0.9rem", color: "#64748b", margin: "0 0 16px 0", 
    lineHeight: "1.5", display: "-webkit-box", WebkitLineClamp: 2, 
    WebkitBoxOrient: "vertical", overflow: "hidden"
  },
  quizStats: { 
    display: "flex", gap: "12px", marginBottom: "12px", flexWrap: "wrap" 
  },
  stat: { fontSize: "0.85rem", color: "#475569", background: "#f8fafc", padding: "4px 10px", borderRadius: "6px" },
  passingScore: { 
    fontSize: "0.85rem", color: "#64748b", marginBottom: "16px",
    padding: "6px 10px", background: "#fef3c7", borderRadius: "6px", display: "inline-block"
  },
  startBtn: {
    width: "100%", padding: "12px", background: "linear-gradient(135deg, #2563eb, #3b82f6)",
    color: "#fff", border: "none", borderRadius: "10px", fontSize: "1rem",
    fontWeight: "600", cursor: "pointer", transition: "transform 0.2s"
  },

  // Empty State
  emptyState: { 
    textAlign: "center", padding: "60px 20px", background: "#fff", 
    borderRadius: "16px", border: "1px dashed #cbd5e1"
  },
  emptyIcon: { fontSize: "3rem", marginBottom: "16px" },
  emptyTitle: { fontSize: "1.3rem", fontWeight: "600", color: "#1e293b", margin: "0 0 8px 0" },
  emptyDesc: { fontSize: "0.95rem", color: "#64748b", margin: "0 0 20px 0" },
  clearFiltersBtn: {
    padding: "10px 24px", background: "#2563eb", color: "#fff", border: "none",
    borderRadius: "8px", cursor: "pointer", fontWeight: "500"
  },

  // Admin Section
  adminSection: { textAlign: "center", paddingTop: "20px", borderTop: "1px solid #e2e8f0" },
  adminBtn: {
    display: "inline-block", padding: "10px 24px", background: "#64748b", 
    color: "#fff", textDecoration: "none", borderRadius: "8px", fontWeight: "500"
  },

  // Loading
  loadingContainer: { 
    display: "flex", flexDirection: "column", alignItems: "center", 
    justifyContent: "center", minHeight: "60vh", gap: "16px" 
  },
  spinner: {
    width: "40px", height: "40px", border: "4px solid #e2e8f0",
    borderTop: "4px solid #2563eb", borderRadius: "50%",
    animation: "spin 1s linear infinite"
  },
  loadingText: { color: "#64748b", fontSize: "1rem" }
}

/* ====================== 🎨 ANIMATIONS ====================== */
const addAnimations = () => {
  if (typeof document !== "undefined") {
    const style = document.createElement("style")
    style.textContent = `
      @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      
      input:focus { border-color: #2563eb !important; box-shadow: 0 0 0 3px rgba(37,99,235,0.15) !important; }
      button[style*="filterChip"]:hover { background: #e2e8f0 !important; }
      button[style*="filterChipActive"]:hover { transform: scale(1.08) !important; }
      button[style*="startBtn"]:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(37,99,235,0.4) !important; }
      div[style*="quizCard"]:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.12) !important; }
      a[style*="loginBtn"]:hover { background: #2563eb !important; color: #fff !important; }
      a[style*="signupBtn"]:hover { background: #1d4ed8 !important; transform: translateY(-2px); }
    `
    document.head.appendChild(style)
  }
}
addAnimations()