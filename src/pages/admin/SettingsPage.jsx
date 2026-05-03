// src/pages/admin/SettingsPage.jsx
import { useState } from "react"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    appName: "Quiz Master",
    allowSignup: true,
    quizTimeDefault: 30,
    passingScoreDefault: 60,
    maintenanceMode: false
  })
  const [saved, setSaved] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setSettings(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSaved(true)
    // TODO: Save to backend API
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>⚙️ App Settings</h1>
          <p style={styles.subtitle}>Configure your quiz application preferences</p>
        </div>
        
        {/* Success Message */}
        {saved && (
          <div style={styles.success}>
            <span style={styles.successIcon}>✅</span>
            <span>Settings saved successfully!</span>
          </div>
        )}

        {/* Settings Form */}
        <form onSubmit={handleSubmit} style={styles.form}>
          
          {/* 📱 General Section */}
          <div style={styles.section}>
            <div style={styles.sectionHeader}>
              <span style={styles.sectionIcon}>📱</span>
              <h3 style={styles.sectionTitle}>General Settings</h3>
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Application Name</label>
              <input 
                type="text" 
                name="appName" 
                value={settings.appName} 
                onChange={handleChange} 
                style={styles.input} 
                placeholder="Enter app name"
              />
              <span style={styles.hint}>This name appears in the browser tab and headers</span>
            </div>
          </div>

          {/* 🔐 Authentication Section */}
          <div style={styles.section}>
            <div style={styles.sectionHeader}>
              <span style={styles.sectionIcon}>🔐</span>
              <h3 style={styles.sectionTitle}>Authentication</h3>
            </div>
            
            <label style={styles.checkbox}>
              <input 
                type="checkbox" 
                name="allowSignup" 
                checked={settings.allowSignup} 
                onChange={handleChange} 
                style={styles.checkboxInput}
              />
              <div style={styles.checkboxContent}>
                <span style={styles.checkboxLabel}>Allow new user registrations</span>
                <span style={styles.checkboxHint}>When disabled, only admin can create accounts</span>
              </div>
            </label>
          </div>

          {/* 📝 Quiz Defaults Section */}
          <div style={styles.section}>
            <div style={styles.sectionHeader}>
              <span style={styles.sectionIcon}>📝</span>
              <h3 style={styles.sectionTitle}>Quiz Defaults</h3>
            </div>
            
            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Default Time Limit</label>
                <div style={styles.inputWithUnit}>
                  <input 
                    type="number" 
                    name="quizTimeDefault" 
                    value={settings.quizTimeDefault} 
                    onChange={handleChange} 
                    style={styles.input} 
                    min="5" 
                    max="180" 
                  />
                  <span style={styles.unit}>minutes</span>
                </div>
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Default Passing Score</label>
                <div style={styles.inputWithUnit}>
                  <input 
                    type="number" 
                    name="passingScoreDefault" 
                    value={settings.passingScoreDefault} 
                    onChange={handleChange} 
                    style={styles.input} 
                    min="40" 
                    max="100" 
                  />
                  <span style={styles.unit}>percent</span>
                </div>
              </div>
            </div>
          </div>

          {/* 🔧 System Section */}
          <div style={styles.section}>
            <div style={styles.sectionHeader}>
              <span style={styles.sectionIcon}>🔧</span>
              <h3 style={styles.sectionTitle}>System</h3>
            </div>
            
            <label style={styles.checkbox}>
              <input 
                type="checkbox" 
                name="maintenanceMode" 
                checked={settings.maintenanceMode} 
                onChange={handleChange} 
                style={styles.checkboxInput}
              />
              <div style={styles.checkboxContent}>
                <span style={styles.checkboxLabel}>🚧 Enable Maintenance Mode</span>
                <span style={styles.checkboxHint}>Users will see a maintenance page when enabled</span>
              </div>
            </label>
          </div>

          {/* Submit Button */}
          <div style={styles.actions}>
            <button type="submit" style={styles.submitBtn}>
              💾 Save All Settings
            </button>
            <button type="button" style={styles.resetBtn}>
              🔄 Reset to Defaults
            </button>
          </div>
          
        </form>
      </div>
    </div>
  )
}

