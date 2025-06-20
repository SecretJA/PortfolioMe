
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
    const content = document.getElementById(`exp-content-${id}`);
    if (content.classList.contains('active')) {
        content.classList.remove('active');
    } else {
        // Close any open details
        document.querySelectorAll('.timeline-content').forEach(item => {
            item.classList.remove('active');
        });
        // Open the selected one
        content.classList.add('active');
    }
}

// Function to handle contact form submission
function handleSubmit(event) {
    event.preventDefault();
    
    // Lấy dữ liệu form
    const formData = new FormData(event.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Validation
    if (!name || !email || !message) {
        showNotification('Vui lòng điền đầy đủ thông tin!', 'error');
        return;
    }
    
    // Hiển thị loading
    showLoading();
    
    // Simulate API call
    setTimeout(() => {
        hideLoading();
        showNotification('Cảm ơn bạn đã liên hệ! Tôi sẽ phản hồi sớm nhất có thể.', 'success');
        event.target.reset();
    }, 2000);
}

// Function to show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Hide notification after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => document.body.removeChild(notification), 300);
    }, 5000);
}

// Function to show loading
function showLoading() {
    const loading = document.createElement('div');
    loading.id = 'loading-overlay';
    loading.innerHTML = `
        <div class="loading-spinner">
            <div class="spinner"></div>
            <p>Đang gửi tin nhắn...</p>
        </div>
    `;
    document.body.appendChild(loading);
}

// Function to hide loading
function hideLoading() {
    const loading = document.getElementById('loading-overlay');
    if (loading) {
        document.body.removeChild(loading);
    }
}

// Function to toggle dark/light mode
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update theme toggle button
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.innerHTML = newTheme === 'light' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
}

// Function to copy email to clipboard
function copyEmail() {
    const email = 'pphamhoanggiabao19092004@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
        showNotification('Email đã được sao chép vào clipboard!', 'success');
    }).catch(() => {
        showNotification('Không thể sao chép email!', 'error');
    });
}

// Function to scroll to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Function to check if element is in viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Function to animate skill bars
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        if (isElementInViewport(bar)) {
            const percentage = bar.getAttribute('data-percentage');
            bar.style.width = percentage + '%';
        }
    });
}

// Function to handle typing animation
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Function to create particles background
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    document.body.appendChild(particlesContainer);
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';
        particlesContainer.appendChild(particle);
    }
}

// Function to handle mobile menu toggle
function toggleMobileMenu() {
    const sidebar = document.querySelector('.sidebar');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    
    sidebar.classList.toggle('mobile-active');
    
    if (!mobileMenuOverlay) {
        const overlay = document.createElement('div');
        overlay.className = 'mobile-menu-overlay';
        overlay.onclick = closeMobileMenu;
        document.body.appendChild(overlay);
    }
}

// Function to close mobile menu
function closeMobileMenu() {
    const sidebar = document.querySelector('.sidebar');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    
    sidebar.classList.remove('mobile-active');
    if (mobileMenuOverlay) {
        document.body.removeChild(mobileMenuOverlay);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Khôi phục tab đã lưu
    const savedTab = localStorage.getItem('activeTab');
    if (savedTab) {
        showSection(savedTab);
    }
    
    // Khôi phục theme đã lưu
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.setAttribute('data-theme', savedTheme);
    
    // Add animation to timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = 1;
            item.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    // Create particles background
    createParticles();
    
    // Add scroll to top button
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
    
    // Add typing animation for terminal
    const terminalOutputs = document.querySelectorAll('.command-output');
    terminalOutputs.forEach((output, index) => {
        const text = output.textContent;
        setTimeout(() => {
            typeWriter(output, text, 30);
        }, index * 1000);
    });
    
    // Add smooth scrolling for anchor links
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
    
    // Add window resize handler
    window.addEventListener('resize', () => {
        closeMobileMenu();
    });
});

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl + K to focus search
    if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        // Focus search if exists
    }
    
    // Escape to close mobile menu
    if (e.key === 'Escape') {
        closeMobileMenu();
    }
});
