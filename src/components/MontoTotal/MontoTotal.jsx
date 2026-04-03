import React from "react";

export default function MontoTotal({ valor }) {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-CO").format(value);
  };

  const styles = {
    container: {
      width: "100%",
      padding: "12px 16px",
      borderRadius: "12px",
      backgroundColor: "#0f172a",
      border: "1px solid #334155",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxSizing: "border-box",
    },

    label: {
      color: "#94a3b8",
      fontSize: "14px",
    },

    value: {
      color: "#f1f5f9",
      fontSize: "18px",
      fontWeight: "600",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      maxWidth: "60%",
    },
  };

  return (
    <div style={styles.container}>
      <span style={styles.label}>Total</span>
      <span style={styles.value}>${formatCurrency(valor || 0)}</span>
    </div>
  );
}