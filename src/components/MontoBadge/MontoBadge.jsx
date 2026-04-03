import React from "react";

export default function MontoBadge({ tipo }) {
  const esDeuda = tipo === "deuda";

  const styles = {
    container: {
      padding: "12px 16px",
      borderRadius: "12px",
      border: `1px solid ${esDeuda ? "#7f1d1d" : "#1e3a8a"}`,
      backgroundColor: esDeuda ? "#991b1b" : "#1e40af",
      display: "flex",
      flexDirection: "column",
      gap: "4px",
      textAlign: "center",
      
    },

    label: {
      fontSize: "14px",
      color: "#cbd5f5",
      opacity: 0.8,
      textTransform: "uppercase",
      letterSpacing: "0.5px",
    },

    value: {
      fontSize: "20px",
      fontWeight: "600",
      color: "#f1f5f9",
    },
  };

  return (
    <div style={styles.container}>
      <span style={styles.label}>Tipo de Monto</span>
      <span style={styles.value}>{esDeuda ? "Deuda" : "Abono"}</span>
    </div>
  );
}