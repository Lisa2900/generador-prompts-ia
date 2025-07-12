// Módulo de traducción
class Traductor {
  constructor(diccionario) {
    this.diccionario = diccionario;
  }

  traducir(texto) {
    let resultado = texto;
    // Ordenar por frases largas primero para evitar conflictos
    const claves = Object.keys(this.diccionario).sort((a, b) => b.length - a.length);
    
    claves.forEach(es => {
      if (this.diccionario[es]) { // Solo reemplazar si la traducción no está vacía
        const regex = new RegExp('(?<![a-zA-Záéíóúüñ])' + this.escapeRegex(es) + '(?![a-zA-Záéíóúüñ])', 'gi');
        resultado = resultado.replace(regex, this.diccionario[es]);
      }
    });
    
    // Limpiar espacios múltiples y espacios al inicio/final
    return resultado.replace(/\s{2,}/g, ' ').trim();
  }

  escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  agregarTermino(español, ingles) {
    this.diccionario[español] = ingles;
  }

  obtenerEstadisticas() {
    return {
      totalTerminos: Object.keys(this.diccionario).length,
      tieneTermino: (termino) => this.diccionario.hasOwnProperty(termino)
    };
  }
}

// Exportar para uso en otros archivos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Traductor;
}
