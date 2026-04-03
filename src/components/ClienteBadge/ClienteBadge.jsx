import React from "react";

export default function ClienteBadge({ nombre, tipo }) {
  const esFrecuente = tipo === "frecuente";

  const styles = {
    container: {
      padding: "12px 16px",
      borderRadius: "12px",
      border: `1px solid ${esFrecuente ? "#065f46" : "#92400e"}`,
      backgroundColor: esFrecuente ? "#064e3b" : "#78350f", // tonos más profundos
      display: "flex",
      flexDirection: "column",
      gap: "4px",
    },

    label: {
      fontSize: "18px",
      color: "#cbd5f5",
      opacity: 0.8,
      textTransform: "uppercase",
      letterSpacing: "0.5px",
    },

    name: {
      fontSize: "25px",
      fontWeight: "600",
      color: "#f1f5f9",
    },
  };

  return (
    <div style={styles.container}>
      <span style={styles.label}>
        {esFrecuente ? "Cliente Frecuente" : "Cliente Invitado"}
      </span>
      <span style={styles.name}>{nombre}</span>
    </div>
  );
}