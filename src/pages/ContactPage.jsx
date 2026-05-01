// src/pages/ContactPage.jsx
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Connect to backend API
    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>📞 Contact Us</h1>
        <p style={styles.subtitle}>Have questions? We'd love to hear from you!</p>

        {submitted && (
          <div style={styles.successMsg}>
            ✅ Message sent successfully! We'll reply soon.
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text" name="name" placeholder="Your Name *" required
            value={form.name} onChange={handleChange}
            style={styles.input}
          />
          <input
            type="email" name="email" placeholder="Your Email *" required
            value={form.email} onChange={handleChange}
            style={styles.input}
          />
          <textarea
            name="message" placeholder="Your Message *" required rows="5"
            value={form.message} onChange={handleChange}
            style={styles.textarea}
          />
          <button type="submit" style={styles.submitBtn}>🚀 Send Message</button>
        </form>

        <div style={styles.info}>
          <p style={styles.infoItem}>
            📧 <strong>Email:</strong> <a href="mailto:support@quizapp.com" style={styles.link}>support@quizapp.com</a>
          </p>
          <p style={styles.infoItem}>🕐 <strong>Response Time:</strong> Within 24 hours</p>
          <p style={styles.infoItem}>🌍 <strong>Location:</strong> Global 🌏</p>
        </div>
      </div>
    </div>
  );
}

/* ====================== 🎨 CLEAN BLUE & WHITE THEME ====================== */
const styles = {
  // ✅ Container - Soft Light Background
  container: {
    minHeight: "100vh",
    background: "#f8fbff",  // ✅ Soft solid light blue
    color: "#1e293b",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: "40px 20px"
  },
  
  content: { 
    maxWidth: "600px", 
    margin: "0 auto" 
  },
  
  title: { 
    fontSize: "2.5rem", 
    fontWeight: "700", 
    marginBottom: "10px", 
    textAlign: "center",
    color: "#1e3a5f"  // ✅ Clear dark blue
  },
  
  subtitle: { 
    textAlign: "center", 
    color: "#64748b",  // ✅ Readable gray
    marginBottom: "40px", 
    fontSize: "1.1rem" 
  },
  
  successMsg: {
    // ✅ Soft green success message
    background: "#dcfce7",
    color: "#166534",
    border: "1px solid #86efac",
    padding: "12px 20px", 
    borderRadius: "10px", 
    marginBottom: "25px", 
    textAlign: "center",
    fontWeight: "500"
  },
  
  form: { 
    display: "flex", 
    flexDirection: "column", 
    gap: "15px", 
    marginBottom: "40px" 
  },
  
  input: {
    // ✅ Clean white input with subtle border
    padding: "14px 18px", 
    borderRadius: "10px", 
    border: "1px solid #cbd5e1",
    background: "#ffffff", 
    color: "#1e293b",  // ✅ Dark text for readability
    fontSize: "1rem",
    outline: "none", 
    transition: "border-color 0.2s, box-shadow 0.2s"
  },
  
  textarea: {
    // ✅ Clean white textarea
    padding: "14px 18px", 
    borderRadius: "10px", 
    border: "1px solid #cbd5e1",
    background: "#ffffff", 
    color: "#1e293b",
    fontSize: "1rem",
    outline: "none", 
    resize: "vertical", 
    fontFamily: "inherit",
    minHeight: "120px"
  },
  
  submitBtn: {
    // ✅ Solid blue button (no gradient)
    padding: "14px 28px", 
    background: "#2563eb",
    color: "#fff", 
    border: "none", 
    borderRadius: "50px", 
    fontSize: "1rem", 
    fontWeight: "600",
    cursor: "pointer", 
    transition: "background 0.25s ease, transform 0.2s ease",
    marginTop: "10px"
  },
  
  info: {
    // ✅ Clean white info box
    background: "#ffffff", 
    padding: "25px",
    borderRadius: "16px", 
    border: "1px solid #e2e8f0",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.04)"
  },
  
  infoItem: { 
    color: "#475569",  // ✅ Readable dark gray
    marginBottom: "10px", 
    fontSize: "1rem",
    lineHeight: "1.5"
  },
  
  link: {
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: "500"
  }
};

/* ====================== 🎨 SIMPLE HOVER EFFECTS ====================== */
const addHoverEffects = () => {
  if (typeof document !== "undefined") {
    const style = document.createElement("style");
    style.textContent = `
      /* Input Focus */
      input:focus, textarea:focus {
        border-color: #2563eb !important;
        box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15) !important;
      }
      
      /* Submit Button Hover */
      button[style*="submitBtn"]:hover {
        background: #1d4ed8 !important;
        transform: translateY(-2px);
      }
      
      /* Info Box Hover */
      div[style*="info"]:hover {
        border-color: #cbd5e1 !important;
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08) !important;
      }
      
      /* Link Hover */
      a[style*="link"]:hover {
        text-decoration: underline !important;
      }
    `;
    document.head.appendChild(style);
  }
};
addHoverEffects();