import { useState } from "react";
import { useFetchUser } from "../Hooks/useFetchUser";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function LoginComponent() {
  const { data: Datausers } = useFetchUser("http://localhost:3000/usuarios");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!Datausers || !Array.isArray(Datausers)) {
      setError("Erro ao carregar dados. Tente novamente.");
      setIsLoading(false);
      return;
    }

    if (!email || !password) {
      setError("Por favor, preencha todos os campos.");
      setIsLoading(false);
      return;
    }

    const usuarioEncontrado = Datausers.find(
      (user) => user.email === email && user.senha === password
    );

    if (usuarioEncontrado) {
      localStorage.setItem("userId", usuarioEncontrado.id);
      navigate("/Orders");
    } else {
      setError("Email ou senha inválidos.");
    }

    setIsLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <form className="login-card" onSubmit={handleSubmit}>
          <div className="login-header">
            <h1 className="login-title">Acesso à Plataforma</h1>
            <p className="login-subtitle">Bem-vindo à Falkon</p>
          </div>

          {error && <div className="alert alert-error">{error}</div>}

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              className="inputTextBox"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="seu.email@empresa.com"
              value={email}
              disabled={isLoading}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Senha</label>
            <input
              className="inputTextBox"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Digite sua senha"
              value={password}
              disabled={isLoading}
            />
          </div>

          <button
            className={`buttonLogin ${isLoading ? "loading" : ""}`}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Entrando..." : "Entrar"}
          </button>

          <div className="login-footer">
            <a href="#forgot">Esqueceu sua senha?</a>
          </div>
        </form>

        <div className="login-info">
          <h3>Informações de Demonstração</h3>
          <p>
            <strong>Email:</strong> usuario@example.com
          </p>
          <p>
            <strong>Senha:</strong> senha123
          </p>
        </div>
      </div>
    </div>
  );
}


