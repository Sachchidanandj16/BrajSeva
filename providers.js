// Providers Page JavaScript
class ProvidersPage {
    constructor() {
        this.allProvidersContainer = document.getElementById('all-providers');
        this.providerSearchInput = document.getElementById('provider-search-input');
        this.searchProvidersBtn = document.getElementById('search-providers-btn');
        this.serviceFilter = document.getElementById('service-filter');
        this.locationFilter = document.getElementById('location-filter');
        this.ratingFilter = document.getElementById('rating-filter');
        this.loadMoreBtn = document.getElementById('load-more-btn');
        this.bookingModal = document.getElementById('booking-modal');
        this.providerDetailModal = document.getElementById('provider-detail-modal');
        this.providerDetailTitle = document.getElementById('provider-detail-title');
        this.providerDetailContent = document.getElementById('provider-detail-content');

        // Statistics elements
        this.totalProvidersCount = document.getElementById('total-providers-count');
        this.verifiedProvidersCount = document.getElementById('verified-providers-count');
        this.topRatedCount = document.getElementById('top-rated-count');

        // Extended providers data
        this.providersData = [
            {
                id: 1,
                name: "Rajesh Kumar",
                service: "Home Repair",
                location: "Mathura",
                rating: 4.8,
                reviews: 124,
                price: "₹500/hr",
                verified: true,
                description: "Experienced home repair specialist with 10+ years of experience. Specializes in plumbing, electrical work, and general home maintenance.",
                experience: "10+ years",
                languages: ["Hindi", "English"],
                services: ["Plumbing", "Electrical", "Carpentry", "General Repair"],
                availability: "Mon-Sun: 8AM-8PM",
                responseTime: "Within 2 hours",
                portfolio: ["Residential Repairs", "Commercial Maintenance", "Emergency Services"],
                certifications: ["Certified Electrician", "Plumbing License"],
                areasServed: ["Mathura", "Vrindavan", "Gokul"]
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
                description: "Professional painter specializing in residential and commercial properties. Uses high-quality, eco-friendly paints.",
                experience: "7 years",
                languages: ["Hindi"],
                services: ["Interior Painting", "Exterior Painting", "Wall Texture", "Waterproofing"],
                availability: "Mon-Sat: 9AM-6PM",
                responseTime: "Within 24 hours",
                portfolio: ["Home Painting", "Office Interiors", "Texture Work"],
                certifications: ["Painting Certification", "Safety Training"],
                areasServed: ["Vrindavan", "Mathura"]
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
                description: "Expert gardener with knowledge of local plants and landscaping. Creates beautiful, sustainable gardens.",
                experience: "12 years",
                languages: ["Hindi"],
                services: ["Landscaping", "Lawn Care", "Planting", "Garden Maintenance"],
                availability: "Mon-Sun: 7AM-7PM",
                responseTime: "Within 4 hours",
                portfolio: ["Residential Gardens", "Commercial Landscaping", "Plant Care"],
                certifications: ["Horticulture Diploma", "Landscape Design"],
                areasServed: ["Gokul", "Barsana", "Mathura"]
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
                description: "Professional cleaning services for homes and offices. Uses safe, chemical-free cleaning products.",
                experience: "8 years",
                languages: ["Hindi"],
                services: ["Home Cleaning", "Office Cleaning", "Deep Cleaning", "Post-Construction Cleaning"],
                availability: "Mon-Sat: 8AM-8PM",
                responseTime: "Within 6 hours",
                portfolio: ["Residential Cleaning", "Commercial Spaces", "Special Event Cleaning"],
                certifications: ["Cleaning Certification", "Safety Training"],
                areasServed: ["Barsana", "Gokul"]
            },
            {
                id: 5,
                name: "Vikram Singh",
                service: "Moving",
                location: "Mathura",
                rating: 4.5,
                reviews: 78,
                price: "₹2000/day",
                verified: false,
                description: "Reliable moving services with proper equipment and care. Handles both residential and commercial moves.",
                experience: "5 years",
                languages: ["Hindi", "English"],
                services: ["Home Shifting", "Office Relocation", "Packing", "Transport"],
                availability: "Mon-Sun: 7AM-9PM",
                responseTime: "Within 12 hours",
                portfolio: ["Local Moves", "Inter-city Transport", "Furniture Handling"],
                certifications: ["Transport License"],
                areasServed: ["Mathura", "Vrindavan", "Gokul", "Barsana"]
            },
            {
                id: 6,
                name: "Anita Verma",
                service: "Tutoring",
                location: "Vrindavan",
                rating: 4.9,
                reviews: 45,
                price: "₹600/hr",
                verified: true,
                description: "Qualified tutor with expertise in mathematics and science. Provides personalized learning plans.",
                experience: "6 years",
                languages: ["Hindi", "English"],
                services: ["Math Tutoring", "Science Coaching", "Exam Preparation", "Homework Help"],
                availability: "Mon-Sat: 3PM-8PM",
                responseTime: "Within 2 hours",
                portfolio: ["School Students", "College Level", "Competitive Exams"],
                certifications: ["M.Sc. Mathematics", "Teaching Certificate"],
                areasServed: ["Vrindavan", "Mathura"]
            },
            {
                id: 7,
                name: "Ramesh Patel",
                service: "Plumbing",
                location: "Mathura",
                rating: 4.3,
                reviews: 34,
                price: "₹450/hr",
                verified: false,
                description: "Expert plumber with 8 years of experience. Specializes in pipe repairs and installations.",
                experience: "8 years",
                languages: ["Hindi"],
                services: ["Pipe Repair", "Tap Installation", "Drain Cleaning", "Bathroom Fittings"],
                availability: "Mon-Sun: 8AM-8PM",
                responseTime: "Within 3 hours",
                portfolio: ["Residential Plumbing", "Commercial Projects", "Emergency Repairs"],
                certifications: ["Plumbing License"],
                areasServed: ["Mathura"]
            },
            {
                id: 8,
                name: "Suresh Kumar",
                service: "Electrical",
                location: "Gokul",
                rating: 4.7,
                reviews: 56,
                price: "₹550/hr",
                verified: true,
                description: "Certified electrician with 9 years of experience in residential and commercial electrical work.",
                experience: "9 years",
                languages: ["Hindi"],
                services: ["Wiring", "Switchboard Repair", "Appliance Installation", "Lighting Setup"],
                availability: "Mon-Sat: 9AM-7PM",
                responseTime: "Within 4 hours",
                portfolio: ["Home Electrical", "Office Wiring", "Safety Inspections"],
                certifications: ["Electrical License", "Safety Certification"],
                areasServed: ["Gokul", "Barsana"]
            }
        ];

        this.currentPage = 1;
        this.providersPerPage = 6;
        this.filteredProviders = [];

        this.init();
    }

