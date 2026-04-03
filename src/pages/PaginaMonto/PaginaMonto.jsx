import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MontoBadge from "../../components/MontoBadge/MontoBadge";

export default function PaginaMonto() {
  const location = useLocation();
  const navigate = useNavigate();

  const { cliente_id, tipo } = location.state || {};

  const [valor, setValor] = useState("");
  const [descripcion, setDescripcion] = useState("");

  if (!cliente_id || !tipo) {
    return <p>Error: datos incompletos</p>;
  }

  const tipoLabel = tipo === "deuda" ? "Deuda" : "Abono";

  const handleAceptar = async () => {
    if (!valor) {
      alert("Debes ingresar un valor");
      return;
    }

    let descripcionFinal = descripcion;

    // 🔥 Generar descripción automática para abono
    if (tipo === "abono") {
      const fecha = new Date().toISOString().split("T")[0];
      descripcionFinal = `Abonó ${valor} el ${fecha}`;
    }

    try {
      const fecha = new Date().toISOString().split("T")[0];
      const baseUrl = import.meta.env.VITE_API_BASE_URL;

      const valorNumerico = Number(valor);

      const valorFinal = tipo === "abono" ? -Math.abs(valorNumerico) : valorNumerico;

      await fetch(`${baseUrl}/negocio/agregarMonto`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cliente_id: cliente_id,
          descripcion: descripcionFinal,
          valor: valorFinal, // 👈 aquí ya va transformado
          tipo: tipo,
          fecha: fecha,
          tipo_monto: tipo,
        }),
      });

      // 🔥 volver a página cliente
      navigate(-1);
    } catch (err) {
      console.error(err);
      alert("Error al crear monto");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Nuevo {tipoLabel}</h2>

        {/* Tipo */}
        <MontoBadge tipo={tipo} />

        {/* Valor */}
        <input
          type="number"
          placeholder="Valor"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          style={styles.input}
        />

        {/* Descripción (solo deuda) */}
        {tipo === "deuda" && (
          <textarea
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            style={styles.textarea}
          />
        )}

        {/* Botones */}
        <div style={styles.buttonContainer}>
          <button style={styles.cancel} onClick={() => navigate(-1)}>
            Cancelar
          </button>

          <button style={styles.accept} onClick={handleAceptar}>
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "95vh",
    backgroundColor: "#0f172a",
    padding: "20px",
  },

  card: {
    width: "100%",
    maxWidth: "400px",
    backgroundColor: "#1e293b",
    padding: "24px",
    borderRadius: "14px",
    border: "1px solid #334155",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
    alignItems: "stretch",
  },

  title: {
    color: "#f1f5f9",
    marginBottom: "5px",
  },

  input: {
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #334155",
    width: "100%",
    backgroundColor: "#0f172a",
    color: "#f1f5f9",
    boxSizing: "border-box",
    outline: "none",
  },

  textarea: {
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #334155",
    width: "100%",
    minHeight: "90px",
    backgroundColor: "#0f172a",
    color: "#f1f5f9",
    boxSizing: "border-box",
    outline: "none",
  },

  buttonContainer: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },

  cancel: {
    flex: 1,
    padding: "10px",
    backgroundColor: "#334155",
    color: "#f1f5f9",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
  },

  accept: {
    flex: 1,
    padding: "10px",
    backgroundColor: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "500",
  },
};