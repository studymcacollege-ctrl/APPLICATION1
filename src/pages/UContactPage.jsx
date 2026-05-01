// src/pages/ContactPage.jsx
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Invalid email format";
    if (!form.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    // TODO: Send to backend API
    setSubmitted(true);
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div style={styles.container}>
      
      {/* Hero Header */}
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>📞 Contact Us</h1>
        <p style={styles.heroSubtitle}>
          Have questions, feedback, or need help? We'd love to hear from you!
        </p>
      </div>

      <div style={styles.contentWrapper}>
        
        {/* Contact Form */}
        <div style={styles.formCard}>
          {submitted ? (
            <div style={styles.successBox}>
              <span style={styles.successIcon}>✅</span>
              <h3 style={styles.successTitle}>Message Sent!</h3>
              <p style={styles.successText}>
                Thank you for reaching out. We'll get back to you within 24 hours. 🎉
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Your Name *</label>
                  <input
                    type="text" name="name" placeholder="John Doe"
                    value={form.name} onChange={handleChange}
                    style={{...styles.input, borderColor: errors.name ? "#ef4444" : "#cbd5e1"}}
                  />
                  {errors.name && <span style={styles.errorText}>{errors.name}</span>}
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Email Address *</label>
                  <input
                    type="email" name="email" placeholder="you@example.com"
                    value={form.email} onChange={handleChange}
                    style={{...styles.input, borderColor: errors.email ? "#ef4444" : "#cbd5e1"}}
                  />
                  {errors.email && <span style={styles.errorText}>{errors.email}</span>}
                </div>
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Subject</label>
                <input
                  type="text" name="subject" placeholder="How can we help?"
                  value={form.subject} onChange={handleChange}
                  style={styles.input}
                />
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Message *</label>
                <textarea
                  name="message" placeholder="Tell us more..." rows="5"
                  value={form.message} onChange={handleChange}
                  style={{...styles.textarea, borderColor: errors.message ? "#ef4444" : "#cbd5e1"}}
                />
                {errors.message && <span style={styles.errorText}>{errors.message}</span>}
              </div>
              
              <button type="submit" style={styles.submitBtn}>
                🚀 Send Message
              </button>
            </form>
          )}
        </div>

        {/* Contact Info */}
        <div style={styles.infoCard}>
          <h3 style={styles.infoTitle}>📬 Get in Touch</h3>
          
          <div style={styles.infoItem}>
            <span style={styles.infoIcon}>📧</span>
            <div>
              <strong style={styles.infoLabel}>Email</strong>
              <p style={styles.infoValue}>support@quizapp.com</p>
            </div>
          </div>
          
          <div style={styles.infoItem}>
            <span style={styles.infoIcon}>⏰</span>
            <div>
              <strong style={styles.infoLabel}>Response Time</strong>
              <p style={styles.infoValue}>Within 24 hours</p>
            </div>
          </div>
          
          <div style={styles.infoItem}>
            <span style={styles.infoIcon}>🌍</span>
            <div>
              <strong style={styles.infoLabel}>Location</strong>
              <p style={styles.infoValue}>Global — Learn from anywhere! 🌏</p>
            </div>
          </div>

          {/* FAQ Preview */}
          <div style={styles.faqPreview}>
            <h4 style={styles.faqTitle}>❓ Quick FAQ</h4>
            <details style={styles.faqItem}>
              <summary style={styles.faqQuestion}>How do I reset my password?</summary>
              <p style={styles.faqAnswer}>Click "Forgot Password" on the login page and follow the instructions.</p>
            </details>
            <details style={styles.faqItem}>
              <summary style={styles.faqQuestion}>Can I retake a quiz?</summary>
              <p style={styles.faqAnswer}>Yes! You can attempt any quiz as many times as you want.</p>
            </details>
          </div>
        </div>

      </div>
    </div>
  );
}

