// src/pages/admin/QuizForm.jsx
import { useState, useEffect } from "react"
import { useNavigate, useParams, Link } from "react-router-dom"

export default function QuizForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = !!id

  const [loading, setLoading] = useState(isEdit)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [form, setForm] = useState({
    title: "", subject: "mixed", description: "", timeLimit: 30,
    passingScore: 60, status: "draft",
    questions: [{ question: "", options: ["", "", "", ""], correctAnswer: 0, explanation: "" }]
  })

  useEffect(() => {
    if (isEdit) {
      const quizzes = JSON.parse(localStorage.getItem("quizzes") || "[]")
      const quiz = quizzes.find(q => q.id === id || q._id === id)
      if (quiz) setForm(quiz)
      setLoading(false)
    }
  }, [id, isEdit])

  const handleChange = (e) => {
    const { name, value, type } = e.target
    setForm(prev => ({ ...prev, [name]: type === "number" ? Number(value) : value }))
  }

  const handleQuestionChange = (qIndex, field, value) => {
    const newQuestions = [...form.questions]
    newQuestions[qIndex] = { ...newQuestions[qIndex], [field]: value }
    setForm(prev => ({ ...prev, questions: newQuestions }))
  }

  const handleOptionChange = (qIndex, oIndex, value) => {
    const newQuestions = [...form.questions]
    newQuestions[qIndex].options[oIndex] = value
    setForm(prev => ({ ...prev, questions: newQuestions }))
  }

  const addQuestion = () => {
    setForm(prev => ({
      ...prev,
      questions: [...prev.questions, { question: "", options: ["", "", "", ""], correctAnswer: 0, explanation: "" }]
    }))
  }

  const removeQuestion = (qIndex) => {
    if (form.questions.length <= 1) return alert("At least one question required")
    setForm(prev => ({ ...prev, questions: prev.questions.filter((_, i) => i !== qIndex) }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSaving(true)
    if (!form.title.trim()) { setError("Title is required"); setSaving(false); return }
    if (form.questions.some(q => !q.question.trim() || q.options.some(o => !o.trim()))) {
      setError("Please fill all questions and options"); setSaving(false); return
    }
    try {
      const quizzes = JSON.parse(localStorage.getItem("quizzes") || "[]")
      const quizData = { ...form, id: isEdit ? id : Date.now().toString(), _id: isEdit ? id : Date.now().toString() }
      if (isEdit) {
        const index = quizzes.findIndex(q => q.id === id || q._id === id)
        if (index !== -1) quizzes[index] = quizData
      } else { quizzes.push(quizData) }
      localStorage.setItem("quizzes", JSON.stringify(quizzes))
      alert(`✅ Quiz ${isEdit ? "updated" : "created"} successfully!`)
      navigate("/admin/quizzes")
    } catch (err) { setError("Something went wrong") }
    finally { setSaving(false) }
  }

  if (loading) return <div style={styles.loading}>Loading quiz...</div>

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>{isEdit ? "✏️ Edit Quiz" : "➕ Create Quiz"}</h1>
        <Link to="/admin/quizzes" style={styles.backBtn}>← Back to Quizzes</Link>
      </div>
      {error && <div style={styles.error}>❌ {error}</div>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>📋 Quiz Information</h3>
          <div style={styles.formGroup}>
            <label style={styles.label}>Quiz Title *</label>
            <input type="text" name="title" value={form.title} onChange={handleChange} style={styles.input} required placeholder="e.g., Python Basics" />
          </div>
          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Subject</label>
              <select name="subject" value={form.subject} onChange={handleChange} style={styles.select}>
                <option value="os">Operating System</option><option value="python">Python</option>
                <option value="networks">Computer Networks</option><option value="dsa">Data Structures</option>
                <option value="fullstack">Full Stack Dev</option><option value="mixed">Mixed Practice</option>
              </select>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Status</label>
              <select name="status" value={form.status} onChange={handleChange} style={styles.select}>
                <option value="draft">🟡 Draft</option><option value="active">🟢 Active</option>
              </select>
            </div>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} style={styles.textarea} rows="3" placeholder="Brief description..." />
          </div>
          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Time Limit (min)</label>
              <input type="number" name="timeLimit" value={form.timeLimit} onChange={handleChange} style={styles.input} min="5" max="120" />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Passing Score (%)</label>
              <input type="number" name="passingScore" value={form.passingScore} onChange={handleChange} style={styles.input} min="40" max="100" />
            </div>
          </div>
        </div>
        <div style={styles.section}>
          <div style={styles.questionsHeader}>
            <h3 style={styles.sectionTitle}>❓ Questions ({form.questions.length})</h3>
            <button type="button" onClick={addQuestion} style={styles.addBtn}>➕ Add Question</button>
          </div>
          {form.questions.map((q, qIndex) => (
            <div key={qIndex} style={styles.questionCard}>
              <div style={styles.questionHeader}>
                <span style={styles.questionNumber}>Question {qIndex + 1}</span>
                {form.questions.length > 1 && <button type="button" onClick={() => removeQuestion(qIndex)} style={styles.removeBtn}>🗑️ Remove</button>}
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Question Text *</label>
                <input type="text" value={q.question} onChange={(e) => handleQuestionChange(qIndex, "question", e.target.value)} style={styles.input} required placeholder="Enter your question..." />
              </div>
              <div style={styles.optionsGrid}>
                {q.options.map((opt, oIndex) => (
                  <div key={oIndex} style={styles.optionRow}>
                    <input type="radio" name={`correct-${qIndex}`} checked={q.correctAnswer === oIndex} onChange={() => handleQuestionChange(qIndex, "correctAnswer", oIndex)} style={styles.radio} />
                    <input type="text" value={opt} onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)} style={{...styles.input, flex: 1}} placeholder={`Option ${oIndex + 1} *`} required />
                  </div>
                ))}
              </div>
              <p style={styles.hint}>🔘 Select the correct answer</p>
              <div style={styles.formGroup}>
                <label style={styles.label}>Explanation (Optional)</label>
                <textarea value={q.explanation} onChange={(e) => handleQuestionChange(qIndex, "explanation", e.target.value)} style={styles.textarea} rows="2" placeholder="Explain why this answer is correct..." />
              </div>
            </div>
          ))}
        </div>
        <div style={styles.actions}>
          <button type="submit" disabled={saving} style={styles.submitBtn}>{saving ? "Saving..." : isEdit ? "💾 Update Quiz" : "🚀 Create Quiz"}</button>
          <Link to="/admin/quizzes" style={styles.cancelBtn}>Cancel</Link>
        </div>
      </form>
    </div>
  )
}

