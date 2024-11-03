import React, { useState } from 'react';
import { FaAngleDoubleDown } from "react-icons/fa";
import './Tab.css';

export default function SeatSelection() {
    const [names, setNames] = useState([]);
    const [arrowDown, setArrowDown] = useState(false);
    const [genders, setGenders] = useState([]);
    const [reservedSeats, setReservedSeats] = useState(["1A", "2A", "2B", "3B", "4A", "5C", "6A", "7B", "7C", '8B', "9B", "9C"]);
    const [selectedSeats, setSelectedSeats] = useState([]);

    const getSeatNumber = (e) => {
        const newSeat = e.target.value;

        if (reservedSeats.includes(newSeat)) {
            e.target.disabled = true; // Disable checkbox if seat is reserved
            if (selectedSeats.includes(newSeat)) {
                setSelectedSeats(selectedSeats.filter(seat => seat !== newSeat));
            }
        } else {
            setSelectedSeats(prevSeats => [...prevSeats, newSeat]);
            setReservedSeats(prevReserved => [...prevReserved, newSeat]);
        }
    };

    const handleGender = (e, seatNo) => {
        const { value } = e.target;
        setGenders(prevGenders => [...prevGenders, { seatNo, gender: value }]);
    };

    const handlePassengerName = (e, seatNo) => {
        e.preventDefault();
        const value = e.target.value.trim();

        if (!value) {
            return alert("Name is required");
        }
        setNames(prevNames => [...prevNames, { seatNo, name: value }]);
    };

    const handleSubmitDetails = (e) => {
        e.preventDefault();
        setArrowDown(true);
        localStorage.setItem("reservedSeats", JSON.stringify(selectedSeats));
        localStorage.setItem("nameData", JSON.stringify(names));
        console.log(names);
        console.log(genders);
    };

    const renderPassengerData = () => {
        return selectedSeats.map((seat, idx) => (
            <form key={idx} className="form seatfrm">
                <p className="text-capitalize text-center">Seat No: {seat}</p>
                <input 
                    className="form-control seatInp" 
                    onBlur={e => handlePassengerName(e, seat)} 
                    type="text" 
                    placeholder="Enter Name" 
                />
                <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name={`gender-${seat}`} 
                        value="Male" 
                        onClick={e => handleGender(e, seat)} 
                    />
                    <label className="form-check-label">Male</label>
                </div>
                <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name={`gender-${seat}`} 
                        value="Female" 
                        onClick={e => handleGender(e, seat)} 
                    />
                    <label className="form-check-label">Female</label>
                </div>
            </form>
        ));
    };

    return (
        <div className="ss">
            <div className="row">
                <div className="column1">
                    <div className="plane">
                        <form onChange={getSeatNumber}>
                            <ol className="cabin fuselage">
                                {Array.from({ length: 10 }, (_, rowIndex) => (
                                    <li className={`row row--${rowIndex + 1}`} key={rowIndex}>
                                        <ol className="seats" type="A">
                                            {['A', 'B', 'C'].map((seatLetter, index) => {
                                                const seatId = `${rowIndex + 1}${seatLetter}`;
                                                const isReserved = reservedSeats.includes(seatId);
                                                return (
                                                    <li className="seat" key={index}>
                                                        <input 
                                                            type="checkbox" 
                                                            disabled={isReserved} 
                                                            value={seatId} 
                                                            id={seatId} 
                                                        />
                                                        <label htmlFor={seatId}>{seatId}</label>
                                                    </li>
                                                );
                                            })}
                                        </ol>
                                    </li>
                                ))}
                            </ol>
                        </form>
                    </div>
                </div>
                <div className="column2">
                    <div className="seatInfo">
                        <form className="form-group">
                            {renderPassengerData()}
                        </form>
                        <div>
                            <button onClick={handleSubmitDetails} className="btn btn-info seatBT">
                                Confirm Details
                            </button>
                        </div>
                        <div className={arrowDown ? "activeArrow2" : "nonActive"}>
                            <FaAngleDoubleDown />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
