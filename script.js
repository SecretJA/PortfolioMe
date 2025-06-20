// Function to show selected section
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Remove active class from all tabs
    const tabs = document.querySelectorAll('.nav-tab');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });

    // Show selected section
    document.getElementById(sectionId).classList.add('active');

    // Add active class to clicked tab
    event.target.classList.add('active');

    // Scroll to top of the section with offset
    const element = document.getElementById(sectionId);
    const offset = 100;
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });

    // Lưu tab hiện tại vào localStorage
    localStorage.setItem('activeTab', sectionId);
}

// Function to toggle experience details
function toggleExperience(id) {
    const content = document.getElementById('exp-content-' + id);
    const isActive = content.classList.contains('active');

    // Hide all experience content
    document.querySelectorAll('.timeline-content').forEach(content => {
        content.classList.remove('active');
    });

    // Show selected content if it wasn't active
    if (!isActive) {
        content.classList.add('active');
    }
}

// Function to copy email to clipboard
function copyEmail() {
    const email = 'pphamhoanggiabao19092004@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
        showNotification('Email đã được sao chép!', 'success');
    }).catch(() => {
        showNotification('Không thể sao chép email', 'error');
    });
}

// Function to copy phone to clipboard
function copyPhone() {
    const phone = '(+84) 0767 195 943';
    navigator.clipboard.writeText(phone).then(() => {
        showNotification('Số điện thoại đã được sao chép!', 'success');
    }).catch(() => {
        showNotification('Không thể sao chép số điện thoại', 'error');
    });
}

// Function to show notifications
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'times' : 'info'}"></i>
            <span>${message}</span>
        </div>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Function to handle form submission
function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };

    // Show loading notification
    showNotification('Đang gửi tin nhắn...', 'info');

    // Send data to server
    fetch('/send-message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            showNotification('Tin nhắn đã được gửi thành công!', 'success');
            event.target.reset();
        } else {
            showNotification('Có lỗi xảy ra khi gửi tin nhắn', 'error');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showNotification('Có lỗi xảy ra khi gửi tin nhắn', 'error');
    });
}

// Function to create floating particles
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    document.body.appendChild(particlesContainer);

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Function to scroll to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Restore active tab from localStorage
    const activeTab = localStorage.getItem('activeTab') || 'about';

    // Show the saved section
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(activeTab).classList.add('active');

    // Set active tab
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    const activeTabButton = document.querySelector(`[onclick="showSection('${activeTab}')"]`);
    if (activeTabButton) {
        activeTabButton.classList.add('active');
    }

    // Add scroll to top functionality
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.id = 'scroll-top';
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.onclick = scrollToTop;
    document.body.appendChild(scrollTopBtn);

    // Show/hide scroll to top button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    // Add particles background
    createParticles();

    // Add animation to timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
    });
});