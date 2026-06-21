import { useState } from "react";
import { useFetchUser } from "../Hooks/useFetchUser";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { data: Datausers } = useFetchUser("http://localhost:3000/usuarios");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!Datausers || !Array.isArray(Datausers)) {
      return <p>Carregando...</p>
    }

    const usuarioEncontrado = Datausers.find(
      (user) => user.email === email && user.senha === password,
    );

    if (usuarioEncontrado) {
      localStorage.setItem("userId", usuarioEncontrado.id);
      navigate("/Orders");
    } else {
      console.log("Email ou senha inválidos.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Email"
        />
        <label htmlFor="password">Senha</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Senha"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
