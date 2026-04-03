import React, { useState, useEffect } from "react";
import ClienteList from "../../components/ClienteList/ClienteList";
import { useNavigate } from "react-router-dom";

export default function PaginaCrearCliente() {
  const [nombreNuevo, setNombreNuevo] = useState("");
  const [tipoCliente, setTipoCliente] = useState("");
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // 🔍 Fetch para validar nombre + sugerencias
  useEffect(() => {
    if (!nombreNuevo) {
      setClientes([]);
      return;
    }

    const controller = new AbortController();

    const timeoutId = setTimeout(async () => {
      try {
        setLoading(true);

        const baseUrl = import.meta.env.VITE_API_BASE_URL;

        const res = await fetch(
          `${baseUrl}/negocio/clientes?search=${encodeURIComponent(nombreNuevo)}`,
          { signal: controller.signal }
        );

        const data = await res.json();
        setClientes(data);
      } catch (err) {
        if (err.name !== "AbortError") console.error(err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [nombreNuevo]);

  const nombreExistente = clientes.some(
    (c) => c.nombre.toLowerCase() === nombreNuevo.toLowerCase()
  );

  const handleCrearCliente = async () => {
    if (!nombreNuevo || !tipoCliente) {
      alert("Debes seleccionar un tipo y escribir un nombre");
      return;
    }

    if (nombreExistente) {
      alert("Ese nombre ya existe");
      return;
    }

    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL;

      const res = await fetch(`${baseUrl}/negocio/agregarCliente`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: nombreNuevo,
          tipo_cliente: tipoCliente,
        }),
      });

      const data = await res.json();

      navigate("/pagina-cliente", {
        state: {
          cliente: data,
        },
      });
    } catch (err) {
      console.error(err);
      alert("Error al crear cliente");
    }
  };

  return (
    
    <div style={styles.container}>

       {/* 🔙 BOTÓN VOLVER */}
      <button onClick={() => navigate(-1)} style={styles.backBtn}>
        ←
      </button>
      
      <div style={styles.card}>
        <h1 style={styles.title}>Crear Cliente</h1>

        {/* Input */}
        <input
          type="text"
          placeholder="Nombre del cliente"
          value={nombreNuevo}
          onChange={(e) => setNombreNuevo(e.target.value)}
          style={styles.input}
        />

        {/* Validación */}
        {nombreNuevo && (
          <div
            style={{
              fontSize: "13px",
              color: nombreExistente ? "#f87171" : "#4ade80",
              marginTop: "-10px",
            }}
          >
            {loading
              ? "Validando..."
              : nombreExistente
              ? "⚠️ Este nombre ya existe"
              : "✔ Nombre disponible"}
          </div>
        )}

        {/* Radios tipo badge */}
        <div style={styles.radioContainer}>
          <div
            style={{
              ...styles.radioBadge,
              backgroundColor:
                tipoCliente === "frecuente" ? "#065f46" : "#334155",
            }}
            onClick={() => setTipoCliente("frecuente")}
          >
            Frecuente
          </div>

          <div
            style={{
              ...styles.radioBadge,
              backgroundColor:
                tipoCliente === "invitado" ? "#f59e0b" : "#334155",
            }}
            onClick={() => setTipoCliente("invitado")}
          >
            Invitado
          </div>
        </div>

        {/* Botón */}
        <button
          style={{
            ...styles.button,
            opacity: nombreExistente ? 0.5 : 1,
            cursor: nombreExistente ? "not-allowed" : "pointer",
          }}
          onClick={handleCrearCliente}
          disabled={nombreExistente}
        >
          Crear Cliente
        </button>

        {/* Lista (solo sugerencias) */}
        <ClienteList clientes={clientes} loading={loading} />
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
    padding: "40px 20px",
    backgroundColor: "#020617",
    position: "relative",
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
    color: "#f9fafb",
  },

  input: {
    padding: "12px",
    fontSize: "16px",
    borderRadius: "10px",
    border: "1px solid #374151",
    outline: "none",
    backgroundColor: "#0f172a",
    color: "#f9fafb",
    boxSizing: "border-box",
  },

  radioContainer: {
    display: "flex",
    gap: "10px",
    justifyContent: "space-between",
  },

  radioBadge: {
    flex: 1,
    textAlign: "center",
    padding: "10px",
    borderRadius: "10px",
    color: "white",
    cursor: "pointer",
    fontWeight: "500",
    transition: "0.2s",
    userSelect: "none",
  },

  button: {
    padding: "12px",
    fontSize: "16px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#4f46e5",
    color: "white",
    fontWeight: "500",
  },
  backBtn: {
    position: "absolute",
    top: "20px",
    left: "20px",
    backgroundColor: "#334155",
    color: "#f1f5f9",
    border: "none",
    width: "40px",
    height: "40px",
    borderRadius: "10px",
    fontSize: "18px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
};