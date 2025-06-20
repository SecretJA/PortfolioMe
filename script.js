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

function handleSubmit(event) {
    event.preventDefault();
    alert('Cảm ơn bạn đã liên hệ! Tôi sẽ phản hồi sớm nhất có thể.');
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Add animation to timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = 1;
            item.style.transform = 'translateY(0)';
        }, index * 200);
    });
});