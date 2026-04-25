import { useState, useEffect } from "react";

export default function App() {
  // =========================
  // STATE
  // =========================
  const [users, setUsers] = useState(() => {
    return JSON.parse(localStorage.getItem("users")) || [];
  });

  const [form, setForm] = useState({ name: "", age: "" });
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  // =========================
  // EFFECT (LOCAL STORAGE)
  // =========================
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  // =========================
  // HANDLER
  // =========================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name || !form.age) {
      alert("Isi semua field!");
      return;
    }

    if (editId) {
      setUsers(users.map(u =>
        u.id === editId ? { ...u, ...form } : u
      ));
      setEditId(null);
    } else {
      setUsers([
        ...users,
        { id: Date.now(), ...form }
      ]);
    }

    setForm({ name: "", age: "" });
  };

  const handleEdit = (user) => {
    setForm({ name: user.name, age: user.age });
    setEditId(user.id);
  };

  const handleDelete = (id) => {
    if (confirm("Yakin hapus?")) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  // =========================
  // FILTER
  // =========================
  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  // =========================
  // COMPONENT (REUSE)
  // =========================
  const Card = ({ user }) => (
    <div style={styles.card}>
      <h3>{user.name}</h3>
      <p>Umur: {user.age}</p>
      <button style={styles.edit} onClick={() => handleEdit(user)}>Edit</button>
      <button style={styles.delete} onClick={() => handleDelete(user.id)}>Hapus</button>
    </div>
  );

  // =========================
  // UI
  // =========================
  return (
    <div style={styles.container}>
      <h1>CRUD User (React)</h1>

      {/* SEARCH */}
      <input
        style={styles.input}
        placeholder="Cari nama..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* FORM */}
      <div style={styles.form}>
        <h3>{editId ? "Edit User" : "Tambah User"}</h3>
        <input
          style={styles.input}
          name="name"
          placeholder="Nama"
          value={form.name}
          onChange={handleChange}
        />
        <input
          style={styles.input}
          name="age"
          placeholder="Umur"
          type="number"
          value={form.age}
          onChange={handleChange}
        />
        <button style={styles.add} onClick={handleSubmit}>
          {editId ? "Simpan" : "Tambah"}
        </button>
      </div>

      {/* CARD */}
      <div style={styles.cardContainer}>
        {filteredUsers.map(user => (
          <Card key={user.id} user={user} />
        ))}
      </div>

      {/* LIST */}
      <ul>
        {filteredUsers.map(user => (
          <li key={user.id}>
            {user.name} - {user.age} tahun
          </li>
        ))}
      </ul>
    </div>
  );
}

// =========================
// STYLE (BIAR RAPI)
// =========================
const styles = {
  container: {
    padding: 20,
    fontFamily: "Arial",
    textAlign: "center",
    background: "#f5f5f5",
    minHeight: "100vh"
  },
  form: {
    background: "#fff",
    padding: 15,
    borderRadius: 10,
    maxWidth: 300,
    margin: "10px auto"
  },
  input: {
    width: "100%",
    padding: 8,
    margin: "5px 0"
  },
  add: {
    width: "100%",
    padding: 10,
    background: "green",
    color: "#fff",
    border: "none"
  },
  cardContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "center",
    marginTop: 20
  },
  card: {
    background: "#fff",
    padding: 10,
    borderRadius: 10,
    width: 180
  },
  edit: {
    background: "orange",
    marginRight: 5
  },
  delete: {
    background: "red",
    color: "white"
  }
};
