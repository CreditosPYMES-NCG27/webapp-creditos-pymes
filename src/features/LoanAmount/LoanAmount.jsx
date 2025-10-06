import './LoanAmount.css';
import { useState } from 'react';
import Button from '@/components/Button/Button';

export default function LoanAmount() {
  const [amount, setAmount] = useState(15000);
  const [months, setMonths] = useState(84);

  return (
    <div>
      <div className="card loan-card p-4">
        {/* Monto */}
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center">
            <label className="fw-semibold">Quiero recibir:</label>
            <div className="input-box">{amount.toLocaleString()} €</div>
          </div>
          <input
            type="range"
            className="form-range custom-range"
            min="1000"
            max="50000"
            step="1000"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
          <div className="d-flex justify-content-between text-muted small">
            <span>1.000 €</span>
            <span>50.000 €</span>
          </div>
        </div>
        {/* Plazo */}
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center">
            <label className="fw-semibold">Devolverlo en:</label>
            <div className="input-box">{months} meses</div>
          </div>
          <input
            type="range"
            className="form-range custom-range"
            min="12"
            max="96"
            step="12"
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
          />
          <div className="d-flex justify-content-between text-muted small">
            <span>12 meses</span>
            <span>96 meses</span>
          </div>
        </div>
        {/* Resultados */}
        <div className="d-flex justify-content-around border-top pt-3">
          <div className="text-center">
            <div className="small text-muted">Cuota mensual</div>
            <div className="fw-bold fs-5 ">
              218 €/mes
            </div>
          </div>
          <div className="text-center">
            <div className="small text-muted">TAE</div>
            <div className="fw-bold fs-6">5.99 %</div>
          </div>
        </div>
        <div className="text-center mt-3">
          <a href="#" className="text-success fw-semibold text-decoration-none">
            Más detalles
          </a>
        </div>
      </div>

    </div>

  );
}
