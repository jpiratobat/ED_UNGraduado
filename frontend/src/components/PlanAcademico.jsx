import React, { useState } from 'react';
import { Button } from './Button';
import { apiService } from '../services/apiService';

export function PlanAcademico() {
  const [materias, setMaterias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCargarMaterias = async () => {
    setLoading(true);
    setError(null);
    try {
      // ID de ejemplo del plan de estudio
      const data = await apiService.getMaterias('ISI-2026');
      setMaterias(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: '2rem', padding: '1.5rem', borderRadius: '12px', background: 'var(--color-menta-25)', border: '1px solid var(--color-menta-300)' }}>
      <h2>Gestión de Plan Académico</h2>
      <p>Conéctate con el backend para consultar el estado de tus materias y créditos.</p>

      <div style={{ display: 'flex', gap: '1rem', margin: '1rem 0' }}>
        <Button variant="primary" isLoading={loading} onClick={handleCargarMaterias}>
          Cargar Materias
        </Button>
      </div>

      {error && <p style={{ color: 'var(--color-verde-800)', fontWeight: 'bold' }}>{error}</p>}

      <div style={{ display: 'grid', gap: '0.75rem', marginTop: '1rem' }}>
        {materias.map((materia, index) => (
          <div key={index} style={{ 
            padding: '1rem', 
            borderRadius: '6px', 
            background: 'var(--bg-primary)',
            border: '1px solid var(--color-menta-300)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <strong>{materia.codigo}</strong> - {materia.nombre}
            </div>
            <span style={{ fontSize: '0.9rem', opacity: 0.8 }}>
              Créditos: {materia.creditos}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}