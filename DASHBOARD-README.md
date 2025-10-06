# Dashboard de Mensajes - Documentación

## 🎯 Descripción
Sistema profesional de gestión de mensajes de contacto integrado en el portafolio. Permite recibir, visualizar y gestionar todos los mensajes que lleguen a través del formulario de contacto.

---

## 🔐 Acceso al Dashboard

### Credenciales
- **Contraseña:** `Gabydev2025!`
- **Duración de sesión:** 24 horas

### Cómo Acceder
1. Ve al footer de cualquier página del portafolio
2. Busca el icono azul de gráfico (📊) junto a los iconos de redes sociales
3. Haz clic en el icono
4. Ingresa la contraseña
5. ¡Listo! Ya tienes acceso al dashboard

---

## ✨ Características Principales

### 📊 Estadísticas en Tiempo Real
- **Mensajes Totales:** Contador total de mensajes recibidos
- **Mensajes Hoy:** Mensajes recibidos el día actual
- **Último Mensaje:** Tiempo transcurrido desde el último mensaje

### 📨 Gestión de Mensajes
Cada mensaje incluye:
- Nombre completo del contacto
- Email de contacto
- Empresa/Organización (si se proporcionó)
- Tipo de proyecto seleccionado
- Mensaje completo
- Fecha y hora exacta

### 🛠️ Funcionalidades

#### Responder Mensajes
- Click en "Responder" abre tu cliente de email
- El asunto se rellena automáticamente
- Respuesta directa al email del contacto

#### Eliminar Mensajes
- Elimina mensajes individuales
- Confirmación antes de eliminar
- Acción irreversible

#### Exportar Mensajes
- Descarga todos los mensajes en formato JSON
- Útil para respaldos
- Archivo con fecha incluida en el nombre

#### Limpiar Todo
- Elimina todos los mensajes de una vez
- Doble confirmación de seguridad
- Útil para empezar de cero

---

## 🔄 Funcionamiento del Sistema

### Flujo de Mensajes
1. Usuario completa el formulario de contacto
2. Mensaje se guarda automáticamente en localStorage
3. Dashboard actualiza la información cada 30 segundos
4. Notificación visual cuando hay nuevos mensajes
5. Contador de mensajes se actualiza en tiempo real

### Almacenamiento
- Los mensajes se guardan en el navegador (localStorage)
- Persistencia local (no requiere servidor)
- Accesible desde cualquier página del portafolio

---

## 🎨 Interfaz Profesional

### Diseño
- Estilo moderno y minimalista
- Tema oscuro consistente con el portafolio
- Animaciones suaves y profesionales
- Completamente responsive

### Experiencia de Usuario
- Navegación intuitiva
- Feedback visual inmediato
- Confirmaciones de seguridad
- Notificaciones de nuevos mensajes

---

## 🔧 Mantenimiento

### Limpiar Mensajes de Ejemplo
1. Abre `limpiar-dashboard.html` en tu navegador
2. Click en "Limpiar Mensajes de Ejemplo"
3. Confirma la acción

### Respaldo Manual
1. Ve al dashboard
2. Click en "Exportar"
3. Guarda el archivo JSON descargado

### Restaurar Mensajes
Si exportaste mensajes previamente:
1. Abre la consola del navegador (F12)
2. Ve a la pestaña "Console"
3. Ejecuta:
```javascript
const mensajes = [/* pega aquí el contenido del JSON exportado */];
localStorage.setItem('contactMessages', JSON.stringify(mensajes));
location.reload();
```

---

## 🔒 Seguridad

### Protección
- Autenticación con contraseña
- Sesión temporal (24h)
- Solo accesible localmente
- Sin exposición de datos sensibles

### Recomendaciones
- Cambia la contraseña regularmente (en `login.html`)
- Exporta mensajes importantes periódicamente
- No compartas la contraseña

---

## 📱 Responsive Design

El dashboard funciona perfectamente en:
- 💻 Desktop (1920px+)
- 💻 Laptop (1366px+)
- 📱 Tablet (768px+)
- 📱 Mobile (320px+)

---

## 🚀 Características Avanzadas

### Notificaciones en Tiempo Real
- Sonido suave al recibir nuevos mensajes
- Notificación visual en la esquina superior derecha
- Contador de mensajes nuevos

### Formateo Inteligente de Fechas
- "Hace un momento" para mensajes muy recientes
- "Hace X minutos/horas" para mensajes del día
- "Hace X días" para mensajes de la semana
- Fecha completa para mensajes antiguos

### Prevención de XSS
- Escape automático de HTML en mensajes
- Protección contra código malicioso
- Seguridad en la visualización

---

## 📝 Notas Importantes

1. Los mensajes se almacenan **localmente** en tu navegador
2. Si borras el caché del navegador, los mensajes se perderán
3. Haz exportaciones regulares para respaldos
4. El dashboard es **mono-usuario** (solo tú tienes acceso)
5. No hay límite de mensajes que puede almacenar

---

## 🆘 Solución de Problemas

### No veo el botón del dashboard
- Verifica que estés en el footer de la página
- Busca junto a los iconos de GitHub, LinkedIn y WhatsApp
- El botón tiene opacidad baja, pasa el mouse sobre él

### No recibo mensajes en el dashboard
- Verifica que el formulario se envíe correctamente
- Revisa la consola del navegador (F12) por errores
- Asegúrate de estar usando el mismo navegador

### Olvidé la contraseña
- La contraseña está en el archivo `login.html`
- Busca la línea: `const CORRECT_PASSWORD = 'Gabydev2025!';`
- Puedes cambiarla por una nueva

### Los mensajes desaparecieron
- Si limpiaste el caché del navegador, se habrán borrado
- Restaura desde un backup exportado previamente
- Los futuros mensajes se guardarán normalmente

---

## 📞 Contacto y Soporte

Para más información o soporte, contacta a:
- Email: peraltavasquez100@gmail.com
- WhatsApp: +1 (829) 563-9556

---

**Versión:** 1.0.0  
**Última actualización:** Octubre 2025  
**Desarrollado por:** Graviel Peralta
