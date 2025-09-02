// Education Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize progress tracking
    initializeProgress();
    
    // Setup learning path animations
    setupLearningPath();
    
    // Initialize calculators
    initializeCalculators();
});

// Progress tracking system
let userProgress = {
    budgeting: { completed: 0, total: 4 },
    investment: { completed: 0, total: 6 },
    management: { completed: 0, total: 5 },
    planning: { completed: 0, total: 4 },
    digital: { completed: 0, total: 4 },
    business: { completed: 0, total: 4 }
};

function initializeProgress() {
    // Load progress from localStorage if available
    const savedProgress = localStorage.getItem('financeEduProgress');
    if (savedProgress) {
        userProgress = JSON.parse(savedProgress);
        updateProgressDisplay();
    }
}

function updateProgressDisplay() {
    // Calculate overall progress
    const totalCompleted = Object.values(userProgress).reduce((sum, category) => sum + category.completed, 0);
    const totalLessons = Object.values(userProgress).reduce((sum, category) => sum + category.total, 0);
    const overallProgress = Math.round((totalCompleted / totalLessons) * 100);
    
    // Update overall progress
    document.querySelector('.bg-gradient-to-r .text-2xl').textContent = `${overallProgress}%`;
    document.querySelector('.bg-white').style.width = `${overallProgress}%`;
    
    const completedCategories = Object.values(userProgress).filter(cat => cat.completed === cat.total).length;
    document.querySelector('.mt-2.text-sm').textContent = `${completedCategories} of 6 categories completed`;
    
    // Update individual category progress
    updateCategoryProgress();
}

function updateCategoryProgress() {
    const categories = ['budgeting', 'investment', 'management', 'planning'];
    const colors = ['bg-primary', 'bg-secondary', 'bg-accent', 'bg-purple-500'];
    
    categories.forEach((category, index) => {
        const progress = userProgress[category];
        const percentage = Math.round((progress.completed / progress.total) * 100);
        
        const categoryElement = document.querySelectorAll('.border.border-gray-200')[index];
        const progressBar = categoryElement.querySelector('.h-2.rounded-full');
        const progressText = categoryElement.querySelector('.ml-auto.text-sm');
        
        progressBar.style.width = `${percentage}%`;
        progressText.textContent = `${progress.completed}/${progress.total}`;
    });
}

function saveProgress() {
    localStorage.setItem('financeEduProgress', JSON.stringify(userProgress));
}

// Learning path animations
function setupLearningPath() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.space-y-12 > div').forEach(step => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(30px)';
        step.style.transition = 'all 0.6s ease';
        observer.observe(step);
    });
}

// Start learning function
function startLearning(category) {
    const categoryData = {
        budgeting: {
            title: 'Budget Planning',
            description: 'Learn how to create and manage effective budgets',
            lessons: [
                { title: 'Introduction to Budgeting', duration: '30 minutes', completed: false },
                { title: '50/30/20 Method', duration: '45 minutes', completed: false },
                { title: 'Expense Tracking', duration: '40 minutes', completed: false },
                { title: 'Emergency Fund Planning', duration: '35 minutes', completed: false }
            ]
        },
        investment: {
            title: 'Smart Investment',
            description: 'Understanding various investment instruments and strategies',
            lessons: [
                { title: 'Investment Basics', duration: '45 minutes', completed: false },
                { title: 'Types of Investment', duration: '50 minutes', completed: false },
                { title: 'Stocks for Beginners', duration: '60 minutes', completed: false },
                { title: 'Mutual Funds', duration: '40 minutes', completed: false },
                { title: 'Portfolio Diversification', duration: '35 minutes', completed: false },
                { title: 'Risk Management', duration: '30 minutes', completed: false }
            ]
        },
        management: {
            title: 'Manajemen Keuangan',
            description: 'Teknik mengelola keuangan sehari-hari',
            lessons: [
                { title: 'Smart Saving Strategies', duration: '40 minutes', completed: false },
                { title: 'Debt Management', duration: '45 minutes', completed: false },
                { title: 'Financial Goal Setting', duration: '35 minutes', completed: false },
                { title: 'Cash Flow Management', duration: '40 minutes', completed: false },
                { title: 'Retirement Planning', duration: '50 minutes', completed: false }
            ]
        },
        planning: {
            title: 'Perencanaan Finansial',
            description: 'Menyusun rencana keuangan jangka panjang',
            lessons: [
                { title: 'Life Financial Planning', duration: '60 minutes', completed: false },
                { title: 'Insurance Strategy', duration: '45 minutes', completed: false },
                { title: 'Tax Optimization', duration: '40 minutes', completed: false },
                { title: 'Estate Planning', duration: '35 minutes', completed: false }
            ]
        },
        digital: {
            title: 'Keuangan Digital',
            description: 'Teknologi finansial modern dan keamanannya',
            lessons: [
                { title: 'E-Wallet & Digital Banking', duration: '30 minutes', completed: false },
                { title: 'Cryptocurrency Basics', duration: '45 minutes', completed: false },
                { title: 'Fintech Security', duration: '35 minutes', completed: false },
                { title: 'Online Investment Platforms', duration: '40 minutes', completed: false }
            ]
        },
        business: {
            title: 'Business Finance',
            description: 'Managing business and small business finances',
            lessons: [
                { title: 'Business Budgeting', duration: '50 minutes', completed: false },
                { title: 'Cash Flow Management', duration: '60 minutes', completed: false },
                { title: 'Business Investment', duration: '45 minutes', completed: false },
                { title: 'Financial Analysis', duration: '55 minutes', completed: false }
            ]
        }
    };

    showLearningModal(category, categoryData[category]);
}

