
import "../style/ticket.css";

export default function Ticket(props){
    let {type, price,currency,daysValid,location} = props;

    return(
        <div className="ticket">
            <img src={`/${type.toLowerCase()}.jpg`} className="t-image" alt={`${type} icon`}></img>
            <div className="disc">
            <h3>{type.toUpperCase()}</h3>

            <div className="item-con">
            <div className="ticket-item">
            <img src="/calendar.svg" alt="calendar"/>
            <div className="type-item">{daysValid} days duration</div>

                </div>
            <div className="ticket-item">
            <img src="/location.svg" alt="location"/>
            <div className="type-item">{location}</div>

                </div>
                <div className="ticket-price">
            <img src="/price-tag.svg" alt="price-tag"/>
            <div className="type-item">{price} USD</div>


                </div>
            
                </div>   

            </div>
            <button className="buy-btn">BUY</button>



        </div>
    )
}