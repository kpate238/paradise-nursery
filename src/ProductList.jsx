import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';

function ProductList() {
  const [showCart, setShowCart] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const totalCartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://via.placeholder.com/150", description: "Produces oxygen at night.", cost: "$15" },
        { name: "Spider Plant", image: "https://via.placeholder.com/150", description: "Filters formaldehyde and xylene.", cost: "$12" },
        { name: "Peace Lily", image: "https://via.placeholder.com/150", description: "Removes toxic air pollutants.", cost: "$18" },
        { name: "Boston Fern", image: "https://via.placeholder.com/150", description: "Adds humidity and purifies air.", cost: "$14" },
        { name: "Rubber Plant", image: "https://via.placeholder.com/150", description: "Easy-to-grow air cleanser.", cost: "$20" },
        { name: "Aloe Vera", image: "https://via.placeholder.com/150", description: "Purifies air and heals skin.", cost: "$10" }
      ]
    },
    {
      category: "Aromatic Fragrant Plants",
      plants: [
        { name: "Lavender", image: "https://via.placeholder.com/150", description: "Calming and relaxing scent.", cost: "$15" },
        { name: "Jasmine", image: "https://via.placeholder.com/150", description: "Sweet floral fragrance.", cost: "$22" },
        { name: "Rosemary", image: "https://via.placeholder.com/150", description: "Aromatic herb for kitchen.", cost: "$12" },
        { name: "Mint", image: "https://via.placeholder.com/150", description: "Refreshing minty scent.", cost: "$8" },
        { name: "Eucalyptus", image: "https://via.placeholder.com/150", description: "Invigorating fresh scent.", cost: "$19" },
        { name: "Gardenia", image: "https://via.placeholder.com/150", description: "Strong sweet fragrance.", cost: "$25" }
      ]
    },
    {
      category: "Low Maintenance Plants",
      plants: [
        { name: "ZZ Plant", image: "https://via.placeholder.com/150", description: "Thrives on neglect.", cost: "$25" },
        { name: "Pothos", image: "https://via.placeholder.com/150", description: "Fast growing trailing vine.", cost: "$10" },
        { name: "Cast Iron Plant", image: "https://via.placeholder.com/150", description: "Extremely hard to kill.", cost: "$30" },
        { name: "Succulents", image: "https://via.placeholder.com/150", description: "Requires minimal watering.", cost: "$8" },
        { name: "Jade Plant", image: "https://via.placeholder.com/150", description: "Symbol of good luck.", cost: "$16" },
        { name: "Chinese Evergreen", image: "https://via.placeholder.com/150", description: "Tolerates low light well.", cost: "$21" }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  return (
    <div>
      <nav className="navbar">
        <a href="#" onClick={() => setShowCart(false)}>Home</a>
        <a href="#" onClick={() => setShowCart(false)}>Plants</a>
        <a href="#" onClick={() => setShowCart(true)}>Cart 🛒 ({totalCartCount})</a>
      </nav>

      {!showCart ? (
        <div style={{ padding: '20px' }}>
          {plantsArray.map((categoryObj, idx) => (
            <div key={idx}>
              <h2>{categoryObj.category}</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {categoryObj.plants.map((plant) => {
                  const isAdded = cartItems.some((item) => item.name === plant.name);
                  return (
                    <div key={plant.name} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', width: '200px' }}>
                      <img src={plant.image} alt={plant.name} style={{ width: '100%' }} />
                      <h3>{plant.name}</h3>
                      <p>{plant.description}</p>
                      <p><strong>{plant.cost}</strong></p>
                      <button disabled={isAdded} onClick={() => handleAddToCart(plant)}>
                        {isAdded ? "Added to Cart" : "Add to Cart"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductList;
