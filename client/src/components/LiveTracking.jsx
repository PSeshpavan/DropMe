import React, { useState, useEffect } from 'react';
import { LoadScript, GoogleMap } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '100%',
};

// Define the libraries as a static constant
const libraries = ['places'];

const LiveTracking = () => {
    const [currentPosition, setCurrentPosition] = useState(null); // Initialize as null
    const [map, setMap] = useState(null);
    const [customMarker, setCustomMarker] = useState(null);
    const [error, setError] = useState(false); // State to handle error

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            setCurrentPosition({
                lat: latitude,
                lng: longitude,
            });
        }, (error) => {
            console.error('Error fetching location:', error);
            setError(true); // Set error state to true if location fetch fails
        });

        const watchId = navigator.geolocation.watchPosition((position) => {
            const { latitude, longitude } = position.coords;
            setCurrentPosition({
                lat: latitude,
                lng: longitude,
            });
        }, (error) => {
            console.error('Error watching location:', error);
            setError(true); // Set error state to true if location watch fails
        });

        return () => navigator.geolocation.clearWatch(watchId);
    }, []);

    const onLoad = React.useCallback((mapInstance) => {
        setMap(mapInstance);
    }, []);

    useEffect(() => {
        if (map && window.google) {
            class CustomMarker extends window.google.maps.OverlayView {
                position;
                div;

                constructor(position) {
                    super();
                    this.position = position;
                }

                onAdd() {
                    this.div = document.createElement('div');
                    this.div.style.position = 'absolute';
                    this.div.style.width = '20px';
                    this.div.style.height = '20px';
                    this.div.style.background = '#4285F4';
                    this.div.style.border = '2px solid white';
                    this.div.style.borderRadius = '50%';
                    this.div.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';

                    const panes = this.getPanes();
                    panes.overlayLayer.appendChild(this.div);
                }

                draw() {
                    const overlayProjection = this.getProjection();
                    const position = overlayProjection.fromLatLngToDivPixel(
                        new window.google.maps.LatLng(this.position)
                    );

                    if (position) {
                        this.div.style.left = `${position.x - 10}px`;
                        this.div.style.top = `${position.y - 10}px`;
                    }
                }

                onRemove() {
                    if (this.div) {
                        this.div.parentNode.removeChild(this.div);
                        delete this.div;
                    }
                }

                setPosition(position) {
                    this.position = position;
                    this.draw();
                }
            }

            if (customMarker) {
                customMarker.setMap(null);
            }

            const newMarker = new CustomMarker(userPosition || currentPosition);
            newMarker.setMap(map);
            setCustomMarker(newMarker);

            return () => {
                if (newMarker) {
                    newMarker.setMap(null);
                }
            };
        }
    }, [map, currentPosition, userPosition]);

    if (error) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <div>
                    <p className='ml-1 text-center'>Sorry, we could not receive your coordinates. Please <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => window.location.reload()}>Try Again</span>.</p>
                </div>
            </div>
        );
    }

    return (
        // currentPosition && ( // Only load the map if currentPosition is not null
            <LoadScript
                googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
                libraries={libraries} // Use the static constant here
            >
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={currentPosition}
                    zoom={15}
                    onLoad={onLoad}
                    options={{
                        mapTypeControl: false, // Removes the Map/Satellite toggle
                        fullscreenControl: false, // Removes the maximize button
                    }}
                >
                    {/* Custom marker is handled in useEffect */}
                </GoogleMap>
            </LoadScript>
        // )
    );
};

export default LiveTracking;