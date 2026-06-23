import { useState } from "react";
import { useFetchUser } from "../Hooks/useFetchUser";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function LoginComponent() {
  const { data: Datausers } = useFetchUser("http://localhost:3000/usuarios");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!Datausers || !Array.isArray(Datausers)) {
      return <p>Carregando...</p>;
    }

    const usuarioEncontrado = Datausers.find(
      (user) => user.email === email && user.senha === password,
    );

    if (usuarioEncontrado) {
      localStorage.setItem("userId", usuarioEncontrado.id);
      navigate("/Orders");
    } else {
      alert("Email ou senha inválidos.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleSubmit}>
        <h1 className="login-title">Faça seu login Falkon</h1>
        <div className= "input-group">
          <label htmlFor="email">Email</label>
          <input
            className="inputTextBox"
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Seu e-mail aqui"
          />
        </div>
         <div className= "input-group">
          <label htmlFor="password">Senha </label>
          <input
            className="inputTextBox"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Digite sua senha"
          />
        </div>

        <button className="buttonLogin" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
