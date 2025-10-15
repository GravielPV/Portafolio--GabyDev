// ===== VARIABLES GLOBALES =====
let isLoading = true;
let currentFilter = 'all';

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Inicializar componentes principales
    initLoading();
    initNavigation();
    initTypingAnimation();
    initCounterAnimation();
    initScrollAnimations();
    initSkillBars();
    initProjectFilters();
    initContactForm(); // Para el modal flotante (index.html)
    initBackToTop();
    initAOS();
    initLanguageSelector();
    
    // Código dinámico en about section
    initCodeTyping();
    
    // Smooth scrolling para enlaces internos
    initSmoothScrolling();
    
    // Si no hay pantalla de carga, iniciar inmediatamente
    const loadingScreen = document.getElementById('loading-screen');
    if (!loadingScreen) {
        // Establecer que no está cargando
        isLoading = false;
        // Iniciar animaciones inmediatamente en páginas sin loading
        setTimeout(() => {
            startHeroAnimations();
        }, 100);
    }
}

// ===== LOADING SCREEN =====
function initLoading() {
    // Solo ejecutar si existe la pantalla de carga (solo en index.html)
    const loadingScreen = document.getElementById('loading-screen');
    if (!loadingScreen) return;
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            if (loadingScreen) {
                loadingScreen.style.opacity = '0';
                loadingScreen.style.visibility = 'hidden';
                isLoading = false;
                
                // Iniciar animaciones después de que se quite el loading
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    startHeroAnimations();
                }, 500);
            }
        }, 2000);
    });
}

// ===== NAVEGACIÓN =====
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navOverlay = document.querySelector('.nav-overlay');
    
    // Scroll effect para navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', (e) => {
            e.preventDefault();
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            if (navOverlay) {
                navOverlay.classList.toggle('active');
            }
            
            // Prevenir scroll del body cuando el menú está abierto
            document.body.classList.toggle('menu-open');
        });
    }
    
    // Cerrar menú al hacer click en overlay
    if (navOverlay) {
        navOverlay.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            navOverlay.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    }
    
    // Active link detection
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    // Cerrar menu mobile al hacer click en un link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            if (navOverlay) {
                navOverlay.classList.remove('active');
            }
            document.body.classList.remove('menu-open');
        });
    });
}

// ===== ANIMACIÓN DE ESCRITURA =====
function initTypingAnimation() {
    const typingElement = document.querySelector('.typing-animation');
    if (!typingElement) return;
    
    // Detectar si es móvil
    const isMobile = window.innerWidth <= 768;
    
    const texts = [
        'Desarrollador Web Full Stack',
        'Especialista en Frontend',
        'Creador de Experiencias Digitales',
        'Desarrollador de Aplicaciones Web'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeText() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        // Velocidad ajustada para móvil pero manteniendo la animación
        let typeSpeed = isDeleting ? (isMobile ? 30 : 50) : (isMobile ? 80 : 100);
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = isMobile ? 1500 : 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = isMobile ? 300 : 500;
        }
        
        setTimeout(typeText, typeSpeed);
    }
    
    // Iniciar después de que se quite el loading
    setTimeout(typeText, 3000);
}

// ===== CONTADORES ANIMADOS =====
function initCounterAnimation() {
    const counters = document.querySelectorAll('[data-count]');
    console.log('Contadores encontrados:', counters.length);
    
    if (counters.length === 0) {
        console.log('No se encontraron elementos con data-count');
        return;
    }
    
    // Método 1: IntersectionObserver
    const options = {
        threshold: 0.1,
        rootMargin: '50px 0px 50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log('Contador visible:', entry.target);
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                console.log('Valor objetivo:', target);
                
                // Verificar que el elemento no haya sido animado ya
                if (!counter.classList.contains('animated')) {
                    counter.classList.add('animated');
                    animateCounter(counter, target);
                }
                observer.unobserve(counter);
            }
        });
    }, options);
    
    counters.forEach(counter => {
        console.log('Observando contador:', counter);
        observer.observe(counter);
    });
    
    // Método 2: Scroll event como fallback
    let hasAnimated = false;
    
    function checkCountersOnScroll() {
        if (hasAnimated) return;
        
        counters.forEach(counter => {
            if (!counter.classList.contains('animated')) {
                const rect = counter.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
                
                if (isVisible) {
                    console.log('Contador visible por scroll:', counter);
                    const target = parseInt(counter.getAttribute('data-count'));
                    counter.classList.add('animated');
                    animateCounter(counter, target);
                }
            }
        });
        
        // Verificar si todos han sido animados
        const allAnimated = Array.from(counters).every(counter => 
            counter.classList.contains('animated')
        );
        
        if (allAnimated) {
            hasAnimated = true;
            window.removeEventListener('scroll', checkCountersOnScroll);
        }
    }
    
    window.addEventListener('scroll', checkCountersOnScroll);
    
    // Método 3: Fallback directo después de 2 segundos
    setTimeout(() => {
        counters.forEach(counter => {
            if (!counter.classList.contains('animated')) {
                console.log('Forzando animación para:', counter);
                const target = parseInt(counter.getAttribute('data-count'));
                counter.classList.add('animated');
                animateCounter(counter, target);
            }
        });
    }, 2000);
}

function animateCounter(element, target) {
    console.log('Iniciando animación para:', element, 'con objetivo:', target);
    
    let current = 0;
    const duration = 2000; // 2 segundos
    const frameDuration = 1000 / 60; // 60 FPS
    const totalFrames = Math.round(duration / frameDuration);
    const easeOutQuad = t => t * (2 - t); // Función de easing
    
    // Agregar clase de animación
    element.classList.add('animating');
    
    let frame = 0;
    const counter = setInterval(() => {
        frame++;
        const progress = easeOutQuad(frame / totalFrames);
        current = Math.round(target * progress);
        
        // Formatear número si es necesario
        if (target === 100) {
            element.textContent = current + '%';
        } else {
            element.textContent = current;
        }
        
        console.log('Frame:', frame, 'Current:', current, 'Target:', target);
        
        if (frame === totalFrames) {
            clearInterval(counter);
            // Asegurar que termine en el número exacto
            if (target === 100) {
                element.textContent = target + '%';
            } else {
                element.textContent = target;
            }
            
            console.log('Animación completada para:', element);
            
            // Agregar efecto de completado
            element.classList.remove('animating');
            element.classList.add('completed');
            
            // Remover la clase después de la animación
            setTimeout(() => {
                element.classList.remove('completed');
            }, 500);
        }
    }, frameDuration);
}

