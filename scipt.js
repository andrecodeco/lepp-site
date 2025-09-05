{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // ===== CONFIGURA\'c7\'d5ES GLOBAIS =====\
document.addEventListener('DOMContentLoaded', function() \{\
    initializeWebsite();\
\});\
\
function initializeWebsite() \{\
    setupNavigation();\
    setupMobileMenu();\
    setupScrollEffects();\
    setupFormHandling();\
    setupSmoothScrolling();\
    setupActiveNavigation();\
\}\
\
// ===== NAVEGA\'c7\'c3O SUAVE =====\
function setupSmoothScrolling() \{\
    // Navega\'e7\'e3o suave para links internos\
    document.querySelectorAll('a[href^="#"]').forEach(anchor => \{\
        anchor.addEventListener('click', function (e) \{\
            e.preventDefault();\
            const target = document.querySelector(this.getAttribute('href'));\
            if (target) \{\
                const headerHeight = document.querySelector('.header').offsetHeight;\
                const targetPosition = target.offsetTop - headerHeight - 20;\
                \
                window.scrollTo(\{\
                    top: targetPosition,\
                    behavior: 'smooth'\
                \});\
                \
                // Fechar menu mobile se estiver aberto\
                const mobileMenu = document.querySelector('.nav-menu');\
                const hamburger = document.querySelector('.hamburger');\
                if (mobileMenu.classList.contains('active')) \{\
                    mobileMenu.classList.remove('active');\
                    hamburger.classList.remove('active');\
                \}\
            \}\
        \});\
    \});\
\}\
\
// ===== NAVEGA\'c7\'c3O ATIVA =====\
function setupActiveNavigation() \{\
    const sections = document.querySelectorAll('.section[id]');\
    const navLinks = document.querySelectorAll('.nav-link');\
    \
    function updateActiveNav() \{\
        const scrollPosition = window.scrollY + 150;\
        \
        sections.forEach(section => \{\
            const sectionTop = section.offsetTop;\
            const sectionHeight = section.offsetHeight;\
            const sectionId = section.getAttribute('id');\
            \
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) \{\
                navLinks.forEach(link => \{\
                    link.classList.remove('active');\
                    if (link.getAttribute('href') === `#$\{sectionId\}`) \{\
                        link.classList.add('active');\
                    \}\
                \});\
            \}\
        \});\
    \}\
    \
    window.addEventListener('scroll', updateActiveNav);\
\}\
\
// ===== MENU MOBILE =====\
function setupMobileMenu() \{\
    const hamburger = document.querySelector('.hamburger');\
    const navMenu = document.querySelector('.nav-menu');\
    \
    if (hamburger && navMenu) \{\
        hamburger.addEventListener('click', function() \{\
            hamburger.classList.toggle('active');\
            navMenu.classList.toggle('active');\
        \});\
        \
        // Fechar menu ao clicar em link\
        document.querySelectorAll('.nav-link').forEach(link => \{\
            link.addEventListener('click', () => \{\
                hamburger.classList.remove('active');\
                navMenu.classList.remove('active');\
            \});\
        \});\
        \
        // Fechar menu ao clicar fora\
        document.addEventListener('click', function(e) \{\
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) \{\
                hamburger.classList.remove('active');\
                navMenu.classList.remove('active');\
            \}\
        \});\
    \}\
