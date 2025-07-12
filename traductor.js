// Módulo de traducción con LibreTranslate local únicamente
class Traductor {
  constructor() {
    this.cache = new Map(); // Cache para traducciones de API
    this.apiUrl = 'http://localhost:5000/translate'; // Solo API local
  }

  async traducir(texto) {
    // Verificar cache primero
    if (this.cache.has(texto)) {
      return this.cache.get(texto);
    }

    try {
      const resultado = await this.traducirConAPI(texto);
      return resultado.replace(/\s{2,}/g, ' ').trim();
    } catch (error) {
      console.error('Error con LibreTranslate local:', error.message);
      return texto; // Devolver texto original si falla
    }
  }

  async traducirConAPI(texto) {
    // Verificar cache primero
    if (this.cache.has(texto)) {
      return this.cache.get(texto);
    }
    
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: texto,
          source: 'es',
          target: 'en',
          format: 'text'
        })
      });

      if (!response.ok) {
        throw new Error(`LibreTranslate local error: ${response.status}`);
      }

      const data = await response.json();
      const traducido = data.translatedText;
      
      // Guardar en cache
      this.cache.set(texto, traducido);
      
      return traducido;
    } catch (error) {
      console.error('Error en LibreTranslate local:', error);
      throw error; // Propagar el error para manejo superior
    }
  }

  // Limpiar cache de traducciones
  limpiarCache() {
    this.cache.clear();
  }

  // Verificar conectividad con API local
  async verificarConectividad() {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: 'test',
          source: 'es',
          target: 'en',
          format: 'text'
        })
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  }

  obtenerEstadisticas() {
    return {
      traduccionesCache: this.cache.size,
      apiUrl: this.apiUrl,
      servidor: 'Local únicamente'
    };
  }
}

// Exportar para uso en otros archivos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Traductor;
}
