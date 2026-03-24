import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  // JavaScript Note: In the Conference Event Planner, I only used consts for 'variables', which is why I initially declared
  // the total_amount local variable as a const. (D'oh!). The reason I used consts in the other app was because the consts
  // were linked to React props (e.g. useState) or were arrays. I could have used a 'let' for variables, but in most cases
  // it's better practice to use a const. That way the const remains a reference to the same array, but the array itself 
  // can still be changed by various JavaScript array methods. What we can't do with a const arrary is to 
  // reassign the array, and preventing this means we can't do it by accident, which apparently JavaScript coders are prone to?
  const calculateTotalAmount = () => {
    let total_amount = 0;
    cart.forEach(item => {
      total_amount += parseFloat(item.cost.substring(1)) * item.quantity;
    });
    return total_amount.toFixed(2); // Return total amount formatted to 2 decimal places
  };

  // Call the function passed from the parent component to navigate back to the product listing page
  // The IBM course says this is good practice to have the navigation and state management logic in the parent component
  // and to pass down functions as props to child components to handle events.
  // In context, all I want to do in this script file is to manage the increment/ decrement and delete activity for
  // cart items. I don't want to know the implentation details of any other logic, such as navigation (or state management).
  const handleContinueShopping = (e) => {
   onContinueShopping(e); 
  };

  const handleCheckoutShopping = (e) => {
    alert('Coming soon... Functionality to be added for future reference');
  };



  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => { 
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      // If quantity is 1 and user clicks decrement, remove the item from the cart instead
      dispatch(removeItem({ name: item.name, image: item.image, cost: item.cost }));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem({ name: item.name, image: item.image, cost: item.cost }));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    return (parseFloat(item.cost.substring(1)) * item.quantity).toFixed(2);
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={(e) => handleCheckoutShopping(e)}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


