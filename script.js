// Initialize the map centered on Pakistan
const map = L.map('map').setView([30.3753, 69.3451], 5);

// Load and display tile layers
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

// Array to hold markers
const markers = [];

// Function to add a marker for a city with animation
function addMarker(lat, lng, city) {
    const marker = L.marker([lat, lng]).addTo(map).hide().fadeIn(1000);
    marker.bindPopup(`<b>${city}</b>`).openPopup();
    markers.push(marker);
}

// Add markers for major cities in Pakistan
addMarker(33.6844, 73.0479, 'Islamabad');
addMarker(31.5497, 74.3436, 'Lahore');
addMarker(24.8607, 67.0011, 'Karachi');
addMarker(30.1575, 71.5249, 'Multan');
addMarker(34.0151, 71.5249, 'Peshawar');

// Remove the last marker with animation when the button is clicked
document.getElementById('removeMarkers').onclick = function() {
    if (markers.length > 0) {
        const lastMarker = markers.pop(); // Remove the last marker from the array
        lastMarker.fadeOut(1000, function() {
            map.removeLayer(lastMarker); // Remove it from the map after fade out
        });
    } else {
        alert('No markers to remove!');
    }
};

// Add an event listener to add a new marker on click with zoom animation
map.on('click', function(e) {
    const lat = e.latlng.lat;
    const lng = e.latlng.lng;
    addMarker(lat, lng, `New Marker at ${lat.toFixed(5)}, ${lng.toFixed(5)}`);
    map.setView([lat, lng], 7); // Zoom into the clicked location
});

// Add fade in/out animations
L.Marker.prototype.fadeIn = function(duration) {
    this.setOpacity(0);
    this.show();
    let start = null;
    const animate = (timestamp) => {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        this.setOpacity(Math.min(progress / duration, 1));
        if (progress < duration) {
            requestAnimationFrame(animate);
        }
    };
    requestAnimationFrame(animate);
};

L.Marker.prototype.fadeOut = function(duration, callback) {
    let start = null;
    const animate = (timestamp) => {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        this.setOpacity(Math.max(1 - progress / duration, 0));
        if (progress < duration) {
            requestAnimationFrame(animate);
        } else {
            if (callback) callback();
        }
    };
    requestAnimationFrame(animate);
};
