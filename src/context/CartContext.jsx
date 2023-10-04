import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  
  
  const [cartItems, setCartItems] = useState(() => {
    const data = localStorage.getItem('cartItems');
    if(data) return JSON.parse(data)
    return []
  });

  useEffect(() => {
    localStorage.setItem('cartItems',
        JSON.stringify(cartItems))
}, [cartItems]);

  const totalItems = () => cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = () => cartItems.reduce((total, item) => total + item.quantity * item.price, 0);

  const handleAddProduct = (product) => {

    const { id } = product;
    const itemFounded = cartItems.find(item => item.id == id);
    let items = [];
    if(itemFounded){
      items = cartItems.map((item) => {
        if(item.id == id )  return ({ ...item, quantity: item.quantity + 1 })
        return item;
      })
    } else {
      items = [...cartItems, {...product, quantity: 1}]
    }
    setCartItems(items);
  };

  const handleRemoveProduct = (id) => {
    const itemFounded = cartItems.find(item => item.id == id);
    let items = [];
    if(itemFounded.quantity == 1) {
      items = cartItems.filter(item => item.id != id);
    } else {
      items = cartItems.map(item => {
        if(item.id == id) {
          return {
          ...item, quantity: item.quantity - 1
          }
        } return item
      });
    }
    setCartItems(items)
  };

  const handleCleanCart = () => {
    setCartItems([])
  }
  
  return (
    <CartContext.Provider 
      value={{ 
        cartItems,
        setCartItems,
        handleAddProduct,
        handleRemoveProduct,
        handleCleanCart,
        totalPrice,
        totalItems
      }}>
      {children}
    </CartContext.Provider>
  );
};