\}\
\
// ===== EFEITOS DE SCROLL =====\
function setupScrollEffects() \{\
    const header = document.querySelector('.header');\
    \
    // Efeito de transpar\'eancia no header\
    function handleHeaderScroll() \{\
        const scrollY = window.scrollY;\
        \
        if (scrollY > 50) \{\
            header.style.background = 'rgba(255, 255, 255, 0.98)';\
            header.style.backdropFilter = 'blur(20px)';\
        \} else \{\
            header.style.background = 'rgba(255, 255, 255, 0.95)';\
            header.style.backdropFilter = 'blur(10px)';\
        \}\
    \}\
    \
    window.addEventListener('scroll', handleHeaderScroll);\
    \
    // Anima\'e7\'e3o de entrada dos elementos\
    setupIntersectionObserver();\
\}\
\
// ===== OBSERVER PARA ANIMA\'c7\'d5ES =====\
function setupIntersectionObserver() \{\
    const observerOptions = \{\
        threshold: 0.1,\
        rootMargin: '0px 0px -50px 0px'\
    \};\
    \
    const observer = new IntersectionObserver(function(entries) \{\
        entries.forEach(entry => \{\
            if (entry.isIntersecting) \{\
                entry.target.style.opacity = '1';\
                entry.target.style.transform = 'translateY(0)';\
            \}\
        \});\
    \}, observerOptions);\
    \
    // Observar elementos que devem animar\
    const animateElements = document.querySelectorAll(`\
        .highlight-card,\
        .project-card,\
        .publication-card,\
        .team-member,\
        .timeline-item,\
        .info-card\
    `);\
    \
    animateElements.forEach(el => \{\
        el.style.opacity = '0';\
        el.style.transform = 'translateY(30px)';\
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';\
        observer.observe(el);\
    \});\
\}\
\
// ===== NAVEGA\'c7\'c3O PRINCIPAL =====\
function setupNavigation() \{\
    const navLinks = document.querySelectorAll('.nav-link');\
    \
    navLinks.forEach(link => \{\
        link.addEventListener('mouseenter', function() \{\
            this.style.transform = 'translateY(-2px)';\
        \});\
        \
        link.addEventListener('mouseleave', function() \{\
            this.style.transform = 'translateY(0)';\
        \});\
    \});\
\}\
\
// ===== FORMUL\'c1RIO DE CONTATO =====\
function setupFormHandling() \{\
    const contactForm = document.getElementById('contactForm');\
    \
    if (contactForm) \{\
        contactForm.addEventListener('submit', handleFormSubmit);\
        \
        // Valida\'e7\'e3o em tempo real\
        const inputs = contactForm.querySelectorAll('input[required], textarea[required]');\
        inputs.forEach(input => \{\
            input.addEventListener('blur', validateInput);\
            input.addEventListener('input', clearErrors);\
        \});\
    \}\
\}\
\
function validateInput(event) \{\
    const input = event.target;\
    const value = input.value.trim();\
    \
    // Remover mensagens de erro anteriores\
    clearInputError(input);\
    \
    if (!value) \{\
        showInputError(input, 'Este campo \'e9 obrigat\'f3rio');\
        return false;\
    \}\
    \
    // Valida\'e7\'e3o espec\'edfica por tipo\
    switch (input.type) \{\
        case 'email':\
            if (!isValidEmail(value)) \{\
                showInputError(input, 'Por favor, insira um e-mail v\'e1lido');\
                return false;\
            \}\
            break;\
        case 'tel':\
            if (value && !isValidPhone(value)) \{\
                showInputError(input, 'Por favor, insira um telefone v\'e1lido');\
                return false;\
            \}\
            break;\
    \}\
    \
    return true;\
\}\
\
function clearErrors(event) \{\
    clearInputError(event.target);\
\}\
\
function showInputError(input, message) \{\
    input.style.borderColor = '#e74c3c';\
    \
    // Remover erro anterior se existir\
    const existingError = input.parentNode.querySelector('.error-message');\
    if (existingError) \{\
        existingError.remove();\
    \}\
    \
    // Adicionar nova mensagem de erro\
    const errorElement = document.createElement('span');\
    errorElement.className = 'error-message';\
    errorElement.style.color = '#e74c3c';\
    errorElement.style.fontSize = '0.85rem';\
    errorElement.style.marginTop = '0.25rem';\
    errorElement.style.display = 'block';\
    errorElement.textContent = message;\
    \
    input.parentNode.appendChild(errorElement);\
\}\
\
function clearInputError(input) \{\
    input.style.borderColor = '';\
    const errorElement = input.parentNode.querySelector('.error-message');\
    if (errorElement) \{\
        errorElement.remove();\
    \}\
\}\
\
function handleFormSubmit(event) \{\
    event.preventDefault();\
    \
    const form = event.target;\
    const formData = new FormData(form);\
    \
    // Validar todos os campos obrigat\'f3rios\
    const requiredInputs = form.querySelectorAll('input[required], textarea[required]');\
    let isValid = true;\
    \
    requiredInputs.forEach(input => \{\
        if (!validateInput(\{ target: input \})) \{\
            isValid = false;\
        \}\
    \});\
    \
    if (!isValid) \{\
        showFormMessage('Por favor, corrija os erros antes de enviar.', 'error');\
        return;\
    \}\
    \
    // Simular envio do formul\'e1rio\
    showFormMessage('Enviando mensagem...', 'loading');\
    \
    // Simular delay de envio\
    setTimeout(() => \{\
        showFormMessage('Mensagem enviada com sucesso! Retornaremos em breve.', 'success');\
        form.reset();\
        \
        // Limpar mensagem ap\'f3s 5 segundos\
        setTimeout(() => \{\
            clearFormMessage();\
        \}, 5000);\
    \}, 2000);\
\}\
\
function showFormMessage(message, type) \{\
    const form = document.getElementById('contactForm');\
    \
    // Remover mensagem anterior\
    const existingMessage = form.querySelector('.form-message');\
    if (existingMessage) \{\
        existingMessage.remove();\
    \}\
    \
    // Criar nova mensagem\
    const messageElement = document.createElement('div');\
    messageElement.className = `form-message form-message-$\{type\}`;\
    messageElement.textContent = message;\
    \
    // Estilos da mensagem\
    messageElement.style.padding = '1rem';\
    messageElement.style.borderRadius = '8px';\
    messageElement.style.marginBottom = '1rem';\
    messageElement.style.textAlign = 'center';\
    messageElement.style.fontWeight = '500';\
    \
    switch (type) \{\
        case 'success':\
            messageElement.style.backgroundColor = '#d4edda';\
            messageElement.style.color = '#155724';\
            messageElement.style.border = '1px solid #c3e6cb';\
            break;\
        case 'error':\
            messageElement.style.backgroundColor = '#f8d7da';\
            messageElement.style.color = '#721c24';\
            messageElement.style.border = '1px solid #f1b0b7';\
            break;\
        case 'loading':\
            messageElement.style.backgroundColor = '#cce7ff';\
            messageElement.style.color = '#004085';\
            messageElement.style.border = '1px solid #99d1ff';\
            break;\
    \}\
    \
    form.insertBefore(messageElement, form.firstChild);\
\}\
\
function clearFormMessage() \{\
    const message = document.querySelector('.form-message');\
    if (message) \{\
        message.remove();\
    \}\
\}\
\
// ===== FUN\'c7\'d5ES UTILIT\'c1RIAS =====\
function isValidEmail(email) \{\
    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;\
    return emailRegex.test(email);\
\}\
\
function isValidPhone(phone) \{\
    // Remove todos os caracteres n\'e3o num\'e9ricos\
    const cleanPhone = phone.replace(/\\D/g, '');\
    // Verifica se tem entre 10-11 d\'edgitos (telefone brasileiro)\
    return cleanPhone.length >= 10 && cleanPhone.length <= 11;\
\}\
\
// ===== FORMATA\'c7\'c3O DE TELEFONE =====\
document.addEventListener('DOMContentLoaded', function() \{\
    const phoneInput = document.getElementById('telefone');\
    if (phoneInput) \{\
        phoneInput.addEventListener('input', function(e) \{\
            let value = e.target.value.replace(/\\D/g, '');\
            \
            if (value.length <= 11) \{\
                if (value.length <= 10) \{\
                    value = value.replace(/(\\d\{2\})(\\d\{4\})(\\d\{4\})/, '($1) $2-$3');\
                \} else \{\
                    value = value.replace(/(\\d\{2\})(\\d\{5\})(\\d\{4\})/, '($1) $2-$3');\
                \}\
                e.target.value = value;\
            \}\
        \});\
    \}\
\});\
\
// ===== BOT\'c3O VOLTAR AO TOPO =====\
function createBackToTopButton() \{\
    const button = document.createElement('button');\
    button.innerHTML = '<i class="fas fa-chevron-up"></i>';\
    button.className = 'back-to-top';\
    button.setAttribute('aria-label', 'Voltar ao topo');\
    \
    // Estilos do bot\'e3o\
    button.style.cssText = `\
        position: fixed;\
        bottom: 30px;\
        right: 30px;\
        width: 50px;\
        height: 50px;\
        background: linear-gradient(45deg, var(--primary-blue), var(--primary-teal));\
        color: white;\
        border: none;\
        border-radius: 50%;\
        cursor: pointer;\
        opacity: 0;\
        visibility: hidden;\
        transition: all 0.3s ease;\
        z-index: 1000;\
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);\
        font-size: 1.2rem;\
    `;\
    \
    document.body.appendChild(button);\
    \
    // Mostrar/esconder bot\'e3o baseado no scroll\
    window.addEventListener('scroll', function() \{\
        if (window.scrollY > 300) \{\
            button.style.opacity = '1';\
            button.style.visibility = 'visible';\
        \} else \{\
            button.style.opacity = '0';\
            button.style.visibility = 'hidden';\
        \}\
    \});\
    \
    // A\'e7\'e3o do bot\'e3o\
    button.addEventListener('click', function() \{\
        window.scrollTo(\{\
            top: 0,\
            behavior: 'smooth'\
        \});\
    \});\
    \
    // Hover effect\
    button.addEventListener('mouseenter', function() \{\
        this.style.transform = 'translateY(-3px)';\
        this.style.boxShadow = '0 6px 25px rgba(0,0,0,0.3)';\
    \});\
    \
    button.addEventListener('mouseleave', function() \{\
        this.style.transform = 'translateY(0)';\
        this.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';\
    \});\
\}\
\
// Inicializar bot\'e3o de voltar ao topo\
document.addEventListener('DOMContentLoaded', createBackToTopButton);\
\
// ===== LAZY LOADING PARA IMAGENS =====\
function setupLazyLoading() \{\
    const images = document.querySelectorAll('img[data-src]');\
    \
    const imageObserver = new IntersectionObserver((entries, observer) => \{\
        entries.forEach(entry => \{\
            if (entry.isIntersecting) \{\
                const img = entry.target;\
                img.src = img.dataset.src;\
                img.classList.remove('lazy');\
                imageObserver.unobserve(img);\
            \}\
        \});\
    \});\
    \
    images.forEach(img => imageObserver.observe(img));\
\}\
\
// ===== PERFORMANCE E ACESSIBILIDADE =====\
function setupAccessibility() \{\
    // Navega\'e7\'e3o por teclado\
    document.addEventListener('keydown', function(e) \{\
        if (e.key === 'Tab') \{\
            document.body.classList.add('using-keyboard');\
        \}\
    \});\
    \
    document.addEventListener('mousedown', function() \{\
        document.body.classList.remove('using-keyboard');\
    \});\
    \
    // Adicionar estilos para navega\'e7\'e3o por teclado\
    const style = document.createElement('style');\
    style.textContent = `\
        .using-keyboard *:focus \{\
            outline: 2px solid var(--primary-teal) !important;\
            outline-offset: 2px;\
        \}\
        \
        :not(.using-keyboard) *:focus \{\
            outline: none;\
        \}\
    `;\
    document.head.appendChild(style);\
\}\
\
// ===== INICIALIZA\'c7\'c3O FINAL =====\
document.addEventListener('DOMContentLoaded', function() \{\
    setupLazyLoading();\
    setupAccessibility();\
    \
    // Log de inicializa\'e7\'e3o\
    console.log('\uc0\u55356 \u57273  Site LEPP carregado com sucesso!');\
    console.log('\uc0\u55357 \u56551  Para contato: lepp@ufop.edu.br');\
\});\
\
// ===== TRATAMENTO DE ERROS =====\
window.addEventListener('error', function(e) \{\
    console.error('Erro no site LEPP:', e.error);\
\});\
\
// ===== ANALYTICS E TRACKING (OPCIONAL) =====\
function trackEvent(category, action, label) \{\
    // Implementar Google Analytics ou outro sistema de tracking\
    if (typeof gtag !== 'undefined') \{\
        gtag('event', action, \{\
            event_category: category,\
            event_label: label\
        \});\
    \}\
\}\
\
// Exemplos de tracking\
document.addEventListener('DOMContentLoaded', function() \{\
    // Track cliques nos bot\'f5es principais\
    document.querySelectorAll('.btn-primary').forEach(btn => \{\
        btn.addEventListener('click', function() \{\
            trackEvent('Button', 'Click', 'Primary CTA');\
        \});\
    \});\
    \
    // Track envio do formul\'e1rio\
    const form = document.getElementById('contactForm');\
    if (form) \{\
        form.addEventListener('submit', function() \{\
            trackEvent('Form', 'Submit', 'Contact Form');\
        \});\
    \}\
\});}