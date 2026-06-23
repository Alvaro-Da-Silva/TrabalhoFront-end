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
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Carregando informações...</p>
      </div>
    );
  }

  if (errorUsers || errorOrders) {
    console.error(errorUsers || errorOrders);
    return (
      <div className="error-container">
        <p>Erro ao carregar dados. Por favor, tente novamente.</p>
      </div>
    );
  }

  const user = Datausers && Datausers.length > 0 ? Datausers[0] : null;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusClass = (status) => {
    return `status-badge status-${status}`;
  };

  return (
    <div className="dashboard-container">
      {/* User Profile Card */}
      {user && (
        <aside className="user-profile-section">
          <div className="user-profile-card">
            <div className="user-avatar">
              {user.nome.charAt(0).toUpperCase()}
            </div>

            <div className="user-info">
              <h2 className="user-name">{user.nome}</h2>

              <div className="info-item">
                <span className="info-label">Email</span>
                <p className="info-value">{user.email}</p>
              </div>

              <div className="info-item">
                <span className="info-label">Nível</span>
                <p className="info-value">
                  <span className="level-badge">{user.nivel}</span>
                </p>
              </div>

              <div className="info-item wallet-highlight">
                <span className="info-label">Saldo em Carteira</span>
                <p className="info-value wallet-amount">
                  {formatCurrency(user.carteira_saldo)}
                </p>
              </div>
            </div>
          </div>
        </aside>
      )}

      {/* Orders Section */}
      <main className="orders-section">
        <div className="section-header">
          <h1>Meus Pedidos</h1>
          <span className="orders-count">
            {Dataorders ? Dataorders.length : 0} pedidos
          </span>
        </div>

        {!Dataorders || Dataorders.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📦</div>
            <p>Você ainda não possui pedidos.</p>
          </div>
        ) : (
          <div className="orders-grid">
            {Dataorders.map((order) => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <h3 className="order-date">{formatDate(order.data)}</h3>
                  <span className={getStatusClass(order.status)}>
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </span>
                </div>

                <div className="order-body">
                  <div className="order-detail">
                    <span className="detail-label">Valor</span>
                    <p className="detail-value">
                      {formatCurrency(order.valor_pago)}
                    </p>
                  </div>
                </div>

                <div className="order-footer">
                  {order.status === "pendente" && (
                    <button
                      className="btn btn-reimbursement"
                      onClick={() => {
                        setSelectedOrder(order);
                        setIsModalOpen(true);
                      }}
                    >
                      Solicitar Reembolso
                    </button>
                  )}
                  {order.status !== "pendente" && (
                    <span className="status-info">
                      {order.status === "reembolsado"
                        ? "✓ Pedido reembolsado"
                        : "Pedido concluído"}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

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
