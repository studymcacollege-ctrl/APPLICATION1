// src/pages/ForgotPasswordPage.jsx
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export default function ForgotPasswordPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: ""
  })
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showOldPass, setShowOldPass] = useState(false)
  const [showNewPass, setShowNewPass] = useState(false)
  const [showConfirmPass, setShowConfirmPass] = useState(false)
  const [step, setStep] = useState(1) // 1 = Email, 2 = Password Reset

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    setError("")
  }

  const handleEmailSubmit = (e) => {
    e.preventDefault()
    setError("")
    
    if (!form.email) { setError("Please enter your email"); return }
    if (!form.email.includes("@")) { setError("Please enter a valid email"); return }

    // Check if email exists
    const users = JSON.parse(localStorage.getItem("quizUsers") || "[]")
    const user = users.find(u => u.email.toLowerCase() === form.email.toLowerCase())

    if (!user) {
      setError("This email is not registered. Please sign up first.")
      return
    }

    // Email verified, move to password step
    setStep(2)
  }

  const handlePasswordReset = (e) => {
    e.preventDefault()
    setError("")
    setMessage("")
    setLoading(true)

    const { oldPassword, newPassword, confirmNewPassword } = form

    // Validation
    if (!oldPassword) { setError("Please enter your current password"); setLoading(false); return }
    if (!newPassword) { setError("Please enter a new password"); setLoading(false); return }
    if (newPassword.length < 6) { setError("New password must be at least 6 characters"); setLoading(false); return }
    if (newPassword !== confirmNewPassword) { setError("New passwords do not match"); setLoading(false); return }
    if (oldPassword === newPassword) { setError("New password must be different from old password"); setLoading(false); return }

    // Verify old password & update
    setTimeout(() => {
      let users = JSON.parse(localStorage.getItem("quizUsers") || "[]")
      const userIndex = users.findIndex(u => u.email.toLowerCase() === form.email.toLowerCase())

      if (userIndex === -1) {
        setError("User not found. Please try again.")
        setLoading(false)
        return
      }

      // Check old password
      if (users[userIndex].password !== oldPassword) {
        setError("Current password is incorrect. Please try again.")
        setLoading(false)
        return
      }

      // Update password
      users[userIndex].password = newPassword
      users[userIndex].updatedAt = new Date().toISOString()
      localStorage.setItem("quizUsers", JSON.stringify(users))

      setMessage("✅ Password updated successfully!\nRedirecting to login...")
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate("/login")
      }, 2000)
      
      setLoading(false)
    }, 1000)
  }

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.card}>
        
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.logo}>🎯 Quiz Master</h1>
          <p style={styles.subtitle}>
            {step === 1 ? "Verify your email" : "Reset your password"}
          </p>
        </div>

        {/* Progress Steps */}
        <div style={styles.progress}>
          <div style={{...styles.step, ...(step >= 1 ? styles.stepActive : {})}}>1. Email</div>
          <div style={styles.stepDivider}>→</div>
          <div style={{...styles.step, ...(step >= 2 ? styles.stepActive : {})}}>2. New Password</div>
        </div>

        {/* Messages */}
        {error && <div style={styles.errorMsg}>⚠️ {error}</div>}
        {message && <div style={styles.successMsg}>{message}</div>}

        {/* STEP 1: Email Verification */}
        {step === 1 && (
          <form onSubmit={handleEmailSubmit} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your registered email"
                value={form.email}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>
            <button type="submit" style={styles.submitBtn}>
              🔍 Verify Email
            </button>
          </form>
        )}

        {/* STEP 2: Password Reset Form */}
        {step === 2 && (
          <form onSubmit={handlePasswordReset} style={styles.form}>
            
            {/* Email (Read-only) */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Email</label>
              <input
                type="email"
                value={form.email}
                disabled
                style={{...styles.input, background:"#f1f5f9", cursor:"not-allowed"}}
              />
            </div>

            {/* Old Password */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Current Password</label>
              <div style={styles.passwordWrapper}>
                <input
                  type={showOldPass ? "text" : "password"}
                  name="oldPassword"
                  placeholder="Enter your current password"
                  value={form.oldPassword}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowOldPass(!showOldPass)}
                  style={styles.toggleBtn}
                >
                  {showOldPass ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>New Password</label>
              <div style={styles.passwordWrapper}>
                <input
                  type={showNewPass ? "text" : "password"}
                  name="newPassword"
                  placeholder="Enter new password (min 6 chars)"
                  value={form.newPassword}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNewPass(!showNewPass)}
                  style={styles.toggleBtn}
                >
                  {showNewPass ? "🙈" : "👁️"}
                </button>
              </div>
              {form.newPassword && form.newPassword.length < 6 && (
                <span style={styles.hint}>⚠️ Minimum 6 characters required</span>
              )}
            </div>

            {/* Confirm New Password */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Confirm New Password</label>
              <div style={styles.passwordWrapper}>
                <input
                  type={showConfirmPass ? "text" : "password"}
                  name="confirmNewPassword"
                  placeholder="Confirm your new password"
                  value={form.confirmNewPassword}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPass(!showConfirmPass)}
                  style={styles.toggleBtn}
                >
                  {showConfirmPass ? "🙈" : "👁️"}
                </button>
              </div>
              {form.newPassword && form.confirmNewPassword && form.newPassword !== form.confirmNewPassword && (
                <span style={styles.hintError}>❌ Passwords do not match</span>
              )}
            </div>

            <button type="submit" style={styles.submitBtn} disabled={loading}>
              {loading ? "Updating..." : "🔐 Update Password"}
            </button>
          </form>
        )}

        {/* Back to Login */}
        <p style={styles.backText}>
          <Link to="/login" style={styles.backLink}>← Back to Sign In</Link>
        </p>

        {/* Help Text */}
        <div style={styles.helpText}>
          <p>💡 <strong>Tip:</strong> Use a strong password with letters, numbers & symbols.</p>
          <p>🔒 Your password is securely stored (demo: localStorage).</p>
        </div>

      </div>
    </div>
  )
}

