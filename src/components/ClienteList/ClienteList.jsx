import React from "react";

export default function ClienteList({ clientes, loading, onSelect }) {
  if (loading) {
    return (
      <div style={styles.loading}>
        Cargando...
      </div>
    );
  }

  if (!clientes || clientes.length === 0) {
    return (
      <p style={styles.empty}>
        No hay resultados
      </p>
    );
  }

  return (
    <div style={styles.dropdown}>
      {clientes.map((cliente) => (
        <div
          key={cliente.id}
          style={styles.item}
          onClick={() => onSelect && onSelect(cliente)}
        >
          <span style={styles.name}>{cliente.nombre}</span>

          <span
            style={{
              ...styles.badge,
              backgroundColor:
                cliente.tipo_cliente === "frecuente"
                  ? "#065f46"
                  : "#f59e0b",
            }}
          >
            {cliente.tipo_cliente}
          </span>
        </div>
      ))}
    </div>
  );
}

const styles = {
  dropdown: {
    width: "100%",
    backgroundColor: "#1e293b",
    borderRadius: "10px",
    border: "1px solid #334155",
    boxShadow: "0 10px 25px rgba(0,0,0,0.6)",
    maxHeight: "220px",
    overflowY: "auto",
  },

  item: {
    padding: "12px",
    borderBottom: "1px solid #334155",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
  },

  name: {
    fontSize: "14px",
    color: "#f1f5f9",
  },

  badge: {
    fontSize: "12px",
    color: "white",
    padding: "4px 8px",
    borderRadius: "6px",
    textTransform: "capitalize",
  },

  loading: {
    padding: "10px",
    fontSize: "14px",
    color: "#94a3b8",
  },

  empty: {
    color: "#94a3b8",
    textAlign: "center",
  },
};