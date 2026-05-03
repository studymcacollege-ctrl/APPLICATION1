import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUpPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "", email: "", password: "", confirmPassword: "", agree: false
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // ✅ Codespaces के लिए API URL detect करें
  const getApiUrl = () => {
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      if (hostname.includes('github.dev')) {
        const parts = hostname.split('.');
        const codespace = parts[0];
        return `https://${codespace}-5000.app.github.dev/api`;
      }
    }
    return "http://localhost:5000/api";
  };
  
  const API_URL = getApiUrl();
  console.log('🔗 API URL:', API_URL);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setError("Please fill in all fields"); setLoading(false); return;
    }
    if (form.name.trim().length < 2) { setError("Name must be at least 2 characters"); setLoading(false); return; }
    if (!form.email.includes("@")) { setError("Please enter a valid email"); setLoading(false); return; }
    if (form.password.length < 6) { setError("Password must be at least 6 characters"); setLoading(false); return; }
    if (form.password !== form.confirmPassword) { setError("Passwords do not match"); setLoading(false); return; }
    if (!form.agree) { setError("Please agree to Terms & Privacy"); setLoading(false); return; }

    try {
      console.log('📡 Sending to:', `${API_URL}/signup`);
      
      const response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          password: form.password,
          confirmPassword: form.confirmPassword,
          agree: form.agree
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Signup failed");
      }

      alert("✅ Account created successfully! Please login.");
      setForm({ name: "", email: "", password: "", confirmPassword: "", agree: false });
      navigate("/login");

    } catch (err) {
      console.error('❌ Error:', err);
      setError(`Cannot connect to server. 
1. Backend running? (npm run dev)
2. Port 5000 PUBLIC है? (Ports panel check करें)
3. API URL: ${API_URL}

Details: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.signupCard}>
        <div style={styles.cardHeader}>
          <h1 style={styles.logo}>🎯 Quiz Master</h1>
          <p style={styles.subtitle}>Create your account & start quizzing!</p>
        </div>

        {error && <div style={styles.errorMsg}>⚠️ {error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Full Name</label>
            <input type="text" name="name" placeholder="John Doe" value={form.name} onChange={handleChange} style={styles.input} required disabled={loading} />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input type="email" name="email" placeholder="you@example.com" value={form.email} onChange={handleChange} style={styles.input} required disabled={loading} />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <div style={styles.passwordWrapper}>
              <input type={showPassword ? "text" : "password"} name="password" placeholder="••••••••" value={form.password} onChange={handleChange} style={styles.input} required disabled={loading} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} style={styles.toggleBtn} disabled={loading}>{showPassword ? "🙈" : "👁️"}</button>
            </div>
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Confirm Password</label>
            <div style={styles.passwordWrapper}>
              <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" placeholder="••••••••" value={form.confirmPassword} onChange={handleChange} style={styles.input} required disabled={loading} />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.toggleBtn} disabled={loading}>{showConfirmPassword ? "🙈" : "👁️"}</button>
            </div>
          </div>
          <label style={styles.agreeLabel}>
            <input type="checkbox" name="agree" checked={form.agree} onChange={handleChange} style={styles.checkbox} required disabled={loading} />
            <span style={styles.agreeText}>I agree to <a href="/terms" style={styles.link}>Terms</a> & <a href="/privacy" style={styles.link}>Privacy</a></span>
          </label>
          <button type="submit" style={styles.signupBtn} disabled={loading}>
            {loading ? "Creating Account..." : "🚀 Create Account"}
          </button>
        </form>

        <div style={styles.divider}>
          <div style={styles.dividerLine}></div>
          <span style={styles.dividerText}>or sign up with</span>
          <div style={styles.dividerLine}></div>
        </div>

        <div style={styles.socialButtons}>
          <button style={styles.socialBtn} disabled={loading}>🔵 Google</button>
          <button style={styles.socialBtn} disabled={loading}>⬛ GitHub</button>
        </div>

        <p style={styles.loginText}>
          Already have an account?{" "}
          <Link to="/login" style={styles.loginLink}>Sign in →</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  pageWrapper: { width: "100%", maxWidth: "900px", margin: "0 auto", padding: "20px 0", display: "flex", justifyContent: "center", minHeight: "100vh", background: "#f8fbff" },
  signupCard: { width: "100%", maxWidth: "450px", background: "#fff", padding: "35px 30px", borderRadius: "20px", border: "1px solid rgba(59,130,246,0.2)", boxShadow: "0 8px 30px rgba(59,130,246,0.12)", textAlign: "center" },
  cardHeader: { marginBottom: "24px" },
  logo: { fontSize: "1.8rem", fontWeight: "800", color: "#1e40af", margin: "0 0 8px 0" },
  subtitle: { fontSize: "0.9rem", color: "#475569", margin: 0 },
  errorMsg: { background: "#fef2f2", color: "#dc2626", padding: "10px 14px", borderRadius: "10px", fontSize: "0.85rem", marginBottom: "18px", border: "1px solid #fecaca", textAlign: "center", whiteSpace: "pre-line" },
  form: { display: "flex", flexDirection: "column", gap: "16px", textAlign: "left" },
  inputGroup: { display: "flex", flexDirection: "column", gap: "6px" },
  label: { fontSize: "0.85rem", fontWeight: "500", color: "#334155", marginLeft: "2px" },
  input: { padding: "12px 16px", borderRadius: "10px", border: "1px solid #cbd5e1", background: "#fff", color: "#1e293b", fontSize: "0.95rem", outline: "none" },
  passwordWrapper: { position: "relative", display: "flex", alignItems: "center" },
  toggleBtn: { position: "absolute", right: "12px", background: "none", border: "none", fontSize: "1rem", cursor: "pointer", padding: "4px", opacity: 0.7 },
  agreeLabel: { display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "0.85rem", color: "#475569", cursor: "pointer", textAlign: "left" },
  checkbox: { width: "16px", height: "16px", accentColor: "#2563eb", cursor: "pointer", marginTop: "2px" },
  agreeText: { userSelect: "none", lineHeight: "1.4" },
  link: { color: "#2563eb", textDecoration: "none", fontWeight: "500" },
  signupBtn: { padding: "14px", background: "linear-gradient(135deg,#3b82f6,#60a5fa)", color: "#fff", border: "none", borderRadius: "50px", fontSize: "1rem", fontWeight: "600", cursor: "pointer", boxShadow: "0 6px 20px rgba(59,130,246,0.3)", marginTop: "8px", width: "100%" },
  divider: { display: "flex", alignItems: "center", gap: "12px", margin: "22px 0", color: "#94a3b8", fontSize: "0.8rem" },
  dividerLine: { flex: 1, height: "1px", background: "#e2e8f0", borderRadius: "1px" },
  dividerText: { whiteSpace: "nowrap", color: "#94a3b8" },
  socialButtons: { display: "flex", gap: "12px", marginBottom: "20px" },
  socialBtn: { flex: 1, padding: "10px", background: "#fff", border: "1px solid #e2e8f0", borderRadius: "10px", color: "#334155", fontSize: "0.85rem", fontWeight: "500", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" },
  loginText: { textAlign: "center", fontSize: "0.9rem", color: "#64748b", margin: "20px 0 0 0" },
  loginLink: { color: "#2563eb", textDecoration: "none", fontWeight: "600" }
};

const addInteractions = () => {
  if (typeof document !== "undefined") {
    const style = document.createElement("style");
    style.textContent = `
      input:focus { border-color: #2563eb !important; box-shadow: 0 0 0 3px rgba(37,99,235,0.15) !important; }
      button[style*="toggleBtn"]:hover { opacity: 1 !important; }
      a[style*="link"]:hover, a[style*="loginLink"]:hover { color: #1d4ed8 !important; text-decoration: underline !important; }
      button[style*="signupBtn"]:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(59,130,246,0.5) !important; }
      button[style*="socialBtn"]:hover { background: #eff6ff !important; border-color: #cbd5e1 !important; transform: translateY(-2px); }
      button:disabled { opacity: 0.7; cursor: not-allowed; }
    `;
    document.head.appendChild(style);
  }
};
addInteractions();