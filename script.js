// Smooth scroll with offset for fixed header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Modal functions
function openModal(productName) {
    const modal = document.getElementById('orderModal');
    const productInput = document.getElementById('product');
    productInput.value = productName;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('orderModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Close modal on backdrop click
document.getElementById('orderModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Form submission handler
function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
        product: formData.get('product'),
        name: formData.get('name'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        message: formData.get('message')
    };

    // Create mailto link with form data
    const subject = encodeURIComponent(`Заказ сервера: ${data.product}`);
    const body = encodeURIComponent(
        `Модель: ${data.product}\n` +
        `Имя: ${data.name}\n` +
        `Телефон: ${data.phone}\n` +
        `Email: ${data.email || 'не указан'}\n` +
        `Комментарий: ${data.message || 'нет'}`
    );

    window.location.href = `mailto:zakaz@mega-server.kz?subject=${subject}&body=${body}`;

    // Close modal and reset form
    setTimeout(() => {
        closeModal();
        e.target.reset();
        alert('Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.');
    }, 500);
}

// Yandex Maps initialization
function initMap() {
    if (typeof ymaps === 'undefined') {
        console.warn('Yandex Maps API not loaded');
        return;
    }

    ymaps.ready(function() {
        const map = new ymaps.Map('map', {
            center: [43.238293, 76.945465], // Coordinates for ул. Шевченко 165б, Алматы
            zoom: 16,
            controls: ['zoomControl', 'fullscreenControl']
        });

        const placemark = new ymaps.Placemark([43.238293, 76.945465], {
            balloonContent: '<strong>ServerOK</strong><br>ул. Шевченко 165б<br>г. Алматы, Казахстан<br><br>Тел: +7 (727) 250-50-00'
        }, {
            preset: 'islands#blueDotIcon'
        });

        map.geoObjects.add(placemark);
    });
}

// Initialize map when page loads
window.addEventListener('load', initMap);

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.style.background = 'rgba(10, 13, 18, 0.98)';
        header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.background = 'rgba(10, 13, 18, 0.95)';
        header.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// Scroll reveal animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply animation to cards on load
window.addEventListener('load', () => {
    const cards = document.querySelectorAll('.product-card, .feature-item');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
});
