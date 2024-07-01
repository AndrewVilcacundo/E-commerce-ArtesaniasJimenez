import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function getDefaultCart() {
    let cart = {};
    for (let i = 0; i < 300; i++) {
      cart[i] = 0;
    }
    return cart;
  }

  useEffect(() => {
    fetch('${process.env.REACT_APP_API_URL}/allproducts')
      .then((res) => res.json())
      .then((data) => setProducts(data));

    if (localStorage.getItem("auth-token")) {
      setIsAuthenticated(true);
      fetch('${process.env.REACT_APP_API_URL}/getcart', {
        method: 'POST',
        headers: {
          Accept: 'application/form-data',
          'auth-token': `${localStorage.getItem("auth-token")}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(),
      })
        .then((resp) => resp.json())
        .then((data) => { setCartItems(data) });
    }
  }, []);

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = products.find((product) => product.id === Number(item));
        totalAmount += cartItems[item] * itemInfo.new_price;
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];;
      }
    }
    return totalItem;
  };

  const addToCart = (itemId) => {
    const product = products.find((product) => product.id === itemId);
    if (product && cartItems[itemId] < product.stock) {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));

      if (localStorage.getItem("auth-token")) {
        fetch('${process.env.REACT_APP_API_URL}/addtocart', {
          method: 'POST',
          headers: {
            Accept: 'application/form-data',
            'auth-token': `${localStorage.getItem("auth-token")}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ "itemId": itemId }),
        })
        .then((resp) => resp.json())
        .then((data) => { console.log(data) });
      }
    } else {
      alert("No hay suficiente stock disponible.");
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (localStorage.getItem("auth-token")) {
      fetch('${process.env.REACT_APP_API_URL}/removefromcart', {
        method: 'POST',
        headers: {
          Accept: 'application/form-data',
          'auth-token': `${localStorage.getItem("auth-token")}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "itemId": itemId }),
      })
        .then((resp) => resp.json())
        .then((data) => { console.log(data) });
    }
  };

  const contextValue = {
    products,
    getTotalCartItems,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    isAuthenticated,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
