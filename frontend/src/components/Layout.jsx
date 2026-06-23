import Header from "./Header";
import Footer from "./Footer";
import "./Layout.css";

export default function Layout({ children }) {
  return (
    <div className="app-layout">
      <Header />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
}
