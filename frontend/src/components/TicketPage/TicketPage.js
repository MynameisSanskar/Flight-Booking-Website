import React from 'react';
import './TicketPage.css';

export default function TicketPage({ history }) {
    const handleSignOut = (e) => {
        e.preventDefault();
        sessionStorage.removeItem('authToken');
        localStorage.removeItem('reservedSeats');
        localStorage.removeItem('nameData');
        localStorage.clear();
        history.push('/');
    };

    const handleBookAgainIcon = (e) => {
        e.preventDefault();
        history.push('/routes');
    };

    const getLocationData = () => {
        let from = localStorage.getItem("start") || "Not Available";
        let to = localStorage.getItem("destination") || "Not Available";
        return (
            <div>
                <p>From: {from}</p>
                <p>To: {to}</p>
            </div>
        );
    };

    const getPassengerName = () => {
        let nameArray = localStorage.getItem("nameData");
        let names = nameArray ? JSON.parse(nameArray) : [];
        return names.map((name, idx) => (
            <div key={idx}>
                <p className="names">{name}</p>
            </div>
        ));
    };

    const getSeatNumbers = () => {
        let noArray = localStorage.getItem("reservedSeats");
        let arr = noArray ? JSON.parse(noArray) : [];
        return arr.map((element, idx) => (
            <div key={idx}>
                <p className="seatNo">{element}</p>
            </div>
        ));
    };

    const getIdNumber = () => {
        let tokenData = localStorage.getItem("selectedBusId") || "Not Available";
        return <p className="idData">{tokenData}</p>;
    };

    const getDateValue = () => {
        let date = localStorage.getItem("date") || "Date Unavailable";
        return <p>On: {date}</p>;
    };

    // Fetch departure and arrival times
    const getDepartureArrivalTimes = () => {
        let departureTime = localStorage.getItem("departureTime");
        let arrivalTime = localStorage.getItem("arrivalTime");

        if (departureTime && arrivalTime) {
            // Format the times to be more user-friendly
            departureTime = new Date(departureTime).toLocaleString();
            arrivalTime = new Date(arrivalTime).toLocaleString();

            return (
                <div>
                    <p>Departure: {departureTime}</p>
                    <p>Arrival: {arrivalTime}</p>
                </div>
            );
        }

        return <p>Time details not available</p>;
    };

    // Fetch company name from localStorage
    const getCompanyName = () => {
        let companyName = localStorage.getItem("companyName") || "Company Name Unavailable";
        return<h2 style={{ marginLeft: '43px' }}>{companyName}</h2>
        ;
    };

    return (
        <div className="container">
            <div>
                <nav className="mb-4 navbar navbar-expand-lg navbar-dark bg-unique hm-gradient">
                    <a href="/#" className="navbar-brand Company-Log">BA</a> {/* Updated brand logo */}
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-3" aria-controls="navbarSupportedContent-3" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent-3">
                        <ul className="navbar-nav ml-auto nav-flex-icons ic">
                            <li className="nav-item">
                                <a href="/#" className="nav-link waves-effect waves-light" onClick={handleBookAgainIcon}>Book Again</a>
                            </li>
                            <li className="nav-item">
                                <a href="/#" className="nav-link waves-effect waves-light" onClick={handleSignOut}>Sign-Out</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
            <div className="tpMain">
                <article className="ticket">
                    <header className="ticket__wrapper">
                        <div className="ticket__header">
                            {getCompanyName()} {/* Display company name here */}
                        </div>
                    </header>
                    <div className="ticket__divider">
                        <div className="ticket__notch"></div>
                        <div className="ticket__notch ticket__notch--right"></div>
                    </div>
                    <div className="ticket__body">
                        <section className="ticket__section">
                            {getLocationData()}
                            {getSeatNumbers()}
                            <p>Your seats are together <span>{getDateValue()}</span></p>
                            {getDepartureArrivalTimes()} {/* Display departure and arrival times */}
                        </section>
                        <section className="ticket__section">
                            <h3>Passenger Names</h3>
                            {getPassengerName()}
                        </section>
                        <section className="ticket__section">
                            <h3>Payment Method</h3>
                            <p>Credit Card</p>
                        </section>
                    </div>
                    <footer className="ticket__footer">
                        <p>Transaction-ID</p>
                        {getIdNumber()}
                    </footer>
                </article>
            </div>
        </div>
    );
}
