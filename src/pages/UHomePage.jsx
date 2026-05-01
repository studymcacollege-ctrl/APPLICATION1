// src/pages/HomePage.jsx
import { Link } from "react-router-dom";

export default function HomePage() {
  
  // ✅ Helper: Create login URL with redirect parameter
  const getLoginUrl = (quizPath, subject) => {
    const redirect = encodeURIComponent(`${quizPath}?subject=${subject}`);
    return `/login?redirect=${redirect}`;
  };

  return (
    <div style={styles.container}>
      
      {/* ===== ✨ HERO SECTION - Attractive ===== */}
      <section style={styles.hero}>
        {/* Decorative Elements */}
        <div style={styles.heroDecoration}>
          <span style={styles.floatingIcon}>🎯</span>
          <span style={styles.floatingIcon2}>⭐</span>
          <span style={styles.floatingIcon3}>🏆</span>
        </div>
        
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>
            🎯 Master Your Knowledge with <span style={styles.highlight}>Quiz Master</span>
          </h1>
          <p style={styles.heroSubtitle}>
            Challenge yourself with interactive quizzes on Operating Systems, Python, 
            Networks, DSA & Full Stack Development. Learn, compete & grow! 🚀
          </p>
          <div style={styles.ctaGroup}>
            <Link to={getLoginUrl("/quiz", "mixed")} style={styles.primaryBtn}>
              🚀 Start Quiz Now
            </Link>
            <Link to="/login?redirect=/scores" style={styles.secondaryBtn}>
              🏆 View Leaderboard
            </Link>
          </div>
          
          {/* Stats */}
          <div style={styles.heroStats}>
            <div style={styles.statItem}>
              <span style={styles.statNumber}>500+</span>
              <span style={styles.statLabel}>Questions</span>
            </div>
            <div style={styles.statItem}>
              <span style={styles.statNumber}>6</span>
              <span style={styles.statLabel}>Subjects</span>
            </div>
            <div style={styles.statItem}>
              <span style={styles.statNumber}>∞</span>
              <span style={styles.statLabel}>Fun</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ✨ FEATURES SECTION ===== */}
      <section style={styles.features}>
        <h2 style={styles.sectionTitle}>✨ Why Choose Quiz Master?</h2>
        <div style={styles.featuresGrid}>
          {[
            { icon: "⚡", title: "Instant Feedback", desc: "Know your results immediately with detailed explanations" },
            { icon: "📚", title: "CS Fundamentals", desc: "Master OS, Networks, DSA & core computer science topics" },
            { icon: "🐍", title: "Hands-on Practice", desc: "Python, JavaScript & Full Stack coding challenges" },
            { icon: "🏆", title: "Track Progress", desc: "Monitor improvement with personal stats & achievements" },
          ].map((feature, index) => (
            <div key={index} style={styles.featureCard}>
              <div style={styles.featureIcon}>{feature.icon}</div>
              <h3 style={styles.featureTitle}>{feature.title}</h3>
              <p style={styles.featureDesc}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== ✨ SUBJECTS SECTION ===== */}
      <section style={styles.categories}>
        <h2 style={styles.sectionTitle}>📚 Explore Subjects</h2>
        <p style={styles.categoriesSubtitle}>Pick a topic and start learning today!</p>
        
        <div style={styles.categoriesGrid}>
          {[
            { id: "os", emoji: "💻", name: "Operating System", count: 120, desc: "Processes • Memory • File Systems" },
            { id: "python", emoji: "🐍", name: "Python", count: 200, desc: "Syntax • OOP • Libraries • Projects" },
            { id: "networks", emoji: "🌐", name: "Computer Networks", count: 95, desc: "TCP/IP • HTTP • Security • Protocols" },
            { id: "dsa", emoji: "🗂️", name: "Data Structures", count: 180, desc: "Arrays • Trees • Graphs • Algorithms" },
            { id: "fullstack", emoji: "⚛️", name: "Full Stack Dev", count: 150, desc: "React • Node • MongoDB • Deployment" },
            { id: "mixed", emoji: "🎯", name: "Mixed Practice", count: 250, desc: "Random questions from all subjects" },
          ].map((cat) => (
            <Link
              key={cat.id}
              to={getLoginUrl("/quiz", cat.id)}
              style={styles.categoryCard}
            >
              <div style={styles.categoryEmoji}>{cat.emoji}</div>
              <div style={styles.categoryName}>{cat.name}</div>
              <div style={styles.categoryDesc}>{cat.desc}</div>
              <div style={styles.categoryCount}>{cat.count} Questions</div>
              <div style={styles.categoryArrow}>→</div>
            </Link>
          ))}
        </div>
      </section>
      
      {/* ===== ✨ CTA SECTION ===== */}
      <section style={styles.ctaSection}>
        <h2 style={styles.ctaTitle}>Ready to Level Up Your Skills? 🚀</h2>
        <p style={styles.ctaSubtitle}>Join thousands of learners mastering CS concepts through fun quizzes!</p>
        <Link to={getLoginUrl("/quiz", "mixed")} style={styles.ctaButton}>
          Start Learning Now →
        </Link>
      </section>
      
    </div>
  );
}

/* ====================== 🎨 ATTRACTIVE BLUE & WHITE THEME ====================== */
const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f0f9ff 0%, #dbeafe 40%, #bfdbfe 100%)",
    color: "#1e293b",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    overflow: "hidden"
  },
  
  // Hero Section
  hero: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "85vh",
    padding: "60px 40px",
    textAlign: "center",
    overflow: "hidden"
  },
  heroDecoration: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    pointerEvents: "none",
    zIndex: 0
  },
  floatingIcon: {
    position: "absolute", fontSize: "4rem", opacity: 0.15,
    top: "10%", left: "10%", animation: "float 6s ease-in-out infinite"
  },
  floatingIcon2: {
    position: "absolute", fontSize: "3rem", opacity: 0.1,
    top: "20%", right: "15%", animation: "float 5s ease-in-out infinite reverse"
  },
  floatingIcon3: {
    position: "absolute", fontSize: "3.5rem", opacity: 0.12,
    bottom: "15%", left: "20%", animation: "float 7s ease-in-out infinite"
  },
  heroContent: {
    maxWidth: "800px", position: "relative", zIndex: 1
  },
  heroTitle: {
    fontSize: "3rem", fontWeight: "800", marginBottom: "24px",
    lineHeight: "1.2", color: "#1e3a5f"
  },
  highlight: {
    color: "#2563eb", fontWeight: "800",
    background: "linear-gradient(135deg, #2563eb, #60a5fa)",
    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
  },
  heroSubtitle: {
    fontSize: "1.15rem", color: "#475569", marginBottom: "32px",
    lineHeight: "1.6", maxWidth: "650px", margin: "0 auto 32px"
  },
  ctaGroup: {
    display: "flex", gap: "16px", justifyContent: "center",
    flexWrap: "wrap", marginBottom: "40px"
  },
  primaryBtn: {
    padding: "14px 32px", background: "linear-gradient(135deg, #2563eb, #3b82f6)",
    color: "#fff", textDecoration: "none", borderRadius: "50px",
    fontWeight: "600", fontSize: "1.05rem",
    boxShadow: "0 8px 25px rgba(37, 99, 235, 0.4)",
    transition: "all 0.3s ease"
  },
  secondaryBtn: {
    padding: "14px 32px", background: "transparent", color: "#2563eb",
    textDecoration: "none", borderRadius: "50px", fontWeight: "600",
    fontSize: "1.05rem", border: "2px solid #2563eb",
    transition: "all 0.3s ease"
  },
  heroStats: {
    display: "flex", justifyContent: "center", gap: "40px",
    flexWrap: "wrap", paddingTop: "20px", borderTop: "1px solid #e2e8f0"
  },
  statItem: { display: "flex", flexDirection: "column", alignItems: "center" },
  statNumber: {
    fontSize: "1.8rem", fontWeight: "800", color: "#2563eb", lineHeight: "1"
  },
  statLabel: { fontSize: "0.85rem", color: "#64748b", marginTop: "4px" },
  
  // Features Section
  features: { padding: "80px 40px", maxWidth: "1400px", margin: "0 auto" },
  sectionTitle: {
    fontSize: "2rem", textAlign: "center", marginBottom: "16px",
    color: "#1e3a5f", fontWeight: "700"
  },
  featuresGrid: {
    display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "24px", maxWidth: "1200px", margin: "0 auto"
  },
  featureCard: {
    background: "#ffffff", padding: "28px 24px", borderRadius: "16px",
    textAlign: "center", border: "1px solid #e2e8f0",
    boxShadow: "0 4px 15px rgba(59, 130, 246, 0.08)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease"
  },
  featureIcon: { fontSize: "2.8rem", marginBottom: "14px" },
  featureTitle: {
    fontSize: "1.2rem", fontWeight: "600", marginBottom: "10px", color: "#1e3a5f"
  },
  featureDesc: { color: "#64748b", fontSize: "0.95rem", lineHeight: "1.5" },
  
  // Categories Section
  categories: { padding: "80px 40px", background: "#ffffff" },
  categoriesSubtitle: {
    textAlign: "center", color: "#64748b", fontSize: "1.05rem",
    marginBottom: "40px", maxWidth: "500px", margin: "0 auto 40px"
  },
  categoriesGrid: {
    display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px", maxWidth: "1200px", margin: "0 auto"
  },
  categoryCard: {
    background: "#ffffff", padding: "24px 20px", borderRadius: "16px",
    textDecoration: "none", color: "#1e293b", border: "1px solid #e2e8f0",
    display: "flex", flexDirection: "column", alignItems: "center",
    gap: "10px", transition: "all 0.3s ease", textAlign: "center",
    position: "relative", overflow: "hidden"
  },
  categoryEmoji: { fontSize: "2.5rem", marginBottom: "4px" },
  categoryName: { fontWeight: "600", fontSize: "1rem", color: "#1e3a5f" },
  categoryDesc: { fontSize: "0.8rem", color: "#64748b", lineHeight: "1.3" },
  categoryCount: {
    fontSize: "0.85rem", color: "#2563eb", fontWeight: "600",
    background: "#eff6ff", padding: "4px 12px", borderRadius: "20px"
  },
  categoryArrow: {
    position: "absolute", bottom: "12px", right: "16px",
    fontSize: "1.2rem", color: "#93c5fd", transition: "transform 0.2s"
  },
  
  // CTA Section
  ctaSection: {
    padding: "60px 40px", textAlign: "center",
    background: "linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)",
    color: "#fff"
  },
  ctaTitle: { fontSize: "1.8rem", fontWeight: "700", marginBottom: "12px" },
  ctaSubtitle: { fontSize: "1.05rem", marginBottom: "28px", opacity: 0.95 },
  ctaButton: {
    display: "inline-block", padding: "14px 36px",
    background: "#fff", color: "#2563eb", textDecoration: "none",
    borderRadius: "50px", fontWeight: "600", fontSize: "1.05rem",
    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
    transition: "transform 0.2s ease"
  }
};

/* ====================== 🎨 ANIMATIONS + HOVER EFFECTS ====================== */
const addInteractions = () => {
  if (typeof document !== "undefined") {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(5deg); }
      }
      a[style*="primaryBtn"]:hover {
        transform: translateY(-3px);
        box-shadow: 0 12px 35px rgba(37, 99, 235, 0.6) !important;
      }
      a[style*="secondaryBtn"]:hover {
        background: #eff6ff !important;
        transform: translateY(-2px);
      }
      div[style*="featureCard"]:hover {
        transform: translateY(-5px);
        box-shadow: 0 12px 35px rgba(59, 130, 246, 0.15) !important;
        border-color: #60a5fa !important;
      }
      a[style*="categoryCard"]:hover {
        transform: translateY(-4px);
        box-shadow: 0 10px 30px rgba(59, 130, 246, 0.12) !important;
        border-color: #60a5fa !important;
      }
      a[style*="categoryCard"]:hover [style*="categoryArrow"] {
        transform: translateX(4px);
        color: #2563eb !important;
      }
      a[style*="ctaButton"]:hover {
        transform: translateY(-3px);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25) !important;
      }
    `;
    document.head.appendChild(style);
  }
};
addInteractions();