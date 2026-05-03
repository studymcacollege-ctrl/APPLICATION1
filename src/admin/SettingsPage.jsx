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
    // TODO: Save to backend
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>⚙️ App Settings</h1>
      
      {saved && <div style={styles.success}>✅ Settings saved!</div>}

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>📱 General</h3>
          <div style={styles.formGroup}>
            <label style={styles.label}>App Name</label>
            <input type="text" name="appName" value={settings.appName} onChange={handleChange} style={styles.input} />
          </div>
        </div>

        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>🔐 Authentication</h3>
          <label style={styles.checkbox}>
            <input type="checkbox" name="allowSignup" checked={settings.allowSignup} onChange={handleChange} />
            <span>Allow new user registrations</span>
          </label>
        </div>

        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>📝 Quiz Defaults</h3>
          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Default Time (min)</label>
              <input type="number" name="quizTimeDefault" value={settings.quizTimeDefault} onChange={handleChange} style={styles.input} min="5" max="120" />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Passing Score (%)</label>
              <input type="number" name="passingScoreDefault" value={settings.passingScoreDefault} onChange={handleChange} style={styles.input} min="40" max="100" />
            </div>
          </div>
        </div>

        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>🔧 System</h3>
          <label style={styles.checkbox}>
            <input type="checkbox" name="maintenanceMode" checked={settings.maintenanceMode} onChange={handleChange} />
            <span>🚧 Enable Maintenance Mode</span>
          </label>
        </div>

        <button type="submit" style={styles.submitBtn}>💾 Save Settings</button>
      </form>
    </div>
  )
}

const styles = {
  container: { padding: "20px", maxWidth: "700px", margin: "0 auto" },
  title: { fontSize: "1.6rem", fontWeight: "700", color: "#1e3a5f", marginBottom: "20px" },
  success: { padding: "12px", background: "#f0fdf4", color: "#16a34a", borderRadius: "8px", marginBottom: "20px", textAlign: "center" },
  form: { display: "flex", flexDirection: "column", gap: "20px" },
  section: { background: "#fff", padding: "20px", borderRadius: "14px", border: "1px solid #e2e8f0" },
  sectionTitle: { fontSize: "1.1rem", fontWeight: "600", color: "#1e3a5f", marginBottom: "16px" },
  formGroup: { marginBottom: "14px" },
  formRow: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" },
  label: { display: "block", fontSize: "0.9rem", fontWeight: "500", color: "#334155", marginBottom: "6px" },
  input: { width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.95rem" },
  checkbox: { display: "flex", alignItems: "center", gap: "10px", fontSize: "0.95rem", color: "#334155", cursor: "pointer" },
  submitBtn: { padding: "12px 28px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "50px", fontSize: "1rem", fontWeight: "600", cursor: "pointer", alignSelf: "flex-start" }
}