// ===== ANIMACIONES DE SCROLL =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observar elementos que necesitan animación
    const animateElements = document.querySelectorAll('.service-card, .project-card, .skill-category, .contact-method');
    animateElements.forEach(el => observer.observe(el));
}

// ===== BARRAS DE HABILIDADES =====
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    const options = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.getAttribute('data-width');
                skillBar.style.width = width;
                observer.unobserve(skillBar);
            }
        });
    }, options);
    
    skillBars.forEach(bar => observer.observe(bar));
}

// ===== FILTROS DE PROYECTOS =====
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Actualizar botones activos
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filtrar proyectos
            filterProjects(filter);
        });
    });
}

function filterProjects(filter) {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            }, 100);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.8)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

// ===== FORMULARIO DE CONTACTO (MODAL) =====
function initContactForm() {
    const form = document.getElementById('modalContactForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener datos del formulario
        const formData = {
            name: document.getElementById('modal-name').value,
            email: document.getElementById('modal-email').value,
            company: document.getElementById('modal-company').value || 'N/A',
            subject: document.getElementById('modal-subject').value,
            message: document.getElementById('modal-message').value,
            date: new Date().toISOString()
        };
        
        // Guardar en localStorage
        let messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
        messages.push(formData);
        localStorage.setItem('contactMessages', JSON.stringify(messages));
        
        // Crear mensaje de éxito visual
        const button = form.querySelector('button[type="submit"]');
        const originalHTML = button.innerHTML;
        
        // Cambiar botón a estado de éxito
        button.innerHTML = '<i class="fas fa-check"></i> <span>¡Mensaje Enviado Correctamente!</span>';
        button.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        button.disabled = true;
        
        // Limpiar formulario
        form.reset();
        
        // Restaurar botón y cerrar modal después de 3 segundos
        setTimeout(() => {
            button.innerHTML = originalHTML;
            button.style.background = 'var(--gradient-primary)';
            button.disabled = false;
            closeContactModal();
        }, 3000);
    });
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    
    // Validar formulario
    if (!validateForm(form)) {
        return;
    }
    
    // Mostrar loading en el botón
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando...';
    submitBtn.disabled = true;
    
    // Obtener datos del formulario
    const formData = {
        name: form.name.value,
        email: form.email.value,
        company: form.company.value || 'No especificado',
        projectType: form.subject.options[form.subject.selectedIndex].text,
        message: form.message.value
    };
    
    // Simular procesamiento
    setTimeout(() => {
        // Restaurar botón
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Mostrar opciones de envío
        showContactOptions(formData);
        
        // Limpiar formulario
        form.reset();
        showNotification('Formulario listo. Elige cómo enviar tu mensaje 📩', 'info');
        
    }, 1500);
}

// ===== FUNCIONES ANTIGUAS DESHABILITADAS =====
// Estas funciones ya no se usan porque ahora todo se guarda en localStorage
/*
function showContactOptions(data) {
    // ... código antiguo comentado ...
}

function sendViaWhatsApp(url) {
    window.open(url, '_blank');
    closeContactModal();
    showNotification('WhatsApp abierto. Envía el mensaje desde la app 📱', 'info');
}

function sendViaEmail(url) {
    window.location.href = url;
    closeContactModal();
    showNotification('Tu cliente de email se abrió. Revisa y envía el mensaje 📧', 'info');
}
*/

function closeContactModal() {
    const modal = document.getElementById('contactModal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.getAttribute('name');
    let isValid = true;
    let errorMessage = '';
    
    // Limpiar errores previos
    clearFieldError(field);
    
    if (field.hasAttribute('required') && !value) {
        errorMessage = 'Este campo es requerido';
        isValid = false;
    } else if (fieldName === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            errorMessage = 'Por favor ingresa un email válido';
            isValid = false;
        }
    } else if (fieldName === 'phone' && value) {
        const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
        if (!phoneRegex.test(value)) {
            errorMessage = 'Por favor ingresa un número de teléfono válido';
            isValid = false;
        }
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

function showFieldError(field, message) {
    field.classList.add('error');
    
    let errorElement = field.parentNode.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        field.parentNode.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    errorElement.style.color = '#ef4444';
    errorElement.style.fontSize = '0.8rem';
    errorElement.style.marginTop = '0.25rem';
}

function clearFieldError(field) {
    field.classList.remove('error');
    const errorElement = field.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Estilos de la notificación
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover después de 5 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// ===== BACK TO TOP =====
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== AOS INITIALIZATION =====
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }
}

// ===== ANIMACIONES HERO =====
function startHeroAnimations() {
    // Solo ejecutar si existen elementos del hero (solo en index.html)
    const heroElements = document.querySelectorAll('.hero-text > *');
    if (heroElements.length === 0) return;
    
    // Animar elementos del hero después del loading
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease';
            
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 100);
        }, index * 200);
    });
}

