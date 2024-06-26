import React, { useContext, useState } from "react";
import "./CartItems.css";
import cross_icon from "../Assets/cart_cross_icon.png";
import { ShopContext } from "../../Context/ShopContext";
import InvoiceGenerator from '../InvoiceGenerator';

const CartItems = () => {
  const { products, cartItems, removeFromCart, getTotalCartAmount } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();

  const [deliveryOption, setDeliveryOption] = useState("recoger"); // Inicia con "recoger" seleccionado por defecto
  const [address, setAddress] = useState("Recoger en tienda");

  const handleDeliveryOption = (option) => {
    setDeliveryOption(option);
    if (option === "recoger") {
      setAddress("Recoger en tienda");
    } else {
      setAddress(""); // Limpia la dirección si se elige otra opción
    }
  };

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Productos</p>
        <p>Titulo</p>
        <p>Precio</p>
        <p>Cantidad</p>
        <p>Total</p>
        <p>Remover</p>
      </div>
      <hr />
      {products.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div key={e.id}>
              <div className="cartitems-format-main cartitems-format">
                <img className="cartitems-product-icon" src={e.image} alt="" />
                <p className="cartitems-product-title">{e.name}</p>
                <p>${e.new_price}</p>
                <button className="cartitems-quantity">{cartItems[e.id]}</button>
                <p>${e.new_price * cartItems[e.id]}</p>
                <img onClick={() => removeFromCart(e.id)} className="cartitems-remove-icon" src={cross_icon} alt="" />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}
      
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Carro total</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Enviar</p>
              <div>
                <button className={deliveryOption === "recoger" ? "selected" : ""} onClick={() => handleDeliveryOption("recoger")}>Recoger productos en la tienda</button>
                <button className={deliveryOption === "entregar" ? "selected" : ""} onClick={() => handleDeliveryOption("entregar")}>Entregar a casa</button>
              </div>
              {deliveryOption === "entregar" && (
                <input
                  type="text"
                  placeholder="Ingrese dirección"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              )}
            </div>
            <hr />
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>${totalAmount}</h3>
            </div>
          </div>
          <InvoiceGenerator
            cartItems={cartItems}
            products={products}
            totalAmount={totalAmount}
            address={address}
          />
        </div>
      </div>
    </div>
  );
};

export default CartItems;