function showLearningModal(category, data) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 modal-overlay flex items-center justify-center z-50 p-6';
    
    modal.innerHTML = `
        <div class="cyber-card rounded-xl max-w-xl w-full max-h-[70vh] overflow-y-auto">
            <div class="sticky top-0 glass border-b border-white/20 p-6 rounded-t-xl">
                <div class="flex justify-between items-start">
                    <div>
                        <h3 class="text-2xl font-bold text-white mb-2 neon-text">${data.title}</h3>
                        <p class="text-gray-300">${data.description}</p>
                    </div>
                    <button class="text-gray-400 hover:text-accent text-2xl transition-colors duration-300" onclick="closeModal(this)">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
            
            <div class="p-6">
                <div class="mb-6">
                    <h4 class="text-lg font-semibold text-white mb-4">AI Learning Modules (${data.lessons.length} Lessons)</h4>
                    <div class="space-y-3">
                        ${data.lessons.map((lesson, index) => `
                            <div class="flex items-center justify-between p-4 glass rounded-lg hover:bg-white/10 transition-all duration-300 cursor-pointer lesson-item border border-white/10" data-lesson="${index}">
                                <div class="flex items-center gap-4">
                                    <div class="lesson-number">
                                        ${index + 1}
                                    </div>
                                    <div>
                                        <h5 class="font-medium text-white">${lesson.title}</h5>
                                        <p class="text-sm text-gray-300">Duration: ${lesson.duration}</p>
                                    </div>
                                </div>
                                <div class="flex items-center gap-2">
                                    <span class="text-xs px-2 py-1 bg-primary/20 text-primary rounded-full border border-primary/30">Not Started</span>
                                    <i class="fas fa-chevron-right text-accent"></i>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="bg-gradient-to-r from-primary to-secondary rounded-lg p-6 text-white mb-6 border border-white/20">
                    <h4 class="text-lg font-semibold mb-2">After completing this AI module, you will:</h4>
                    <ul class="space-y-1 text-sm opacity-90">
                        ${getCategoryBenefits(category).map(benefit => `<li>• ${benefit}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="flex gap-4">
                    <button class="flex-1 cyber-button text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300" onclick="startFirstLesson('${category}')">
                        Start First Lesson
                    </button>
                    <button class="px-6 py-3 border border-white/30 text-gray-300 rounded-lg hover:bg-white/10 transition-all duration-300" onclick="closeModal(this)">
                        Later
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Lock body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    // Animate modal in with enhanced blur effect
    requestAnimationFrame(() => {
        modal.style.opacity = '0';
        modal.querySelector('.cyber-card').style.transform = 'scale(0.9) translateY(20px)';
        modal.style.backdropFilter = 'blur(0px)';
        modal.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        modal.querySelector('.cyber-card').style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        
        requestAnimationFrame(() => {
            modal.style.opacity = '1';
            modal.style.backdropFilter = 'blur(20px)';
            modal.querySelector('.cyber-card').style.transform = 'scale(1) translateY(0px)';
        });
    });
    
    // Lock body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    // Add click animation to modal background
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal(modal.querySelector('button'));
        }
    });
    
    // Animate modal in with enhanced blur effect
    requestAnimationFrame(() => {
        modal.style.opacity = '0';
        modal.querySelector('.cyber-card').style.transform = 'scale(0.9) translateY(20px)';
        modal.style.backdropFilter = 'blur(0px)';
        modal.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        modal.querySelector('.cyber-card').style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        
        requestAnimationFrame(() => {
            modal.style.opacity = '1';
            modal.style.backdropFilter = 'blur(20px)';
            modal.querySelector('.cyber-card').style.transform = 'scale(1) translateY(0px)';
        });
    });
}

function getCategoryBenefits(category) {
    const benefits = {
        budgeting: [
            'Able to create realistic monthly budgets',
            'Memahami cara mengalokasikan pendapatan dengan efektif',
            'Dapat membangun emergency fund yang solid',
            'Menguasai tools dan aplikasi budgeting'
        ],
        investment: [
            'Understanding various types of investment instruments',
            'Can build diversified investment portfolios',
            'Master investment risk management strategies',
            'Able to perform simple investment analysis'
        ],
        management: [
            'Menguasai teknik menabung yang efektif',
            'Dapat mengelola dan melunasi hutang dengan strategis',
            'Mampu menetapkan dan mencapai tujuan finansial',
            'Memahami perencanaan dana pensiun'
        ],
        planning: [
            'Dapat menyusun rencana keuangan jangka panjang',
            'Memahami strategi asuransi yang tepat',
            'Menguasai optimalisasi pajak personal',
            'Mampu merencanakan warisan dan estate'
        ],
        digital: [
            'Menguasai penggunaan e-wallet dan digital banking',
            'Memahami dasar-dasar cryptocurrency',
            'Dapat menggunakan fintech dengan aman',
            'Know trusted online investment platforms'
        ],
        business: [
            'Can create realistic business budgets',
            'Menguasai manajemen cash flow perusahaan',
            'Understanding investment strategies for business',
            'Mampu melakukan analisis keuangan bisnis'
        ]
    };
    
    return benefits[category] || [];
}

function startFirstLesson(category) {
    // Close modal first
    const modal = document.querySelector('.fixed.inset-0');
    if (modal) {
        closeModal(modal.querySelector('button'));
    }
    
    // Show lesson content
    setTimeout(() => {
        showLessonContent(category, 0);
    }, 300);
}

function showLessonContent(category, lessonIndex) {
    // This would typically navigate to a detailed lesson page
    // For now, we'll show a simple completion simulation
    
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 modal-overlay flex items-center justify-center z-50 p-6';
    
    modal.innerHTML = `
        <div class="cyber-card rounded-xl max-w-lg w-full p-8 text-center">
            <div class="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-slow">
                <i class="fas fa-play text-2xl text-white"></i>
            </div>
            <h3 class="text-xl font-bold text-white mb-4 neon-text">Starting AI Lesson</h3>
            <p class="text-gray-300 mb-6">
                In the actual implementation, this will lead to an interactive learning page with videos, quizzes, and complete materials.
            </p>
            <div class="flex gap-4">
                <button class="flex-1 cyber-button text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300" onclick="simulateCompletion('${category}', ${lessonIndex})">
                    Complete Simulation
                </button>
                <button class="px-6 py-3 border border-white/30 text-gray-300 rounded-lg hover:bg-white/10 transition-all duration-300" onclick="closeModal(this)">
                    Back
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Lock body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    // Animate modal in with enhanced blur effect
    requestAnimationFrame(() => {
        modal.style.opacity = '0';
        modal.querySelector('.cyber-card').style.transform = 'scale(0.9) translateY(20px)';
        modal.style.backdropFilter = 'blur(0px)';
        modal.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        modal.querySelector('.cyber-card').style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        
        requestAnimationFrame(() => {
            modal.style.opacity = '1';
            modal.style.backdropFilter = 'blur(20px)';
            modal.querySelector('.cyber-card').style.transform = 'scale(1) translateY(0px)';
        });
    });
}

function simulateCompletion(category, lessonIndex) {
    // Update progress
    userProgress[category].completed = Math.min(userProgress[category].completed + 1, userProgress[category].total);
    saveProgress();
    updateProgressDisplay();
    
    // Close modal
    const modal = document.querySelector('.fixed.inset-0');
    if (modal) {
        closeModal(modal.querySelector('button'));
    }
    
    // Show completion message
    setTimeout(() => {
        showCompletionMessage(category);
    }, 300);
}

function showCompletionMessage(category) {
    const progress = userProgress[category];
    const isCompleted = progress.completed === progress.total;
    
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 modal-overlay flex items-center justify-center z-50 p-6';
    
    modal.innerHTML = `
        <div class="cyber-card rounded-xl max-w-lg w-full p-8 text-center">
            <div class="w-16 h-16 bg-gradient-to-r from-secondary to-accent rounded-full flex items-center justify-center mx-auto mb-6 animate-glow">
                <i class="fas fa-check text-2xl text-white"></i>
            </div>
            <h3 class="text-xl font-bold text-white mb-4 neon-text">
                ${isCompleted ? 'Module Complete!' : 'Lesson Complete!'}
            </h3>
            <p class="text-gray-300 mb-6">
                ${isCompleted 
                    ? `Congratulations! You have completed all materials in this AI module. You are eligible for an NFT certificate.`
                    : `Your Progress: ${progress.completed}/${progress.total} lessons completed.`
                }
            </p>
            <div class="flex gap-4">
                ${isCompleted 
                    ? `<button class="flex-1 cyber-button bg-gradient-to-r from-secondary to-accent text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300" onclick="downloadCertificate('${category}')">
                        Download NFT Certificate
                    </button>`
                    : `<button class="flex-1 cyber-button text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300" onclick="continueNext('${category}')">
                        Continue Learning
                    </button>`
                }
                <button class="px-6 py-3 border border-white/30 text-gray-300 rounded-lg hover:bg-white/10 transition-all duration-300" onclick="closeModal(this)">
                    Close
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Lock body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    // Animate modal in with enhanced blur effect
    requestAnimationFrame(() => {
        modal.style.opacity = '0';
        modal.querySelector('.cyber-card').style.transform = 'scale(0.9) translateY(20px)';
        modal.style.backdropFilter = 'blur(0px)';
        modal.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        modal.querySelector('.cyber-card').style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        
        requestAnimationFrame(() => {
            modal.style.opacity = '1';
            modal.style.backdropFilter = 'blur(20px)';
            modal.querySelector('.cyber-card').style.transform = 'scale(1) translateY(0px)';
        });
    });
}

function downloadCertificate(category) {
    alert(`Certificate for category "${category}" will be downloaded.\n\nIn actual implementation, this will generate a PDF certificate with username and completion date.`);
    closeModal(document.querySelector('.fixed.inset-0 button'));
}

function continueNext(category) {
    closeModal(document.querySelector('.fixed.inset-0 button'));
    // In real implementation, this would continue to next lesson
    alert('Melanjutkan ke pelajaran berikutnya...');
}

function closeModal(button) {
    const modal = button.closest('.fixed.inset-0');
    if (modal) {
        // Restore body scroll
        document.body.style.overflow = 'auto';
        
        // Animate modal out with blur effect
        modal.style.opacity = '0';
        modal.style.backdropFilter = 'blur(0px)';
        modal.querySelector('.cyber-card').style.transform = 'scale(0.9) translateY(-20px)';
        modal.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        modal.querySelector('.cyber-card').style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        
        setTimeout(() => {
            if (modal.parentNode) {
                document.body.removeChild(modal);
            }
        }, 300);
    }
}

// Calculator functions
function initializeCalculators() {
    // Calculator initialization will be handled when opened
}

function openCalculator(type) {
    const calculators = {
        budget: showBudgetCalculator,
        investment: showInvestmentCalculator,
        emergency: showEmergencyCalculator
    };
    
    if (calculators[type]) {
        calculators[type]();
    }
}

function showBudgetCalculator() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 modal-overlay flex items-center justify-center z-50 p-6';
    
    modal.innerHTML = `
        <div class="cyber-card rounded-xl max-w-md w-full p-6">
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-2xl font-bold text-white neon-text">AI Budget Quantum 50/30/20</h3>
                <button class="text-gray-400 hover:text-accent text-xl transition-colors duration-300" onclick="closeModal(this)">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-white mb-2">Monthly Income ($)</label>
                    <input type="number" id="monthlyIncome" class="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-accent focus:border-accent" placeholder="5000">
                </div>
                
                <button class="w-full cyber-button text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300" onclick="calculateBudget()">
                    Calculate AI Budget
                </button>
                
                <div id="budgetResult" class="hidden space-y-3 mt-6 p-4 glass rounded-lg border border-white/20">
                    <h4 class="font-semibold text-white neon-text">AI Calculation Results:</h4>
                    <div class="space-y-2">
                        <div class="flex justify-between text-gray-300">
                            <span>Needs (50%)</span>
                            <span id="needs" class="font-medium text-accent"></span>
                        </div>
                        <div class="flex justify-between text-gray-300">
                            <span>Wants (30%)</span>
                            <span id="wants" class="font-medium text-primary"></span>
                        </div>
                        <div class="flex justify-between text-gray-300">
                            <span>Savings & Investment (20%)</span>
                            <span id="savings" class="font-medium text-secondary"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Lock body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    // Animate modal in with enhanced blur effect
    requestAnimationFrame(() => {
        modal.style.opacity = '0';
        modal.querySelector('.cyber-card').style.transform = 'scale(0.9) translateY(20px)';
        modal.style.backdropFilter = 'blur(0px)';
        modal.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        modal.querySelector('.cyber-card').style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        
        requestAnimationFrame(() => {
            modal.style.opacity = '1';
            modal.style.backdropFilter = 'blur(20px)';
            modal.querySelector('.cyber-card').style.transform = 'scale(1) translateY(0px)';
        });
    });
}

function calculateBudget() {
    const income = parseFloat(document.getElementById('monthlyIncome').value);
    
    if (!income || income <= 0) {
        alert('Mohon masukkan penghasilan bulanan yang valid');
        return;
    }
    
    const needs = income * 0.5;
    const wants = income * 0.3;
    const savings = income * 0.2;
    
    document.getElementById('needs').textContent = `Rp ${needs.toLocaleString('id-ID')}`;
    document.getElementById('wants').textContent = `Rp ${wants.toLocaleString('id-ID')}`;
    document.getElementById('savings').textContent = `Rp ${savings.toLocaleString('id-ID')}`;
    
    document.getElementById('budgetResult').classList.remove('hidden');
}

function showInvestmentCalculator() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 modal-overlay flex items-center justify-center z-50 p-6';
    
    modal.innerHTML = `
        <div class="cyber-card rounded-xl max-w-md w-full p-6">
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-2xl font-bold text-white neon-text">DeFi Investment Simulator</h3>
                <button class="text-gray-400 hover:text-accent text-xl transition-colors duration-300" onclick="closeModal(this)">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-white mb-2">Initial Investment ($)</label>
                    <input type="number" id="initialInvestment" class="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-secondary focus:border-secondary" placeholder="10000">
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-white mb-2">Monthly Investment ($)</label>
                    <input type="number" id="monthlyInvestment" class="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-secondary focus:border-secondary" placeholder="1000">
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-white mb-2">Annual Return (%)</label>
                    <input type="number" id="annualReturn" class="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-secondary focus:border-secondary" placeholder="12" step="0.1">
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-white mb-2">Time Period (Years)</label>
                    <input type="number" id="investmentPeriod" class="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-secondary focus:border-secondary" placeholder="10">
                </div>
                
                <button class="w-full cyber-button bg-gradient-to-r from-secondary to-primary text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300" onclick="calculateInvestment()">
                    Calculate DeFi Investment
                </button>
                
                <div id="investmentResult" class="hidden space-y-3 mt-6 p-4 glass rounded-lg border border-white/20">
                    <h4 class="font-semibold text-white neon-text">DeFi Investment Projection:</h4>
                    <div class="space-y-2">
                        <div class="flex justify-between text-gray-300">
                            <span>Total Invested</span>
                            <span id="totalInvested" class="font-medium text-primary"></span>
                        </div>
                        <div class="flex justify-between text-gray-300">
                            <span>Final Value</span>
                            <span id="finalValue" class="font-medium text-secondary"></span>
                        </div>
                        <div class="flex justify-between text-gray-300">
                            <span>Total Return</span>
                            <span id="totalReturn" class="font-medium text-accent"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Lock body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    // Animate modal in with enhanced blur effect
    requestAnimationFrame(() => {
        modal.style.opacity = '0';
        modal.querySelector('.cyber-card').style.transform = 'scale(0.9) translateY(20px)';
        modal.style.backdropFilter = 'blur(0px)';
        modal.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        modal.querySelector('.cyber-card').style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        
        requestAnimationFrame(() => {
            modal.style.opacity = '1';
            modal.style.backdropFilter = 'blur(20px)';
            modal.querySelector('.cyber-card').style.transform = 'scale(1) translateY(0px)';
        });
    });
}

function calculateInvestment() {
    const initial = parseFloat(document.getElementById('initialInvestment').value) || 0;
    const monthly = parseFloat(document.getElementById('monthlyInvestment').value) || 0;
    const rate = parseFloat(document.getElementById('annualReturn').value) / 100 || 0;
    const years = parseFloat(document.getElementById('investmentPeriod').value) || 0;
    
    if (years <= 0) {
        alert('Mohon masukkan jangka waktu yang valid');
        return;
    }
    
    const monthlyRate = rate / 12;
    const months = years * 12;
    
    // Future value of initial investment
    const futureValueInitial = initial * Math.pow(1 + rate, years);
    
    // Future value of monthly investments (annuity)
    const futureValueMonthly = monthly * (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate;
    
    const totalInvested = initial + (monthly * months);
    const finalValue = futureValueInitial + futureValueMonthly;
    const totalReturn = finalValue - totalInvested;
    
    document.getElementById('totalInvested').textContent = `Rp ${totalInvested.toLocaleString('id-ID')}`;
    document.getElementById('finalValue').textContent = `Rp ${Math.round(finalValue).toLocaleString('id-ID')}`;
    document.getElementById('totalReturn').textContent = `Rp ${Math.round(totalReturn).toLocaleString('id-ID')}`;
    
    document.getElementById('investmentResult').classList.remove('hidden');
}

function showEmergencyCalculator() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 modal-overlay flex items-center justify-center z-50 p-6';
    
    modal.innerHTML = `
        <div class="cyber-card rounded-xl max-w-md w-full p-6">
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-2xl font-bold text-white neon-text">Neural Emergency AI</h3>
                <button class="text-gray-400 hover:text-accent text-xl transition-colors duration-300" onclick="closeModal(this)">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-white mb-2">Monthly Expenses ($)</label>
                    <input type="number" id="monthlyExpenses" class="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-accent focus:border-accent" placeholder="4000">
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-white mb-2">Emergency Fund Duration</label>
                    <select id="emergencyMonths" class="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white focus:ring-2 focus:ring-accent focus:border-accent">
                        <option value="3" class="bg-dark-card text-white">3 months (minimum)</option>
                        <option value="6" selected class="bg-dark-card text-white">6 months (ideal)</option>
                        <option value="9" class="bg-dark-card text-white">9 months (conservative)</option>
                        <option value="12" class="bg-dark-card text-white">12 months (very conservative)</option>
                    </select>
                </div>
                
                <button class="w-full cyber-button bg-gradient-to-r from-accent to-primary text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300" onclick="calculateEmergencyFund()">
                    Calculate Neural Emergency Fund
                </button>
                
                <div id="emergencyResult" class="hidden space-y-3 mt-6 p-4 glass rounded-lg border border-white/20">
                    <h4 class="font-semibold text-white neon-text">Neural Emergency Fund Requirement:</h4>
                    <div class="space-y-2">
                        <div class="flex justify-between text-gray-300">
                            <span>Target Emergency Fund</span>
                            <span id="emergencyTarget" class="font-medium text-accent text-lg"></span>
                        </div>
                        <div class="mt-4 p-3 bg-accent/10 rounded-lg border border-accent/30">
                            <p class="text-sm text-accent">
                                <i class="fas fa-brain mr-2"></i>
                                AI Recommendation: Store emergency fund in a separate account that's easily accessible but not too convenient for impulsive spending.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Lock body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    // Animate modal in with enhanced blur effect
    requestAnimationFrame(() => {
        modal.style.opacity = '0';
        modal.querySelector('.cyber-card').style.transform = 'scale(0.9) translateY(20px)';
        modal.style.backdropFilter = 'blur(0px)';
        modal.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        modal.querySelector('.cyber-card').style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        
        requestAnimationFrame(() => {
            modal.style.opacity = '1';
            modal.style.backdropFilter = 'blur(20px)';
            modal.querySelector('.cyber-card').style.transform = 'scale(1) translateY(0px)';
        });
    });
}

function calculateEmergencyFund() {
    const expenses = parseFloat(document.getElementById('monthlyExpenses').value);
    const months = parseFloat(document.getElementById('emergencyMonths').value);
    
    if (!expenses || expenses <= 0) {
        alert('Mohon masukkan pengeluaran bulanan yang valid');
        return;
    }
    
    const emergencyFund = expenses * months;
    
    document.getElementById('emergencyTarget').textContent = `$${emergencyFund.toLocaleString('en-US')}`;
    document.getElementById('emergencyResult').classList.remove('hidden');
}

// Mobile navigation
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
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
    }
});
