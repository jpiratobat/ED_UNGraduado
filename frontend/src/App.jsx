import React, { useState } from 'react';
import { Button } from './components/Button';
import { apiClient } from './services/api';

// Mapa de prerrequisitos basado en la base de datos SQL
const PRERREQUISITOS_MAP = {
  1: [], 
  2: [1], 
  3: [1], 
  4: [1], 
  5: [2, 3], 
  6: [2],
  7: [2],
  8: [6],
  9: [4],
  10: [9],
  12: [11],
  13: [9],
  14: [12],
  15: [12],
  18: [17],
  19: [18],
  20: [19],
  21: [14, 5, 19],
  22: [7, 6, 10, 12, 72, 73, 74],
  23: [22, 6, 4],
  24: [23, 22, 81],
  25: [13, 14],
  26: [7, 10, 14],
  27: [7, 21],
  28: [26, 27],
  29: [26],
  30: [26],
  31: [26],
  32: [15, 16, 37],
  33: [14, 15, 16],
  34: [33, 21],
  35: [34],
  36: [34, 32],
  37: [67, 78],
  40: [2, 4],
  41: [3],
  42: [39, 4],
  43: [40],
  44: [40, 3],
  45: [5, 6],
  46: [42],
  47: [2],
  48: [42, 40],
  49: [40, 3],
  50: [40, 42],
  51: [46],
  52: [40, 11, 6, 47],
  53: [48, 43],
  54: [50, 6],
  55: [50, 6],
  56: [4],
  57: [53],
  58: [54, 55],
  59: [50],
  60: [51],
  61: [67],
  62: [58, 59],
  63: [58],
  64: [67],
  65: [63],
  66: [63, 55],
  70: [69],
  71: [1, 69],
  72: [1, 69, 12],
  74: [2, 4],
  75: [72, 71],
  76: [71, 70],
  77: [3],
  73: [2],
  78: [75, 6],
  79: [77],
  80: [77],
  81: [73],
  82: [78],
  83: [23, 80],
  84: [81],
  85: [24],
  86: [37],
  87: [5],
  88: [24, 83],
  89: [70, 81],
  90: [85],
  91: [86],
  92: [87],
  93: [88, 86, 87]
};

