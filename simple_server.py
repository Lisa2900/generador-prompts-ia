#!/usr/bin/env python3
"""
Servidor LibreTranslate para Generador de Prompts IA
Versión de producción optimizada
"""
import json
import http.server
import socketserver
import threading
import time
import argostranslate.translate
import argostranslate.package

class TranslationHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        """Silenciar logs por defecto"""
        pass
    
    def do_POST(self):
        if self.path == '/translate':
            try:
                content_length = int(self.headers['Content-Length'])
                post_data = self.rfile.read(content_length)
                data = json.loads(post_data.decode('utf-8'))
                
                text = data.get('q', '').strip()
                source = data.get('source', 'es')
                target = data.get('target', 'en')
                
                if not text:
                    self.send_error_response('No text provided')
                    return
                
                # Traducir con cache simple
                translated = argostranslate.translate.translate(text, source, target)
                
                response = {'translatedText': translated}
                self.send_json_response(response)
                
                print(f"✅ '{text}' → '{translated}'")
                
            except Exception as e:
                print(f"❌ Error: {e}")
                self.send_error_response(str(e))
        else:
            self.send_error_response('Endpoint not found', 404)
    
    def do_OPTIONS(self):
        self.send_cors_headers()
        self.end_headers()
    
    def send_json_response(self, data):
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.send_cors_headers()
        self.end_headers()
        self.wfile.write(json.dumps(data, ensure_ascii=False).encode('utf-8'))
    
    def send_error_response(self, message, code=500):
        self.send_response(code)
        self.send_header('Content-Type', 'application/json')
        self.send_cors_headers()
        self.end_headers()
        error = {'error': message}
        self.wfile.write(json.dumps(error).encode('utf-8'))
    
    def send_cors_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')

def install_translation_models():
    """Instalar modelos de traducción español-inglés"""
    try:
        print("📦 Instalando modelos de traducción...")
        argostranslate.package.update_package_index()
        
        available_packages = argostranslate.package.get_available_packages()
        spanish_package = next(
            (p for p in available_packages if p.from_code == 'es' and p.to_code == 'en'), 
            None
        )
        
        if spanish_package:
            argostranslate.package.install_from_path(spanish_package.download())
            print("✅ Modelos instalados correctamente")
            
            # Prueba rápida
            test = argostranslate.translate.translate('hola', 'es', 'en')
            print(f"🧪 Prueba: 'hola' → '{test}'")
        else:
            print("❌ No se encontraron modelos español-inglés")
            
    except Exception as e:
        print(f"⚠️ Error instalando modelos: {e}")

if __name__ == '__main__':
    PORT = 5000
    
    print("🚀 LibreTranslate Server - Generador de Prompts IA")
    print("=" * 50)
    
    # Instalar modelos
    install_translation_models()
    
    print(f"🌐 Servidor: http://localhost:{PORT}")
    print(f"🔗 Endpoint: http://localhost:{PORT}/translate")
    print("⏹️ Ctrl+C para detener")
    print("=" * 50)
    
    # Iniciar servidor
    with socketserver.TCPServer(("", PORT), TranslationHandler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n🛑 Servidor detenido")
            httpd.shutdown()
