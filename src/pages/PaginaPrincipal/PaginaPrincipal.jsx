import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ClienteListSelect from "../../components/ClienteListSelect/ClienteListSelect";

export default function PaginaPrincipal() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Tienda Erick</h1>

        <div style={styles.searchContainer}>
          <input
            type="text"
            placeholder="Buscar cliente..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.input}
          />

          {search &&  <ClienteListSelect searchTerm={search} />}
        </div>

        <button
          style={styles.button}
          onClick={() => navigate("/crear-cliente")}
        >
          + Crear cliente
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "90vh",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: "10px",
    backgroundColor: "#020617", // fondo oscuro
    padding: "40px 20px",
  },

  card: {
    width: "100%",
    maxWidth: "600px",
    minHeight: "70vh",
    backgroundColor: "#1e293b",
    borderRadius: "16px",
    padding: "24px",
    border: "1px solid #334155",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },

  title: {
    fontSize: "22px",
    fontWeight: "600",
    textAlign: "center",
    color: "#f9fafb", // texto claro
  },

  searchContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  input: {
    padding: "12px",
    fontSize: "16px",
    borderRadius: "10px",
    border: "1px solid #374151",
    outline: "none",
    backgroundColor: "#0f172a",// input oscuro
    color: "#f9fafb",
    transition: "0.2s",
    border: "1px solid #475569",

  },

  button: {
    padding: "12px",
    fontSize: "16px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#4f46e5", // azul principal
    color: "white",
    fontWeight: "500",
  },
};