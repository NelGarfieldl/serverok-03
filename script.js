// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
    } else {
        header.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// Modal functions
function openModal(productName) {
    const modal = document.getElementById('orderModal');
    const productInput = document.getElementById('productName');
    const modalTitle = modal.querySelector('.modal-header h3');

    productInput.value = productName;
    modalTitle.textContent = `Заявка на ${productName}`;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('orderModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';

    // Reset form
    document.getElementById('orderForm').reset();
}

// Close modal on outside click
document.getElementById('orderModal').addEventListener('click', (e) => {
    if (e.target.id === 'orderModal') {
        closeModal();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Form submission
function submitOrder(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = {
        product: formData.get('product'),
        name: formData.get('name'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        message: formData.get('message') || 'Нет комментария'
    };

    // Create email body
    const emailBody = `
Новая заявка с сайта ServerOK

Товар: ${data.product}
Имя: ${data.name}
Телефон: ${data.phone}
Email: ${data.email}
Комментарий: ${data.message}
    `.trim();

    // Create mailto link
    const mailtoLink = `mailto:zakaz@mega-server.kz?subject=Заявка на ${encodeURIComponent(data.product)}&body=${encodeURIComponent(emailBody)}`;

    // Open email client
    window.location.href = mailtoLink;

    // Show success message
    setTimeout(() => {
        alert('Ваша почтовая программа была открыта для отправки заявки. Спасибо за обращение!');
        closeModal();
    }, 100);
}

// Animate elements on scroll
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

// Observe product cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.product-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `all 0.4s ease ${index * 0.06}s`;
        observer.observe(card);
    });

    // Observe feature items
    const features = document.querySelectorAll('.feature-item');
    features.forEach((feature, index) => {
        feature.style.opacity = '0';
        feature.style.transform = 'translateY(20px)';
        feature.style.transition = `all 0.4s ease ${index * 0.1}s`;
        observer.observe(feature);
    });
});
