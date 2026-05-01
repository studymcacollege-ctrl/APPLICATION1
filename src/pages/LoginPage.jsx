// src/pages/LoginPage.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // ✅ Basic Validation
    if (!form.email || !form.password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }
    if (!form.email.includes("@")) {
      setError("Please enter a valid email");
      setLoading(false);
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    // ✅ Simulate API Call (Backend se replace karna)
    setTimeout(() => {
      if (form.email === "admin@quizapp.com" && form.password === "admin123") {
        navigate("/admin");
      } else {
        navigate("/");
      }
      setLoading(false);
    }, 1200);
  };

  return (
    // ✅ Page Wrapper - Matches AdminPanel/HomePage style
    <div style={styles.pageWrapper}>
      
      {/* ✅ Login Card - Centered inside main content */}
      <div style={styles.loginCard}>
        
        {/* Logo/Header */}
        <div style={styles.cardHeader}>
          <h1 style={styles.logo}>🎯 Quiz Master</h1>
          <p style={styles.subtitle}>Sign in to continue your quiz journey</p>
        </div>

        {/* Error Message */}
        {error && <div style={styles.errorMsg}>⚠️ {error}</div>}

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={styles.form}>
          
          {/* Email Field */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              style={styles.input}
              disabled={loading}
            />
          </div>

          {/* Password Field */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <div style={styles.passwordWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                style={styles.input}
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.toggleBtn}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* Remember Me + Forgot Password */}
          <div style={styles.formOptions}>
            <label style={styles.remember}>
              <input
                type="checkbox"
                name="remember"
                checked={form.remember}
                onChange={handleChange}
                style={styles.checkbox}
              />
              <span style={styles.rememberText}>Remember me</span>
            </label>
            <Link to="/forgot-password" style={styles.forgotLink}>
              Forgot password?
            </Link>
          </div>

          {/* Login Button */}
          <button type="submit" style={styles.loginBtn} disabled={loading}>
            {loading ? "Signing in..." : "🔐 Sign In"}
          </button>
        </form>

        {/* Divider */}
        <div style={styles.divider}>
          <div style={styles.dividerLine}></div>
          <span style={styles.dividerText}>or continue with</span>
          <div style={styles.dividerLine}></div>
        </div>

        {/* Social Login Buttons */}
        <div style={styles.socialButtons}>
          <button style={styles.socialBtn} type="button">
            <span style={styles.socialIcon}>🔵</span> Google
          </button>
          <button style={styles.socialBtn} type="button">
            <span style={styles.socialIcon}>⬛</span> GitHub
          </button>
        </div>

        {/* Sign Up Link */}
        <p style={styles.signupText}>
          Don't have an account?{" "}
          <Link to="/signup" style={styles.signupLink}>
            Create one →
          </Link>
        </p>

      </div>
    </div>
  );
}

