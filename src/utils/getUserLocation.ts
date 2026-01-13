import { UserLocation } from "@/types/types";

export function getUserLocation(): Promise<UserLocation> {
    return new Promise((resolve, reject) => {
        // Check if the Geolocation API is available in the user's browser
        if (!navigator.geolocation) {
            reject(new Error('Geolocation is not supported by your browser'));
            return;
        }

        // Request the current position
        navigator.geolocation.getCurrentPosition(
            (position) => {
                // Success callback: resolve the promise with the location data
                const { latitude, longitude } = position.coords;
                resolve({ latitude, longitude });
            },
            (error) => {
                // Error callback: reject the promise with the error message
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        reject(new Error('User denied the request for geolocation.'));
                        break;
                    case error.POSITION_UNAVAILABLE:
                        reject(new Error('Location information is unavailable.'));
                        break;
                    case error.TIMEOUT:
                        reject(new Error('The request to get user location timed out.'));
                        break;
                    default:
                        reject(new Error('An unknown error occurred.'));
                        break;
                }
            },
            {
                // Optional: set options for the location request
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            }
        );
    });
}
