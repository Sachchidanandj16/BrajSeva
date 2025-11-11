// Admin Panel JavaScript
class AdminPanel {
    constructor() {
        this.providers = [];
        this.bookings = [];
        this.reviews = [];
        this.init();
    }

    init() {
        this.checkAuth();
        this.loadData();
        this.setupEventListeners();
        this.updateStats();
        this.loadRecentActivity();
    }

    checkAuth() {
        const isAdmin = localStorage.getItem('isAdmin') === 'true';
        if (!isAdmin) {
            window.location.href = 'index.html';
            return;
        }
    }

    loadData() {
        // Load providers data
        this.providers = JSON.parse(localStorage.getItem('providers')) || [
            {
                id: 1, name: "Rajesh Kumar", service: "Home Repair", location: "Mathura",
                rating: 4.8, reviews: 124, status: "approved", verified: true
            },
            {
                id: 2, name: "Priya Sharma", service: "Painting", location: "Vrindavan",
                rating: 4.9, reviews: 89, status: "approved", verified: true
            },
            {
                id: 3, name: "Mohan Lal", service: "Gardening", location: "Gokul",
                rating: 4.7, reviews: 67, status: "approved", verified: true
            },
            {
                id: 4, name: "Sunita Devi", service: "Cleaning", location: "Barsana",
                rating: 4.6, reviews: 112, status: "approved", verified: true
            },
            {
                id: 5, name: "Vikram Singh", service: "Moving", location: "Mathura",
                rating: 4.5, reviews: 78, status: "pending", verified: false
            },
            {
                id: 6, name: "Anita Verma", service: "Tutoring", location: "Vrindavan",
                rating: 4.9, reviews: 45, status: "approved", verified: true
            },
            {
                id: 7, name: "Ramesh Patel", service: "Plumbing", location: "Mathura",
                rating: 4.3, reviews: 34, status: "pending", verified: false
            },
            {
                id: 8, name: "Suresh Kumar", service: "Electrical", location: "Gokul",
                rating: 4.7, reviews: 56, status: "approved", verified: true
            }
        ];

        // Load bookings data
        this.bookings = JSON.parse(localStorage.getItem('bookings')) || [
            { id: 1, customer: "Amit Sharma", provider: "Rajesh Kumar", service: "Home Repair", date: "2023-06-15", amount: "₹1200", status: "confirmed" },
            { id: 2, customer: "Neha Gupta", provider: "Priya Sharma", service: "Painting", date: "2023-06-16", amount: "₹2500", status: "pending" },
            { id: 3, customer: "Rahul Verma", provider: "Mohan Lal", service: "Gardening", date: "2023-06-17", amount: "₹800", status: "completed" },
            { id: 4, customer: "Pooja Singh", provider: "Sunita Devi", service: "Cleaning", date: "2023-06-18", amount: "₹600", status: "confirmed" }
        ];

        // Load reviews data
        this.reviews = JSON.parse(localStorage.getItem('reviews')) || [
            { id: 1, customer: "Amit Sharma", provider: "Rajesh Kumar", rating: 5, comment: "Excellent service! Fixed my plumbing issue quickly.", status: "approved" },
            { id: 2, customer: "Neha Gupta", provider: "Priya Sharma", rating: 4, comment: "Good work but a bit delayed in completion", status: "approved" },
            { id: 3, customer: "Rahul Verma", provider: "Mohan Lal", rating: 5, comment: "Amazing gardening work! Transformed my garden beautifully.", status: "approved" },
            { id: 4, customer: "Pooja Singh", provider: "Sunita Devi", rating: 3, comment: "Average cleaning service, missed some corners", status: "pending" },
            { id: 5, customer: "Ravi Kumar", provider: "Anita Verma", rating: 5, comment: "Excellent tutor! My child's grades improved significantly.", status: "approved" }
        ];

        this.renderProviders();
        this.renderBookings();
        this.renderReviews();
    }

