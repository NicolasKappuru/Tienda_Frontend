import React from "react";
import MontoLabel from "../MontoLabel/MontoLabel";

export default function MontoList({ montos, onSelectMonto }) {
  if (!montos || montos.length === 0) {
    return (
      <p style={{ color: "#94a3b8", textAlign: "center" }}>
        No hay montos registrados
      </p>
    );
  }

  
  return (
    <div style={styles.container}>
      {montos.map((monto) => (
        <div
          key={monto.id_monto}
          style={styles.item}
          onClick={() => onSelectMonto(monto)}
        >
          <div style={styles.left}>
          <p style={styles.valor}> ${formatCurrency(monto.valor)} </p>
          <p style={styles.fecha}>{monto.fecha}</p>
          </div>

          <MontoLabel tipo={monto.tipo_monto} valor={monto.valor} />
        </div>
      ))}
    </div>
  );
}

const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-CO").format(value);
  };

const styles = {
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    maxHeight: "300px", 
    overflowY: "auto",  
    paddingRight: "5px",
  },

  item: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px",
    borderRadius: "12px",
    backgroundColor: "#0f172a",
    border: "1px solid #334155",
    cursor: "pointer",
    transition: "background 0.2s",
  },

  left: {
    display: "flex",
    flexDirection: "column",
  },

  valor: {
  margin: 0,
  fontWeight: "600",
  fontSize: "16px",
  color: "#f1f5f9",
  },

  fecha: {
    margin: 0,
    fontSize: "12px",
    color: "#94a3b8",
  },
};