import "./Footer.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Falkon</h3>
          <p>Plataforma de gestão de pedidos e reembolsos.</p>
        </div>

        <div className="footer-section">
          <h4>Links Rápidos</h4>
          <ul>
            <li><a href="#privacy">Privacidade</a></li>
            <li><a href="#terms">Termos de Uso</a></li>
            <li><a href="#support">Suporte</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contato</h4>
          <p>Email: support@falkon.com</p>
          <p>Tel: (11) 9999-9999</p>
        </div>

        <div className="footer-section">
          <h4>Redes Sociais</h4>
          <div className="social-links">
            <a href="#" aria-label="LinkedIn">in</a>
            <a href="#" aria-label="Twitter">𝕏</a>
            <a href="#" aria-label="GitHub">gh</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} Falkon. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