    setupEventListeners() {
        // Tab switching
        document.querySelectorAll('.admin-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                const tabId = tab.getAttribute('data-tab');
                this.switchTab(tabId);
            });
        });

        // Logout
        document.getElementById('admin-logout').addEventListener('click', () => {
            localStorage.removeItem('isAdmin');
            window.location.href = 'index.html';
        });

        // Close notification when clicking
        const notification = document.getElementById('notification');
        if (notification) {
            notification.addEventListener('click', () => {
                notification.style.display = 'none';
            });
        }

        // Add new provider button
        const addProviderBtn = document.querySelector('.admin-section .btn-primary');
        if (addProviderBtn) {
            addProviderBtn.addEventListener('click', () => {
                this.showAddProviderModal();
            });
        }
    }

    switchTab(tabId) {
        // Update active tab
        document.querySelectorAll('.admin-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');

        // Update active content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${tabId}-tab`).classList.add('active');
    }

    updateStats() {
        document.getElementById('total-providers').textContent = this.providers.length;
        document.getElementById('pending-approvals').textContent = this.providers.filter(p => p.status === 'pending').length;
        document.getElementById('total-bookings').textContent = this.bookings.length;
        
        const avgRating = this.providers.length > 0 ? 
            (this.providers.reduce((sum, provider) => sum + provider.rating, 0) / this.providers.length).toFixed(1) : '0.0';
        document.getElementById('avg-rating').textContent = avgRating;
    }

    loadRecentActivity() {
        const activityContainer = document.getElementById('recent-activity');
        if (!activityContainer) return;

        const activities = [
            { icon: 'fas fa-user-plus', text: 'New provider registration: Ramesh Patel (Plumbing)', time: '10 minutes ago' },
            { icon: 'fas fa-calendar-check', text: 'Booking confirmed: Amit Sharma booked Home Repair', time: '1 hour ago' },
            { icon: 'fas fa-star', text: 'New 5-star review from Rahul Verma for Gardening service', time: '2 hours ago' },
            { icon: 'fas fa-exclamation-triangle', text: 'Pending approval: Vikram Singh needs verification', time: '5 hours ago' },
            { icon: 'fas fa-chart-line', text: 'Weekly report generated successfully', time: '1 day ago' }
        ];

        activityContainer.innerHTML = activities.map(activity => `
            <li class="activity-item">
                <div class="activity-icon">
                    <i class="${activity.icon}"></i>
                </div>
                <div class="activity-content">
                    <p>${activity.text}</p>
                    <div class="activity-time">${activity.time}</div>
                </div>
            </li>
        `).join('');
    }

    renderProviders() {
        const container = document.getElementById('admin-providers-table');
        if (!container) return;

        container.innerHTML = this.providers.map(provider => `
            <tr>
                <td>
                    <strong>${provider.name}</strong>
                    ${provider.verified ? '<br><small style="color: var(--success);">✓ Verified</small>' : ''}
                </td>
                <td>${provider.service}</td>
                <td>${provider.location}</td>
                <td>
                    <div style="display: flex; align-items: center; gap: 5px;">
                        <span style="color: var(--warning);">★</span>
                        ${provider.rating} (${provider.reviews})
                    </div>
                </td>
                <td>
                    <span class="status-badge status-${provider.status}">${provider.status}</span>
                </td>
                <td class="action-buttons">
                    ${provider.status === 'pending' ? 
                        `<button class="btn btn-success btn-sm" onclick="admin.approveProvider(${provider.id})">Approve</button>
                         <button class="btn btn-danger btn-sm" onclick="admin.rejectProvider(${provider.id})">Reject</button>` : 
                        `<button class="btn btn-primary btn-sm" onclick="admin.editProvider(${provider.id})">Edit</button>
                         <button class="btn btn-danger btn-sm" onclick="admin.deleteProvider(${provider.id})">Delete</button>`
                    }
                    <button class="btn btn-outline btn-sm" onclick="admin.viewProvider(${provider.id})">View</button>
                </td>
            </tr>
        `).join('');
    }

    renderBookings() {
        const container = document.getElementById('admin-bookings-table');
        if (!container) return;

        container.innerHTML = this.bookings.map(booking => `
            <tr>
                <td>${booking.customer}</td>
                <td>${booking.provider}</td>
                <td>${booking.service}</td>
                <td>${booking.date}</td>
                <td>${booking.amount}</td>
                <td>
                    <span class="status-badge status-${booking.status}">${booking.status}</span>
                </td>
                <td class="action-buttons">
                    <button class="btn btn-primary btn-sm" onclick="admin.viewBooking(${booking.id})">View</button>
                    <button class="btn btn-success btn-sm" onclick="admin.confirmBooking(${booking.id})">Confirm</button>
                    <button class="btn btn-danger btn-sm" onclick="admin.cancelBooking(${booking.id})">Cancel</button>
                </td>
            </tr>
        `).join('');
    }

    renderReviews() {
        const container = document.getElementById('admin-reviews-table');
        if (!container) return;

        container.innerHTML = this.reviews.map(review => `
            <tr>
                <td>${review.customer}</td>
                <td>${review.provider}</td>
                <td>
                    <div style="display: flex; align-items: center; gap: 2px;">
                        ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}
                    </div>
                </td>
                <td title="${review.comment}">
                    ${review.comment.length > 50 ? review.comment.substring(0, 50) + '...' : review.comment}
                </td>
                <td>
                    <span class="status-badge status-${review.status}">${review.status}</span>
                </td>
                <td class="action-buttons">
                    ${review.status === 'pending' ? 
                        `<button class="btn btn-success btn-sm" onclick="admin.approveReview(${review.id})">Approve</button>
                         <button class="btn btn-danger btn-sm" onclick="admin.rejectReview(${review.id})">Reject</button>` : 
                        `<button class="btn btn-primary btn-sm" onclick="admin.editReview(${review.id})">Edit</button>
                         <button class="btn btn-danger btn-sm" onclick="admin.deleteReview(${review.id})">Delete</button>`
                    }
                </td>
            </tr>
        `).join('');
    }

    // Provider actions
    approveProvider(id) {
        const provider = this.providers.find(p => p.id === id);
        if (provider) {
            provider.status = 'approved';
            provider.verified = true;
            this.saveData();
            this.renderProviders();
            this.updateStats();
            this.showNotification('Provider approved successfully!', 'success');
        }
    }

    rejectProvider(id) {
        const provider = this.providers.find(p => p.id === id);
        if (provider) {
            provider.status = 'rejected';
            this.saveData();
            this.renderProviders();
            this.updateStats();
            this.showNotification('Provider rejected successfully!', 'success');
        }
    }

    deleteProvider(id) {
        if (confirm('Are you sure you want to delete this provider?')) {
            this.providers = this.providers.filter(p => p.id !== id);
            this.saveData();
            this.renderProviders();
            this.updateStats();
            this.showNotification('Provider deleted successfully!', 'success');
        }
    }

    // Review actions
    approveReview(id) {
        const review = this.reviews.find(r => r.id === id);
        if (review) {
            review.status = 'approved';
            this.saveData();
            this.renderReviews();
            this.showNotification('Review approved successfully!', 'success');
        }
    }

    rejectReview(id) {
        const review = this.reviews.find(r => r.id === id);
        if (review) {
            review.status = 'rejected';
            this.saveData();
            this.renderReviews();
            this.showNotification('Review rejected successfully!', 'success');
        }
    }

    // Booking actions
    confirmBooking(id) {
        const booking = this.bookings.find(b => b.id === id);
        if (booking) {
            booking.status = 'confirmed';
            this.saveData();
            this.renderBookings();
            this.showNotification('Booking confirmed successfully!', 'success');
        }
    }

    cancelBooking(id) {
        if (confirm('Are you sure you want to cancel this booking?')) {
            const booking = this.bookings.find(b => b.id === id);
            if (booking) {
                booking.status = 'cancelled';
                this.saveData();
                this.renderBookings();
                this.showNotification('Booking cancelled successfully!', 'success');
            }
        }
    }

    // Add new provider modal
    showAddProviderModal() {
        const modalContent = `
            <div class="modal" id="add-provider-modal" style="display: flex;">
                <div class="modal-content">
                    <span class="close-modal" onclick="document.getElementById('add-provider-modal').style.display='none'">&times;</span>
                    <h2 class="modal-title">Add New Provider</h2>
                    <form id="add-provider-form">
                        <div class="form-group">
                            <label for="new-provider-name">Name</label>
                            <input type="text" id="new-provider-name" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label for="new-provider-service">Service</label>
                            <select id="new-provider-service" class="form-control" required>
                                <option value="">Select Service</option>
                                <option value="Home Repair">Home Repair</option>
                                <option value="Painting">Painting</option>
                                <option value="Gardening">Gardening</option>
                                <option value="Cleaning">Cleaning</option>
                                <option value="Moving">Moving</option>
                                <option value="Tutoring">Tutoring</option>
                                <option value="Plumbing">Plumbing</option>
                                <option value="Electrical">Electrical</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="new-provider-location">Location</label>
                            <select id="new-provider-location" class="form-control" required>
                                <option value="">Select Location</option>
                                <option value="Mathura">Mathura</option>
                                <option value="Vrindavan">Vrindavan</option>
                                <option value="Gokul">Gokul</option>
                                <option value="Barsana">Barsana</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="new-provider-rating">Rating</label>
                            <input type="number" id="new-provider-rating" class="form-control" min="1" max="5" step="0.1" required>
                        </div>
                        <div class="form-group">
                            <label for="new-provider-reviews">Reviews Count</label>
                            <input type="number" id="new-provider-reviews" class="form-control" min="0" required>
                        </div>
                        <button type="submit" class="btn btn-primary" style="width: 100%;">Add Provider</button>
                    </form>
                </div>
            </div>
        `;
        
        // Add modal to body
        if (!document.getElementById('add-provider-modal')) {
            document.body.insertAdjacentHTML('beforeend', modalContent);
            
            // Add form submit handler
            document.getElementById('add-provider-form').addEventListener('submit', (e) => {
                e.preventDefault();
                this.addNewProvider();
            });
        }
        
        document.getElementById('add-provider-modal').style.display = 'flex';
    }

    addNewProvider() {
        const name = document.getElementById('new-provider-name').value;
        const service = document.getElementById('new-provider-service').value;
        const location = document.getElementById('new-provider-location').value;
        const rating = parseFloat(document.getElementById('new-provider-rating').value);
        const reviews = parseInt(document.getElementById('new-provider-reviews').value);

        const newProvider = {
            id: Date.now(),
            name,
            service,
            location,
            rating,
            reviews,
            status: 'approved',
            verified: true,
            price: "₹0/hr",
            image: "images/default-provider.jpg",
            description: `Professional ${service.toLowerCase()} services in ${location}.`,
            experience: "0 years",
            languages: ["Hindi"],
            services: [service],
            availability: "Mon-Sat: 9AM-6PM",
            responseTime: "Within 24 hours"
        };

        this.providers.push(newProvider);
        this.saveData();
        this.renderProviders();
        this.updateStats();
        this.showNotification('New provider added successfully!', 'success');
        
        document.getElementById('add-provider-modal').style.display = 'none';
        document.getElementById('add-provider-form').reset();
    }

    // Utility methods
    saveData() {
        localStorage.setItem('providers', JSON.stringify(this.providers));
        localStorage.setItem('bookings', JSON.stringify(this.bookings));
        localStorage.setItem('reviews', JSON.stringify(this.reviews));
    }

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

    // Placeholder methods for future implementation
    viewProvider(id) {
        this.showNotification(`Viewing provider details for ID: ${id}`, 'info');
    }

    editProvider(id) {
        this.showNotification(`Editing provider with ID: ${id}`, 'info');
    }

    viewBooking(id) {
        const booking = this.bookings.find(b => b.id === id);
        if (booking) {
            this.showNotification(`Viewing booking: ${booking.customer} - ${booking.service} on ${booking.date}`, 'info');
        }
    }

    editReview(id) {
        this.showNotification(`Editing review with ID: ${id}`, 'info');
    }

    deleteReview(id) {
        if (confirm('Are you sure you want to delete this review?')) {
            this.reviews = this.reviews.filter(r => r.id !== id);
            this.saveData();
            this.renderReviews();
            this.showNotification('Review deleted successfully!', 'success');
        }
    }
}

// Initialize admin panel when DOM is loaded
let admin;
document.addEventListener('DOMContentLoaded', () => {
    admin = new AdminPanel();
});