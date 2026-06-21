import { useState } from "react";
import { useChangeStep } from "../Hooks/useChangeStep";
import "./ModalReimbursement.css";

export default function ModalReimbursement({ isOpen, onClose, order, onSuccess }) {
  const [motivo, setMotivo] = useState("Produto com defeito");
  const [detalhes, setDetalhes] = useState("");
  const [tipoEstorno, setTipoEstorno] = useState("Saldo no sistema");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Componentes de Etapas
  const step1Content = (
    <div key="step1">
      <h2>Passo 1: Motivo do Reembolso</h2>
      <div className="radio-group">
        <label>
          <input type="radio" value="Produto com defeito" checked={motivo === "Produto com defeito"} onChange={(e) => setMotivo(e.target.value)} />
          Produto com defeito
        </label>
        <label>
          <input type="radio" value="Atraso na entrega" checked={motivo === "Atraso na entrega"} onChange={(e) => setMotivo(e.target.value)} />
          Atraso na entrega
        </label>
        <label>
          <input type="radio" value="Arrependimento" checked={motivo === "Arrependimento"} onChange={(e) => setMotivo(e.target.value)} />
          Arrependimento
        </label>
        <label>
          <input type="radio" value="Outro" checked={motivo === "Outro"} onChange={(e) => setMotivo(e.target.value)} />
          Outro
        </label>
      </div>
      {motivo === "Outro" && (
        <div className="details-container">
          <label className="details-label">Detalhes adicionais:</label>
          <input className="details-input" value={detalhes} onChange={(e) => setDetalhes(e.target.value)} placeholder="Especifique o motivo..." required/>
        </div>
      )}
    </div>
  );

  const step2Content = (
    <div key="step2">
      <h2>Passo 2: Tipo de Estorno</h2>
      <p className="value-text">
        Valor a ser reembolsado: <strong>R$ {order?.valor_pago}</strong>
      </p>
      
      <div className="radio-group-no-margin">
        <label>
          <input type="radio" value="Saldo no sistema" checked={tipoEstorno === "Saldo no sistema"} onChange={(e) => setTipoEstorno(e.target.value)} />
          Saldo no sistema (Mais Rápido)
        </label>
        <label>
          <input type="radio" value="Estorno automático" checked={tipoEstorno === "Estorno automático"} onChange={(e) => setTipoEstorno(e.target.value)} />
          Estorno Automático (Cartão/Gateway)
        </label>
      </div>
    </div>
  );

  const step3Content = (
    <div key="step3">
      <h2>Passo 3: Confirmação</h2>
      <div className="summary-box">
        <p className="summary-item"><strong>Motivo escolhido:</strong> {motivo}</p>
        {motivo === "Outro" && <p className="summary-item"><strong>Detalhes:</strong> {detalhes}</p>}
        <p className="summary-item"><strong>Tipo de Estorno:</strong> {tipoEstorno}</p>
      </div>
      <div className="warning-box">
        <strong>Aviso Final:</strong> Tem certeza que deseja prosseguir com a solicitação? Esta ação atualizará o status do seu pedido para reembolsado.
      </div>
    </div>
  );

  const formComponents = [step1Content, step2Content, step3Content];
  const { currentStepIndex, currentComponent, changeStep, isFirstStep, isLastStep } = useChangeStep(formComponents);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLastStep) {
      setIsSubmitting(true);
      try {
        const response = await fetch(`http://localhost:3000/pedidos/${order.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "reembolsado",
            tipo_estorno: tipoEstorno,
            motivo_reembolso: motivo === "Outro" ? detalhes : motivo
          }),
        });

        if (response.ok) {
          onSuccess();
        } else {
          console.error("Erro ao solicitar reembolso.");
        }
      } catch (error) {
        console.error("Erro na requisição:", error);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      changeStep(currentStepIndex + 1);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <div className="step-container">
            {currentComponent}
          </div>
          
          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={() => {
              if (isFirstStep) onClose();
              else changeStep(currentStepIndex - 1);
            }}>
              {isFirstStep ? "Cancelar" : "Voltar"}
            </button>
            <button type="submit" className="btn-primary" disabled={isSubmitting}>
              {isSubmitting ? "Enviando..." : (isLastStep ? "Confirmar Solicitação" : "Avançar")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
