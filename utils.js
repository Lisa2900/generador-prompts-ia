// Módulo de utilidades para la interfaz
class UIUtils {
  static mostrarFeedback(elemento, mensaje, tipo = 'success', duracion = 1500) {
    const original = elemento.innerText;
    const originalColor = elemento.style.background;
    
    elemento.innerText = mensaje;
    elemento.style.background = tipo === 'success' ? '#22c55e' : '#ef4444';
    
    setTimeout(() => {
      elemento.innerText = original;
      elemento.style.background = originalColor;
    }, duracion);
  }

  static copiarAlPortapapeles(texto) {
    return navigator.clipboard.writeText(texto).then(() => {
      return true;
    }).catch(() => {
      // Fallback para navegadores más antiguos
      const textArea = document.createElement('textarea');
      textArea.value = texto;
      document.body.appendChild(textArea);
      textArea.select();
      const success = document.execCommand('copy');
      document.body.removeChild(textArea);
      return success;
    });
  }

  static crearElemento(tag, clases = [], contenido = '') {
    const elemento = document.createElement(tag);
    if (clases.length > 0) {
      elemento.classList.add(...clases);
    }
    if (contenido) {
      elemento.innerHTML = contenido;
    }
    return elemento;
  }

  static animarElemento(elemento, animacion, duracion = 300) {
    elemento.style.transition = `all ${duracion}ms ease`;
    
    switch (animacion) {
      case 'fadeIn':
        elemento.style.opacity = '0';
        elemento.style.display = 'block';
        setTimeout(() => elemento.style.opacity = '1', 10);
        break;
      case 'slideDown':
        elemento.style.maxHeight = '0';
        elemento.style.overflow = 'hidden';
        setTimeout(() => elemento.style.maxHeight = '500px', 10);
        break;
      case 'pulse':
        elemento.style.transform = 'scale(1.05)';
        setTimeout(() => elemento.style.transform = 'scale(1)', duracion/2);
        break;
    }
  }

  static debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  static almacenarEnLocal(clave, valor) {
    try {
      localStorage.setItem(clave, JSON.stringify(valor));
      return true;
    } catch (e) {
      console.warn('No se pudo guardar en localStorage:', e);
      return false;
    }
  }

  static obtenerDeLocal(clave, valorPorDefecto = null) {
    try {
      const item = localStorage.getItem(clave);
      return item ? JSON.parse(item) : valorPorDefecto;
    } catch (e) {
      console.warn('No se pudo leer de localStorage:', e);
      return valorPorDefecto;
    }
  }
}

// Exportar para uso en otros archivos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = UIUtils;
}
