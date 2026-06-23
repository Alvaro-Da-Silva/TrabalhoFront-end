import { useNavigate, useLocation } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = localStorage.getItem("userId");
  const isLoginPage = location.pathname === "/";

  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate("/");
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-brand" onClick={() => navigate("/")}>
          <img src="/favicon.svg" alt="Falkon Logo" className="brand-logo" />
          <h1 className="brand-name">Falkon</h1>
        </div>

        <nav className="header-nav">
          {!isLoginPage && userId ? (
            <div className="nav-actions">
              <button className="nav-link" onClick={() => navigate("/Orders")}>
                Meus Pedidos
              </button>
              <button className="logout-btn" onClick={handleLogout}>
                Sair
              </button>
            </div>
          ) : null}
        </nav>
      </div>
    </header>
  );
}