const styles = {
  container: { padding: "20px", maxWidth: "900px", margin: "0 auto" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "10px" },
  title: { fontSize: "1.6rem", fontWeight: "700", color: "#1e3a5f", margin: 0 },
  backBtn: { padding: "8px 18px", background: "#fff", border: "1px solid #cbd5e1", borderRadius: "8px", color: "#334155", textDecoration: "none", fontSize: "0.9rem" },
  error: { padding: "12px", background: "#fef2f2", color: "#dc2626", borderRadius: "8px", marginBottom: "20px" },
  loading: { padding: "40px", textAlign: "center", color: "#64748b" },
  form: { display: "flex", flexDirection: "column", gap: "24px" },
  section: { background: "#fff", padding: "20px", borderRadius: "14px", border: "1px solid #e2e8f0" },
  sectionTitle: { fontSize: "1.1rem", fontWeight: "600", color: "#1e3a5f", marginBottom: "16px" },
  formGroup: { marginBottom: "14px" },
  formRow: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" },
  label: { display: "block", fontSize: "0.9rem", fontWeight: "500", color: "#334155", marginBottom: "6px" },
  input: { width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.95rem", outline: "none" },
  select: { width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.95rem", background: "#fff" },
  textarea: { width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.95rem", outline: "none", resize: "vertical", fontFamily: "inherit" },
  questionsHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" },
  addBtn: { padding: "8px 16px", background: "#10b981", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "500" },
  questionCard: { padding: "16px", background: "#f8fafc", borderRadius: "10px", border: "1px solid #e2e8f0", marginBottom: "16px" },
  questionHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" },
  questionNumber: { fontWeight: "600", color: "#1e3a5f" },
  removeBtn: { padding: "4px 10px", background: "#ef4444", color: "#fff", border: "none", borderRadius: "6px", fontSize: "0.8rem", cursor: "pointer" },
  optionsGrid: { display: "flex", flexDirection: "column", gap: "8px", marginBottom: "8px" },
  optionRow: { display: "flex", alignItems: "center", gap: "10px" },
  radio: { width: "18px", height: "18px", cursor: "pointer" },
  hint: { fontSize: "0.8rem", color: "#64748b", marginTop: "4px" },
  actions: { display: "flex", gap: "12px", justifyContent: "flex-end", marginTop: "10px" },
  submitBtn: { padding: "12px 28px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "50px", fontSize: "1rem", fontWeight: "600", cursor: "pointer" },
  cancelBtn: { padding: "12px 28px", background: "#fff", color: "#334155", border: "1px solid #cbd5e1", borderRadius: "50px", textDecoration: "none", fontSize: "1rem", fontWeight: "500" }
}