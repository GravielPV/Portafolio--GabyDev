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
    initContactForm();
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
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }
        
        setTimeout(typeText, typeSpeed);
    }
    
    // Iniciar después de que se quite el loading
    setTimeout(typeText, 3000);
}

// ===== CONTADORES ANIMADOS =====
function initCounterAnimation() {
    const counters = document.querySelectorAll('[data-count]');
    const options = {
        threshold: 0.7
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, options);
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const duration = 2000;
    const stepTime = duration / 100;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, stepTime);
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

// ===== FORMULARIO DE CONTACTO =====
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', handleFormSubmit);
    
    // Validación en tiempo real
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => clearFieldError(input));
    });
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Validar formulario
    if (!validateForm(form)) {
        return;
    }
    
    // Mostrar loading en el botón
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitBtn.disabled = true;
    
    // Simular envío (aquí integrarías con tu backend)
    setTimeout(() => {
        // Aquí irías tu lógica de envío real
        showNotification('¡Mensaje enviado exitosamente! Te contactaré pronto.', 'success');
        form.reset();
        
        // Restaurar botón
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Redirigir a WhatsApp como alternativa
        const whatsappMessage = `Hola Graviel! Me interesa tu servicio de ${data.subject}. ${data.message}`;
        const whatsappUrl = `https://wa.me/18295639556?text=${encodeURIComponent(whatsappMessage)}`;
        window.open(whatsappUrl, '_blank');
        
    }, 2000);
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

    let index = 0;
    
    function typeCode() {
        if (index < code.length) {
            codeElement.textContent = code.substring(0, index + 1);
            index++;
            setTimeout(typeCode, 20);
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
            'hero-greeting': '¡Hola! Soy',
            'hero-role': 'Desarrollador Web Full Stack',
            'hero-description': 'Desarrollo aplicaciones web modernas y escalables. Especializado en React, Node.js y arquitecturas cloud.',
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
            'projects-title': 'Proyectos',
            'projects-subtitle': 'Mi Trabajo',
            'projects-description': 'Una selección de mis proyectos más destacados',
            'filter-all': 'Todos',
            'filter-web': 'Web',
            'filter-mobile': 'Móvil',
            'filter-fullstack': 'Full Stack',
            'btn-live': 'Ver Proyecto',
            'btn-code': 'Ver Código',
            
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
            'footer-rights': 'Todos los derechos reservados.'
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
            'hero-greeting': 'Hello! I\'m',
            'hero-role': 'Full Stack Web Developer',
            'hero-description': 'I develop modern and scalable web applications. Specialized in React, Node.js and cloud architectures.',
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
            'projects-title': 'Projects',
            'projects-subtitle': 'My Work',
            'projects-description': 'A selection of my most outstanding projects',
            'filter-all': 'All',
            'filter-web': 'Web',
            'filter-mobile': 'Mobile',
            'filter-fullstack': 'Full Stack',
            'btn-live': 'View Project',
            'btn-code': 'View Code',
            
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
            'footer-rights': 'All rights reserved.'
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