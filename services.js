// Services Page JavaScript
class ServicesPage {
    constructor() {
        this.allServicesContainer = document.getElementById('all-services');
        this.serviceSearchInput = document.getElementById('service-search-input');
        this.searchServicesBtn = document.getElementById('search-services-btn');
        this.categoryFilter = document.getElementById('category-filter');
        this.serviceDetailModal = document.getElementById('service-detail-modal');
        this.serviceDetailTitle = document.getElementById('service-detail-title');
        this.serviceDetailContent = document.getElementById('service-detail-content');
        this.requestServiceBtn = document.getElementById('request-service-btn');

        // Extended services data
        this.servicesData = [
            { 
                id: 1, 
                name: "Home Repair", 
                icon: "fas fa-tools", 
                description: "Plumbing, electrical, carpentry, and other home maintenance services",
                category: "home",
                details: "Comprehensive home repair services including plumbing fixes, electrical work, carpentry, and general maintenance. Our certified professionals ensure quality work with warranty.",
                popularServices: ["Pipe Repair", "Switchboard Fixing", "Furniture Repair", "Door Lock Installation"],
                averageCost: "₹300 - ₹800 per hour",
                benefits: ["24/7 Emergency Service", "90 Days Warranty", "Certified Professionals", "Free Estimation"]
            },
            { 
                id: 2, 
                name: "Painting", 
                icon: "fas fa-paint-roller", 
                description: "Interior and exterior painting services for homes and businesses",
                category: "home",
                details: "Professional painting services using high-quality, eco-friendly paints. We handle everything from surface preparation to final touches for a flawless finish.",
                popularServices: ["Wall Painting", "Texture Painting", "Waterproofing", "Wood Polish"],
                averageCost: "₹12 - ₹25 per sq.ft.",
                benefits: ["Eco-friendly Paints", "Dust-free Process", "Color Consultation", "5 Years Warranty"]
            },
            { 
                id: 3, 
                name: "Gardening", 
                icon: "fas fa-leaf", 
                description: "Landscaping, lawn care, and garden maintenance services",
                category: "home",
                details: "Transform your outdoor space with our expert gardening services. We specialize in landscape design, plant care, and regular garden maintenance.",
                popularServices: ["Lawn Maintenance", "Planting", "Landscape Design", "Garden Cleanup"],
                averageCost: "₹400 - ₹1000 per visit",
                benefits: ["Local Plant Expertise", "Organic Methods", "Seasonal Maintenance", "Free Design Consultation"]
            },
            { 
                id: 4, 
                name: "Cleaning", 
                icon: "fas fa-broom", 
                description: "Residential and commercial cleaning services",
                category: "home",
                details: "Thorough cleaning services for homes and offices using safe, chemical-free products. We offer regular cleaning and deep cleaning services.",
                popularServices: ["Home Cleaning", "Office Cleaning", "Carpet Cleaning", "Post-Renovation Cleaning"],
                averageCost: "₹200 - ₹500 per hour",
                benefits: ["Chemical-free Products", "Trained Staff", "Equipment Provided", "Satisfaction Guaranteed"]
            },
            { 
                id: 5, 
                name: "Moving", 
                icon: "fas fa-truck-moving", 
                description: "Local moving and transportation services",
                category: "professional",
                details: "Stress-free moving services with proper packing, loading, and transportation. We handle your belongings with care and ensure safe delivery.",
                popularServices: ["Home Shifting", "Office Relocation", "Packing Services", "Furniture Transport"],
                averageCost: "₹1500 - ₹5000 per move",
                benefits: ["Careful Handling", "Insurance Coverage", "Packing Materials", "Timely Delivery"]
            },
            { 
                id: 6, 
                name: "Tutoring", 
                icon: "fas fa-user-graduate", 
                description: "Academic tutoring and coaching services",
                category: "education",
                details: "Personalized tutoring services for all subjects and grades. Our qualified tutors provide one-on-one attention and customized learning plans.",
                popularServices: ["Math Tutoring", "Science Coaching", "Language Classes", "Exam Preparation"],
                averageCost: "₹300 - ₹800 per hour",
                benefits: ["Qualified Tutors", "Customized Plans", "Progress Reports", "Flexible Timing"]
            },
            { 
                id: 7, 
                name: "Plumbing", 
                icon: "fas fa-faucet", 
                description: "Professional plumbing and pipe repair services",
                category: "home",
                details: "Expert plumbing services for all your needs - from leaky faucets to complete pipe installations. 24/7 emergency services available.",
                popularServices: ["Pipe Repair", "Tap Installation", "Drain Cleaning", "Water Heater Repair"],
                averageCost: "₹200 - ₹1000 per job",
                benefits: ["24/7 Emergency", "Leak Detection", "Modern Equipment", "1 Year Warranty"]
            },
            { 
                id: 8, 
                name: "Electrical", 
                icon: "fas fa-bolt", 
                description: "Electrical wiring, repairs, and installations",
                category: "home",
                details: "Certified electrical services for residential and commercial properties. We ensure safety compliance and quality workmanship.",
                popularServices: ["Wiring", "Switchboard Repair", "Appliance Installation", "Lighting Setup"],
                averageCost: "₹300 - ₹1200 per job",
                benefits: ["Certified Electricians", "Safety First", "Energy Solutions", "Free Inspection"]
            },
            { 
                id: 9, 
                name: "Carpentry", 
                icon: "fas fa-hammer", 
                description: "Custom furniture and woodwork services",
                category: "home",
                details: "Skilled carpentry services for custom furniture, repairs, and installations. We work with various materials to bring your vision to life.",
                popularServices: ["Furniture Making", "Door Repair", "Shelf Installation", "Wood Polishing"],
                averageCost: "₹400 - ₹1500 per job",
                benefits: ["Custom Designs", "Quality Materials", "Precision Work", "Finishing Touches"]
            }
        ];

        this.init();
    }

