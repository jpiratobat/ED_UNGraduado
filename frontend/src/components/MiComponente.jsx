import React from 'react'

function MiComponente({ titulo, descripcion }) {
  return (
    <div className="card" style={{ padding: '20px', border: '1px solid var(--border)', borderRadius: '8px', margin: '10px 0' }}>
      <h2>{titulo}</h2>
      <p>{descripcion}</p>
    </div>
  )
}

export default MiComponente