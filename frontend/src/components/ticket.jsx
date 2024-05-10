import { useState } from 'react';
import "../style/ticket.css";

export default function Ticket(props) {
    const { id, type, price, currency, daysValid, location, inCart } = props;
    const [addedToCart, setAddedToCart] = useState(false);

    const addToCart = async (ticketKey) => {

        try {
            await fetch('http://localhost:3500/cart/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ticket_id: ticketKey })
            });

            let cartItems = JSON.parse(localStorage.getItem('cartItems')) || {};
            cartItems[ticketKey] = true;
            localStorage.setItem('cartItems', JSON.stringify(cartItems));

            setAddedToCart(true);
        } catch (error) {
            console.error('Error adding item to cart:', error);
        }
    };

    return (
        <div className="ticket">
            <img src={`/${type.toLowerCase()}.jpg`} className="t-image" alt={`${type} icon`} />
            <div className="disc">
                <h3>{type.toUpperCase()}</h3>

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
            </div>
            <button className="buy-btn" onClick={() => addToCart(id)} disabled={inCart || addedToCart}>
                {inCart || addedToCart ? "Added to cart" : "Add to cart"}
            </button>
        </div>
    )
}
