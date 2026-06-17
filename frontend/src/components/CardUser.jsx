import React from "react";
import "./Card.css";
import { useFetchUser } from "../Hooks/useFetchUser";

const CardUser = () => {
  const { data: users, loading,error} = useFetchUser("http://localhost:3000/usuarios");

  if (loading) {
    return <p>Carregando..</p>;
  }

  if (error) {
    console.error(error);
  }

  return (
    <div>
      {users &&
        users.map((user) => (
          <div key={user.id} className="cardConteiner">
            <h1>{user.nome}</h1>
            <p>Email: {user.email}</p>
            <p>Nível: {user.nivel}</p>
            <p>Carteira: {user.carteira_saldo}</p>
          </div>
        ))}
    </div>
  );
};

export default CardUser;