export function App() {
  const [planSeleccionado, setPlanSeleccionado] = useState('');
  const [materias, setMaterias] = useState([]);
  const [vista, setVista] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [materiasAprobadas, setMateriasAprobadas] = useState([]);
  const [semestreActual, setSemestreActual] = useState([]);
  
  const [isDarkMode, setIsDarkMode] = useState(false);

  const CREDITO_MINIMO = 10;
  const CREDITO_MAXIMO = 20;

  const handleSelectPlan = async (e) => {
    const idPlan = e.target.value;
    setPlanSeleccionado(idPlan);
    setVista(null);
    setMateriasAprobadas([]);
    setSemestreActual([]);

    if (!idPlan) {
      setMaterias([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await apiClient(`/materias/plan/${idPlan}`);
      setMaterias(data);
    } catch (err) {
      setError(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleLimpiar = () => {
    setPlanSeleccionado('');
    setMaterias([]);
    setVista(null);
    setMateriasAprobadas([]);
    setSemestreActual([]);
    setError(null);
  };

  const creditosSemestreActual = semestreActual.reduce((sum, m) => sum + m.numCreditos, 0);
  const creditosTotalesPlan = materias.reduce((sum, m) => sum + m.numCreditos, 0);
  const creditosAprobados = materiasAprobadas.reduce((sum, m) => sum + m.numCreditos, 0);
  const creditosFaltantes = Math.max(creditosTotalesPlan - creditosAprobados, 0);
  const porcentajeAvance = creditosTotalesPlan > 0
    ? Math.round((creditosAprobados / creditosTotalesPlan) * 100)
    : 0;

  const toggleMateriaAprobada = (materia) => {
    const yaAprobada = materiasAprobadas.some(m => m.idMateria === materia.idMateria);
    
    if (yaAprobada) {
      setMateriasAprobadas(materiasAprobadas.filter(m => m.idMateria !== materia.idMateria));
      setSemestreActual(semestreActual.filter(m => m.idMateria !== materia.idMateria));
    } else {
      const idsAprobadas = materiasAprobadas.map(m => m.idMateria);
      const prerrequisitosIds = PRERREQUISITOS_MAP[materia.idMateria] || [];
      
      const prerrequisitosFaltantes = prerrequisitosIds.filter(idPrereq => !idsAprobadas.includes(idPrereq));

      if (prerrequisitosFaltantes.length > 0) {
        const nombresFaltantes = prerrequisitosFaltantes.map(idFaltante => {
          const encontrada = materias.find(m => m.idMateria === idFaltante);
          return encontrada ? encontrada.nomMateria : `Materia ID ${idFaltante}`;
        }).join(', ');

        alert(`Error: No puedes marcar como aprobada "${materia.nomMateria}" porque te falta aprobar previamente: ${nombresFaltantes}.`);
        return;
      }

      setMateriasAprobadas([...materiasAprobadas, materia]);
    }
  };

  const toggleSemestreActual = (materia) => {
    const yaEnSemestre = semestreActual.some(m => m.idMateria === materia.idMateria);

    if (yaEnSemestre) {
      setSemestreActual(semestreActual.filter(m => m.idMateria !== materia.idMateria));
    } else {
      const idsAprobadas = materiasAprobadas.map(m => m.idMateria);
      const idsSemestreActual = semestreActual.map(m => m.idMateria);

      const prereqsDeMateria = PRERREQUISITOS_MAP[materia.idMateria] || [];
      const conflictoMismoSemestre = idsSemestreActual.some(idEnSemestre => prereqsDeMateria.includes(idEnSemestre));

      if (conflictoMismoSemestre) {
        alert(`Error: No puedes inscribir "${materia.nomMateria}" en el mismo semestre que uno de sus prerrequisitos. Debes aprobar el prerrequisito en un semestre previo.`);
        return;
      }

      const prerrequisitosFaltantes = prereqsDeMateria.filter(idPrereq => !idsAprobadas.includes(idPrereq));

      if (prerrequisitosFaltantes.length > 0) {
        const nombresFaltantes = prerrequisitosFaltantes.map(idFaltante => {
          const encontrada = materias.find(m => m.idMateria === idFaltante);
          return encontrada ? encontrada.nomMateria : `Materia ID ${idFaltante}`;
        }).join(', ');

        alert(`Error: No puedes inscribir "${materia.nomMateria}". Debes marcar como aprobadas previamente las siguientes materias: ${nombresFaltantes}.`);
        return;
      }

      if (creditosSemestreActual + materia.numCreditos > CREDITO_MAXIMO) {
        alert(`Atencion: No puedes superar el limite maximo de ${CREDITO_MAXIMO} creditos por semestre.`);
        return;
      }

      setSemestreActual([...semestreActual, materia]);
    }
  };

  const handleDesmarcarInscritas = () => {
    setSemestreActual([]);
  };

  return (
    <main style={{ 
      padding: '0 2rem 2rem 2rem', 
      maxWidth: '900px', 
      margin: '0 auto', 
      fontFamily: 'inherit',
      backgroundColor: 'transparent',
      minHeight: '100vh',
      color: 'var(--text-primary)'
    }}>
      
      {/* Título Principal */}
      <div style={{
        backgroundColor: '#295e46',
        padding: '1.5rem',
        borderBottomLeftRadius: '12px',
        borderBottomRightRadius: '12px',
        textAlign: 'center',
        marginBottom: '2rem',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ color: '#f8fafc', margin: 0, fontSize: '2rem', letterSpacing: '1px' }}>UNGraduado</h1>
      </div>

      {/* Texto de selección con color claro blanco/gris claro garantizado en modo oscuro */}
      <p style={{ 
        color: 'var(--text-primary)',
        fontSize: '1.05rem',
        fontWeight: '500'
      }}>
        Selecciona tu plan de estudio y elige que deseas hacer:
      </p>
      
      <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <select 
          value={planSeleccionado} 
          onChange={handleSelectPlan}
          style={{
            padding: '12px 16px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            backgroundColor: isDarkMode ? '#1e293b' : '#fff',
            color: isDarkMode ? '#f8fafc' : '#333',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            outline: 'none',
            minWidth: '280px'
          }}
        >
          <option value="" disabled>-- Selecciona un Plan de Estudio --</option>
          <option value="1">Ingenieria de Sistemas y Computacion</option>
          <option value="2">Ingenieria Electrica</option>
          <option value="3">Ingenieria Industrial</option>
        </select>

        <Button variant="secondary" onClick={handleLimpiar}>
          Limpiar
        </Button>
      </div>

      {planSeleccionado && !loading && (
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
          <Button 
            variant={vista === 'malla' ? 'primary' : 'secondary'} 
            onClick={() => setVista('malla')}
          >
            Ver Malla Completa
          </Button>

          <Button 
            variant={vista === 'personalizada' ? 'primary' : 'secondary'} 
            onClick={() => setVista('personalizada')}
          >
            Organizar Malla Personalizada
          </Button>

          <Button 
            variant={vista === 'inscritas' ? 'primary' : 'secondary'} 
            onClick={() => setVista('inscritas')}
          >
            Ver Materias Inscritas
          </Button>

          <Button 
            variant={vista === 'aprobadas' ? 'primary' : 'secondary'} 
            onClick={() => setVista('aprobadas')}
          >
            Ver Materias Aprobadas
          </Button>
        </div>
      )}

      {loading && <p style={{ marginTop: '1.5rem', fontStyle: 'italic', color: '#666' }}>Cargando datos...</p>}
      {error && <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#ffe6e6', color: '#cc0000', borderRadius: '8px' }}>{error}</div>}

      {/* VISTA: Malla Completa */}
      {vista === 'malla' && !loading && (
        <div style={{ marginTop: '2rem' }}>
          <h3 style={{ color: isDarkMode ? '#f8fafc' : '#2c3e50' }}>Malla Curricular Completa</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
            <thead>
              <tr style={{ backgroundColor: '#4fa77f', borderBottom: '2px solid #4fa77f', textAlign: 'left' }}>
                <th style={{ padding: '12px', color: '#ffffff', fontWeight: 'bold' }}>ID</th>
                <th style={{ padding: '12px', color: '#ffffff', fontWeight: 'bold' }}>Nombre de la Materia</th>
                <th style={{ padding: '12px', textAlign: 'center', color: '#ffffff', fontWeight: 'bold' }}>Creditos</th>
              </tr>
            </thead>
            <tbody>
              {materias.map((materia) => (
                <tr key={materia.idMateria} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '12px' }}>{materia.idMateria}</td>
                  <td style={{ padding: '12px' }}>{materia.nomMateria}</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>{materia.numCreditos}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* VISTA: Organizar Malla Personalizada */}
      {vista === 'personalizada' && !loading && (
        <div style={{ marginTop: '2rem' }}>
          <div style={{ 
            backgroundColor: '#295e46', 
            padding: '1rem', 
            borderRadius: '8px', 
            marginBottom: '1.5rem',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#ffffff', margin: 0, fontSize: '1.4rem' }}>Armador de Malla Personalizada</h3>
          </div>

          {/* Resumen de créditos y avance (debajo del título Armador) */}
          {materias.length > 0 && (
            <div style={{
              marginBottom: '1.5rem',
              padding: '1rem 1.25rem',
              borderRadius: '8px',
              border: '1px solid var(--btn-secondary-border)',
              backgroundColor: 'var(--btn-secondary-hover)'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-around',
                flexWrap: 'wrap',
                gap: '1rem',
                textAlign: 'center',
                color: 'var(--text-primary)'
              }}>
                <div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Creditos del plan</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{creditosTotalesPlan}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Aprobados</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#22c55e' }}>{creditosAprobados}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Faltantes</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#f59e0b' }}>{creditosFaltantes}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Avance</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{porcentajeAvance}%</div>
                </div>
              </div>

              {/* Barra de progreso */}
              <div style={{
                marginTop: '1rem',
                height: '10px',
                borderRadius: '5px',
                backgroundColor: 'rgba(128, 128, 128, 0.3)',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${porcentajeAvance}%`,
                  height: '100%',
                  backgroundColor: '#22c55e',
                  transition: 'width 0.3s ease'
                }} />
              </div>
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem', marginTop: '1rem' }}>
            <div style={{ 
              padding: '12px 16px', 
              border: '2px solid #295e46', 
              borderRadius: '8px', 
              backgroundColor: isDarkMode ? '#172554' : '#f4fbf7', 
              color: isDarkMode ? '#e2e8f0' : '#1e293b', 
              fontSize: '0.95rem' 
            }}>
              <strong>Paso 1:</strong> Haz clic en las materias que ya aprobaste previamente (el sistema validara que tengas los prerrequisitos aprobados).
            </div>

            <div style={{ 
              padding: '12px 16px', 
              border: '2px solid #295e46', 
              borderRadius: '8px', 
              backgroundColor: isDarkMode ? '#172554' : '#f4fbf7', 
              color: isDarkMode ? '#e2e8f0' : '#1e293b', 
              fontSize: '0.95rem' 
            }}>
              <strong>Paso 2:</strong> Inscribe tus materias del semestre actual usando el boton correspondiente.
            </div>
          </div>
          
          <div style={{ 
            padding: '1rem', 
            backgroundColor: isDarkMode ? '#1e293b' : '#f8fafc', 
            border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0', 
            borderRadius: '8px', 
            marginBottom: '1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div style={{ color: isDarkMode ? '#f8fafc' : '#1e293b' }}>
              <strong>Creditos del Semestre Actual: </strong> 
              <span style={{ fontSize: '1.2rem', color: creditosSemestreActual < CREDITO_MINIMO ? '#f59e0b' : '#22c55e', fontWeight: 'bold' }}>
                {creditosSemestreActual}
              </span> 
              <span style={{ color: isDarkMode ? '#cbd5e1' : '#64748b' }}> / Max {CREDITO_MAXIMO}</span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              {creditosSemestreActual < CREDITO_MINIMO ? (
                <span style={{ color: isDarkMode ? '#fbbf24' : '#d97706', fontSize: '0.9rem' }}>Carga por debajo del minimo ({CREDITO_MINIMO} creditos)</span>
              ) : (
                <span style={{ color: isDarkMode ? '#4ade80' : '#16a34a', fontSize: '0.9rem' }}>Carga valida</span>
              )}

              <button
                onClick={handleDesmarcarInscritas}
                style={{
                  padding: '6px 12px',
                  fontSize: '0.8rem',
                  borderRadius: '6px',
                  border: isDarkMode ? '1px solid #475569' : '1px solid #cbd5e1',
                  backgroundColor: isDarkMode ? '#334155' : '#f1f5f9',
                  color: isDarkMode ? '#f8fafc' : '#334155',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                Deseleccionar Inscritas
              </button>
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px', marginTop: '1rem' }}>
            {materias.map((materia) => {
              const yaAprobada = materiasAprobadas.some(m => m.idMateria === materia.idMateria);
              const enSemestre = semestreActual.some(m => m.idMateria === materia.idMateria);

              return (
                <div 
                  key={materia.idMateria}
                  style={{
                    padding: '12px',
                    borderRadius: '8px',
                    border: enSemestre ? '2px solid #357a5b' : yaAprobada ? '1px solid #94a3b8' : '1px solid #e2e8f0',
                    backgroundColor: enSemestre ? (isDarkMode ? '#064e3b' : '#e6f4ed') : yaAprobada ? (isDarkMode ? '#334155' : '#f1f5f9') : (isDarkMode ? '#1e293b' : '#fff'),
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{ fontWeight: 'bold', fontSize: '0.9rem', color: isDarkMode ? '#f8fafc' : '#1e293b' }}>{materia.nomMateria}</div>
                  <div style={{ fontSize: '0.8rem', color: isDarkMode ? '#94a3b8' : '#64748b', marginTop: '4px', marginBottom: '8px' }}>
                    Creditos: {materia.numCreditos} | ID: {materia.idMateria}
                  </div>

                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      onClick={() => toggleMateriaAprobada(materia)}
                      style={{
                        padding: '4px 8px',
                        fontSize: '0.75rem',
                        borderRadius: '4px',
                        border: 'none',
                        backgroundColor: yaAprobada ? '#64748b' : '#cbd5e1',
                        color: '#fff',
                        cursor: 'pointer'
                      }}
                    >
                      {yaAprobada ? 'Aprobada' : 'Marcar Aprobada'}
                    </button>

                    <button
                      onClick={() => toggleSemestreActual(materia)}
                      style={{
                        padding: '4px 8px',
                        fontSize: '0.75rem',
                        borderRadius: '4px',
                        border: 'none',
                        backgroundColor: enSemestre ? '#295e46' : '#357a5b',
                        color: '#ffffff',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                      }}
                    >
                      {enSemestre ? 'Inscrita' : 'Inscribir en Semestre'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VISTA: Materias Inscritas */}
      {vista === 'inscritas' && !loading && (
        <div style={{ marginTop: '2rem' }}>
          <h3 style={{ color: 'var(--text-primary)' }}>Materias Inscritas (Semestre Actual)</h3>
          <p style={{ color: 'var(--text-primary)' }}>Total de creditos inscritos: <strong>{creditosSemestreActual}</strong></p>
          
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
            <thead>
              <tr style={{ backgroundColor: '#4fa77f', borderBottom: '2px solid #4fa77f', textAlign: 'left' }}>
                <th style={{ padding: '12px', color: '#ffffff', fontWeight: 'bold' }}>ID</th>
                <th style={{ padding: '12px', color: '#ffffff', fontWeight: 'bold' }}>Nombre de la Materia</th>
                <th style={{ padding: '12px', textAlign: 'center', color: '#ffffff', fontWeight: 'bold' }}>Creditos</th>
              </tr>
            </thead>
            <tbody>
              {semestreActual.length > 0 ? (
                semestreActual.map((materia) => (
                  <tr key={materia.idMateria} style={{ borderBottom: '1px solid var(--btn-secondary-hover)' }}>
                    <td style={{ padding: '12px' }}>{materia.idMateria}</td>
                    <td style={{ padding: '12px' }}>{materia.nomMateria}</td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>{materia.numCreditos}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" style={{ padding: '15px', textAlign: 'center', color: 'var(--text-primary)', opacity: 0.7 }}>
                    No has inscrito materias para este semestre todavía.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* VISTA: Materias Aprobadas */}
      {vista === 'aprobadas' && !loading && (
        <div style={{ marginTop: '2rem' }}>
            <h3 style={{ color: 'var(--text-primary)' }}>Materias Aprobadas (Historial)</h3>
            <p style={{ color: 'var(--text-primary)' }}>Total de creditos aprobados: <strong>{materiasAprobadas.reduce((sum, m) => sum + m.numCreditos, 0)}</strong></p>
          
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
            <thead>
              <tr style={{ backgroundColor: '#4fa77f', borderBottom: '2px solid #4fa77f', textAlign: 'left' }}>
                <th style={{ padding: '12px', color: '#ffffff', fontWeight: 'bold' }}>ID</th>
                <th style={{ padding: '12px', color: '#ffffff', fontWeight: 'bold' }}>Nombre de la Materia</th>
                <th style={{ padding: '12px', textAlign: 'center', color: '#ffffff', fontWeight: 'bold' }}>Creditos</th>
              </tr>
            </thead>
            <tbody>
              {materiasAprobadas.length > 0 ? (
                materiasAprobadas.map((materia) => (
                  <tr key={materia.idMateria} style={{ borderBottom: '1px solid var(--btn-secondary-hover)' }}>
                    <td style={{ padding: '12px' }}>{materia.idMateria}</td>
                    <td style={{ padding: '12px' }}>{materia.nomMateria}</td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>{materia.numCreditos}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" style={{ padding: '15px', textAlign: 'center', color: 'var(--text-primary)', opacity: 0.7 }}>
                    No has marcado materias como aprobadas todavía.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}

export default App;
