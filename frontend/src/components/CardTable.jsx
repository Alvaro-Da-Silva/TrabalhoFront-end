import React from "react";
import "./CardTable.css";
import { useFetchOrders } from "../Hooks/useFetchOrders";

const CardTable = () => {
  const { data: orders, loading, error } = useFetchOrders('http://localhost:3000/pedidos');

  if (loading) {
    return <p>Carregando..</p>;
  }

  if (error) {
    console.error(error);
  }

  console.log(orders)

  return (
    <div>
      {orders.map((order) => (
        <div key={order.id}>
          <h1>Data: {order.data}</h1>
          <p>Valor: {order.valor_pago}R$</p>
          <p>Status: {order.status}</p>

          {order.status === "pendente" && (
            <button >
              Solicitar Reembolso
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default CardTable;
