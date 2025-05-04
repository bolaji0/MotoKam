/**
 * Motokam 24/7 Mobile Mechanic Services
 * Service Area Map JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // ===== Variables =====
    const serviceMap = document.getElementById('service-map');
    const coverageList = document.querySelector('.coverage-list');
    
    if (!serviceMap || !coverageList) return;

    // Service areas with approximate coordinates for Greater London
    // In a real application, these would be more accurate GeoJSON data
    const serviceAreas = {
        mitcham: {
            name: 'Mitcham',
            coordinates: [
                [150, 200], [170, 180], [190, 190], [180, 220], [150, 200]
            ],
            isBase: true
        },
        croydon: {
            name: 'Croydon',
            coordinates: [
                [170, 230], [190, 210], [210, 220], [200, 250], [170, 230]
            ]
        },
        bromley: {
            name: 'Bromley',
            coordinates: [
                [210, 210], [230, 200], [250, 220], [240, 240], [210, 210]
            ]
        },
        wimbledon: {
            name: 'Wimbledon',
            coordinates: [
                [130, 170], [150, 160], [160, 180], [140, 190], [130, 170]
            ]
        },
        sutton: {
            name: 'Sutton',
            coordinates: [
                [140, 230], [160, 220], [170, 240], [150, 250], [140, 230]
            ]
        },
        kingston: {
            name: 'Kingston',
            coordinates: [
                [110, 190], [130, 180], [140, 200], [120, 210], [110, 190]
            ]
        },
        lewisham: {
            name: 'Lewisham',
            coordinates: [
                [190, 160], [210, 150], [220, 170], [200, 180], [190, 160]
            ]
        },
        southwark: {
            name: 'Southwark',
            coordinates: [
                [170, 140], [190, 130], [200, 150], [180, 160], [170, 140]
            ]
        }
    };

    // Create SVG for the map
    function createMapSVG() {
        const svgNS = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("viewBox", "100 100 200 200");
        svg.setAttribute("width", "100%");
        svg.setAttribute("height", "100%");
        
        // Add a background for the map
        const background = document.createElementNS(svgNS, "rect");
        background.setAttribute("x", "100");
        background.setAttribute("y", "100");
        background.setAttribute("width", "200");
        background.setAttribute("height", "200");
        background.setAttribute("fill", "#f5f5f5");
        svg.appendChild(background);
        
        // Draw the service areas
        for (const areaId in serviceAreas) {
            const area = serviceAreas[areaId];
            const polygon = document.createElementNS(svgNS, "polygon");
            
            // Convert coordinates array to points string
            const points = area.coordinates.map(coord => coord.join(',')).join(' ');
            polygon.setAttribute("points", points);
            polygon.setAttribute("class", `map-area ${area.isBase ? 'active' : ''}`);
            polygon.setAttribute("data-area", areaId);
            polygon.setAttribute("fill", area.isBase ? "#e63946" : "#e5e5e5");
            polygon.setAttribute("stroke", "#555555");
            polygon.setAttribute("stroke-width", "1");
            
            // Add area name as text
            const center = getPolygonCenter(area.coordinates);
            const text = document.createElementNS(svgNS, "text");
            text.setAttribute("x", center[0]);
            text.setAttribute("y", center[1]);
            text.setAttribute("text-anchor", "middle");
            text.setAttribute("font-size", "6");
            text.setAttribute("fill", area.isBase ? "#ffffff" : "#333333");
            text.setAttribute("pointer-events", "none");
            text.textContent = area.name;
            
            // Add event listeners to the polygon
            polygon.addEventListener('mouseover', function() {
                this.setAttribute("fill", "#e63946");
                text.setAttribute("fill", "#ffffff");
            });
            
            polygon.addEventListener('mouseout', function() {
                if (!this.classList.contains('active')) {
                    this.setAttribute("fill", "#e5e5e5");
                    text.setAttribute("fill", "#333333");
                }
            });
            
            polygon.addEventListener('click', function() {
                const areaId = this.getAttribute('data-area');
                highlightArea(areaId);
            });
            
            svg.appendChild(polygon);
            svg.appendChild(text);
        }
        
        // Add markers for landmarks
        addMarker(svg, 150, 200, "Mitcham (Base)");
        
        return svg;
    }
    
    // Calculate center of a polygon
    function getPolygonCenter(coordinates) {
        let x = 0;
        let y = 0;
        
        for (const coord of coordinates) {
            x += coord[0];
            y += coord[1];
        }
        
        return [x / coordinates.length, y / coordinates.length];
    }
    
    // Add a marker to the map
    function addMarker(svg, x, y, label) {
        const svgNS = "http://www.w3.org/2000/svg";
        
        // Create circle marker
        const marker = document.createElementNS(svgNS, "circle");
        marker.setAttribute("cx", x);
        marker.setAttribute("cy", y);
        marker.setAttribute("r", "3");
        marker.setAttribute("fill", "#e63946");
        marker.setAttribute("stroke", "#ffffff");
        marker.setAttribute("stroke-width", "1");
        
        svg.appendChild(marker);
        
        // Add pulsing animation
        const animation = document.createElementNS(svgNS, "animate");
        animation.setAttribute("attributeName", "r");
        animation.setAttribute("values", "3;5;3");
        animation.setAttribute("dur", "2s");
        animation.setAttribute("repeatCount", "indefinite");
        
        marker.appendChild(animation);
        
        // Add label below marker
        const text = document.createElementNS(svgNS, "text");
        text.setAttribute("x", x);
        text.setAttribute("y", y + 10);
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("font-size", "6");
        text.setAttribute("font-weight", "bold");
        text.setAttribute("fill", "#333333");
        text.textContent = label;
        
        svg.appendChild(text);
    }
    
    // Highlight a specific area on the map and in the legend
    function highlightArea(areaId) {
        // Update the map
        const mapAreas = document.querySelectorAll('.map-area');
        mapAreas.forEach(area => {
            if (area.getAttribute('data-area') === areaId) {
                area.classList.add('active');
                area.setAttribute("fill", "#e63946");
                // Update the text color
                const areaCenter = getPolygonCenter(serviceAreas[areaId].coordinates);
                const areaText = document.querySelector(`text[x="${areaCenter[0]}"][y="${areaCenter[1]}"]`);
                if (areaText) {
                    areaText.setAttribute("fill", "#ffffff");
                }
            } else {
                area.classList.remove('active');
                area.setAttribute("fill", "#e5e5e5");
                // Update the text color
                const otherAreaId = area.getAttribute('data-area');
                const otherAreaCenter = getPolygonCenter(serviceAreas[otherAreaId].coordinates);
                const otherAreaText = document.querySelector(`text[x="${otherAreaCenter[0]}"][y="${otherAreaCenter[1]}"]`);
                if (otherAreaText) {
                    otherAreaText.setAttribute("fill", "#333333");
                }
            }
        });
        
        // Update the legend
        const coverageItems = coverageList.querySelectorAll('li');
        coverageItems.forEach(item => {
            if (item.getAttribute('data-area') === areaId) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
    
    // Initialize the map
    function initMap() {
        // Create and append the SVG map
        const mapSVG = createMapSVG();
        serviceMap.appendChild(mapSVG);
        
        // Add event listeners to the coverage list items
        const coverageItems = coverageList.querySelectorAll('li');
        coverageItems.forEach(item => {
            item.addEventListener('click', function() {
                const areaId = this.getAttribute('data-area');
                highlightArea(areaId);
            });
        });
    }
    
    // Initialize the map
    initMap();
});