    init() {
        this.loadAllServices();
        this.setupEventListeners();
        this.updateServiceStats();
        
        // Check for URL hash (service detail)
        if (window.location.hash) {
            const serviceId = parseInt(window.location.hash.replace('#service-', ''));
            if (serviceId) {
                this.showServiceDetail(serviceId);
            }
        }

        // Category card click handlers
        document.querySelectorAll('.category-card').forEach(card => {
            card.addEventListener('click', () => {
                const category = card.getAttribute('data-category');
                this.categoryFilter.value = category;
                this.filterServices();
            });
        });
    }

    loadAllServices() {
        if (!this.allServicesContainer) return;
        
        this.allServicesContainer.innerHTML = '';
        
        this.servicesData.forEach(service => {
            const serviceCard = document.createElement('div');
            serviceCard.className = 'service-card';
            serviceCard.innerHTML = `
                <div class="service-icon">
                    <i class="${service.icon}"></i>
                </div>
                <div class="service-content">
                    <h3>${service.name}</h3>
                    <p>${service.description}</p>
                    <div class="service-features" style="margin-top: 15px;">
                        <span class="feature-tag">${service.averageCost.split(' - ')[0]}</span>
                        <span class="feature-tag">${service.category}</span>
                    </div>
                    <div style="margin-top: 15px;">
                        <button class="btn btn-primary view-details-btn" data-id="${service.id}">View Details</button>
                        <a href="providers.html?service=${encodeURIComponent(service.name)}" class="btn btn-outline" style="margin-left: 10px;">Find Providers</a>
                    </div>
                </div>
            `;
            
            this.allServicesContainer.appendChild(serviceCard);
        });
        
        // Add event listeners to view details buttons
        this.attachServiceEventListeners();
    }

