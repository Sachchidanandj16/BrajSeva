// Application State
const state = {
    currentUser: null,
    isAdmin: false,
    providers: [],
    bookings: [],
    reviews: []
};

// Sample data for services and providers
const servicesData = [
    { 
        id: 1, 
        name: "Home Repair", 
        icon: "fas fa-tools", 
        description: "Plumbing, electrical, carpentry, and other home maintenance services",
        category: "home"
    },
    { 
        id: 2, 
        name: "Painting", 
        icon: "fas fa-paint-roller", 
        description: "Interior and exterior painting services for homes and businesses",
        category: "home"
    },
    { 
        id: 3, 
        name: "Gardening", 
        icon: "fas fa-leaf", 
        description: "Landscaping, lawn care, and garden maintenance services",
        category: "home"
    },
    { 
        id: 4, 
        name: "Cleaning", 
        icon: "fas fa-broom", 
        description: "Residential and commercial cleaning services",
        category: "home"
    },
    { 
        id: 5, 
        name: "Moving", 
        icon: "fas fa-truck-moving", 
        description: "Local moving and transportation services",
        category: "professional"
    },
    { 
        id: 6, 
        name: "Tutoring", 
        icon: "fas fa-user-graduate", 
        description: "Academic tutoring and coaching services",
        category: "education"
    }
];

// DOM Elements
const featuredServicesContainer = document.getElementById('featured-services');
const featuredProvidersContainer = document.getElementById('featured-providers');
const loginModal = document.getElementById('login-modal');
const registerModal = document.getElementById('register-modal');
const adminLoginModal = document.getElementById('admin-login-modal');
const becomeProviderModal = document.getElementById('become-provider-modal');
const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');
const adminNavLink = document.getElementById('admin-nav-link');
const becomeProviderBtn = document.getElementById('become-provider-btn');
const closeModals = document.querySelectorAll('.close-modal');
const switchToRegister = document.getElementById('switch-to-register');
const switchToLogin = document.getElementById('switch-to-login');
const searchBtn = document.getElementById('search-btn');
const notification = document.getElementById('notification');
const authButtons = document.getElementById('auth-buttons');

// Initialize the application
function init() {
    loadFeaturedServices();
    loadFeaturedProviders();
    setupEventListeners();
    setupAdminEventListeners();
    
    // Check for admin session
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    if (isAdmin) {
        state.isAdmin = true;
    }
    
    // Load any saved data
    loadSavedData();
    updateAuthButtons();
}

// Load featured services on homepage
function loadFeaturedServices() {
    if (!featuredServicesContainer) return;
    
    featuredServicesContainer.innerHTML = '';
    
    // Show only 6 featured services
    const featuredServices = servicesData.slice(0, 6);
    
    featuredServices.forEach(service => {
        const serviceCard = document.createElement('div');
        serviceCard.className = 'service-card';
        serviceCard.innerHTML = `
            <div class="service-icon">
                <i class="${service.icon}"></i>
            </div>
            <div class="service-content">
                <h3>${service.name}</h3>
                <p>${service.description}</p>
            </div>
        `;
        
        serviceCard.addEventListener('click', () => {
            window.location.href = `services.html#service-${service.id}`;
        });
        
        featuredServicesContainer.appendChild(serviceCard);
    });
}

