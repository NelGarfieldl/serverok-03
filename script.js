// Yandex Map initialization
ymaps.ready(init);

function init() {
    const map = new ymaps.Map("map", {
        center: [43.238949, 76.889709],
        zoom: 16,
        controls: ['zoomControl']
    });

    const placemark = new ymaps.Placemark([43.238949, 76.889709], {
        balloonContent: 'ServerOK<br>Шевченко 165б, Алматы'
    }, {
        preset: 'islands#blueCircleDotIcon'
    });

    map.geoObjects.add(placemark);
}

// Order form modal
function openOrderForm(serverModel) {
    document.getElementById('orderModal').style.display = 'block';
    document.getElementById('serverModel').value = serverModel;
    document.body.style.overflow = 'hidden';
}

function closeOrderForm() {
    document.getElementById('orderModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal on outside click
window.onclick = function(event) {
    const modal = document.getElementById('orderModal');
    if (event.target === modal) {
        closeOrderForm();
    }
}

// Form submission
document.getElementById('orderForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const formData = new FormData(this);
    const data = {
        serverModel: formData.get('serverModel'),
        name: formData.get('name'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        message: formData.get('message')
    };

    // Create email body
    const emailBody = `
Новая заявка с сайта ServerOK

Модель сервера: ${data.serverModel}
Имя: ${data.name}
Телефон: ${data.phone}
Email: ${data.email}
Комментарий: ${data.message || 'Не указан'}
    `.trim();

    // Create mailto link
    const mailtoLink = `mailto:zakaz@mega-server.kz?subject=${encodeURIComponent('Заявка на сервер: ' + data.serverModel)}&body=${encodeURIComponent(emailBody)}`;

    // Open email client
    window.location.href = mailtoLink;

    // Show success message
    alert('Спасибо за заявку! Ваш почтовый клиент был открыт для отправки письма.');

    // Reset form and close modal
    this.reset();
    closeOrderForm();
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
