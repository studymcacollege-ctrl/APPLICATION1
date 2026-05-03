// src/pages/admin/UsersPage.jsx
import { useState } from "react"

export default function UsersPage() {
  // Demo users data
  const [users] = useState([
    { id: "1", name: "Admin User", email: "admin@quizapp.com", role: "admin", joined: "2024-01-01" },
    { id: "2", name: "John Doe", email: "john@test.com", role: "user", joined: "2024-03-15" },
    { id: "3", name: "Jane Smith", email: "jane@test.com", role: "user", joined: "2024-04-20" }
  ])

  const handleDelete = (id) => {
    if (window.confirm("Delete this user?")) {
      alert("✅ User deleted (demo)")
    }
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>👥 Manage Users</h1>
      
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Role</th>
              <th style={styles.th}>Joined</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} style={styles.tr}>
                <td style={styles.td}>{user.name}</td>
                <td style={styles.td}>{user.email}</td>
                <td style={styles.td}>
                  <span style={{...styles.roleBadge, background: user.role === "admin" ? "#2563eb" : "#64748b"}}>
                    {user.role}
                  </span>
                </td>
                <td style={styles.td}>{user.joined}</td>
                <td style={styles.td}>
                  <button onClick={() => handleDelete(user.id)} style={styles.deleteBtn}>🗑️ Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const styles = {
  container: { padding: "20px", maxWidth: "1100px", margin: "0 auto" },
  title: { fontSize: "1.6rem", fontWeight: "700", color: "#1e3a5f", marginBottom: "20px" },
  tableWrapper: { background: "#fff", borderRadius: "14px", border: "1px solid #e2e8f0", overflow: "hidden" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { padding: "14px 16px", textAlign: "left", background: "#f8fafc", fontWeight: "600", color: "#334155", borderBottom: "1px solid #e2e8f0" },
  tr: { borderBottom: "1px solid #e2e8f0" },
  td: { padding: "12px 16px", color: "#334155" },
  roleBadge: { padding: "4px 10px", borderRadius: "12px", color: "#fff", fontSize: "0.8rem", fontWeight: "500" },
  deleteBtn: { padding: "6px 12px", background: "#ef4444", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "0.85rem" }
}