    init() {
        this.updateStatistics();
        this.loadAllProviders();
        this.setupEventListeners();
        
        // Check for URL parameters
        const params = this.getUrlParams();
        if (params.provider) {
            const providerId = parseInt(params.provider);
            this.showProviderDetail(providerId);
        }
        
        if (params.service) {
            this.serviceFilter.value = params.service;
            this.filterProviders();
        }
        
        if (params.location) {
            this.locationFilter.value = params.location;
            this.filterProviders();
        }

        // Quick filter buttons
        document.querySelectorAll('.quick-filter').forEach(button => {
            button.addEventListener('click', () => {
                const service = button.getAttribute('data-service');
                const rating = button.getAttribute('data-rating');
                const verified = button.getAttribute('data-verified');
                const location = button.getAttribute('data-location');
                
                if (service && service !== 'all') {
                    this.serviceFilter.value = service;
                }
                if (rating) {
                    this.ratingFilter.value = rating;
                }
                if (verified) {
                    document.getElementById('verification-filter').value = verified;
                }
                if (location) {
                    this.locationFilter.value = location;
                }
                
                this.filterProviders();
            });
        });
    }

    updateStatistics() {
        if (!this.totalProvidersCount) return;
        
        this.totalProvidersCount.textContent = this.providersData.length;
        this.verifiedProvidersCount.textContent = this.providersData.filter(p => p.verified).length;
        this.topRatedCount.textContent = this.providersData.filter(p => p.rating >= 4.5).length;
        
        // Update active providers count (simulated)
        const activeCount = Math.floor(Math.random() * 10) + 15;
        document.getElementById('active-providers').textContent = activeCount;
    }

    loadAllProviders() {
        if (!this.allProvidersContainer) return;
        
        // Reset to first page
        this.currentPage = 1;
        this.filteredProviders = [...this.providersData];
        this.renderProviders();
    }

    renderProviders() {
        if (!this.allProvidersContainer) return;
        
        this.allProvidersContainer.innerHTML = '';
        
        const startIndex = 0;
        const endIndex = this.currentPage * this.providersPerPage;
        const providersToShow = this.filteredProviders.slice(startIndex, endIndex);
        
        if (providersToShow.length === 0) {
            this.allProvidersContainer.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h3>No providers found</h3>
                    <p>Try adjusting your search criteria</p>
                    <button class="btn btn-primary" onclick="providersPage.clearProviderFilters()" style="margin-top: 1rem;">Clear Filters</button>
                </div>
            `;
            this.loadMoreBtn.style.display = 'none';
            return;
        }
        
        providersToShow.forEach(provider => {
            const stars = this.generateStars(provider.rating);
            
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
                    <div class="provider-features">
                        <span class="feature-tag"><i class="fas fa-clock"></i> ${provider.responseTime}</span>
                        <span class="feature-tag"><i class="fas fa-briefcase"></i> ${provider.experience}</span>
                    </div>
                </div>
                <div class="provider-footer">
                    <div class="provider-price">${provider.price}</div>
                    <div>
                        <button class="btn btn-primary book-btn" data-id="${provider.id}">Book Now</button>
                        <button class="btn btn-outline view-details-btn" data-id="${provider.id}" style="margin-left: 5px;">Details</button>
                    </div>
                </div>
            `;
            
            this.allProvidersContainer.appendChild(providerCard);
        });
        
