# Generador de Prompts con LibreTranslate Local

## Descripción
Aplicación web que usa LibreTranslate local exclusivamente para generar prompts de IA artística con traducción automática español-inglés.

## Características

### 🏠 Solo LibreTranslate Local
- **Sin dependencias externas**: Solo servidor local en puerto 5000
- **Privacidad total**: Los datos nunca salen de tu máquina
- **Sin límites**: Sin restricciones de uso o rate limits
- **Cache inteligente**: Almacena traducciones para mejor rendimiento

### Funcionalidades
- Traducción automática completa español → inglés
- Generación de prompts positivos y negativos
- Interfaz moderna y responsive
- Monitoreo del estado del servidor local
- Estadísticas de uso en tiempo real

## ⚡ Inicio Rápido

### 1. Instalar y ejecutar LibreTranslate
```bash
# Método automático (recomendado)
./start-libretranslate.sh

# O método manual:
pip install libretranslate
libretranslate --host 0.0.0.0 --port 5000
```

### 2. Iniciar la aplicación web
```bash
# En otra terminal:
python -m http.server 3000
```

### 3. Usar la aplicación
- Abrir: http://localhost:3000
- Verificar que el indicador esté verde ✅
- Escribir descripciones en español
- Obtener prompts optimizados en inglés

## Ventajas de Solo Local

### 🔒 **Privacidad Máxima**
- Los textos nunca salen de tu computadora
- No hay envío de datos a servicios externos
- Control total sobre la información procesada

### ⚡ **Rendimiento Superior**
- Sin latencia de red
- Sin límites de requests por minuto
- Respuesta instantánea

### 💰 **Costo Cero**
- No hay costos por API calls
- Sin suscripciones mensuales
- Uso ilimitado

### 🛠️ **Control Total**
- Personalización completa del modelo
- Versión específica de LibreTranslate
- Sin cambios inesperados en la API

## Requisitos del Sistema

- **Python 3.8+**
- **RAM**: Mínimo 2GB disponibles
- **Espacio**: ~1GB para modelos de traducción
- **CPU**: Cualquier procesador moderno

## Estructura del Proyecto

```
generador-prompts-ia/
├── index.html              # Interfaz principal
├── traductor.js            # Motor de traducción (solo local)
├── mejorador.js            # Generador de prompts
├── utils.js                # Utilidades generales
├── start-libretranslate.sh # Script de inicio automático
└── README_LIBRETRANSLATE.md # Esta documentación
```

## Solución de Problemas

### ❌ Indicador rojo (servidor no disponible)
```bash
# Verificar que LibreTranslate esté corriendo:
curl -X POST http://localhost:5000/translate \
  -H "Content-Type: application/json" \
  -d '{"q":"test","source":"es","target":"en"}'

# Si falla, reiniciar:
./start-libretranslate.sh
```

### 🐛 Error de instalación de modelos
```bash
# Instalar modelos manualmente:
python -c "
import argostranslate.package
argostranslate.package.update_package_index()
available_packages = argostranslate.package.get_available_packages()
spanish_to_english_package = list(filter(lambda x: x.from_code == 'es' and x.to_code == 'en', available_packages))[0]
argostranslate.package.install_from_path(spanish_to_english_package.download())
"
```

## Ejemplos de Uso

### Descripción simple:
**Entrada**: "mujer joven sonriendo"
**Salida**: "young woman smiling, portrait, detailed facial features, natural lighting"

### Descripción artística:
**Entrada**: "dragón majestuoso volando sobre montañas nevadas al amanecer"
**Salida**: "majestic dragon flying over snow-capped mountains at dawn, epic fantasy art, detailed scales, volumetric lighting, cinematic composition"

### Estilo específico:
**Entrada**: "retrato de una persona en estilo renacentista"
**Salida**: "portrait of a person in renaissance style, classical painting, oil on canvas, chiaroscuro lighting, detailed brushwork"

## API Local de LibreTranslate

### Endpoint usado:
```
POST http://localhost:5000/translate
Content-Type: application/json

{
  "q": "texto en español",
  "source": "es",
  "target": "en", 
  "format": "text"
}
```

### Respuesta:
```json
{
  "translatedText": "text in english"
}
```

## Personalización

### Cambiar idioma de destino:
```javascript
// En traductor.js, cambiar 'en' por otro código de idioma
target: 'fr'  // francés
target: 'de'  // alemán
target: 'it'  // italiano
```

### Gestión avanzada:
```javascript
traductor.limpiarCache();           // Limpiar cache
traductor.obtenerEstadisticas();    // Ver estadísticas
traductor.verificarConectividad();  // Probar conexión
```

## Beneficios vs APIs Públicas

| Aspecto | LibreTranslate Local | APIs Públicas |
|---|---|---|
| **Privacidad** | ✅ Total | ❌ Datos enviados a terceros |
| **Velocidad** | ✅ Instantáneo | ⚠️ Depende de red |
| **Costo** | ✅ Gratis | ❌ Pago por uso |
| **Límites** | ✅ Sin límites | ❌ Rate limits |
| **Offline** | ✅ Funciona sin internet | ❌ Requiere conexión |
| **Personalización** | ✅ Total control | ❌ Limitada |

## Licencia
MIT License - Libre uso para proyectos personales y comerciales.

---

**🏠 Traducción 100% local y privada con LibreTranslate** 🚀
