# Generador de Prompts para IA Artística

Una interfaz web moderna para convertir texto descriptivo en español a prompts optimizados en inglés para modelos de IA como realisticVisionV60B1_v51HyperVAE.safetensors.

## Características

- ✅ Traducción automática español → inglés
- ✅ Diccionario especializado en arte e IA (400+ términos)
- ✅ Mejora automática de prompts con términos técnicos
- ✅ Prompts negativos optimizados
- ✅ Interfaz moderna y responsive
- ✅ Historial local de prompts
- ✅ Copia rápida al portapapeles
- ✅ Arquitectura modular

## Archivos

- `index.html` - Interfaz principal
- `diccionario.js` - Diccionario español-inglés especializado
- `traductor.js` - Lógica de traducción
- `mejorador.js` - Sistema de mejora de prompts
- `utils.js` - Utilidades de interfaz

## Uso

1. Abre `index.html` en tu navegador
2. Escribe tu descripción en español (ej: "mujer joven sonriendo en la playa")
3. El sistema traducirá automáticamente y mostrará:
   - Prompt positivo optimizado en inglés
   - Prompt negativo para evitar errores comunes
4. Haz clic en "Copiar" para usar los prompts en tu modelo de IA

## Tecnologías

- HTML5, CSS3, JavaScript vanilla
- Sin dependencias externas
- Funciona completamente offline
- Compatible con navegadores modernos

## Próximas mejoras

- Integración con LibreTranslate para traducción avanzada
- Plantillas predefinidas por estilo artístico
- Modo oscuro
- Exportación de prompts a archivo
