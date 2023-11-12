import React, { useState, useEffect } from "react";

const Yawa = () => {
    const [customerStreet, setCustomerStreet] = useState("");
    const [customerBarangay, setCustomerBarangay] = useState("");
    const [customerCity, setCustomerCity] = useState("");
    const [location, setLocation] = useState({ lat: null, lon: null });

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Construct the address string
                const address = `${customerStreet}, ${customerBarangay}, ${customerCity}`;

                // Replace spaces with '%20' for URL encoding
                const encodedAddress = encodeURIComponent(address);

                // Fetch the data from the Nominatim API
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}`
                );
                const data = await response.json();

                if (data && data.length > 0) {
                    // Extract the latitude and longitude from the first result in the API response
                    const { lat, lon } = data[0];

                    // Update the location state
                    setLocation({ lat, lon });
                } else {
                    // If no results are found, clear the location state
                    setLocation({ lat: null, lon: null });
                }
            } catch (error) {
                console.error("Error fetching location data:", error);
            }
        };

        // Fetch data when any of the address variables change
        fetchData();
    }, [customerStreet, customerBarangay, customerCity]);

    return (
        <div>
            <div>
                <label>Street: </label>
                <input
                    type="text"
                    value={customerStreet}
                    onChange={(e) => setCustomerStreet(e.target.value)}
                />
            </div>
            <div>
                <label>Barangay: </label>
                <input
                    type="text"
                    value={customerBarangay}
                    onChange={(e) => setCustomerBarangay(e.target.value)}
                />
            </div>
            <div>
                <label>City: </label>
                <input
                    type="text"
                    value={customerCity}
                    onChange={(e) => setCustomerCity(e.target.value)}
                />
            </div>

            <p>Latitude: {location.lat}</p>
            <p>Longitude: {location.lon}</p>
        </div>
    );
};

export default Yawa;