/* ====================== 🎨 STYLES ====================== */
const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f0f9ff 0%, #dbeafe 40%, #bfdbfe 100%)",
    color: "#1e293b",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: "20px 0"
  },
  
  hero: {
    padding: "50px 40px 30px", textAlign: "center", maxWidth: "700px", margin: "0 auto"
  },
  heroTitle: {
    fontSize: "2rem", fontWeight: "800", color: "#1e3a5f", marginBottom: "12px"
  },
  heroSubtitle: {
    fontSize: "1.05rem", color: "#475569", lineHeight: "1.6"
  },
  
  contentWrapper: {
    display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "30px", maxWidth: "1100px", margin: "0 auto", padding: "0 20px 40px"
  },
  
  formCard: {
    background: "#ffffff", padding: "30px", borderRadius: "16px",
    border: "1px solid #e2e8f0", boxShadow: "0 6px 20px rgba(59,130,246,0.1)"
  },
  
  form: { display: "flex", flexDirection: "column", gap: "18px" },
  formRow: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" },
  formGroup: { display: "flex", flexDirection: "column", gap: "6px" },
  
  label: { fontSize: "0.85rem", fontWeight: "500", color: "#334155" },
  input: {
    padding: "12px 14px", borderRadius: "10px", border: "1px solid #cbd5e1",
    background: "#fff", color: "#1e293b", fontSize: "0.95rem", outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s"
  },
  textarea: {
    ...styles.input, resize: "vertical", minHeight: "120px", fontFamily: "inherit"
  },
  errorText: { fontSize: "0.8rem", color: "#ef4444", marginTop: "2px" },
  
  submitBtn: {
    padding: "14px 28px", background: "linear-gradient(135deg, #2563eb, #3b82f6)",
    color: "#fff", border: "none", borderRadius: "50px", fontSize: "1rem",
    fontWeight: "600", cursor: "pointer", marginTop: "8px",
    boxShadow: "0 6px 20px rgba(37,99,235,0.35)", transition: "transform 0.2s ease"
  },
  
  successBox: { textAlign: "center", padding: "20px 10px" },
  successIcon: { fontSize: "3rem", display: "block", marginBottom: "12px" },
  successTitle: { fontSize: "1.3rem", fontWeight: "700", color: "#1e3a5f", marginBottom: "8px" },
  successText: { color: "#475569", lineHeight: "1.5" },
  
  infoCard: {
    background: "#ffffff", padding: "30px", borderRadius: "16px",
    border: "1px solid #e2e8f0", boxShadow: "0 6px 20px rgba(59,130,246,0.1)",
    height: "fit-content"
  },
  infoTitle: {
    fontSize: "1.3rem", fontWeight: "700", color: "#1e3a5f",
    marginBottom: "24px", paddingBottom: "16px", borderBottom: "1px solid #e2e8f0"
  },
  infoItem: {
    display: "flex", gap: "14px", alignItems: "flex-start", marginBottom: "20px"
  },
  infoIcon: { fontSize: "1.4rem" },
  infoLabel: { display: "block", fontSize: "0.9rem", fontWeight: "600", color: "#1e3a5f" },
  infoValue: { fontSize: "0.9rem", color: "#64748b", margin: "4px 0 0", lineHeight: "1.4" },
  
  faqPreview: {
    marginTop: "24px", paddingTop: "20px", borderTop: "1px solid #e2e8f0"
  },
  faqTitle: { fontSize: "1rem", fontWeight: "600", color: "#1e3a5f", marginBottom: "14px" },
  faqItem: { marginBottom: "12px" },
  faqQuestion: {
    fontSize: "0.9rem", fontWeight: "500", color: "#334155", cursor: "pointer",
    padding: "8px 0", borderBottom: "1px dashed #e2e8f0"
  },
  faqAnswer: {
    fontSize: "0.85rem", color: "#64748b", padding: "10px 0 0 12px", lineHeight: "1.5"
  }
};

/* ====================== HOVER & FOCUS EFFECTS ====================== */
const addInteractions = () => {
  if (typeof document !== "undefined") {
    const style = document.createElement("style");
    style.textContent = `
      input:focus, textarea:focus {
        border-color: #2563eb !important;
        box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15) !important;
      }
      button[style*="submitBtn"]:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 30px rgba(37, 99, 235, 0.5) !important;
      }
      summary[style*="faqQuestion"]:hover {
        color: #2563eb !important;
      }
      @media (max-width: 768px) {
        div[style*="formRow"] { grid-template-columns: 1fr !important; }
      }
    `;
    document.head.appendChild(style);
  }
};
addInteractions();