// ===== CÓDIGO DINÁMICO EN ABOUT =====
function initCodeTyping() {
    const codeElement = document.getElementById('typing-code');
    if (!codeElement) return;
    
    // Detectar si es móvil
    const isMobile = window.innerWidth <= 768;
    
    const code = `const gravielPeralta = {
  name: "Graviel Peralta",
  role: "Full Stack Developer",
  location: "República Dominicana",
  
  skills: {
    frontend: ["HTML5", "CSS3", "JavaScript", "React", "Vue.js"],
    backend: ["Node.js", "Python", "PHP", "Express"],
    database: ["MySQL", "PostgreSQL", "MongoDB"],
    tools: ["Git", "Docker", "AWS", "Figma"]
  },
  
  passion: "Transformar ideas en realidad digital",
  
  getContact() {
    return {
      email: "peraltavasquez100@gmail.com",
      whatsapp: "+1 (829) 563-9556",
      linkedin: "graviel-peralta",
      github: "GravielPV"
    };
  },
  
  getCurrentProject() {
    return "Construyendo el futuro, una línea de código a la vez";
  }
};

// ¡Listo para crear algo increíble juntos! 🚀`;

    const mobileCode = `const graviel = {
  name: "Graviel Peralta",
  role: "Full Stack Developer",
  location: "República Dominicana",
  
  skills: {
    frontend: ["HTML5", "CSS3", 
              "JavaScript", "React"],
    backend: ["Node.js", "Python", 
             "PHP", "Express"],
    database: ["MySQL", "PostgreSQL", 
              "MongoDB"],
    tools: ["Git", "Docker", 
           "AWS", "Figma"]
  },
  
  passion: "Transformar ideas",
  
  getContact() {
    return {
      email: "peraltavasquez100@gmail.com",
      whatsapp: "+1 (829) 563-9556",
      linkedin: "graviel-peralta"
    };
  }
};

// ¡Listo para crear! 🚀`;

    let index = 0;
    const finalCode = isMobile ? mobileCode : code;
    
    function typeCode() {
        if (index < finalCode.length) {
            codeElement.textContent = finalCode.substring(0, index + 1);
            index++;
            // Velocidad más rápida en móvil
            const speed = isMobile ? 15 : 20;
            setTimeout(typeCode, speed);
        }
    }
    
    // Iniciar cuando el elemento sea visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(typeCode, 500);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(codeElement);
}

