import React, { useState } from 'react';
import './Routeselector.css';
import BusList from '../BusList/BusList';

export default function Routeselector() {
    const [dataInp, setData] = useState([]);
    const [destination, setDestination] = useState('');
    const [startCity, setStartCity] = useState('');
    const [flightInfo, setFlightInfo] = useState([]); // State to hold flight information

    const handleToCity = (e) => {
        e.preventDefault();
        setDestination(e.target.value);
        localStorage.setItem("destination", e.target.value);
    };

    const renderBusList = (dataInp) => {
        if (Array.isArray(dataInp) && dataInp.length > 0) {
            return <BusList value={dataInp} onBookNow={handleBookNow} />;
        }
        return <div>No buses available for the selected route.</div>;
    };

    const handleFromCity = (e) => {
        e.preventDefault();
        setStartCity(e.target.value);
        localStorage.setItem("start", e.target.value);
    };

    const getRoutes = async (e) => {
        e.preventDefault();
        console.log("Start City:", startCity, "Destination:", destination);

        if (startCity === destination) {
            alert("Departure and arrival cities cannot be the same.");
            setData([]);
            return;
        }

        const baseURL = "http://localhost:8080/booking/";

        try {
            const response = await fetch(baseURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ startCity, destination }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log("API Response:", data);
                if (data.status) {
                    setData(data.buses);
                } else {
                    console.error("No buses found or status false");
                    setData([]);
                }
            } else {
                console.error("Failed to fetch routes:", data);
            }
        } catch (error) {
            console.error("Error fetching routes:", error);
        }
    };

    const handleDate = (e) => {
        e.preventDefault();
        localStorage.setItem("date", e.target.value);
    };

    const handleBookNow = (bus) => {
        // Assuming bus is an object with price and other relevant info
        const { price, details } = bus; // Adjust according to your bus data structure
        const bookedFlight = { price, details }; // Create an object with the flight information

        localStorage.setItem("bookedFlight", JSON.stringify(bookedFlight)); // Store flight info in local storage
        setFlightInfo(prev => [...prev, bookedFlight]); // Update flight information state

        alert(`Bus booked at price: ₹${price}`); // Optionally alert the user
    };

    const containerHeight = Math.max(500, 200 + dataInp.length * 50); // Adjust height based on the number of buses

    return (
        <div className="rdc" style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            <div className="main-container" style={{ flex: '1', padding: '20px', height: `${containerHeight}px` }}>
                <form className="form-inline" onSubmit={getRoutes}>
                    <select name="from_city" data-style="btn-new" className="selectpicker" onChange={handleFromCity}>
                        <option value="">FROM</option>
                        <option value="Chennai">Chennai</option>
                        <option value="Bangalore">Bangalore</option>
                        <option value="Coimbatore">Coimbatore</option>
                        <option value="Goa">Goa</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Kolkata">Kolkata</option>
                        <option value="Trivandrum">Trivandrum</option>
                        <option value="Madurai">Madurai</option>
                        <option value="Cochin">Cochin</option>
                        <option value="Pune">Pune</option>
                        <option value="Hyderabad">Hyderabad</option>
                        <option value="Dehradun">Dehradun</option>
                        <option value="Jaipur">Jaipur</option>
                        <option value="Varanasi">Varanasi</option>
                        <option value="Patna">Patna</option>
                        <option value="Agra">Agra</option>
                        <option value="Kanpur">Kanpur</option>
                        <option value="Lucknow">Lucknow</option>
                        <option value="Indore">Indore</option>
                        <option value="Nagpur">Nagpur</option>
                        <option value="Vadodara">Vadodara</option>
                        <option value="Thane">Thane</option>
                        <option value="Bhopal">Bhopal</option>
                        <option value="Surat">Surat</option>
                        <option value="Nashik">Nashik</option>
                    </select>

                    <select name="to_city" data-style="btn-new" className="selectpicker" onChange={handleToCity}>
                        <option value="">TO</option>
                        <option value="Hyderabad">Hyderabad</option>
                        <option value="Coimbatore">Coimbatore</option>
                        <option value="Vishakapatnam">Vishakapatnam</option>
                        <option value="Bangalore">Bangalore</option>
                        <option value="Chennai">Chennai</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Kolkata">Kolkata</option>
                        <option value="Trivandrum">Trivandrum</option>
                        <option value="Madurai">Madurai</option>
                        <option value="Cochin">Cochin</option>
                        <option value="Pune">Pune</option>
                        <option value="Dehradun">Dehradun</option>
                        <option value="Jaipur">Jaipur</option>
                        <option value="Varanasi">Varanasi</option>
                        <option value="Patna">Patna</option>
                        <option value="Agra">Agra</option>
                        <option value="Kanpur">Kanpur</option>
                        <option value="Lucknow">Lucknow</option>
                        <option value="Indore">Indore</option>
                        <option value="Nagpur">Nagpur</option>
                        <option value="Vadodara">Vadodara</option>
                        <option value="Thane">Thane</option>
                        <option value="Bhopal">Bhopal</option>
                        <option value="Surat">Surat</option>
                        <option value="Nashik">Nashik</option>
                    </select>

                    <input onChange={handleDate} type="date" />
                    <input type="submit" className="btn btn-primary btn-md getRoute" />
                </form>

                <div style={{ marginTop: '20px', height: '100%', width: '100%' }}>
                    {renderBusList(dataInp)}
                </div>
            </div>
        </div>
    );
}
       