import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ClienteBadge from "../../components/ClienteBadge/ClienteBadge";
import MontoList from "../../components/MontoList/MontoList";
import MontoDetalleModal from "../../components/MontoDetalleModal/MontoDetalleModal";
import MontoTotal from "../../components/MontoTotal/MontoTotal";
export default function PaginaCliente() {
  const location = useLocation();
  const navigate = useNavigate();

  const { cliente } = location.state || {};

  const [montos, setMontos] = useState([]);
  const [montoSeleccionado, setMontoSeleccionado] = useState(null);

  useEffect(() => {
    if (!cliente?.id) return;
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    fetch(`${baseUrl}/negocio/montos?cliente_id=${cliente.id}`)
      .then((res) => res.json())
      .then((data) => setMontos(data))
      .catch((err) => console.error(err));
  }, [cliente]);

  if (!cliente) {
    return <p style={{ color: "#f1f5f9" }}>No hay cliente seleccionado</p>;
  }

  const handleAñadirMonto = () => {
    navigate("/pagina-monto", {
      state: {
        cliente_id: cliente.id,
        tipo: "deuda",
      },
    });
  };

  const handleAbonar = () => {
    navigate("/pagina-monto", {
      state: {
        cliente_id: cliente.id,
        tipo: "abono",
      },
    });
  };

  const handlePagarTodo = async () => {
    const confirmar = window.confirm("¿Seguro que deseas pagar todo?");
    if (!confirmar) return;

    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL;

      await fetch(
        `${baseUrl}/negocio/pagarTodo?cliente_id=${cliente.id}`,
        { method: "POST" }
      );

      const res = await fetch(
        `${baseUrl}/negocio/montos?cliente_id=${cliente.id}`
      );
      const data = await res.json();
      setMontos(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={styles.container}>

      <div style={styles.card}>

        {/* Header simple */}
      <div style={styles.topBar}>
        <button onClick={() => navigate(-1)} style={styles.backBtn}>
          ←
        </button>
      </div>
      
        {/* Cliente */}
        <ClienteBadge
          nombre={cliente.nombre}
          tipo={cliente.tipo_cliente}
        />

        {/* Total */}
        <MontoTotal valor={cliente.total_deuda} />


        {/* Lista */}
        <MontoList
          montos={montos}
          onSelectMonto={(monto) => setMontoSeleccionado(monto)}
        />

        {/* Modal */}
        {montoSeleccionado && (
          <MontoDetalleModal
            monto={montoSeleccionado}
            onClose={() => setMontoSeleccionado(null)}
          />
        )}

        {/* Botones */}
        <div style={styles.buttonContainer}>
          <button style={styles.buttonDeuda} onClick={handleAñadirMonto}>
            + Monto
          </button>

          {cliente.tipo_cliente === "frecuente" && (
            <button style={styles.buttonAbono} onClick={handleAbonar}>
              Abonar
            </button>
          )}

          <button style={styles.buttonPagarTodo} onClick={handlePagarTodo}>
            Pagar todo
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "90vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "40px 20px",
    backgroundColor: "#020617",
  },

  card: {
    width: "100%",
    maxWidth: "600px",
    minHeight: "70vh",
    backgroundColor: "#1e293b",
    borderRadius: "16px",
    padding: "24px",
    border: "1px solid #334155",
    boxShadow: "0 10px 25px rgba(0,0,0,0.6)",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    overflowX: "hidden", 
    position: "relative",
  },

  buttonContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    justifyContent: "center",
  },

  buttonDeuda: {
    padding: "10px 14px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#dc2626",
    color: "white",
    fontWeight: "500",
  },

  buttonAbono: {
    padding: "10px 14px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#4f46e5",
    color: "white",
    fontWeight: "500",
  },
  buttonPagarTodo: {
    padding: "10px 14px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#7c3aed",
    color: "white",
    fontWeight: "500",
  },
  topBar: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  backBtn: {
    backgroundColor: "#334155",
    color: "#f1f5f9",
    border: "none",
    width: "36px",
    height: "36px",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};