/* eslint-disable react/prop-types */
import { useState } from 'react';
import "../style/ticket.css";

export default function Ticket(props) {
    const { id, type, price, currency, daysValid, inCart, location, removeFromCart, onDateChange } = props;
    const [addedToCart, setAddedToCart] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');

    const addToCart = async (ticketKey) => {
        try {
            let cartItems = JSON.parse(localStorage.getItem('cartItems')) || {};
            cartItems[ticketKey] = true;
            localStorage.setItem('cartItems', JSON.stringify(cartItems));

            setAddedToCart(true);
        } catch (error) {
            console.error('Error adding item to cart:', error);
        }
    };

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
        onDateChange(id, e.target.value);
    };

    return (
        <div className="ticket">
            <img src={`/${type.toLowerCase()}.jpg`} className="t-image" alt={`${type} icon`} />
            <div className="disc">
                <h3 className="title-item">{type.toUpperCase()}</h3>

                <div className="disc-body">
                    <div className="item-con">
                        <div className="ticket-item">
                            <img src="/calendar.svg" alt="calendar" />
                            <div className="type-item">{daysValid} days duration</div>
                        </div>
                        <div className="ticket-item">
                            <img src="/location.svg" alt="location" />
                            <div className="type-item">{location}</div>
                        </div>
                        <div className="ticket-price">
                            <img src="/price-tag.svg" alt="price-tag" />
                            <div className="type-item">{price} {currency}</div>
                        </div>
                    </div>

                    {onDateChange && (<div className="date-picker">
                        <div className="date-picker">
                            <input
                                type="date"
                                id="date-picker-input"
                                value={selectedDate}
                                onChange={handleDateChange}
                            />
                        </div>
                    </div>)}
                </div>
            </div>
           
            { !removeFromCart ? (
                <button className="buy-btn" onClick={() => addToCart(id)} disabled={inCart || addedToCart}>
                    {inCart || addedToCart ? "Added to cart" : "Add to cart"}
                </button>
            ) : (
                <button className="bin-btn" onClick={() => removeFromCart(id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
                        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                    </svg>
                </button>
            )}
        </div>
    )
}




