// ShoreSquad App - Interactive Features
class ShoreSquadApp {
    constructor() {
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadWeatherWidget();
        this.initMapPlaceholder();
        console.log('🏖️ ShoreSquad App Initialized!');
    }

    bindEvents() {
        // Navigation smooth scrolling
        document.querySelectorAll('.nav-menu a[href^="#"]').forEach(link => {
            link.addEventListener('click', this.smoothScroll);
        });

        // Hero buttons
        const startCleanupBtn = document.getElementById('startCleanup');
        const findEventsBtn = document.getElementById('findEvents');
        const getWeatherBtn = document.getElementById('getWeather');

        if (startCleanupBtn) {
            startCleanupBtn.addEventListener('click', this.startCleanup);
        }

        if (findEventsBtn) {
            findEventsBtn.addEventListener('click', this.findEvents);
        }

        if (getWeatherBtn) {
            getWeatherBtn.addEventListener('click', this.getWeather.bind(this));
        }
    }

    smoothScroll(e) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    startCleanup() {
        alert('🌊 Starting a new cleanup event! This feature will connect you with local environmental groups.');
    }

    findEvents() {
        alert('🗺️ Finding cleanup events near you! This will show upcoming beach cleanups in your area.');
    }

    async getWeather() {
        const weatherWidget = document.getElementById('weather-widget');
        const placeholder = weatherWidget.querySelector('.weather-placeholder');
        
        // Show loading state
        placeholder.innerHTML = '<p>🌤️ Loading weather data...</p>';

        try {
            // Simulate weather API call
            await this.simulateWeatherAPI();
            
            // Display mock weather data
            placeholder.innerHTML = `
                <div class="weather-display">
                    <h4>📍 Current Location Weather</h4>
                    <div class="weather-main">
                        <span class="temp">72°F</span>
                        <span class="condition">☀️ Sunny</span>
                    </div>
                    <div class="weather-details">
                        <p>🌊 Wind: 8 mph - Perfect for cleanup!</p>
                        <p>💧 Humidity: 65%</p>
                        <p>🌅 UV Index: 6 (Moderate)</p>
                        <p class="cleanup-rating">✅ <strong>Great cleanup weather!</strong></p>
                    </div>
                </div>
            `;
        } catch (error) {
            placeholder.innerHTML = `
                <p>❌ Weather data unavailable</p>
                <small>Please check your internet connection</small>
            `;
        }
    }

    simulateWeatherAPI() {
        return new Promise((resolve) => {
            setTimeout(resolve, 1500); // Simulate API delay
        });
    }

    loadWeatherWidget() {
        // Auto-load weather on page load
        setTimeout(() => {
            this.getWeather();
        }, 2000);
    }

    initMapPlaceholder() {
        const mapContainer = document.getElementById('map-container');
        
        // Add interactive placeholder
        setTimeout(() => {
            mapContainer.innerHTML = `
                <div class="map-placeholder">
                    <h4>🗺️ Interactive Beach Map</h4>
                    <p>📍 Nearby cleanup locations:</p>
                    <ul style="text-align: left; margin-top: 1rem;">
                        <li>🏖️ Santa Monica Beach - 2.3 miles</li>
                        <li>🏖️ Manhattan Beach - 4.1 miles</li>
                        <li>🏖️ Hermosa Beach - 5.8 miles</li>
                    </ul>
                    <button class="btn-primary" style="margin-top: 1rem;">
                        View Full Map
                    </button>
                </div>
            `;
        }, 1000);
    }

    openDirections() {
        const lat = 1.381497;
        const lng = 103.955574;
        const destination = `${lat},${lng}`;
        
        // Try to open in Google Maps app first, fallback to web
        const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${destination}&destination_place_id=ChIJ___________`;
        const fallbackUrl = `https://maps.google.com/maps?q=${lat},${lng}`;
        
        window.open(googleMapsUrl, '_blank');
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ShoreSquadApp();
});

// Add some fun interactions
document.addEventListener('click', (e) => {
    if (e.target.matches('.btn-primary, .btn-secondary')) {
        // Add ripple effect
        const button = e.target;
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255,255,255,0.6)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.left = (e.clientX - button.offsetLeft) + 'px';
        ripple.style.top = (e.clientY - button.offsetTop) + 'px';
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
});

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add the function globally so it can be called from HTML
window.openDirections = function() {
    const lat = 1.381497;
    const lng = 103.955574;
    const destination = `${lat},${lng}`;
    
    // Open Google Maps with directions
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
    window.open(googleMapsUrl, '_blank');
};