// Load featured providers on homepage
function loadFeaturedProviders() {
    if (!featuredProvidersContainer) return;
    
    featuredProvidersContainer.innerHTML = '';
    
    // Sample featured providers
    const featuredProviders = [
        {
            id: 1,
            name: "Rajesh Kumar",
            service: "Home Repair",
            location: "Mathura",
            rating: 4.8,
            reviews: 124,
            price: "₹500/hr",
            verified: true,
            description: "Experienced home repair specialist with 10+ years of experience."
        },
        {
            id: 2,
            name: "Priya Sharma",
            service: "Painting",
            location: "Vrindavan",
            rating: 4.9,
            reviews: 89,
            price: "₹800/day",
            verified: true,
            description: "Professional painter specializing in residential properties."
        },
        {
            id: 3,
            name: "Mohan Lal",
            service: "Gardening",
            location: "Gokul",
            rating: 4.7,
            reviews: 67,
            price: "₹400/hr",
            verified: true,
            description: "Expert gardener with knowledge of local plants and landscaping."
        },
        {
            id: 4,
            name: "Sunita Devi",
            service: "Cleaning",
            location: "Barsana",
            rating: 4.6,
            reviews: 112,
            price: "₹300/hr",
            verified: true,
            description: "Professional cleaning services for homes and offices."
        }
    ];
    
    featuredProviders.forEach(provider => {
        const stars = generateStars(provider.rating);
        
        const providerCard = document.createElement('div');
        providerCard.className = 'provider-card';
        providerCard.innerHTML = `
            <div class="provider-header">
                <div class="provider-image">
                    <i class="fas fa-user"></i>
                </div>
                ${provider.verified ? '<div class="provider-verified"><i class="fas fa-check-circle"></i> Verified</div>' : ''}
            </div>
            <div class="provider-body">
                <h3 class="provider-name">${provider.name}</h3>
                <p class="provider-service">${provider.service}</p>
                <div class="provider-rating">
                    <div class="stars">${stars}</div>
                    <span class="rating-count">${provider.rating} (${provider.reviews} reviews)</span>
                </div>
                <div class="provider-location">
                    <i class="fas fa-map-marker-alt"></i> ${provider.location}
                </div>
                <p class="provider-description">${provider.description}</p>
            </div>
            <div class="provider-footer">
                <div class="provider-price">${provider.price}</div>
                <button class="btn btn-primary book-btn" data-id="${provider.id}">Book Now</button>
            </div>
        `;
        
        featuredProvidersContainer.appendChild(providerCard);
    });
    
    // Add event listeners to book buttons
    document.querySelectorAll('.book-btn').forEach(button => {
        button.addEventListener('click', function() {
            const providerId = parseInt(this.getAttribute('data-id'));
            window.location.href = `providers.html?provider=${providerId}`;
        });
    });
}

// Generate star rating HTML
function generateStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

// Show notification
function showNotification(message, type = 'success') {
    if (!notification) return;
    
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.style.display = 'block';
    
    setTimeout(() => {
        notification.style.display = 'none';
    }, 4000);
}

// Setup event listeners
function setupEventListeners() {
    // Modal open/close
    if (loginBtn) {
        loginBtn.addEventListener('click', () => loginModal.style.display = 'flex');
    }
    
    if (registerBtn) {
        registerBtn.addEventListener('click', () => registerModal.style.display = 'flex');
    }
    
    if (becomeProviderBtn) {
        becomeProviderBtn.addEventListener('click', () => becomeProviderModal.style.display = 'flex');
    }
    
    closeModals.forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });
    
    // Switch between login and register modals
    if (switchToRegister) {
        switchToRegister.addEventListener('click', function(e) {
            e.preventDefault();
            loginModal.style.display = 'none';
            registerModal.style.display = 'flex';
        });
    }
    
    if (switchToLogin) {
        switchToLogin.addEventListener('click', function(e) {
            e.preventDefault();
            registerModal.style.display = 'none';
            loginModal.style.display = 'flex';
        });
    }
    
    // Search functionality
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const serviceSearch = document.getElementById('service-search').value.toLowerCase();
            const locationSearch = document.getElementById('location-search').value.toLowerCase();
            
            if (serviceSearch || locationSearch) {
                // Redirect to providers page with search parameters
                let url = 'providers.html?';
                if (serviceSearch) url += `service=${encodeURIComponent(serviceSearch)}&`;
                if (locationSearch) url += `location=${encodeURIComponent(locationSearch)}`;
                window.location.href = url;
            } else {
                showNotification('Please enter search terms', 'error');
            }
        });
    }
    
    // Form submissions
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            // Simple validation
            if (email && password) {
                state.currentUser = { email, name: email.split('@')[0] };
                localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
                showNotification('Login successful!', 'success');
                loginModal.style.display = 'none';
                updateAuthButtons();
            } else {
                showNotification('Please fill all fields', 'error');
            }
            this.reset();
        });
    }
    
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('register-name').value;
            const email = document.getElementById('register-email').value;
            const phone = document.getElementById('register-phone').value;
            const password = document.getElementById('register-password').value;
            const role = document.getElementById('register-role').value;
            
            if (name && email && phone && password) {
                state.currentUser = { name, email, phone, role };
                localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
                showNotification(`Registration successful! Welcome, ${name}`, 'success');
                registerModal.style.display = 'none';
                updateAuthButtons();
                
                if (role === 'provider') {
                    setTimeout(() => {
                        becomeProviderModal.style.display = 'flex';
                    }, 1000);
                }
            } else {
                showNotification('Please fill all fields', 'error');
            }
            this.reset();
        });
    }
    
    const providerRegistrationForm = document.getElementById('provider-registration-form');
    if (providerRegistrationForm) {
        providerRegistrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Application submitted! We will review and contact you soon.', 'success');
            becomeProviderModal.style.display = 'none';
            this.reset();
        });
    }
    
    // Close modals when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
    
    // Close notification when clicked
    if (notification) {
        notification.addEventListener('click', function() {
            this.style.display = 'none';
        });
    }
}

