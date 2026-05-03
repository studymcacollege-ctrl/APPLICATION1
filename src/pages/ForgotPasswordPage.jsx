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
  const [step, setStep] = useState(1)

  // ✅ Auto-detect API URL for Local + Codespaces
  const getApiUrl = () => {
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname
      if (hostname.includes('github.dev')) {
        const parts = hostname.split('.')
        const codespace = parts[0]
        return `https://${codespace}-5000.app.github.dev/api`
      }
    }
    return "http://localhost:5000/api"
  }
  const API_URL = getApiUrl()
  console.log('🔗 API URL:', API_URL)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    setError("")
  }

  // 🔹 STEP 1: Verify Email with Backend
  const handleEmailSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    
    if (!form.email) { setError("Please enter your email"); setLoading(false); return }
    if (!form.email.includes("@")) { setError("Please enter a valid email"); setLoading(false); return }

    try {
      console.log('📡 Verifying email:', form.email)
      
      const response = await fetch(`${API_URL}/forgot-password/verify-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email.toLowerCase() })
      })

      console.log('📡 Response status:', response.status)
      const data = await response.json()
      console.log('📦 Response ', data)

      if (!response.ok) {
        throw new Error(data.error || "Verification failed")
      }

      setStep(2)
      setMessage("✅ Email verified! Now reset your password.")

    } catch (err) {
      console.error('❌ Verify error:', err)
      if (err.message === 'Failed to fetch') {
        setError(`Cannot connect to server.
1. Backend running? (npm run dev)
2. Port 5000 PUBLIC? (Ports panel)
3. API URL: ${API_URL}`)
      } else {
        setError(err.message || "Cannot connect to server")
      }
    } finally {
      setLoading(false)
    }
  }

  // 🔹 STEP 2: Reset Password with Backend
  const handlePasswordReset = async (e) => {
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
    if (oldPassword === newPassword) { setError("New password must be different"); setLoading(false); return }

    try {
      console.log('📡 Resetting password for:', form.email)
      
      const response = await fetch(`${API_URL}/forgot-password/reset`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email.toLowerCase(),
          oldPassword,
          newPassword,
          confirmNewPassword
        })
      })

      console.log('📡 Response status:', response.status)
      const data = await response.json()
      console.log('📦 Response ', data)

      if (!response.ok) {
        throw new Error(data.error || "Password reset failed")
      }

      setMessage("✅ Password updated successfully!\nRedirecting to login...")
      setForm({ email: "", oldPassword: "", newPassword: "", confirmNewPassword: "" })
      
      setTimeout(() => {
        navigate("/login")
      }, 2000)

    } catch (err) {
      console.error('❌ Reset error:', err)
      if (err.message === 'Failed to fetch') {
        setError(`Cannot connect to server. Check backend is running.`)
      } else {
        setError(err.message || "Something went wrong")
      }
    } finally {
      setLoading(false)
    }
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
                disabled={loading}
              />
            </div>
            <button type="submit" style={styles.submitBtn} disabled={loading}>
              {loading ? "Verifying..." : "🔍 Verify Email"}
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
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowOldPass(!showOldPass)}
                  style={styles.toggleBtn}
                  disabled={loading}
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
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPass(!showNewPass)}
                  style={styles.toggleBtn}
                  disabled={loading}
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
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPass(!showConfirmPass)}
                  style={styles.toggleBtn}
                  disabled={loading}
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
          <p>🔒 Your password is securely stored with bcrypt encryption.</p>
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
  
  progress: { display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "20px", fontSize: "0.85rem" },
  step: { padding: "6px 14px", borderRadius: "20px", background: "#e2e8f0", color: "#64748b", fontWeight: "500" },
  stepActive: { background: "#2563eb", color: "#fff" },
  stepDivider: { color: "#94a3b8" },
  
  errorMsg: {
    background: "#fef2f2", color: "#dc2626", padding: "12px 14px", borderRadius: "10px",
    fontSize: "0.9rem", marginBottom: "18px", border: "1px solid #fecaca", textAlign: "left", whiteSpace: "pre-line"
  },
  successMsg: {
    background: "#f0fdf4", color: "#16a34a", padding: "12px 14px", borderRadius: "10px",
    fontSize: "0.9rem", marginBottom: "18px", border: "1px solid #bbf7d0", textAlign: "left", whiteSpace: "pre-line"
  },
  
  form: { display: "flex", flexDirection: "column", gap: "14px", textAlign: "left" },
  inputGroup: { display: "flex", flexDirection: "column", gap: "6px" },
  label: { fontSize: "0.85rem", fontWeight: "500", color: "#334155", marginLeft: "2px" },
  
  // ✅ FIXED: color mein # add kiya
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
  
  submitBtn: {
    padding: "14px", background: "linear-gradient(135deg, #3b82f6, #60a5fa)",
    color: "#fff", border: "none", borderRadius: "50px", fontSize: "1rem",
    fontWeight: "600", cursor: "pointer", boxShadow: "0 6px 20px rgba(59,130,246,0.3)",
    marginTop: "8px", transition: "transform 0.2s", width: "100%"
  },
  
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