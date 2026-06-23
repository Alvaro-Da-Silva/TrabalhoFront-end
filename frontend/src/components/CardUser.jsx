import "./Card.css";
import { useFetchUser } from "../Hooks/useFetchUser";
import { useFetchOrders } from "../Hooks/useFetchOrders";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ModalReimbursement from "./ModalReimbursement";

const CardUser = () => {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    if (!userId) {
      navigate("/");
    }
  }, [userId, navigate]);

  const {
    data: Datausers,
    loading,
    error: errorUsers,
  } = useFetchUser(`http://localhost:3000/usuarios?id=${userId}`);
  const {
    data: Dataorders,
    loading: loadingOrders,
    error: errorOrders,
  } = useFetchOrders(`http://localhost:3000/pedidos?usuarioId=${userId}`);

  if (loading || loadingOrders) {
    return <p>Carregando..</p>;
  }

  if (errorUsers || errorOrders) {
    console.error(errorUsers || errorOrders);
  }

  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate("/");
  };

  return (
    <div className="dashboard">
      <div className="sidebar">
        {Datausers &&
          Datausers.map((user) => (
            <div key={user.id} className="cardConteiner">
              <h1>{user.nome}</h1>
              <p>Email: {user.email}</p>
              <p>Nível: {user.nivel}</p>
              <p>Carteira: R$ {user.carteira_saldo}</p>
              <button className="LogoutBtn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ))}
      </div>

      <div className="content">
        {Dataorders &&
          Dataorders.map((order) => (
            <div key={order.id} className="order-card">
              <h2>{order.data}</h2>
              <p>Valor: R$ {order.valor_pago}</p>
              <p>Status: {order.status}</p>

              {order.status === "pendente" && (
                <button
                  onClick={() => {
                    setSelectedOrder(order);
                    setIsModalOpen(true);
                  }}
                >
                  Solicitar Reembolso
                </button>
              )}
            </div>
          ))}
      </div>

      <ModalReimbursement
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        order={selectedOrder}
        onSuccess={() => {
          setIsModalOpen(false);
          window.location.reload();
        }}
      />
    </div>
  );
};

export default CardUser;
