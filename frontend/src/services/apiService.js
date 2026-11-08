const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export const apiService = {
  // Obtener todas las materias o por plan de estudio
  async getMaterias(planId = '') {
    const endpoint = planId ? `/materias?planId=${planId}` : '/materias';
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) throw new Error('Error al cargar las materias');
    return response.json();
  },

  // Obtener créditos del plan (PlanCreditosDTO)
  async getPlanCreditos(planId) {
    const response = await fetch(`${BASE_URL}/planes/${planId}/creditos`);
    if (!response.ok) throw new Error('Error al obtener el plan de créditos');
    return response.json();
  },

  // Calcular semestre usando la estructura de Kahn (KahnSemesterCalculator)
  async calcularSemestres(planId, materiasAprobadas) {
    const response = await fetch(`${BASE_URL}/planes/${planId}/calcular-semestres`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ materiasAprobadas })
    });
    if (!response.ok) throw new Error('Error al calcular la ruta de semestres');
    return response.json();
  }
};