// Admin functionality
function setupAdminEventListeners() {
    // Admin login form
    const adminLoginForm = document.getElementById('admin-login-form');
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('admin-username').value;
            const password = document.getElementById('admin-password').value;
            
            // Simple admin authentication
            if (username === 'admin' && password === 'admin123') {
                state.isAdmin = true;
                localStorage.setItem('isAdmin', 'true');
                showNotification('Admin login successful! Redirecting...', 'success');
                adminLoginModal.style.display = 'none';
                
                // Redirect to admin panel after short delay
                setTimeout(() => {
                    window.location.href = 'admin.html';
                }, 1000);
            } else {
                showNotification('Invalid admin credentials!', 'error');
            }
            
            this.reset();
        });
    }
    
    // Admin nav link
    if (adminNavLink) {
        adminNavLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Check if already logged in as admin
            const isAdmin = localStorage.getItem('isAdmin') === 'true';
            if (isAdmin) {
                window.location.href = 'admin.html';
            } else {
                adminLoginModal.style.display = 'flex';
            }
        });
    }
}

// Update authentication buttons based on login state
function updateAuthButtons() {
    if (!authButtons) return;
    
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (currentUser) {
        authButtons.innerHTML = `
            <span style="margin-right: 10px; color: white;">Welcome, ${currentUser.name}</span>
            <button class="btn btn-outline" id="logout-btn">Logout</button>
        `;
        
        document.getElementById('logout-btn').addEventListener('click', function() {
            localStorage.removeItem('currentUser');
            state.currentUser = null;
            updateAuthButtons();
            showNotification('Logged out successfully', 'info');
        });
    } else {
        authButtons.innerHTML = `
            <button class="btn btn-outline" id="login-btn">Login</button>
            <button class="btn btn-primary" id="register-btn">Register</button>
        `;
        
        // Re-attach event listeners
        document.getElementById('login-btn').addEventListener('click', () => loginModal.style.display = 'flex');
        document.getElementById('register-btn').addEventListener('click', () => registerModal.style.display = 'flex');
    }
}

// Load saved data from localStorage
function loadSavedData() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        state.currentUser = JSON.parse(savedUser);
    }
    
    const savedProviders = localStorage.getItem('providers');
    if (savedProviders) {
        state.providers = JSON.parse(savedProviders);
    }
    
    const savedBookings = localStorage.getItem('bookings');
    if (savedBookings) {
        state.bookings = JSON.parse(savedBookings);
    }
    
    const savedReviews = localStorage.getItem('reviews');
    if (savedReviews) {
        state.reviews = JSON.parse(savedReviews);
    }
}

// Get URL parameters
function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const result = {};
    for (const [key, value] of params) {
        result[key] = value;
    }
    return result;
}

// Save data to localStorage
function saveData() {
    localStorage.setItem('providers', JSON.stringify(state.providers));
    localStorage.setItem('bookings', JSON.stringify(state.bookings));
    localStorage.setItem('reviews', JSON.stringify(state.reviews));
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', init);