/* ====================== 🎨 BLUE & WHITE THEME - MATCHES ADMIN PANEL ====================== */
const styles = {
  // ✅ Page Wrapper - Same as AdminPanel/HomePage
  pageWrapper: {
    width: "100%",
    maxWidth: "900px",
    margin: "0 auto",
    padding: "20px 0",
    display: "flex",
    justifyContent: "center"
  },

  // ✅ Login Card - White with blue accents (matches other pages)
  loginCard: {
    width: "100%",
    maxWidth: "420px",
    background: "#ffffff",
    padding: "35px 30px",
    borderRadius: "20px",
    border: "1px solid rgba(59, 130, 246, 0.2)",
    boxShadow: "0 8px 30px rgba(59, 130, 246, 0.12)",
    textAlign: "center"
  },

  cardHeader: { marginBottom: "28px" },
  logo: {
    fontSize: "1.8rem",
    fontWeight: "800",
    color: "#1e40af",
    margin: "0 0 8px 0"
  },
  subtitle: {
    fontSize: "0.9rem",
    color: "#475569",
    margin: 0
  },

  // Error Message
  errorMsg: {
    background: "#fef2f2",
    color: "#dc2626",
    padding: "10px 14px",
    borderRadius: "10px",
    fontSize: "0.85rem",
    marginBottom: "18px",
    border: "1px solid #fecaca",
    textAlign: "center"
  },

  // Form
  form: { display: "flex", flexDirection: "column", gap: "18px", textAlign: "left" },
  inputGroup: { display: "flex", flexDirection: "column", gap: "6px" },
  label: {
    fontSize: "0.85rem",
    fontWeight: "500",
    color: "#334155",
    marginLeft: "2px"
  },
  input: {
    padding: "12px 16px",
    borderRadius: "10px",
    border: "1px solid #cbd5e1",
    background: "#ffffff",
    color: "#1e293b",
    fontSize: "0.95rem",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s"
  },
  passwordWrapper: { position: "relative", display: "flex", alignItems: "center" },
  toggleBtn: {
    position: "absolute",
    right: "12px",
    background: "none",
    border: "none",
    fontSize: "1rem",
    cursor: "pointer",
    padding: "4px",
    opacity: 0.7
  },
  formOptions: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "0.85rem"
  },
  remember: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    cursor: "pointer",
    color: "#475569"
  },
  checkbox: {
    width: "16px",
    height: "16px",
    accentColor: "#2563eb",
    cursor: "pointer"
  },
  rememberText: { userSelect: "none" },
  forgotLink: {
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: "500"
  },

  // Login Button
  loginBtn: {
    padding: "14px",
    background: "linear-gradient(135deg, #3b82f6, #60a5fa)",
    color: "#fff",
    border: "none",
    borderRadius: "50px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 6px 20px rgba(59, 130, 246, 0.3)",
    marginTop: "8px",
    transition: "transform 0.2s ease",
    width: "100%"
  },

  // Divider
  divider: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    margin: "25px 0",
    color: "#94a3b8",
    fontSize: "0.8rem"
  },
  dividerLine: {
    flex: 1,
    height: "1px",
    background: "#e2e8f0",
    borderRadius: "1px"
  },
  dividerText: { whiteSpace: "nowrap", color: "#94a3b8" },

  // Social Buttons
  socialButtons: { display: "flex", gap: "12px", marginBottom: "22px" },
  socialBtn: {
    flex: 1,
    padding: "10px",
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "10px",
    color: "#334155",
    fontSize: "0.85rem",
    fontWeight: "500",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px"
  },
  socialIcon: { fontSize: "1.1rem" },

  // Sign Up Text
  signupText: {
    textAlign: "center",
    fontSize: "0.9rem",
    color: "#64748b",
    margin: 0
  },
  signupLink: {
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: "600"
  }
};

/* ====================== 🎨 HOVER & FOCUS EFFECTS ====================== */
const addInteractions = () => {
  if (typeof document !== "undefined") {
    const style = document.createElement("style");
    style.textContent = `
      /* Input Focus */
      input:focus {
        border-color: #2563eb !important;
        box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15) !important;
      }
      button[style*="toggleBtn"]:hover { opacity: 1 !important; }
      a[style*="forgotLink"]:hover { color: #1d4ed8 !important; text-decoration: underline !important; }
      button[style*="loginBtn"]:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 10px 30px rgba(59, 130, 246, 0.5) !important;
      }
      button[style*="loginBtn"]:disabled { opacity: 0.7; cursor: not-allowed; transform: none !important; }
      button[style*="socialBtn"]:hover {
        background: #eff6ff !important;
        border-color: #cbd5e1 !important;
        transform: translateY(-2px);
      }
      a[style*="signupLink"]:hover { color: #1d4ed8 !important; }
      input[type="checkbox"]:focus { outline: 2px solid #2563eb; outline-offset: 2px; }
    `;
    document.head.appendChild(style);
  }
};
addInteractions();