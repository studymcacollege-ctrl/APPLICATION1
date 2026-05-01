// src/pages/AboutPage.jsx
import { Link } from "react-router-dom";

export default function AboutPage() {
  return (
    <div style={styles.container}>
      
      {/* Hero Header */}
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>ℹ️ About Quiz Master</h1>
        <p style={styles.heroSubtitle}>
          Your ultimate destination for mastering computer science through fun, interactive quizzes!
        </p>
      </div>

      {/* Mission Section */}
      <section style={styles.section}>
        <div style={styles.contentCard}>
          <h2 style={styles.sectionHeading}>🎯 Our Mission</h2>
          <p style={styles.text}>
            At <strong style={{ color: "#2563eb" }}>Quiz Master</strong>, we believe learning should be 
            <strong> engaging, accessible, and fun</strong>. Our platform helps students and professionals 
            master core CS concepts through bite-sized quizzes that fit into your busy schedule.
          </p>
          <p style={styles.text}>
            Whether you're preparing for exams, brushing up for interviews, or just curious about 
            technology — we've got you covered with expertly crafted questions and instant feedback.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>✨ What We Offer</h2>
        <div style={styles.featuresGrid}>
          {[
            { icon: "🎓", title: "Expert Content", desc: "Questions curated by CS educators & industry professionals" },
            { icon: "⚡", title: "Instant Learning", desc: "Get explanations immediately after each answer" },
            { icon: "📊", title: "Progress Tracking", desc: "Watch your skills grow with detailed analytics" },
            { icon: "🔄", title: "Always Updated", desc: "New questions & subjects added regularly" },
            { icon: "📱", title: "Learn Anywhere", desc: "Fully responsive — study on phone, tablet or desktop" },
            { icon: "🏆", title: "Stay Motivated", desc: "Earn badges & compete on leaderboards" },
          ].map((f, i) => (
            <div key={i} style={styles.featureCard}>
              <span style={styles.featureIcon}>{f.icon}</span>
              <h3 style={styles.featureTitle}>{f.title}</h3>
              <p style={styles.featureDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Subjects Preview */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>📚 Subjects We Cover</h2>
        <div style={styles.subjectsGrid}>
          {[
            { emoji: "💻", name: "Operating System", topics: ["Processes", "Memory", "File Systems", "Scheduling"] },
            { emoji: "🐍", name: "Python", topics: ["Syntax", "OOP", "Libraries", "Projects"] },
            { emoji: "🌐", name: "Computer Networks", topics: ["TCP/IP", "HTTP", "Security", "Protocols"] },
            { emoji: "🗂️", name: "Data Structures", topics: ["Arrays", "Trees", "Graphs", "Algorithms"] },
            { emoji: "⚛️", name: "Full Stack", topics: ["React", "Node.js", "MongoDB", "Deployment"] },
          ].map((s, i) => (
            <div key={i} style={styles.subjectCard}>
              <span style={styles.subjectEmoji}>{s.emoji}</span>
              <h3 style={styles.subjectName}>{s.name}</h3>
              <div style={styles.subjectTopics}>
                {s.topics.map((t, j) => (
                  <span key={j} style={styles.topicTag}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section style={styles.ctaSection}>
        <h2 style={styles.ctaTitle}>Ready to Start Learning? 🚀</h2>
        <p style={styles.ctaSubtitle}>Join thousands of learners mastering CS concepts today!</p>
        <Link to="/login?redirect=/quiz" style={styles.ctaButton}>
          Start Your First Quiz →
        </Link>
      </section>

      {/* Footer Info */}
      <footer style={styles.footer}>
        <p style={styles.footerText}>
          📧 Questions? Contact us at{" "}
          <a href="mailto:support@quizapp.com" style={styles.footerLink}>support@quizapp.com</a>
        </p>
      </footer>
      
    </div>
  );
}

/* ====================== 🎨 STYLES ====================== */
const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f0f9ff 0%, #dbeafe 40%, #bfdbfe 100%)",
    color: "#1e293b",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  },
  
  hero: {
    padding: "60px 40px 40px", textAlign: "center", maxWidth: "800px", margin: "0 auto"
  },
  heroTitle: {
    fontSize: "2.2rem", fontWeight: "800", color: "#1e3a5f", marginBottom: "16px"
  },
  heroSubtitle: {
    fontSize: "1.1rem", color: "#475569", lineHeight: "1.6"
  },
  
  section: { padding: "40px 20px", maxWidth: "1200px", margin: "0 auto" },
  sectionTitle: {
    fontSize: "1.6rem", fontWeight: "700", textAlign: "center",
    color: "#1e3a5f", marginBottom: "30px"
  },
  
  contentCard: {
    background: "#ffffff", padding: "30px", borderRadius: "16px",
    border: "1px solid #e2e8f0", boxShadow: "0 4px 15px rgba(59,130,246,0.08)",
    maxWidth: "800px", margin: "0 auto", textAlign: "center"
  },
  sectionHeading: {
    fontSize: "1.4rem", fontWeight: "700", color: "#1e3a5f", marginBottom: "20px"
  },
  text: {
    fontSize: "1rem", color: "#475569", lineHeight: "1.7", marginBottom: "16px"
  },
  
  featuresGrid: {
    display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "20px"
  },
  featureCard: {
    background: "#ffffff", padding: "24px 20px", borderRadius: "14px",
    border: "1px solid #e2e8f0", textAlign: "center",
    boxShadow: "0 3px 12px rgba(0,0,0,0.04)", transition: "transform 0.25s ease"
  },
  featureIcon: { fontSize: "2.2rem", display: "block", marginBottom: "12px" },
  featureTitle: {
    fontSize: "1.1rem", fontWeight: "600", color: "#1e3a5f", marginBottom: "8px"
  },
  featureDesc: { fontSize: "0.9rem", color: "#64748b", lineHeight: "1.5" },
  
  subjectsGrid: {
    display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "18px"
  },
  subjectCard: {
    background: "#ffffff", padding: "22px 18px", borderRadius: "14px",
    border: "1px solid #e2e8f0", textAlign: "center",
    boxShadow: "0 3px 12px rgba(0,0,0,0.04)"
  },
  subjectEmoji: { fontSize: "2rem", display: "block", marginBottom: "10px" },
  subjectName: {
    fontSize: "1rem", fontWeight: "600", color: "#1e3a5f", marginBottom: "12px"
  },
  subjectTopics: { display: "flex", flexWrap: "wrap", gap: "6px", justifyContent: "center" },
  topicTag: {
    fontSize: "0.75rem", color: "#2563eb", background: "#eff6ff",
    padding: "4px 10px", borderRadius: "12px", fontWeight: "500"
  },
  
  ctaSection: {
    padding: "50px 40px", textAlign: "center",
    background: "linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)",
    color: "#fff", marginTop: "20px"
  },
  ctaTitle: { fontSize: "1.6rem", fontWeight: "700", marginBottom: "10px" },
  ctaSubtitle: { fontSize: "1rem", marginBottom: "24px", opacity: 0.95 },
  ctaButton: {
    display: "inline-block", padding: "14px 32px", background: "#fff",
    color: "#2563eb", textDecoration: "none", borderRadius: "50px",
    fontWeight: "600", fontSize: "1rem", boxShadow: "0 6px 20px rgba(0,0,0,0.15)"
  },
  
  footer: {
    padding: "30px 20px", textAlign: "center", color: "#64748b", fontSize: "0.9rem"
  },
  footerLink: { color: "#2563eb", textDecoration: "none", fontWeight: "500" }
};

/* ====================== HOVER EFFECTS ====================== */
const addHoverEffects = () => {
  if (typeof document !== "undefined") {
    const style = document.createElement("style");
    style.textContent = `
      div[style*="featureCard"]:hover {
        transform: translateY(-4px);
        box-shadow: 0 10px 25px rgba(59,130,246,0.15) !important;
        border-color: #60a5fa !important;
      }
      a[style*="ctaButton"]:hover {
        transform: translateY(-3px);
        box-shadow: 0 10px 30px rgba(0,0,0,0.25) !important;
      }
      a[style*="footerLink"]:hover { text-decoration: underline !important; }
    `;
    document.head.appendChild(style);
  }
};
addHoverEffects();