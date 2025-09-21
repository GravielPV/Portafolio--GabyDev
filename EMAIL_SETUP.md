# Configuración del Sistema de Envío de Emails

## Pasos para activar el envío de emails en el formulario de contacto:

### 1. Crear cuenta en EmailJS
1. Ve a [https://www.emailjs.com/](https://www.emailjs.com/)
2. Regístrate con tu email
3. Verifica tu cuenta

### 2. Configurar el servicio de email
1. En el dashboard de EmailJS, ve a "Email Services"
2. Haz clic en "Add New Service"
3. Selecciona tu proveedor de email (Gmail, Outlook, etc.)
4. Conecta tu cuenta de email
5. Copia el **Service ID** que se genera

### 3. Crear template de email
1. Ve a "Email Templates"
2. Haz clic en "Create New Template"
3. Usa este contenido para el template:

**Subject:** Nuevo mensaje de contacto - {{from_name}}

**Content:**
```
Nuevo mensaje de contacto desde tu portafolio:

Nombre: {{from_name}}
Email: {{from_email}}
Empresa: {{company}}
Tipo de proyecto: {{project_type}}

Mensaje:
{{message}}

---
Este email fue enviado desde el formulario de contacto de tu portafolio web.
```

4. Guarda y copia el **Template ID**

### 4. Obtener la clave pública
1. Ve a "Account" → "General"
2. Copia tu **Public Key**

### 5. Configurar en el código
En el archivo `js/script.js`, reemplaza estas líneas:

```javascript
// Línea ~409:
emailjs.init("YOUR_PUBLIC_KEY"); // Reemplazar con tu Public Key

// Línea ~441:
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
```

**Ejemplo de configuración:**
```javascript
emailjs.init("user_abc123def456");
emailjs.send('service_gmail', 'template_contact', templateParams)
```

### 6. Configurar email de destino
En la línea ~436, asegúrate de que el email de destino sea correcto:
```javascript
to_email: 'peraltavasquez100@gmail.com' // Tu email real
```

## ¡Listo!
Una vez configurado, el formulario enviará emails reales con toda la información del contacto.

### Características implementadas:
- ✅ Envío real de emails
- ✅ Validación completa del formulario
- ✅ Estados de loading
- ✅ Notificaciones de éxito/error
- ✅ Fallback a WhatsApp si falla el email
- ✅ Reseteo automático del formulario
- ✅ Información completa en el email:
  - Nombre completo
  - Email del contacto
  - Empresa/Organización
  - Tipo de proyecto
  - Mensaje detallado

### Límites gratuitos de EmailJS:
- 200 emails por mes
- Perfecto para un portafolio personal