/* ====================== 🎨 STYLES ====================== */
const styles = {
  pageWrapper: {
    width: "100%", maxWidth: "900px", margin: "0 auto", padding: "20px 0",
    display: "flex", justifyContent: "center", minHeight: "100vh", background: "#f8fbff"
  },
  card: {
    width: "100%", maxWidth: "450px", background: "#ffffff", padding: "35px 30px",
    borderRadius: "20px", border: "1px solid rgba(59,130,246,0.2)",
    boxShadow: "0 8px 30px rgba(59,130,246,0.12)", textAlign: "center"
  },
  header: { marginBottom: "20px" },
  logo: { fontSize: "1.8rem", fontWeight: "800", color: "#1e40af", margin: "0 0 8px 0" },
  subtitle: { fontSize: "0.9rem", color: "#475569", margin: 0 },
  
  // Progress Steps
  progress: { display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "20px", fontSize: "0.85rem" },
  step: { padding: "6px 14px", borderRadius: "20px", background: "#e2e8f0", color: "#64748b", fontWeight: "500" },
  stepActive: { background: "#2563eb", color: "#fff" },
  stepDivider: { color: "#94a3b8" },
  
  // Messages
  errorMsg: {
    background: "#fef2f2", color: "#dc2626", padding: "12px 14px", borderRadius: "10px",
    fontSize: "0.9rem", marginBottom: "18px", border: "1px solid #fecaca", textAlign: "left"
  },
  successMsg: {
    background: "#f0fdf4", color: "#16a34a", padding: "12px 14px", borderRadius: "10px",
    fontSize: "0.9rem", marginBottom: "18px", border: "1px solid #bbf7d0", textAlign: "left", whiteSpace: "pre-line"
  },
  
  // Form
  form: { display: "flex", flexDirection: "column", gap: "14px", textAlign: "left" },
  inputGroup: { display: "flex", flexDirection: "column", gap: "6px" },
  label: { fontSize: "0.85rem", fontWeight: "500", color: "#334155", marginLeft: "2px" },
  input: {
    padding: "12px 16px", borderRadius: "10px", border: "1px solid #cbd5e1",
    background: "#ffffff", color: "#1e293b", fontSize: "0.95rem", outline: "none"
  },
  passwordWrapper: { position: "relative", display: "flex", alignItems: "center" },
  toggleBtn: {
    position: "absolute", right: "12px", background: "none", border: "none",
    fontSize: "1rem", cursor: "pointer", padding: "4px", opacity: 0.7
  },
  hint: { fontSize: "0.75rem", color: "#f59e0b", marginLeft: "2px" },
  hintError: { fontSize: "0.75rem", color: "#dc2626", marginLeft: "2px" },
  
  // Button
  submitBtn: {
    padding: "14px", background: "linear-gradient(135deg, #3b82f6, #60a5fa)",
    color: "#fff", border: "none", borderRadius: "50px", fontSize: "1rem",
    fontWeight: "600", cursor: "pointer", boxShadow: "0 6px 20px rgba(59,130,246,0.3)",
    marginTop: "8px", transition: "transform 0.2s", width: "100%"
  },
  
  // Footer
  backText: { textAlign: "center", fontSize: "0.9rem", color: "#64748b", margin: "20px 0 0 0" },
  backLink: { color: "#2563eb", textDecoration: "none", fontWeight: "600" },
  helpText: {
    marginTop: "24px", padding: "14px", background: "#f8fafc", borderRadius: "12px",
    fontSize: "0.8rem", color: "#64748b", textAlign: "left", lineHeight: "1.6"
  }
}

/* ====================== 🎨 HOVER EFFECTS ====================== */
const addInteractions = () => {
  if (typeof document !== "undefined") {
    const style = document.createElement("style")
    style.textContent = `
      input:focus { border-color: #2563eb !important; box-shadow: 0 0 0 3px rgba(37,99,235,0.15) !important; }
      button[style*="toggleBtn"]:hover { opacity: 1 !important; }
      button[style*="submitBtn"]:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(59,130,246,0.5) !important; }
      button[style*="submitBtn"]:disabled { opacity: 0.7; cursor: not-allowed; transform: none !important; }
      a[style*="backLink"]:hover { color: #1d4ed8 !important; text-decoration: underline !important; }
    `
    document.head.appendChild(style)
  }
}
addInteractions()