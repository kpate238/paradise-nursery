import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

function CartItem({ onContinueShopping }) {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const parseCost = (costString) => parseFloat(costString.replace('$', ''));

  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => total + parseCost(item.cost) * item.quantity, 0).toFixed(2);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (itemName) => {
    dispatch(removeItem(itemName));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Total Cart Amount: ${calculateTotalAmount()}</h2>
      {cartItems.map((item) => (
        <div key={item.name} style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '15px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
          <img src={item.image} alt={item.name} style={{ width: '80px' }} />
          <div>
            <h3>{item.name}</h3>
            <p>Unit Price: {item.cost}</p>
            <p>Subtotal: ${(parseCost(item.cost) * item.quantity).toFixed(2)}</p>
          </div>
          <div>
            <button onClick={() => handleDecrement(item)}>-</button>
            <span style={{ margin: '0 10px' }}>{item.quantity}</span>
            <button onClick={() => handleIncrement(item)}>+</button>
          </div>
          <button onClick={() => handleRemove(item.name)} style={{ backgroundColor: 'red', color: 'white' }}>Delete</button>
        </div>
      ))}
      <button onClick={onContinueShopping} style={{ marginRight: '10px' }}>Continue Shopping</button>
      <button onClick={() => alert('Coming Soon')}>Checkout</button>
    </div>
  );
}

export default CartItem;
