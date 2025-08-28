document.addEventListener('DOMContentLoaded', function() {
    const parkingGrid = document.querySelector('.parking-grid');
    const totalSpots = 50;
    const availableSpots = 24;

    // Generate parking spaces
    for (let i = 1; i <= totalSpots; i++) {
        const space = document.createElement('div');
        space.className = 'parking-space';
        space.dataset.number = i;

        // Randomly assign status (for demo)
        const status = Math.random() > 0.5 ? 'available' :
                      Math.random() > 0.3 ? 'occupied' : 'reserved';
        space.classList.add(status);

        parkingGrid.appendChild(space);
    }

    // Update counters
    document.getElementById('total-spots').textContent = totalSpots;
    document.getElementById('available-spots').textContent = availableSpots;
});
