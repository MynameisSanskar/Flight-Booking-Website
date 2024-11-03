import React, { useState, useEffect } from 'react';
import { FaAngleDoubleDown } from "react-icons/fa";
import { useHistory } from 'react-router-dom'; // Import useHistory
import './busList.css';

export default function BusList({ value: dataInp }) {
    const history = useHistory(); // Initialize useHistory
    const [filteredBuses, setFilteredBuses] = useState(dataInp);
    const [sortOption, setSortOption] = useState('priceAsc');
    const [selectedBusId, setSelectedBusId] = useState(null);
    const [showReset, setShowReset] = useState(false);
    const [arrowDown, setArrowDown] = useState(false);

    useEffect(() => {
        handleSort();
    }, [dataInp, sortOption]);

    const handleSort = () => {
        let sortedBuses = [...dataInp];

        // Sort based on selected option
        sortedBuses = sortedBuses.sort((a, b) => {
            if (sortOption === 'priceAsc') return a.pricePerSeat - b.pricePerSeat;
            if (sortOption === 'priceDesc') return b.pricePerSeat - a.pricePerSeat;
            if (sortOption === 'timeAsc') return new Date(a.departureTime) - new Date(b.departureTime);
            if (sortOption === 'timeDesc') return new Date(b.departureTime) - new Date(a.departureTime);
            return 0;
        });

        setFilteredBuses(sortedBuses);
    };

    const handleSubmit = (bId, pricePerSeat, companyName, departureTime, arrivalTime) => {
        localStorage.setItem("selectedBusId", bId);
        localStorage.setItem("selectedBusPrice", pricePerSeat * 10); // Store total price for 10 seats
        localStorage.setItem("companyName", companyName);
        localStorage.setItem("departureTime", departureTime);
        localStorage.setItem("arrivalTime", arrivalTime);
    
        setSelectedBusId(bId);
        setShowReset(true);
        setArrowDown(true);
    
        // Navigate to the Seat Selection tab (menu2)
        history.push('/routes');
    };
    const handleReset = () => {
        localStorage.removeItem("selectedBusId");
        setSelectedBusId(null);
        setShowReset(false);
        setArrowDown(false);
    };

    const renderFunction = () => {
        return filteredBuses.map((bus, idx) => {
            const { companyName, startCity, destination, pricePerSeat, departureTime, arrivalTime, _id } = bus;
    
            return (
                <div key={idx} className="card mt-2 buslist">
                    <div className="row ml-3 h-50">
                        <div className="col-6 col-sm-2 mt-2 font-weight-bold">Brand</div>
                        <div className="col-6 col-sm-2 mt-2 font-weight-bold">From</div>
                        <div className="col-6 col-sm-2 mt-2 font-weight-bold">To</div>
                        <div className="col-6 col-sm-2 mt-2 font-weight-bold">Price</div>
                        <div className="col-6 col-sm-2 mt-2 font-weight-bold">Departure</div>
                        <div className="col-6 col-sm-2 mt-2 font-weight-bold">Arrival</div>
    
                        <div className="w-100 d-none d-md-block"></div>
    
                        <div className="col-6 col-sm-2 mb-4">{companyName}</div>
                        <div className="col-6 col-sm-2 mb-4">{startCity}</div>
                        <div className="col-6 col-sm-2 mb-4">{destination}</div>
                        <div className="col-6 col-sm-2 mb-4">{pricePerSeat}0</div>
                        <div className="col-6 col-sm-2 mb-4">{new Date(departureTime).toLocaleTimeString()}</div>
                        <div className="col-6 col-sm-2 mb-4">{new Date(arrivalTime).toLocaleTimeString()}</div>
    
                        <div className="col-6 col-sm-4 mb-2 ml-0">
                            <button
                                className={`btn btn-primary btn-md ${selectedBusId === _id ? "disabled" : ""}`}
                                onClick={() => handleSubmit(_id, pricePerSeat, companyName, departureTime, arrivalTime)}
                            >
                                Book Now
                            </button>
                        </div>
                        <div className="col-6 col-sm-4 mb-2 ml-0">
                            <span className={showReset ? "badge badge-danger ml-5" : "disabled"} onClick={handleReset}>
                                Reset
                            </span>
                        </div>
                    </div>
                </div>
            );
        });
    };
    
    return (
        <div className="bus-list-container">
            {/* Sort Options */}
            <div className="sort-container">
                <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="form-control mb-4"
                >
                    <option value="priceAsc">Sort by Price (Low to High)</option>
                    <option value="priceDesc">Sort by Price (High to Low)</option>
                    <option value="timeAsc">Sort by Departure Time (Earliest to Latest)</option>
                    <option value="timeDesc">Sort by Departure Time (Latest to Earliest)</option>
                </select>
            </div>
            {renderFunction()}
            <div className={arrowDown ? "activeArrow" : "nonActive"}>
                <FaAngleDoubleDown />
            </div>
        </div>
    );
}
