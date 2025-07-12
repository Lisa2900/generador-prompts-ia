// Módulo de mejoras de prompts
class MejoradorPrompts {
  constructor() {
    this.terminosCalidad = [
      'high quality',
      'detailed',
      'professional',
      'masterpiece',
      'ultra detailed'
    ];
    
    this.promptsNegativos = {
      basico: 'blurry, low quality, watermark, text, cropped, worst quality, lowres, bad anatomy, bad hands',
      completo: 'blurry, low quality, watermark, text, cropped, worst quality, lowres, bad anatomy, bad hands, extra limbs, missing limbs, ugly, deformed, duplicate, morbid, mutilated, out of frame, extra fingers, mutated hands, poorly drawn hands, poorly drawn face, mutation, deformed, blurry, bad proportions, extra limbs, cloned face, disfigured, gross proportions, malformed limbs, missing arms, missing legs, extra arms, extra legs, fused fingers, too many fingers',
      artistico: 'blurry, low quality, watermark, signature, text, cropped, worst quality, lowres, bad anatomy, bad composition, poor lighting, amateur',
      fotografico: 'blurry, low quality, watermark, text, cropped, worst quality, lowres, bad lighting, overexposed, underexposed, noise, grain, out of focus, poor composition'
    };
  }

  mejorarPromptPositivo(prompt, opciones = {}) {
    const { 
      agregarCalidad = true, 
      estilo = 'profesional',
      intensidad = 'media' 
    } = opciones;

    let promptMejorado = prompt;

    if (agregarCalidad && !this.tieneTerminosCalidad(prompt)) {
      const terminos = this.seleccionarTerminosCalidad(intensidad);
      promptMejorado += ', ' + terminos.join(', ');
    }

    return promptMejorado;
  }

  obtenerPromptNegativo(tipo = 'completo') {
    return this.promptsNegativos[tipo] || this.promptsNegativos.completo;
  }

  tieneTerminosCalidad(prompt) {
    return this.terminosCalidad.some(termino => 
      prompt.toLowerCase().includes(termino.toLowerCase())
    );
  }

  seleccionarTerminosCalidad(intensidad) {
    switch (intensidad) {
      case 'baja':
        return ['high quality'];
      case 'media':
        return ['high quality', 'detailed', 'professional'];
      case 'alta':
        return ['high quality', 'detailed', 'professional', 'masterpiece', 'ultra detailed'];
      default:
        return ['high quality', 'detailed', 'professional'];
    }
  }

  analizarPrompt(prompt) {
    return {
      longitud: prompt.length,
      palabras: prompt.split(' ').length,
      tieneCalidad: this.tieneTerminosCalidad(prompt),
      tieneEstilo: this.detectarEstilo(prompt),
      sugerencias: this.generarSugerencias(prompt)
    };
  }

  detectarEstilo(prompt) {
    const estilos = {
      realista: ['realistic', 'photo', 'photography', 'hyperrealistic'],
      artistico: ['art', 'painting', 'drawing', 'illustration'],
      anime: ['anime', 'manga', 'cartoon'],
      fantasia: ['fantasy', 'magic', 'mythical', 'dragon']
    };

    for (const [estilo, palabras] of Object.entries(estilos)) {
      if (palabras.some(palabra => prompt.toLowerCase().includes(palabra))) {
        return estilo;
      }
    }
    return 'general';
  }

  generarSugerencias(prompt) {
    const sugerencias = [];
    
    if (!this.tieneTerminosCalidad(prompt)) {
      sugerencias.push('Agregar términos de calidad');
    }
    
    if (prompt.length < 20) {
      sugerencias.push('Agregar más detalles descriptivos');
    }
    
    if (!prompt.includes(',')) {
      sugerencias.push('Usar comas para separar conceptos');
    }
    
    return sugerencias;
  }
}

// Exportar para uso en otros archivos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MejoradorPrompts;
}
