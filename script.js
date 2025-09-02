// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Set active navigation link based on current page
    setActiveNavLink();
});

// Smooth Scrolling Function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Navbar Background on Scroll - Enhanced Blur Effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        const scrolled = window.scrollY;
        
        if (scrolled > 50) {
            navbar.classList.remove('navbar-transparent');
            navbar.classList.add('navbar-scrolled');
            
            // Progressive blur based on scroll distance
            const maxScroll = 200;
            const blurIntensity = Math.min(scrolled / maxScroll, 1);
            const blurValue = 25 * blurIntensity;
            
            navbar.style.backdropFilter = `blur(${Math.max(blurValue, 25)}px) saturate(180%)`;
        } else {
            navbar.classList.remove('navbar-scrolled');
            navbar.classList.add('navbar-transparent');
            
            // Smooth transition back to transparent
            navbar.style.backdropFilter = 'blur(0px)';
        }
    }
});

// Card Hover Effects and Animations
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.education-card');
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    cards.forEach(card => {
        observer.observe(card);
    });
});

// Education Card Click Handlers
document.addEventListener('DOMContentLoaded', function() {
    const cardButtons = document.querySelectorAll('.card-btn');
    
    cardButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = button.closest('.education-card');
            const category = card.getAttribute('data-category');
            
            // Add click animation
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 150);
            
            // Show alert for demo purposes (replace with actual navigation)
            showEducationModal(category);
        });
    });
});

// Education Modal Function (Demo)
function showEducationModal(category) {
    const categoryNames = {
        'budgeting': 'Budget Planning',
        'investment': 'Smart Investment',
        'management': 'Financial Management',
        'planning': 'Financial Planning',
        'digital': 'Digital Finance',
        'business': 'Business Finance'
    };
    
    const categoryName = categoryNames[category] || 'Financial Education';
    
    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    modalOverlay.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3><i class="fas fa-graduation-cap"></i> ${categoryName}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <p>Welcome to the <strong>${categoryName}</strong> module!</p>
                <p>In this module you will learn:</p>
                <ul class="modal-topics">
                    ${getTopicsByCategory(category)}
                </ul>
                <div class="modal-actions">
                    <button class="btn-primary modal-btn">Start Learning</button>
                    <button class="btn-secondary modal-btn modal-close-btn">Later</button>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles
    modalOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const modalContent = modalOverlay.querySelector('.modal-content');
    modalContent.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 12px;
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        transform: scale(0.9);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(modalOverlay);
    
    // Animate in
    setTimeout(() => {
        modalOverlay.style.opacity = '1';
        modalContent.style.transform = 'scale(1)';
    }, 10);
    
    // Close modal handlers
    const closeModal = () => {
        modalOverlay.style.opacity = '0';
        modalContent.style.transform = 'scale(0.9)';
        setTimeout(() => {
            document.body.removeChild(modalOverlay);
        }, 300);
    };
    
    modalOverlay.querySelector('.modal-close').addEventListener('click', closeModal);
    modalOverlay.querySelector('.modal-close-btn').addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
    
    // Start learning button
    modalOverlay.querySelector('.btn-primary').addEventListener('click', function() {
        alert(`Starting ${categoryName} learning!\n\nThis feature will redirect to a more detailed learning page.`);
        closeModal();
    });
}

// Get topics by category for modal
function getTopicsByCategory(category) {
    const topics = {
        'budgeting': [
            '50/30/20 method for financial allocation',
            'Expense tracking tools and applications',
            'Building a solid emergency fund',
            'Daily expense saving tips'
        ],
        'investment': [
            'Stock and bond investment basics',
            'Choosing the right mutual funds',
            'Portfolio diversification strategies',
            'Managing investment risks'
        ],
        'management': [
            'Effective saving techniques',
            'Debt repayment strategies',
            'Setting and achieving financial goals',
            'Retirement fund planning'
        ],
        'planning': [
            'Creating long-term financial plans',
            'Choosing the right insurance',
            'Personal tax optimization',
            'Inheritance and estate planning'
        ],
        'digital': [
            'Using e-wallets and digital banking',
            'Understanding cryptocurrency basics',
            'Digital transaction security',
            'Trusted online investment platforms'
        ],
        'business': [
            'Creating realistic business budgets',
            'Managing company cash flow',
            'Investment strategies for business',
            'Simple business financial analysis'
        ]
    };
    
    return topics[category]?.map(topic => `<li><i class="fas fa-check-circle"></i> ${topic}</li>`).join('') || '';
}

