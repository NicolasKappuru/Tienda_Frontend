import React from "react";

export default function MontoLabel({ tipo }) {
  const esDeuda = tipo === "deuda";

  return (
    <div
      style={{
        padding: "5px 18px",
        borderRadius: "12px",
        fontWeight: "bold",
        fontSize: "16px",
        backgroundColor: esDeuda ? "#fee2e2" : "#a5dbf0",
        color: esDeuda ? "#991b1b" : "#0a047c",
        textAlign: "center",
        width: "fit-content",
      }}
    >
      {esDeuda ? "Deuda" : "Abono"}
    </div>
  );
}