// src/pages/AboutPage.jsx
export default function AboutPage() {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>ℹ️ About Quiz Master</h1>
        <p style={styles.text}>
          Welcome to <strong style={{ color: "#2563eb" }}>Quiz Master</strong> — your ultimate destination for fun, 
          educational, and challenging quizzes across multiple categories!
        </p>
        
        <div style={styles.features}>
          {[
            { icon: "🎯", title: "Learn & Grow", desc: "Expand your knowledge with curated questions" },
            { icon: "⚡", title: "Instant Feedback", desc: "Know your results immediately with explanations" },
            { icon: "🏆", title: "Compete & Win", desc: "Climb leaderboards and earn achievements" },
            { icon: "🔄", title: "Always Fresh", desc: "New quizzes added regularly by our admin team" }
          ].map((f, i) => (
            <div key={i} style={styles.featureBox}>
              <span style={styles.featureIcon}>{f.icon}</span>
              <h3 style={styles.featureTitle}>{f.title}</h3>
              <p style={styles.featureDesc}>{f.desc}</p>
            </div>
          ))}
        </div>

        <div style={styles.footer}>
          <p style={styles.footerText}>
            📧 Questions? Contact us at <a href="mailto:support@quizapp.com" style={styles.link}>support@quizapp.com</a>
          </p>
        </div>
      </div>
    </div>
  );
}

/* ====================== 🎨 CLEAN BLUE & WHITE THEME - SMALLER FONTS ====================== */
const styles = {
  // ✅ Container - Soft Light Background
  container: {
    minHeight: "100vh",
    background: "#f8fbff",  // ✅ Soft solid light blue
    color: "#1e293b",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: "30px 15px"  // ✅ Slightly reduced padding
  },
  
  content: { 
    maxWidth: "800px",  // ✅ Slightly narrower for better readability with smaller text
    margin: "0 auto", 
    textAlign: "center" 
  },
  
  title: { 
    fontSize: "1.8rem",  // ✅ Reduced from 2.5rem
    fontWeight: "700", 
    marginBottom: "18px",  // ✅ Reduced margin
    color: "#1e3a5f",
    lineHeight: "1.3"
  },
  
  text: { 
    fontSize: "0.95rem",  // ✅ Reduced from 1.1rem
    color: "#475569",  // ✅ Readable gray
    lineHeight: "1.6", 
    marginBottom: "30px"  // ✅ Reduced margin
  },
  
  features: {
    display: "grid", 
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",  // ✅ Smaller cards
    gap: "15px",  // ✅ Reduced gap
    marginBottom: "35px"  // ✅ Reduced margin
  },
  
  featureBox: {
    background: "#ffffff",  // ✅ Clean white
    padding: "18px 15px",  // ✅ Reduced padding
    borderRadius: "12px",  // ✅ Slightly smaller radius
    border: "1px solid #e2e8f0",  // ✅ Subtle gray border
    boxShadow: "0 3px 10px rgba(0, 0, 0, 0.04)"  // ✅ Softer shadow
  },
  
  featureIcon: { 
    fontSize: "1.6rem",  // ✅ Reduced from 2rem
    marginBottom: "10px", 
    display: "block" 
  },
  
  featureTitle: { 
    fontSize: "0.95rem",  // ✅ Reduced from 1.1rem
    fontWeight: "600", 
    marginBottom: "6px", 
    color: "#1e3a5f",
    lineHeight: "1.3"
  },
  
  featureDesc: { 
    color: "#64748b",  // ✅ Readable gray
    fontSize: "0.85rem",  // ✅ Reduced from 0.95rem
    lineHeight: "1.4"
  },
  
  footer: { 
    padding: "20px 15px",  // ✅ Reduced padding
    borderTop: "1px solid #e2e8f0"  // ✅ Subtle border
  },
  
  footerText: { 
    color: "#64748b", 
    fontSize: "0.9rem",  // ✅ Reduced from 1rem
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
      /* Feature Box Hover */
      div[style*="featureBox"]:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08) !important;
        border-color: #cbd5e1 !important;
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