// ===== EFECTOS DE PARTÍCULAS =====
function createParticles() {
    const particlesContainer = document.querySelector('.hero-particles');
    if (!particlesContainer) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: #3b82f6;
            border-radius: 50%;
            opacity: 0.5;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: particleFloat ${5 + Math.random() * 10}s infinite linear;
        `;
        particlesContainer.appendChild(particle);
    }
}

// ===== PARALLAX EFFECT =====
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const parallaxElements = document.querySelectorAll('.floating-shapes .shape');
        
        parallaxElements.forEach((el, index) => {
            const speed = 0.5 + (index * 0.1);
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// ===== INTERSECTION OBSERVER PARA ANIMACIONES =====
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observar elementos con animaciones
    const elements = document.querySelectorAll('[data-aos]');
    elements.forEach(el => observer.observe(el));
}

// ===== PRELOADER DE IMÁGENES =====
function preloadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ===== TEMA OSCURO/CLARO (FUNCIONALIDAD ADICIONAL) =====
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    themeToggle.addEventListener('click', () => {
        const theme = document.documentElement.getAttribute('data-theme');
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// ===== PERFORMANCE OPTIMIZATION =====
function optimizePerformance() {
    // Lazy loading para elementos pesados
    const lazyElements = document.querySelectorAll('.lazy-load');
    const lazyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('lazy-load');
                lazyObserver.unobserve(entry.target);
            }
        });
    });
    
    lazyElements.forEach(el => lazyObserver.observe(el));
    
    // Debounce para eventos de scroll
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(() => {
            // Lógica de scroll optimizada
        }, 10);
    });
}

// ===== INICIALIZACIÓN ADICIONAL =====
window.addEventListener('load', () => {
    createParticles();
    initParallax();
    preloadImages();
    optimizePerformance();
});

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('Error en la aplicación:', e.error);
});

// ===== UTILIDADES =====
function debounce(func, wait) {
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== ANALYTICS (OPCIONAL) =====
function trackEvent(eventName, properties = {}) {
    // Aquí puedes integrar Google Analytics, Mixpanel, etc.
    console.log('Event tracked:', eventName, properties);
}

// Trackear interacciones importantes
document.addEventListener('click', (e) => {
    if (e.target.matches('.btn, .nav-link, .project-link')) {
        trackEvent('click', {
            element: e.target.textContent || e.target.className,
            page: window.location.pathname
        });
    }
});

// ===== SERVICE WORKER (PWA - OPCIONAL) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker registrado:', registration);
            })
            .catch(error => {
                console.log('Error al registrar Service Worker:', error);
            });
    });
}

// ===== LANGUAGE SELECTOR =====
function initLanguageSelector() {
    const languageToggle = document.getElementById('languageToggle');
    const languageDropdown = document.getElementById('languageDropdown');
    const langOptions = document.querySelectorAll('.lang-option');
    const currentLangSpan = document.querySelector('.current-lang');

    if (!languageToggle || !languageDropdown) {
        console.log('Language selector elements not found');
        return;
    }

    console.log('Language selector initialized');

    // Cargar idioma guardado
    const savedLang = localStorage.getItem('portfolio-language') || 'es';
    setLanguage(savedLang);

    // Toggle dropdown con debug mejorado
    languageToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        console.log('Language toggle clicked');
        
        const isActive = languageToggle.classList.contains('active');
        
        if (isActive) {
            // Cerrar
            languageToggle.classList.remove('active');
            languageDropdown.classList.remove('show');
            console.log('Dropdown closed');
        } else {
            // Abrir
            languageToggle.classList.add('active');
            languageDropdown.classList.add('show');
            console.log('Dropdown opened');
            
            // Force show with inline styles for debugging
            languageDropdown.style.display = 'block';
            languageDropdown.style.opacity = '1';
            languageDropdown.style.visibility = 'visible';
            languageDropdown.style.transform = 'translateY(0) scale(1)';
        }
    });

    // Cerrar dropdown al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (!languageToggle.contains(e.target) && !languageDropdown.contains(e.target)) {
            languageToggle.classList.remove('active');
            languageDropdown.classList.remove('show');
            // Reset inline styles
            languageDropdown.style.display = '';
            languageDropdown.style.opacity = '';
            languageDropdown.style.visibility = '';
            languageDropdown.style.transform = '';
        }
    });

    // Cambiar idioma
    langOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const selectedLang = this.getAttribute('data-lang');
            console.log('Language selected:', selectedLang);
            
            setLanguage(selectedLang);
            localStorage.setItem('portfolio-language', selectedLang);
            
            // Cerrar dropdown
            languageToggle.classList.remove('active');
            languageDropdown.classList.remove('show');
            // Reset inline styles
            languageDropdown.style.display = '';
            languageDropdown.style.opacity = '';
            languageDropdown.style.visibility = '';
            languageDropdown.style.transform = '';
        });
    });

    function setLanguage(lang) {
        console.log('Setting language to:', lang);
        
        // Actualizar UI del selector
        langOptions.forEach(option => {
            option.classList.remove('active');
            if (option.getAttribute('data-lang') === lang) {
                option.classList.add('active');
                if (currentLangSpan) {
                    currentLangSpan.textContent = lang.toUpperCase();
                }
            }
        });

        // Aplicar traducciones
        translatePage(lang);
    }
}

function getCurrentLanguage() {
    return localStorage.getItem('portfolio-language') || 'es';
}

function translatePage(lang) {
    const translations = {
        es: {
            // Navegación
            'nav-inicio': 'Inicio',
            'nav-sobre': 'Sobre Mí',
            'nav-servicios': 'Servicios',
            'nav-proyectos': 'Proyectos',
            'nav-habilidades': 'Habilidades',
            'nav-contacto': 'Contacto',
            
            // Hero Section (Index)
            'hero-available': 'Disponible para contratación',
            'hero-greeting': '¡Hola! Soy',
            'hero-role': 'Desarrollador Web Full Stack',
            'hero-description': 'Desarrollo aplicaciones web modernas y escalables. Especializado en React, Node.js y arquitecturas cloud. Busco oportunidades remotas o híbridas.',
            'work-remote': 'Trabajo Remoto',
            'work-flexible': 'Horario Flexible',
            'work-timezone': 'GMT-4 (EDT)',
            'btn-work': 'Ver Mi Trabajo',
            'btn-contact': 'Contáctame',
            'btn-cv': 'Descargar CV',
            'stat-projects': 'Proyectos Completados',
            'stat-experience': 'Años Experiencia',
            'stat-code': '% Código Limpio',
            
            // About Page
            'about-title': 'Sobre Mí',
            'about-subtitle': 'Mi Historia',
            'about-description': 'Desarrollador Full Stack apasionado por crear soluciones innovadoras',
            'about-intro': 'Soy un desarrollador web especializado en tecnologías modernas con más de 2 años de experiencia creando aplicaciones escalables.',
            'about-tech-focus': 'Mi enfoque principal está en el desarrollo de aplicaciones web usando JavaScript, React, Node.js y tecnologías cloud.',
            
            // Services Page
            'services-title': 'Servicios',
            'services-subtitle': 'Lo Que Ofrezco',
            'services-description': 'Soluciones tecnológicas profesionales adaptadas a tus necesidades',
            'service-frontend': 'Desarrollo Frontend',
            'service-frontend-desc': 'Interfaces modernas y responsivas con React, Vue.js y tecnologías actuales',
            'service-backend': 'Desarrollo Backend',
            'service-backend-desc': 'APIs robustas y escalables con Node.js, Python y bases de datos',
            'service-database': 'Gestión de Bases de Datos',
            'service-database-desc': 'Diseño y optimización de bases de datos SQL y NoSQL',
            
            // Projects Page
            'projects-title': 'Proyectos Reales',
            'projects-subtitle': 'Mi trabajo',
            'projects-description': 'Proyectos desarrollados para clientes reales. Cada uno resuelve problemas específicos del negocio.',
            'filter-all': 'Todos',
            'filter-web': 'Sitios Web',
            'filter-mobile': 'Móvil',
            'filter-fullstack': 'Aplicaciones',
            'btn-live': 'Ver Proyecto',
            'btn-code': 'Ver Código',
            
            // Real Projects
            'project-crm-title': 'CRM para Doctores',
            'project-crm-desc': 'Sistema completo de gestión médica para doctores. Incluye gestión de pacientes, citas, expedientes médicos y reportes. Interfaz moderna y segura desarrollada en React.',
            'project-allstorage-title': 'All Storage Shop',
            'project-allstorage-desc': 'Tienda online profesional de moda y belleza. Incluye catálogo de productos, carrito de compras, sistema de pagos, panel administrativo y optimización SEO. Diseñada para alta conversión.',
            'project-restaurant-title': 'Pasteles en Hoja Margarita',
            'project-restaurant-desc': 'Menú digital interactivo para restaurante dominicano. Incluye catálogo de platos, información de contacto, horarios y sistema de pedidos directos por WhatsApp. Perfecto para mostrar la gastronomía local.',
            'project-gabydev-title': 'Gaby Dev - Servicios Web',
            'project-gabydev-desc': 'Landing page profesional para servicios de desarrollo web. Incluye portafolio de trabajos, proceso de contratación, paquetes de precios y formulario de contacto optimizado para conversión.',
            'project-pomodoro-title': 'Pomodoro Timer',
            'project-pomodoro-desc': 'Aplicación web de productividad basada en la técnica Pomodoro. Incluye temporizador personalizable, lista de tareas, música de fondo y estadísticas de sesiones. Perfecta para mejorar el enfoque y la productividad.',
            'project-yahve-title': 'Yahve Nisi Publicaciones',
            'project-yahve-desc': 'Sitio web corporativo para agencia de impresión. Incluye portafolio de trabajos, servicios de impresión digital, galería de proyectos, formulario de contacto y integración con redes sociales.',
            'projects-cta-title': '¿Te interesa algún proyecto?',
            'projects-cta-desc': 'Conversemos sobre cómo podemos crear algo increíble juntos.',
            'btn-skills': 'Ver Habilidades',
            
            // Skills Page
            'skills-title': 'Habilidades',
            'skills-subtitle': 'Tecnologías',
            'skills-description': 'Las herramientas y tecnologías que domino',
            'skills-frontend-title': 'Frontend',
            'skills-backend-title': 'Backend',
            'skills-database-title': 'Base de Datos',
            'skills-tools-title': 'Herramientas',
            
            // Contact Page
            'contact-title': 'Contacto',
            'contact-subtitle': 'Trabajemos Juntos',
            'contact-description': 'Actualmente estoy disponible para nuevas oportunidades y proyectos interesantes. Conversemos sobre cómo podemos dar vida a tus ideas.',
            'contact-info-title': 'Información de Contacto',
            'contact-info-desc': '¿Prefieres un enfoque directo? Contáctame a través de cualquiera de estos canales y te responderé en un plazo de 24 horas.',
            'contact-form-title': 'Envía un Mensaje',
            'contact-form-desc': 'Cuéntame sobre tu proyecto y te responderé en 24 horas con los siguientes pasos.',
            'form-name': 'Nombre Completo',
            'form-email': 'Correo Electrónico',
            'form-company': 'Empresa / Organización',
            'form-project-type': 'Tipo de Proyecto',
            'form-project-select': 'Selecciona el tipo de proyecto',
            'form-web-dev': 'Desarrollo Web',
            'form-fullstack': 'Aplicación Full-Stack',
            'form-frontend': 'Desarrollo Frontend',
            'form-backend': 'Desarrollo Backend y APIs',
            'form-consultation': 'Consulta Técnica',
            'form-employment': 'Oportunidad Laboral',
            'form-other': 'Otro',
            'form-details': 'Detalles del Proyecto',
            'form-details-placeholder': 'Describe tu proyecto, requisitos, cronograma y cualquier tecnología específica que tengas en mente...',
            'btn-send': 'Enviar Mensaje',
            'contact-cta-title': '¿Listo para Comenzar tu Proyecto?',
            'contact-cta-desc': 'Ya seas una startup buscando construir tu primer producto o una empresa establecida que necesita escalar su stack tecnológico, estoy aquí para ayudar.',
            'btn-whatsapp': 'Chat Rápido',
            'btn-email': 'Envíame un Email',
            
            // Footer
            'footer-desc': 'Desarrollador Web Full Stack especializado en tecnologías modernas.',
            'footer-services': 'Servicios',
            'footer-links': 'Enlaces',
            'footer-contact': 'Contacto',
            'footer-rights': 'Todos los derechos reservados.',
            
            // CV Download
            'cv-download-success': '¡Descarga de CV iniciada! Revisa tu carpeta de descargas.',
            
            // Contact Availability
            'contact-availability': 'Disponible para oportunidades de tiempo completo, proyectos freelance y consultas técnicas.'
        },
        en: {
            // Navigation
            'nav-inicio': 'Home',
            'nav-sobre': 'About',
            'nav-servicios': 'Services',
            'nav-proyectos': 'Projects',
            'nav-habilidades': 'Skills',
            'nav-contacto': 'Contact',
            
            // Hero Section (Index)
            'hero-available': 'Available for hire',
            'hero-greeting': 'Hello! I\'m',
            'hero-role': 'Full Stack Web Developer',
            'hero-description': 'I develop modern and scalable web applications. Specialized in React, Node.js and cloud architectures. Looking for remote or hybrid opportunities.',
            'work-remote': 'Remote Work',
            'work-flexible': 'Flexible Schedule',
            'work-timezone': 'GMT-4 (EDT)',
            'btn-work': 'View My Work',
            'btn-contact': 'Contact Me',
            'btn-cv': 'Download CV',
            'stat-projects': 'Completed Projects',
            'stat-experience': 'Years Experience',
            'stat-code': '% Clean Code',
            
            // About Page
            'about-title': 'About Me',
            'about-subtitle': 'My Story',
            'about-description': 'Full Stack Developer passionate about creating innovative solutions',
            'about-intro': 'I am a web developer specialized in modern technologies with over 2 years of experience creating scalable applications.',
            'about-tech-focus': 'My main focus is on developing web applications using JavaScript, React, Node.js and cloud technologies.',
            
            // Services Page
            'services-title': 'Services',
            'services-subtitle': 'What I Offer',
            'services-description': 'Professional technology solutions tailored to your needs',
            'service-frontend': 'Frontend Development',
            'service-frontend-desc': 'Modern and responsive interfaces with React, Vue.js and current technologies',
            'service-backend': 'Backend Development',
            'service-backend-desc': 'Robust and scalable APIs with Node.js, Python and databases',
            'service-database': 'Database Management',
            'service-database-desc': 'Design and optimization of SQL and NoSQL databases',
            
            // Projects Page
            'projects-title': 'Real Projects',
            'projects-subtitle': 'My Work',
            'projects-description': 'Projects developed for real clients. Each one solves specific business problems.',
            'filter-all': 'All',
            'filter-web': 'Websites',
            'filter-mobile': 'Mobile',
            'filter-fullstack': 'Applications',
            'btn-live': 'View Project',
            'btn-code': 'View Code',
            
            // Real Projects
            'project-crm-title': 'CRM for Doctors',
            'project-crm-desc': 'Complete medical management system for doctors. Includes patient management, appointments, medical records and reports. Modern and secure interface developed in React.',
            'project-allstorage-title': 'All Storage Shop',
            'project-allstorage-desc': 'Professional online fashion and beauty store. Includes product catalog, shopping cart, payment system, admin panel and SEO optimization. Designed for high conversion.',
            'project-restaurant-title': 'Pasteles en Hoja Margarita',
            'project-restaurant-desc': 'Interactive digital menu for Dominican restaurant. Includes dish catalog, contact information, schedules and direct ordering system via WhatsApp. Perfect for showcasing local cuisine.',
            'project-gabydev-title': 'Gaby Dev - Web Services',
            'project-gabydev-desc': 'Professional landing page for web development services. Includes portfolio of work, hiring process, pricing packages and contact form optimized for conversion.',
            'project-pomodoro-title': 'Pomodoro Timer',
            'project-pomodoro-desc': 'Productivity web application based on the Pomodoro technique. Includes customizable timer, task list, background music and session statistics. Perfect for improving focus and productivity.',
            'project-yahve-title': 'Yahve Nisi Publications',
            'project-yahve-desc': 'Corporate website for printing agency. Includes portfolio of work, digital printing services, project gallery, contact form and social media integration.',
            'projects-cta-title': 'Interested in any project?',
            'projects-cta-desc': 'Let\'s talk about how we can create something amazing together.',
            'btn-skills': 'View Skills',
            
            // Skills Page
            'skills-title': 'Skills',
            'skills-subtitle': 'Technologies',
            'skills-description': 'The tools and technologies I master',
            'skills-frontend-title': 'Frontend',
            'skills-backend-title': 'Backend',
            'skills-database-title': 'Database',
            'skills-tools-title': 'Tools',
            
            // Contact Page
            'contact-title': 'Contact',
            'contact-subtitle': 'Let\'s Work Together',
            'contact-description': 'I\'m currently available for new opportunities and interesting projects. Let\'s discuss how we can bring your ideas to life.',
            'contact-info-title': 'Contact Information',
            'contact-info-desc': 'Prefer a direct approach? Reach out through any of these channels and I\'ll get back to you within 24 hours.',
            'contact-form-title': 'Send a Message',
            'contact-form-desc': 'Tell me about your project and I\'ll respond within 24 hours with next steps.',
            'form-name': 'Full Name',
            'form-email': 'Email Address',
            'form-company': 'Company / Organization',
            'form-project-type': 'Project Type',
            'form-project-select': 'Select project type',
            'form-web-dev': 'Web Development',
            'form-fullstack': 'Full-Stack Application',
            'form-frontend': 'Frontend Development',
            'form-backend': 'Backend & API Development',
            'form-consultation': 'Technical Consultation',
            'form-employment': 'Employment Opportunity',
            'form-other': 'Other',
            'form-details': 'Project Details',
            'form-details-placeholder': 'Describe your project, requirements, timeline, and any specific technologies you have in mind...',
            'btn-send': 'Send Message',
            'contact-cta-title': 'Ready to Start Your Project?',
            'contact-cta-desc': 'Whether you\'re a startup looking to build your first product or an established company needing to scale your tech stack, I\'m here to help.',
            'btn-whatsapp': 'Quick Chat',
            'btn-email': 'Email Me',
            
            // Footer
            'footer-desc': 'Full Stack Web Developer specialized in modern technologies.',
            'footer-services': 'Services',
            'footer-links': 'Links',
            'footer-contact': 'Contact',
            'footer-rights': 'All rights reserved.',
            
            // CV Download
            'cv-download-success': 'CV download started! Check your downloads folder.',
            
            // Contact Availability
            'contact-availability': 'Available for full-time opportunities, freelance projects and technical consultations.'
        }
    };

    const currentTranslations = translations[lang];
    if (!currentTranslations) return;

    // Aplicar traducciones a elementos con data-translate
    Object.keys(currentTranslations).forEach(key => {
        const elements = document.querySelectorAll(`[data-translate="${key}"]`);
        elements.forEach(element => {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = currentTranslations[key];
            } else {
                element.textContent = currentTranslations[key];
            }
        });
    });

    // Actualizar elementos dinámicos específicos
    updateDynamicElements(lang, currentTranslations);
}

function updateDynamicElements(lang, translations) {
    // Actualizar typing animation si existe
    const typingElement = document.querySelector('.typing-animation');
    if (typingElement && translations['hero-role']) {
        // Reiniciar la animación de typing con el nuevo texto
        typingElement.textContent = '';
        setTimeout(() => {
            typingElement.textContent = translations['hero-role'];
        }, 100);
    }

    // Actualizar selectores de formulario
    const projectSelect = document.getElementById('subject');
    if (projectSelect) {
        const options = projectSelect.querySelectorAll('option');
        options.forEach((option, index) => {
            const optionKeys = [
                'form-project-select',
                'form-web-dev',
                'form-fullstack',
                'form-frontend',
                'form-backend',
                'form-consultation',
                'form-employment',
                'form-other'
            ];
            if (optionKeys[index] && translations[optionKeys[index]]) {
                option.textContent = translations[optionKeys[index]];
            }
        });
    }

    // Actualizar copyright year
    const currentYear = new Date().getFullYear();
    const footerCopyright = document.querySelector('.footer-bottom p');
    if (footerCopyright && translations['footer-rights']) {
        footerCopyright.textContent = `© ${currentYear} Graviel Peralta. ${translations['footer-rights']}`;
    }
}

// ===== CV DOWNLOAD FUNCTIONALITY =====
function downloadCV() {
    const currentLang = getCurrentLanguage();
    let cvPath, fileName;
    
    if (currentLang === 'en') {
        cvPath = 'assets/CV_Graviel_Peralta_Harvard_EN.pdf';
        fileName = 'CV_Graviel_Peralta_English.pdf';
    } else {
        cvPath = 'assets/CV_Graviel_Peralta- Español-ESTILO HARVAR.pdf';
        fileName = 'CV_Graviel_Peralta_Español.pdf';
    }
    
    // Crear elemento de descarga temporal
    const link = document.createElement('a');
    link.href = cvPath;
    link.download = fileName;
    link.target = '_blank';
    
    // Agregar al DOM temporalmente y hacer clic
    document.body.appendChild(link);
    link.click();
    
    // Remover el elemento temporal
    document.body.removeChild(link);
    
    // Mostrar notificación de descarga con traducciones
    const translations = {
        es: { 'cv-download-success': '¡Descarga de CV iniciada! Revisa tu carpeta de descargas.' },
        en: { 'cv-download-success': 'CV download started! Check your downloads folder.' }
    };
    
    showNotification(translations[currentLang]['cv-download-success'], 'success');
}

// ===== SCREENSHOT MODAL FUNCTIONALITY =====
const screenshots = {
    crm: {
        title: 'CRM para Doctores',
        titleEn: 'CRM for Doctors',
        images: [
            'FotoProyecto/CRM/1-login.png',
            'FotoProyecto/CRM/2-pagina principal.png',
            'FotoProyecto/CRM/3-paciente.png',
            'FotoProyecto/CRM/4-citas.png',
            'FotoProyecto/CRM/5-facturacion.png',
            'FotoProyecto/CRM/6-comunicacion.png',
            'FotoProyecto/CRM/7-administracion.png',
            'FotoProyecto/CRM/8-reportes.png'
        ],
        url: 'https://crm-gaby-dev.netlify.app/'
    },
    allstorage: {
        title: 'All Storage Shop',
        titleEn: 'All Storage Shop',
        images: [
            'FotoProyecto/ALLSTORAGE/1-pagina principal.png',
            'FotoProyecto/ALLSTORAGE/2-pagina principal.png',
            'FotoProyecto/ALLSTORAGE/3-categoria.png',
            'FotoProyecto/ALLSTORAGE/4-contacto.png'
        ],
        url: 'https://allstorage.shop/'
    },
    restaurant: {
        title: 'Pasteles en Hoja Margarita',
        titleEn: 'Pasteles en Hoja Margarita',
        images: [
            'FotoProyecto/RESTAURANTE/1-PRINCIPAL.png',
            'FotoProyecto/RESTAURANTE/2-COMIDA.png',
            'FotoProyecto/RESTAURANTE/3-BEBIDAS.png',
            'FotoProyecto/RESTAURANTE/4-VARIADOS.png'
        ],
        url: 'https://pasteles-en-hoja-margarita.netlify.app/'
    },
    gabydev: {
        title: 'Gaby Dev - Servicios Web',
        titleEn: 'Gaby Dev - Web Services',
        images: [
            'FotoProyecto/PAGINAWEB/1-Principal.png',
            'FotoProyecto/PAGINAWEB/2-segundaPa.png',
            'FotoProyecto/PAGINAWEB/3-precios.png',
            'FotoProyecto/PAGINAWEB/4-contacto.png',
            'FotoProyecto/PAGINAWEB/5-admin.png',
            'FotoProyecto/PAGINAWEB/6-dash.png',
            'FotoProyecto/PAGINAWEB/7-anali.png',
            'FotoProyecto/PAGINAWEB/8-conf.png'
        ],
        url: 'https://gravielpv.github.io/Gaby-Dev/'
    },
    pomodoro: {
        title: 'Pomodoro Timer',
        titleEn: 'Pomodoro Timer',
        images: [
            'FotoProyecto/POMODORO/1-principal banco.png',
            'FotoProyecto/POMODORO/2-principal negro.png',
            'FotoProyecto/POMODORO/3-tareas.png',
            'FotoProyecto/POMODORO/4-musica.png',
            'FotoProyecto/POMODORO/5-preguntas.png',
            'FotoProyecto/POMODORO/6-personalizar.png'
        ],
        url: 'https://gravielpv.github.io/Pomodoro-GabyDev/'
    },
    yahve: {
        title: 'Yahve Nisi Publicaciones',
        titleEn: 'Yahve Nisi Publications',
        images: [
            'FotoProyecto/AGENCIA/1-principal.png',
            'FotoProyecto/AGENCIA/2-carrusel.png',
            'FotoProyecto/AGENCIA/3-servicios.png',
            'FotoProyecto/AGENCIA/4-contacto.png',
            'FotoProyecto/AGENCIA/5-mapa.png'
        ],
        url: 'https://gravielpv.github.io/Yahve-nisi/'
    }
};

// Variables globales para el carrusel
let currentProject = null;
let currentImageIndex = 0;

function openScreenshot(projectId) {
    const modal = document.getElementById('screenshotModal');
    const modalTitle = document.getElementById('modalTitle');
    const screenshotImage = document.getElementById('screenshotImage');
    const visitButton = document.getElementById('visitProject');
    const currentImageNumber = document.getElementById('currentImageNumber');
    const totalImages = document.getElementById('totalImages');
    const carouselIndicators = document.getElementById('carouselIndicators');
    
    const project = screenshots[projectId];
    const currentLang = getCurrentLanguage();
    
    if (project) {
        currentProject = project;
        currentImageIndex = 0;
        
        modalTitle.textContent = currentLang === 'en' ? project.titleEn : project.title;
        visitButton.onclick = () => window.open(project.url, '_blank');
        
        // Configurar carrusel
        if (project.images && project.images.length > 1) {
            // Múltiples imágenes - mostrar carrusel
            totalImages.textContent = project.images.length;
            setupCarousel();
            updateCarouselImage();
        } else {
            // Una sola imagen - modo simple
            const imageUrl = project.images ? project.images[0] : project.image;
            screenshotImage.src = imageUrl;
            screenshotImage.alt = `Screenshot de ${project.title}`;
            totalImages.textContent = '1';
            currentImageNumber.textContent = '1';
            carouselIndicators.innerHTML = '';
            document.getElementById('prevBtn').style.display = 'none';
            document.getElementById('nextBtn').style.display = 'none';
        }
        
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
        
        document.body.style.overflow = 'hidden';
    }
}

function setupCarousel() {
    const carouselIndicators = document.getElementById('carouselIndicators');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    // Mostrar botones de navegación
    prevBtn.style.display = 'flex';
    nextBtn.style.display = 'flex';
    
    // Crear indicadores
    carouselIndicators.innerHTML = '';
    currentProject.images.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.className = 'indicator';
        if (index === 0) indicator.classList.add('active');
        indicator.onclick = () => goToImage(index);
        carouselIndicators.appendChild(indicator);
    });
}

function updateCarouselImage() {
    const screenshotImage = document.getElementById('screenshotImage');
    const currentImageNumber = document.getElementById('currentImageNumber');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (currentProject && currentProject.images) {
        screenshotImage.src = currentProject.images[currentImageIndex];
        screenshotImage.alt = `Screenshot ${currentImageIndex + 1} de ${currentProject.title}`;
        currentImageNumber.textContent = currentImageIndex + 1;
        
        // Actualizar indicadores
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentImageIndex);
        });
        
        // Actualizar botones
        prevBtn.disabled = currentImageIndex === 0;
        nextBtn.disabled = currentImageIndex === currentProject.images.length - 1;
    }
}

function nextImage() {
    if (currentProject && currentProject.images && currentImageIndex < currentProject.images.length - 1) {
        currentImageIndex++;
        updateCarouselImage();
    }
}

function prevImage() {
    if (currentProject && currentProject.images && currentImageIndex > 0) {
        currentImageIndex--;
        updateCarouselImage();
    }
}

function goToImage(index) {
    if (currentProject && currentProject.images && index >= 0 && index < currentProject.images.length) {
        currentImageIndex = index;
        updateCarouselImage();
    }
}


function closeScreenshot() {
    const modal = document.getElementById('screenshotModal');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        currentProject = null;
        currentImageIndex = 0;
    }, 300);
}

// Event listeners para el modal
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('screenshotModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeScreenshot();
            }
        });
    }
    
    document.addEventListener('keydown', function(e) {
        if (modal && modal.classList.contains('show')) {
            switch(e.key) {
                case 'Escape':
                    closeScreenshot();
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    prevImage();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    nextImage();
                    break;
            }
        }
    });
});

// ===== FLOATING CONTACT MODAL =====
function initFloatingContact() {
    const floatingBtn = document.getElementById('floatingContact');
    const contactModal = document.getElementById('contactModal');
    const closeModalBtn = document.getElementById('closeContactModal');
    const backToTopBtn = document.getElementById('backToTop');
    
    if (!floatingBtn || !contactModal) return;
    
    // Control de visibilidad del botón flotante según scroll
    function handleFloatingButtonVisibility() {
        if (window.scrollY > 300) {
            // Cuando aparece el botón "Volver arriba", ocultar el botón flotante
            floatingBtn.classList.add('hide');
        } else {
            // Cuando no hay scroll suficiente, mostrar el botón flotante
            floatingBtn.classList.remove('hide');
        }
    }
    
    // Escuchar el scroll
    window.addEventListener('scroll', handleFloatingButtonVisibility);
    
    // Verificar al cargar la página
    handleFloatingButtonVisibility();
    
    // Abrir modal
    floatingBtn.addEventListener('click', () => {
        contactModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    });
    
    // Cerrar modal con botón X
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            closeContactModal();
        });
    }
    
    // Cerrar modal al hacer click fuera
    contactModal.addEventListener('click', (e) => {
        if (e.target === contactModal) {
            closeContactModal();
        }
    });
    
    // Cerrar modal con tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && contactModal.classList.contains('show')) {
            closeContactModal();
        }
    });
    
    function closeContactModal() {
        contactModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
    
    // Manejar envío del formulario de contacto
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener datos del formulario
            const formData = {
                name: document.getElementById('modal-name').value,
                email: document.getElementById('modal-email').value,
                company: document.getElementById('modal-company').value,
                subject: document.getElementById('modal-subject').value,
                message: document.getElementById('modal-message').value,
                date: new Date().toISOString()
            };
            
            // Guardar en localStorage
            let messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
            messages.push(formData);
            localStorage.setItem('contactMessages', JSON.stringify(messages));
            
            // Mostrar mensaje de éxito
            const successMessage = document.getElementById('successMessage');
            if (successMessage) {
                successMessage.style.display = 'block';
            }
            
            // Limpiar formulario
            contactForm.reset();
            
            // Ocultar mensaje y cerrar modal después de 3 segundos
            setTimeout(() => {
                if (successMessage) {
                    successMessage.style.display = 'none';
                }
                closeContactModal();
            }, 3000);
        });
    }
}

// Manejar el formulario de la página de contacto (contact.html)
function initContactPageForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener datos del formulario
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            company: document.getElementById('company').value || 'N/A',
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value,
            date: new Date().toISOString()
        };
        
        // Guardar en localStorage
        let messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
        messages.push(formData);
        localStorage.setItem('contactMessages', JSON.stringify(messages));
        
        // Crear mensaje de éxito visual
        const button = contactForm.querySelector('button[type="submit"]');
        const originalHTML = button.innerHTML;
        
        // Cambiar botón a estado de éxito
        button.innerHTML = '<i class="fas fa-check"></i> <span>¡Mensaje Enviado Correctamente!</span>';
        button.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        button.disabled = true;
        
        // Limpiar formulario
        contactForm.reset();
        
        // Restaurar botón después de 3 segundos
        setTimeout(() => {
            button.innerHTML = originalHTML;
            button.style.background = 'var(--gradient-primary)';
            button.disabled = false;
        }, 3000);
    });
}

// Inicializar el botón flotante cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initFloatingContact();
    initContactPageForm(); // Inicializar formulario de contact.html
    initTechColors(); // Inicializar colores de tecnologías
});

// ===== COLORES DE TECNOLOGÍAS =====
function initTechColors() {
    // Obtener todos los spans de tecnologías
    const techSpans = document.querySelectorAll('.project-tech span');
    
    // Mapa de tecnologías y sus clases
    const techColors = {
        'JavaScript': 'tech-javascript',
        'React': 'tech-react',
        'HTML5': 'tech-html',
        'HTML': 'tech-html',
        'CSS3': 'tech-css',
        'CSS': 'tech-css',
        'Node.js': 'tech-node',
        'Node': 'tech-node',
        'Python': 'tech-python',
        'MySQL': 'tech-mysql',
        'WordPress': 'tech-wordpress',
        'WooCommerce': 'tech-woocommerce',
        'PHP': 'tech-php',
        'Git': 'tech-git',
        'GitHub': 'tech-github',
        'Bootstrap': 'tech-bootstrap',
        'Tailwind': 'tech-tailwind',
        'MongoDB': 'tech-mongodb',
        'Express': 'tech-express',
        'TypeScript': 'tech-typescript',
        'Vue': 'tech-vue',
        'Docker': 'tech-docker',
        'API': 'tech-api',
        'REST': 'tech-api',
        'SEO': 'tech-seo',
        'Analytics': 'tech-analytics',
        'Google Analytics': 'tech-analytics',
        'Responsive': 'tech-responsive',
        'PWA': 'tech-pwa',
        'WhatsApp': 'tech-whatsapp',
        'WhatsApp API': 'tech-whatsapp',
        'Firebase': 'tech-firebase',
        'Sass': 'tech-sass',
        'SCSS': 'tech-sass',
        'Redux': 'tech-redux',
        'jQuery': 'tech-jquery',
        'Local Storage': 'tech-storage',
        'Storage': 'tech-storage',
        'Netlify': 'tech-netlify',
        'Vercel': 'tech-vercel',
        'GitHub Pages': 'tech-github-pages',
        'Pages': 'tech-github-pages'
    };
    
    // Asignar clases basadas en el texto
    techSpans.forEach(span => {
        const techName = span.textContent.trim();
        const techClass = techColors[techName];
        if (techClass) {
            span.classList.add(techClass);
        }
    });
}
