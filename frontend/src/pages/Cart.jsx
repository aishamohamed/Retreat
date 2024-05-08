import React, { useState } from 'react';

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  const removeFromCart = async (itemId) => {
    try {
      await fetch(`http://localhost:3500/cart/remove/${itemId}`, {
        method: 'DELETE'
      });
      setCartItems(cartItems.filter(item => item._id !== itemId));
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const purchaseCart = async () => {
    try {
      await fetch('http://localhost:3500/cart/purchase', {
        method: 'POST'
      });
      setCartItems([]);
      alert('Purchase successful');
    } catch (error) {
      console.error('Error purchasing cart:', error);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <table className="cart-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Description</th>
              <th>Price</th>
              <th>Currency</th>
              <th>Days Valid</th>
              <th>Location</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map(item => (
              <tr key={item._id}>
                <td>{item._id}</td>
                <td>{item.type}</td>
                <td>{item.description}</td>
                <td>{item.price}</td>
                <td>{ticket.currency}</td>
                <td>{ticket.daysValid}</td>
                <td>{ticket.location}</td>
                <td><button onClick={() => removeFromCart(item._id)}>Remove</button></td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3">Total:</td>
              <td colSpan="2">{calculateTotal()}</td>
            </tr>
          </tfoot>
        </table>
      )}
      {cartItems.length > 0 && (
        <button onClick={purchaseCart}>Purchase</button>
      )}
    </div>
  );
}

export default Cart;