// Add modal styles to document
document.addEventListener('DOMContentLoaded', function() {
    const modalStyles = document.createElement('style');
    modalStyles.textContent = `
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid #e5e7eb;
        }
        
        .modal-header h3 {
            color: #1f2937;
            font-size: 1.5rem;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .modal-header i {
            color: #2563eb;
        }
        
        .modal-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #6b7280;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.3s ease;
        }
        
        .modal-close:hover {
            background: #f3f4f6;
            color: #1f2937;
        }
        
        .modal-body p {
            margin-bottom: 1rem;
            color: #4b5563;
            line-height: 1.6;
        }
        
        .modal-topics {
            list-style: none;
            margin: 1.5rem 0;
        }
        
        .modal-topics li {
            padding: 0.5rem 0;
            color: #4b5563;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .modal-topics i {
            color: #10b981;
            font-size: 0.9rem;
        }
        
        .modal-actions {
            display: flex;
            gap: 1rem;
            margin-top: 2rem;
            flex-wrap: wrap;
        }
        
        .modal-btn {
            flex: 1;
            min-width: 120px;
        }
        
        @media (max-width: 480px) {
            .modal-actions {
                flex-direction: column;
            }
            
            .modal-btn {
                width: 100%;
            }
        }
    `;
    document.head.appendChild(modalStyles);
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroIllustration = document.querySelector('.hero-illustration');
    
    if (heroIllustration) {
        const rate = scrolled * -0.5;
        heroIllustration.style.transform = `translateY(${rate}px)`;
    }
});

// Add loading animation when page loads
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Trigger card animations
    const cards = document.querySelectorAll('.education-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Feature items animation on scroll
document.addEventListener('DOMContentLoaded', function() {
    const featureItems = document.querySelectorAll('.feature-item');
    
    const featureObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    featureItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.6s ease';
        featureObserver.observe(item);
    });
});

// Add some interactive financial tips
const financialTips = [
    "💡 Tip: Set aside 20% of income for savings and investments",
    "💡 Tip: Use the 50/30/20 method to manage monthly budget",
    "💡 Tip: Start investing with small but consistent amounts",
    "💡 Tip: Always compare financial products before deciding",
    "💡 Tip: Emergency fund should be 6-12 times monthly expenses"
];