    attachServiceEventListeners() {
        document.querySelectorAll('.view-details-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const serviceId = parseInt(e.target.getAttribute('data-id'));
                this.showServiceDetail(serviceId);
            });
        });
    }

    showServiceDetail(serviceId) {
        const service = this.servicesData.find(s => s.id === serviceId);
        if (!service) return;
        
        this.serviceDetailTitle.textContent = service.name;
        
        this.serviceDetailContent.innerHTML = `
            <div class="service-detail">
                <div class="service-detail-image">
                    <i class="${service.icon}"></i>
                </div>
                <div class="service-info">
                    <h3>${service.name}</h3>
                    <p>${service.details}</p>
                    
                    <div class="service-features">
                        <h4>Popular Services</h4>
                        <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px;">
                            ${service.popularServices.map(item => `<span class="feature-tag">${item}</span>`).join('')}
                        </div>
                    </div>
                    
                    <div class="service-features">
                        <h4>Benefits</h4>
                        <ul style="margin-top: 10px; padding-left: 20px;">
                            ${service.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="service-cost">
                        <h4>Average Cost</h4>
                        <p style="font-size: 1.2rem; color: var(--primary); font-weight: bold;">${service.averageCost}</p>
                    </div>
                    
                    <div style="margin-top: 2rem; display: flex; gap: 10px; flex-wrap: wrap;">
                        <a href="providers.html?service=${encodeURIComponent(service.name)}" class="btn btn-primary">Find Providers</a>
                        <button class="btn btn-outline" onclick="servicesPage.serviceDetailModal.style.display='none'">Close</button>
                    </div>
                </div>
            </div>
        `;
        
        this.serviceDetailModal.style.display = 'flex';
    }

    filterServices() {
        const searchTerm = this.serviceSearchInput.value.toLowerCase();
        const category = this.categoryFilter.value;
        
        const filteredServices = this.servicesData.filter(service => {
            const matchesSearch = service.name.toLowerCase().includes(searchTerm) || 
                                service.description.toLowerCase().includes(searchTerm);
            const matchesCategory = category === 'all' || service.category === category;
            
            return matchesSearch && matchesCategory;
        });
        
        this.renderFilteredServices(filteredServices);
    }

    renderFilteredServices(services) {
        this.allServicesContainer.innerHTML = '';
        
        if (services.length === 0) {
            this.allServicesContainer.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h3>No services found</h3>
                    <p>Try adjusting your search criteria</p>
                    <button class="btn btn-primary" onclick="servicesPage.clearFilters()" style="margin-top: 1rem;">Clear Filters</button>
                </div>
            `;
            return;
        }
        
        services.forEach(service => {
            const serviceCard = document.createElement('div');
            serviceCard.className = 'service-card';
            serviceCard.innerHTML = `
                <div class="service-icon">
                    <i class="${service.icon}"></i>
                </div>
                <div class="service-content">
                    <h3>${service.name}</h3>
                    <p>${service.description}</p>
                    <div class="service-features" style="margin-top: 15px;">
                        <span class="feature-tag">${service.averageCost.split(' - ')[0]}</span>
                        <span class="feature-tag">${service.category}</span>
                    </div>
                    <div style="margin-top: 15px;">
                        <button class="btn btn-primary view-details-btn" data-id="${service.id}">View Details</button>
                        <a href="providers.html?service=${encodeURIComponent(service.name)}" class="btn btn-outline" style="margin-left: 10px;">Find Providers</a>
                    </div>
                </div>
            `;
            
            this.allServicesContainer.appendChild(serviceCard);
        });
        
        // Re-add event listeners to view details buttons
        this.attachServiceEventListeners();
    }

    clearFilters() {
        this.serviceSearchInput.value = '';
        this.categoryFilter.value = 'all';
        this.loadAllServices();
    }

    updateServiceStats() {
        const homeServices = this.servicesData.filter(s => s.category === 'home').length;
        const professionalServices = this.servicesData.filter(s => s.category === 'professional').length;
        const educationServices = this.servicesData.filter(s => s.category === 'education').length;
        
        document.getElementById('total-services').textContent = this.servicesData.length;
        document.getElementById('home-services').textContent = homeServices;
        document.getElementById('professional-services').textContent = professionalServices;
        document.getElementById('home-count').textContent = `${homeServices} services`;
        document.getElementById('professional-count').textContent = `${professionalServices} services`;
        document.getElementById('education-count').textContent = `${educationServices} services`;
    }

    setupEventListeners() {
        // Search functionality
        if (this.searchServicesBtn) {
            this.searchServicesBtn.addEventListener('click', () => this.filterServices());
        }
        
        if (this.serviceSearchInput) {
            this.serviceSearchInput.addEventListener('keyup', (e) => {
                if (e.key === 'Enter') {
                    this.filterServices();
                }
            });
            
            // Real-time search
            this.serviceSearchInput.addEventListener('input', () => {
                if (this.serviceSearchInput.value.length === 0 || this.serviceSearchInput.value.length > 2) {
                    this.filterServices();
                }
            });
        }
        
        // Category filter
        if (this.categoryFilter) {
            this.categoryFilter.addEventListener('change', () => this.filterServices());
        }
        
        // Request service button
        if (this.requestServiceBtn) {
            this.requestServiceBtn.addEventListener('click', () => {
                this.showNotification('Service request submitted! We will contact you soon.', 'success');
            });
        }
        
        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === this.serviceDetailModal) {
                this.serviceDetailModal.style.display = 'none';
            }
        });
    }

    // Show notification
    showNotification(message, type = 'success') {
        const notification = document.getElementById('notification');
        if (notification) {
            notification.textContent = message;
            notification.className = `notification ${type}`;
            notification.style.display = 'block';
            
            setTimeout(() => {
                notification.style.display = 'none';
            }, 4000);
        }
    }
}

// Initialize services page
let servicesPage;
document.addEventListener('DOMContentLoaded', () => {
    servicesPage = new ServicesPage();
});