        // Show/hide load more button
        if (this.filteredProviders.length > endIndex) {
            this.loadMoreBtn.style.display = 'block';
        } else {
            this.loadMoreBtn.style.display = 'none';
        }
        
        // Add event listeners
        this.attachProviderEventListeners();
    }

    attachProviderEventListeners() {
        document.querySelectorAll('.book-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const providerId = parseInt(e.target.getAttribute('data-id'));
                this.openBookingModal(providerId);
            });
        });
        
        document.querySelectorAll('.view-details-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const providerId = parseInt(e.target.getAttribute('data-id'));
                this.showProviderDetail(providerId);
            });
        });
    }

    filterProviders() {
        const searchTerm = this.providerSearchInput.value.toLowerCase();
        const service = this.serviceFilter.value;
        const location = this.locationFilter.value;
        const rating = this.ratingFilter.value;
        const verificationFilter = document.getElementById('verification-filter');
        const verification = verificationFilter ? verificationFilter.value : 'all';
        
        this.filteredProviders = this.providersData.filter(provider => {
            const matchesSearch = provider.name.toLowerCase().includes(searchTerm) || 
                                provider.service.toLowerCase().includes(searchTerm) ||
                                provider.description.toLowerCase().includes(searchTerm);
            const matchesService = service === 'all' || provider.service === service;
            const matchesLocation = location === 'all' || provider.location === location;
            const matchesRating = rating === 'all' || provider.rating >= parseFloat(rating);
            const matchesVerification = verification === 'all' || 
                                      (verification === 'verified' && provider.verified) ||
                                      (verification === 'unverified' && !provider.verified);
            
            return matchesSearch && matchesService && matchesLocation && matchesRating && matchesVerification;
        });
        
        this.currentPage = 1;
        this.renderProviders();
    }

    clearProviderFilters() {
        this.providerSearchInput.value = '';
        this.serviceFilter.value = 'all';
        this.locationFilter.value = 'all';
        this.ratingFilter.value = 'all';
        const verificationFilter = document.getElementById('verification-filter');
        if (verificationFilter) verificationFilter.value = 'all';
        this.loadAllProviders();
    }

    loadMoreProviders() {
        this.currentPage++;
        this.renderProviders();
    }

    openBookingModal(providerId) {
        const provider = this.providersData.find(p => p.id === providerId);
        if (!provider) return;
        
        document.getElementById('booking-service').value = provider.service;
        document.getElementById('booking-provider').value = provider.name;
        document.getElementById('booking-service-summary').textContent = provider.service;
        document.getElementById('booking-provider-summary').textContent = provider.name;
        document.getElementById('booking-cost-summary').textContent = provider.price;
        
        this.bookingModal.style.display = 'flex';
        
        // Set minimum date to today
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('booking-date').min = today;
        
        // Set default time to next available hour
        const now = new Date();
        const nextHour = now.getHours() + 1;
        document.getElementById('booking-time').value = `${nextHour.toString().padStart(2, '0')}:00`;
    }

    showProviderDetail(providerId) {
        const provider = this.providersData.find(p => p.id === providerId);
        if (!provider) return;
        
        const stars = this.generateStars(provider.rating);
        
        this.providerDetailTitle.textContent = `${provider.name} - ${provider.service}`;
        
        this.providerDetailContent.innerHTML = `
            <div class="provider-detail">
                <div>
                    <div class="provider-detail-image">
                        <i class="fas fa-user"></i>
                    </div>
                    <div style="margin-top: 1rem; text-align: center;">
                        ${provider.verified ? 
                            '<span class="status-badge status-approved" style="display: inline-block; margin-bottom: 1rem;">Verified Provider</span>' : 
                            '<span class="status-badge status-pending" style="display: inline-block; margin-bottom: 1rem;">Pending Verification</span>'
                        }
                        <div class="provider-rating" style="justify-content: center;">
                            <div class="stars">${stars}</div>
                            <span class="rating-count">${provider.rating} (${provider.reviews} reviews)</span>
                        </div>
                    </div>
                </div>
                <div class="provider-info">
                    <h3>About ${provider.name}</h3>
                    <p>${provider.description}</p>
                    
                    <div class="service-features">
                        <h4>Service Details</h4>
                        <ul class="feature-list">
                            <li><strong>Experience:</strong> ${provider.experience}</li>
                            <li><strong>Location:</strong> ${provider.location}</li>
                            <li><strong>Response Time:</strong> ${provider.responseTime}</li>
                            <li><strong>Availability:</strong> ${provider.availability}</li>
                            <li><strong>Languages:</strong> ${provider.languages.join(', ')}</li>
                            <li><strong>Price:</strong> ${provider.price}</li>
                            <li><strong>Areas Served:</strong> ${provider.areasServed.join(', ')}</li>
                        </ul>
                    </div>
                    
                    <div class="service-features">
                        <h4>Services Offered</h4>
                        <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px;">
                            ${provider.services.map(service => `<span class="feature-tag">${service}</span>`).join('')}
                        </div>
                    </div>
                    
                    ${provider.certifications ? `
                    <div class="service-features">
                        <h4>Certifications</h4>
                        <ul>
                            ${provider.certifications.map(cert => `<li>${cert}</li>`).join('')}
                        </ul>
                    </div>
                    ` : ''}
                    
                    <div style="margin-top: 2rem; display: flex; gap: 10px; flex-wrap: wrap;">
                        <button class="btn btn-primary book-from-detail-btn" data-id="${provider.id}">Book This Provider</button>
                        <button class="btn btn-outline" onclick="providersPage.providerDetailModal.style.display='none'">Close</button>
                    </div>
                </div>
            </div>
        `;
        
        // Add event listener to book button in detail modal
        const bookButton = this.providerDetailContent.querySelector('.book-from-detail-btn');
        if (bookButton) {
            bookButton.addEventListener('click', (e) => {
                const providerId = parseInt(e.target.getAttribute('data-id'));
                this.providerDetailModal.style.display = 'none';
                this.openBookingModal(providerId);
            });
        }
        
        this.providerDetailModal.style.display = 'flex';
    }

    generateStars(rating) {
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

    setupEventListeners() {
        // Search functionality
        if (this.searchProvidersBtn) {
            this.searchProvidersBtn.addEventListener('click', () => this.filterProviders());
        }
        
        if (this.providerSearchInput) {
            this.providerSearchInput.addEventListener('keyup', (e) => {
                if (e.key === 'Enter') {
                    this.filterProviders();
                }
            });
            
            // Real-time search
            this.providerSearchInput.addEventListener('input', () => {
                if (this.providerSearchInput.value.length === 0 || this.providerSearchInput.value.length > 2) {
                    this.filterProviders();
                }
            });
        }
        
        // Filter changes
        if (this.serviceFilter) {
            this.serviceFilter.addEventListener('change', () => this.filterProviders());
        }
        
        if (this.locationFilter) {
            this.locationFilter.addEventListener('change', () => this.filterProviders());
        }
        
        if (this.ratingFilter) {
            this.ratingFilter.addEventListener('change', () => this.filterProviders());
        }
        
        const verificationFilter = document.getElementById('verification-filter');
        if (verificationFilter) {
            verificationFilter.addEventListener('change', () => this.filterProviders());
        }
        
        // Load more button
        if (this.loadMoreBtn) {
            this.loadMoreBtn.addEventListener('click', () => this.loadMoreProviders());
        }
        
        // Booking form submission
        const bookingForm = document.getElementById('booking-form');
        if (bookingForm) {
            bookingForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const service = document.getElementById('booking-service').value;
                const provider = document.getElementById('booking-provider').value;
                const date = document.getElementById('booking-date').value;
                const time = document.getElementById('booking-time').value;
                const address = document.getElementById('booking-address').value;
                const phone = document.getElementById('booking-phone').value;
                const notes = document.getElementById('booking-notes').value;
                
                // Create booking object
                const booking = {
                    id: Date.now(),
                    service,
                    provider,
                    date,
                    time,
                    address,
                    phone,
                    notes,
                    status: 'pending',
                    timestamp: new Date().toISOString()
                };
                
                // Save to localStorage
                const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
                bookings.push(booking);
                localStorage.setItem('bookings', JSON.stringify(bookings));
                
                this.showNotification('Booking request submitted successfully! We will contact you soon.', 'success');
                this.bookingModal.style.display = 'none';
                bookingForm.reset();
            });
        }
        
        // Close modals when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === this.bookingModal) {
                this.bookingModal.style.display = 'none';
            }
            if (e.target === this.providerDetailModal) {
                this.providerDetailModal.style.display = 'none';
            }
        });
    }

    // Get URL parameters
    getUrlParams() {
        const params = new URLSearchParams(window.location.search);
        const result = {};
        for (const [key, value] of params) {
            result[key] = value;
        }
        return result;
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

// Initialize providers page
let providersPage;
document.addEventListener('DOMContentLoaded', () => {
    providersPage = new ProvidersPage();
});