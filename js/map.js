(function() {
    'use strict';
    
    // Wait for the DOM and potentially the main game scripts to be ready
    document.addEventListener('DOMContentLoaded', function() {
    
        // Get references to the main view containers and buttons
        const appContainer = document.getElementById('app-container');
        const mapView = document.getElementById('map-view');
        const gameView = document.getElementById('game-view');
        const reactorBuildingButton = document.getElementById('reactor-building');
        const backToMapButton = document.getElementById('back-to-map-button');
    
        // Check if elements exist
        if (!mapView || !gameView || !reactorBuildingButton || !backToMapButton || !appContainer) {
            console.error('Map UI elements not found!');
            return;
        }
    
        // --- View Switching Functions ---
    
        function showMapView() {
            console.log('Showing Map View');
            mapView.style.display = 'block'; // Or 'flex', 'grid' etc. if needed
            gameView.style.display = 'none';
            // Optional: If the game loop is intensive, you might pause it here
            // if (window.game && typeof window.pause === 'function' && !window.game.paused) {
            //    window.pause();
            // }
            appContainer.classList.add('showing-map');
            appContainer.classList.remove('showing-game');
        }
    
        function showGameView() {
            console.log('Showing Game View');
            mapView.style.display = 'none';
            gameView.style.display = 'block'; // Or 'flex', 'grid' etc. if needed
    
            // Ensure the game UI recalculates layout if needed
            // Check if the ui object and adjust_primary_size exist before calling
            if (window.ui && typeof window.ui.update_interface === 'function') {
                // Give the browser a moment to render the display change
                // before triggering potential layout calculations.
                 setTimeout(() => {
                    // Call the function directly if it exists
                    if (typeof ui.adjust_primary_size === 'function') {
                         ui.adjust_primary_size();
                    } else {
                        // Or trigger resize event as a fallback if the function isn't exposed
                        window.dispatchEvent(new Event('resize'));
                    }
                    // Ensure the update loop is running if it was paused
                    // if (window.game && typeof window.unpause === 'function' && window.game.paused) {
                    //    window.unpause();
                    // }
                }, 50); // Small delay
            }
            appContainer.classList.remove('showing-map');
            appContainer.classList.add('showing-game');
        }
    
        // --- Event Listeners ---
    
        reactorBuildingButton.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent any default button behavior
            showGameView();
        });
    
        backToMapButton.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent any default button behavior
            showMapView();
        });
    
        // --- Initial State ---
        // Start by showing the map view (it's the default in HTML/CSS)
        // showMapView(); // No need to call if it's the default display state
    
        // Or uncomment below if you want the game to show first by default
        // showGameView();
    
    }); // End DOMContentLoaded
    
    })();