import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MontoBadge from "../../components/MontoBadge/MontoBadge";

export default function PaginaMonto() {
  const location = useLocation();
  const navigate = useNavigate();

  const { cliente_id, tipo, modo, monto } = location.state || {};

  const esEdicion = modo === "editar";

  const [valor, setValor] = useState("");
  const [descripcion, setDescripcion] = useState("");

  useEffect(() => {
    if (esEdicion && monto) {
      setValor(Math.abs(monto.valor)); 
      setDescripcion(monto.descripcion || "");
    }
  }, [esEdicion, monto]);

  if (!cliente_id || !tipo) {
    return <p>Error: datos incompletos</p>;
  }

  const tipoLabel = tipo === "deuda" ? "Deuda" : "Abono";

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-CO").format(value);
  };

  const handleAceptar = async () => {
    if (!valor) {
      alert("Debes ingresar un valor");
      return;
    }

    let descripcionFinal = descripcion;

    if (tipo === "abono") {
      const fecha = new Date().toISOString().split("T")[0];
      const valorNumerico = Number(valor);
      const valorFormateado = formatCurrency(valorNumerico);
      descripcionFinal = `Abonó ${valorFormateado} el ${fecha}`;
    }

    try {
      const fecha = new Date().toISOString().split("T")[0];
      const baseUrl = import.meta.env.VITE_API_BASE_URL;

      const valorNumerico = Number(valor);
      const valorFinal =
        tipo === "abono"
          ? -Math.abs(valorNumerico)
          : Math.abs(valorNumerico);

      // 🔥 DIFERENCIA CLAVE
      const url = esEdicion
        ? `${baseUrl}/negocio/actualizarMonto`
        : `${baseUrl}/negocio/agregarMonto`;

      const method = esEdicion ? "PUT" : "POST";

      const body = esEdicion
        ? {
            id_monto: monto.id_monto,
            id_cliente: cliente_id,
            descripcion: descripcionFinal,
            valor: valorFinal,
            tipo_monto: tipo,
            fecha: fecha,
          }
        : {
            cliente_id: cliente_id,
            descripcion: descripcionFinal,
            valor: valorFinal,
            tipo: tipo,
            fecha: fecha,
            tipo_monto: tipo,
          };

      await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      navigate(-1);
    } catch (err) {
      console.error(err);
      alert("Error al guardar monto");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>
          {esEdicion ? "Editar" : "Nuevo"} {tipoLabel}
        </h2>

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
            {esEdicion ? "Guardar cambios" : "Aceptar"}
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