/* ====================== 🎨 ENHANCED STYLES ====================== */
const styles = {
  // ✅ Page Wrapper - Full background with gradient
  pageWrapper: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
    padding: "40px 20px",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center"
  },
  
  // ✅ Main Container - Larger card with better shadow
  container: {
    width: "100%",
    maxWidth: "800px",  // ✅ Increased from 700px
    background: "#ffffff",
    padding: "40px 35px",  // ✅ Increased padding
    borderRadius: "24px",  // ✅ Larger border radius
    border: "1px solid rgba(59, 130, 246, 0.2)",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",  // ✅ Deeper shadow
  },
  
  // ✅ Header - Larger title
  header: {
    marginBottom: "30px",
    paddingBottom: "20px",
    borderBottom: "2px solid #f1f5f9",
    textAlign: "center"
  },
  title: {
    fontSize: "2rem",  // ✅ Increased from 1.6rem
    fontWeight: "800",
    color: "#1e3a5f",
    marginBottom: "8px",
    background: "linear-gradient(90deg, #3b82f6, #7c3aed)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent"
  },
  subtitle: {
    fontSize: "1rem",
    color: "#64748b",
    margin: 0
  },
  
  // ✅ Success Message - More visible
  success: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "16px 20px",
    background: "linear-gradient(135deg, #10b981, #059669)",
    color: "#fff",
    borderRadius: "12px",
    marginBottom: "25px",
    fontSize: "1rem",
    fontWeight: "500",
    animation: "slideIn 0.3s ease"
  },
  successIcon: { fontSize: "1.3rem" },
  
  // ✅ Form Layout
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "24px"  // ✅ Increased gap
  },
  
  // ✅ Section Cards - Better styling
  section: {
    background: "linear-gradient(145deg, #ffffff, #f8fafc)",
    padding: "24px 28px",  // ✅ Increased padding
    borderRadius: "16px",
    border: "1px solid #e2e8f0",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.03)"
  },
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "18px",
    paddingBottom: "12px",
    borderBottom: "1px solid #f1f5f9"
  },
  sectionIcon: { fontSize: "1.5rem" },
  sectionTitle: {
    fontSize: "1.2rem",  // ✅ Increased from 1.1rem
    fontWeight: "700",
    color: "#1e3a5f",
    margin: 0
  },
  
  // ✅ Form Elements - Larger and clearer
  formGroup: {
    marginBottom: "18px"  // ✅ Increased spacing
  },
  formRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",  // ✅ Better responsive
    gap: "20px"  // ✅ Increased gap
  },
  label: {
    display: "block",
    fontSize: "0.95rem",  // ✅ Increased from 0.9rem
    fontWeight: "600",
    color: "#334155",
    marginBottom: "8px"
  },
  input: {
    width: "100%",
    padding: "14px 18px",  // ✅ Increased from 10px 14px
    borderRadius: "10px",
    border: "2px solid #cbd5e1",  // ✅ Thicker border
    fontSize: "1rem",  // ✅ Increased from 0.95rem
    background: "#ffffff",
    color: "#1e293b",
    outline: "none",
    transition: "all 0.2s ease"
  },
  inputWithUnit: {
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },
  unit: {
    fontSize: "0.9rem",
    color: "#64748b",
    fontWeight: "500",
    whiteSpace: "nowrap"
  },
  hint: {
    display: "block",
    fontSize: "0.8rem",
    color: "#94a3b8",
    marginTop: "6px",
    marginLeft: "2px"
  },
  
  // ✅ Checkbox - Larger and clearer
  checkbox: {
    display: "flex",
    alignItems: "flex-start",
    gap: "14px",  // ✅ Increased gap
    fontSize: "1rem",  // ✅ Increased from 0.95rem
    color: "#334155",
    cursor: "pointer",
    padding: "8px 0"
  },
  checkboxInput: {
    width: "20px",  // ✅ Larger checkbox
    height: "20px",
    accentColor: "#3b82f6",
    cursor: "pointer",
    marginTop: "2px"
  },
  checkboxContent: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    flex: 1
  },
  checkboxLabel: {
    fontWeight: "600",
    color: "#1e3a5f"
  },
  checkboxHint: {
    fontSize: "0.85rem",
    color: "#64748b"
  },
  
  // ✅ Action Buttons - Larger and better styled
  actions: {
    display: "flex",
    gap: "14px",
    marginTop: "10px",
    flexWrap: "wrap"
  },
  submitBtn: {
    padding: "16px 32px",  // ✅ Increased from 12px 28px
    background: "linear-gradient(135deg, #3b82f6, #6366f1)",
    color: "#fff",
    border: "none",
    borderRadius: "50px",
    fontSize: "1.05rem",  // ✅ Increased from 1rem
    fontWeight: "700",
    cursor: "pointer",
    boxShadow: "0 8px 25px rgba(59, 130, 246, 0.4)",
    transition: "all 0.25s ease",
    alignSelf: "flex-start"
  },
  resetBtn: {
    padding: "16px 28px",
    background: "#ffffff",
    color: "#64748b",
    border: "2px solid #cbd5e1",
    borderRadius: "50px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease"
  }
}

/* ====================== 🎨 ANIMATIONS & HOVER EFFECTS ====================== */
const addInteractions = () => {
  if (typeof document !== "undefined") {
    const style = document.createElement("style")
    style.textContent = `
      /* Success Animation */
      @keyframes slideIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      /* Input Focus */
      input:focus {
        border-color: #3b82f6 !important;
        box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.15) !important;
        transform: translateY(-1px);
      }
      
      /* Checkbox Focus */
      input[type="checkbox"]:focus {
        outline: 2px solid #3b82f6;
        outline-offset: 2px;
      }
      
      /* Submit Button Hover */
      button[style*="submitBtn"]:hover:not(:disabled) {
        transform: translateY(-3px);
        box-shadow: 0 12px 35px rgba(59, 130, 246, 0.55) !important;
        background: linear-gradient(135deg, #2563eb, #4f46e5) !important;
      }
      
      /* Reset Button Hover */
      button[style*="resetBtn"]:hover {
        background: #f8fafc !important;
        border-color: #94a3b8 !important;
        color: #334155 !important;
        transform: translateY(-2px);
      }
      
      /* Section Hover */
      div[style*="section"]:hover {
        border-color: #3b82f6 !important;
        box-shadow: 0 8px 20px rgba(59, 130, 246, 0.12) !important;
        transform: translateY(-2px);
        transition: all 0.25s ease;
      }
    `
    document.head.appendChild(style)
  }
}
addInteractions()