// Show random tip every 30 seconds
let tipIndex = 0;
function showFinancialTip() {
    const tip = financialTips[tipIndex];
    
    // Create tip notification
    const tipNotification = document.createElement('div');
    tipNotification.className = 'tip-notification';
    tipNotification.innerHTML = `
        <div class="tip-content">
            <span>${tip}</span>
            <button class="tip-close">&times;</button>
        </div>
    `;
    
    // Add styles
    tipNotification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(135deg, #2563eb, #10b981);
        color: white;
        padding: 1rem;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        z-index: 1500;
        max-width: 350px;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    
    const tipContent = tipNotification.querySelector('.tip-content');
    tipContent.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    `;
    
    const tipClose = tipNotification.querySelector('.tip-close');
    tipClose.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background 0.3s ease;
    `;
    
    tipClose.addEventListener('mouseenter', () => {
        tipClose.style.background = 'rgba(255, 255, 255, 0.2)';
    });
    
    tipClose.addEventListener('mouseleave', () => {
        tipClose.style.background = 'none';
    });
    
    document.body.appendChild(tipNotification);
    
    // Animate in
    setTimeout(() => {
        tipNotification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close handlers
    const closeTip = () => {
        tipNotification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (document.body.contains(tipNotification)) {
                document.body.removeChild(tipNotification);
            }
        }, 300);
    };
    
    tipClose.addEventListener('click', closeTip);
    
    // Auto close after 8 seconds
    setTimeout(closeTip, 8000);
    
    tipIndex = (tipIndex + 1) % financialTips.length;
}

// Start showing tips after 5 seconds, then every 30 seconds
setTimeout(() => {
    showFinancialTip();
    setInterval(showFinancialTip, 30000);
}, 5000);

// Add some financial calculators (simple examples)
function calculateEmergencyFund() {
    const monthlyExpenses = prompt("What are your monthly expenses? (in USD)");
    if (monthlyExpenses && !isNaN(monthlyExpenses)) {
        const emergencyFund = monthlyExpenses * 6;
        alert(`Your Emergency Fund Recommendation: $${parseInt(emergencyFund).toLocaleString('en-US')}\n\n(6 months of monthly expenses)`);
    }
}

function calculate5030020() {
    const monthlyIncome = prompt("What is your monthly income? (in USD)");
    if (monthlyIncome && !isNaN(monthlyIncome)) {
        const needs = monthlyIncome * 0.5;
        const wants = monthlyIncome * 0.3;
        const savings = monthlyIncome * 0.2;
        
        alert(`50/30/20 Budget Allocation:\n\n` +
              `Needs (50%): $${parseInt(needs).toLocaleString('en-US')}\n` +
              `Wants (30%): $${parseInt(wants).toLocaleString('en-US')}\n` +
              `Savings & Investment (20%): $${parseInt(savings).toLocaleString('en-US')}`);
    }
}

// Add calculator buttons to cards (you can uncomment this if you want interactive calculators)
/*
document.addEventListener('DOMContentLoaded', function() {
    const budgetingCard = document.querySelector('[data-category="budgeting"]');
    if (budgetingCard) {
        const calculatorBtn = document.createElement('button');
        calculatorBtn.textContent = '🧮 50/30/20 Calculator';
        calculatorBtn.className = 'btn-secondary';
        calculatorBtn.style.marginTop = '1rem';
        calculatorBtn.addEventListener('click', calculate5030020);
        budgetingCard.appendChild(calculatorBtn);
    }
});
*/

// Smooth reveal animation for sections
function revealOnScroll() {
    const reveals = document.querySelectorAll('.section-header, .hero-content');
    
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const elementTop = reveal.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('revealed');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// Add revealed class styles
document.addEventListener('DOMContentLoaded', function() {
    const revealStyles = document.createElement('style');
    revealStyles.textContent = `
        .section-header,
        .hero-content {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s ease;
        }
        
        .section-header.revealed,
        .hero-content.revealed {
            opacity: 1;
            transform: translateY(0);
        }
        
        .hero-content {
            opacity: 1; /* Hero should be visible immediately */
        }
    `;
    document.head.appendChild(revealStyles);
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Close modal with Escape key
    if (e.key === 'Escape') {
        const modal = document.querySelector('.modal-overlay');
        if (modal) {
            modal.querySelector('.modal-close').click();
        }
    }
    
    // Navigate with arrow keys (optional enhancement)
    if (e.key === 'ArrowDown' && e.ctrlKey) {
        e.preventDefault();
        scrollToSection('education');
    }
});

// Performance optimization: Lazy load animations
const observerConfig = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const animationObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerConfig);

// Initialize lazy animations
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.education-card, .feature-item');
    animatedElements.forEach(el => {
        animationObserver.observe(el);
    });
});

// Set active navigation link based on current page
function setActiveNavLink() {
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        // Check if link matches current page
        const linkPath = link.getAttribute('href');
        
        if (currentPage === '/' || currentPage.includes('index.html') || currentPage === '') {
            // Home page
            if (linkPath === '#home' || linkPath === 'index.html') {
                link.classList.add('active');
            }
        } else if (currentPage.includes('education.html')) {
            // Education page
            if (linkPath === 'education.html') {
                link.classList.add('active');
            }
        }
    });
}
