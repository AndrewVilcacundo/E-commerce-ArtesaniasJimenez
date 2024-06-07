import React, { useContext } from "react";
import "./ProductDisplay.css";
import { ShopContext } from "../../Context/ShopContext";

const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart } = useContext(ShopContext);

  // Verifica si product está definido y tiene las propiedades necesarias
  if (!product || !product.image || !product.name || !product.old_price || !product.new_price || !product.description) {
    return <div>Loading...</div>; // O algún otro componente de respaldo
  }

  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={product.image} alt="img" />
          <img src={product.image} alt="img" />
          <img src={product.image} alt="img" />
          <img src={product.image} alt="img" />
        </div>
        <div className="productdisplay-img">
          <img className="productdisplay-main-img" src={product.image} alt="img" />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">${product.old_price}</div>
          <div className="productdisplay-right-price-new">${product.new_price}</div>
        </div>
        <div className="productdisplay-right-description" dangerouslySetInnerHTML={{ __html: product.description }}>
        </div>
        <br />
        <button onClick={() => { addToCart(product.id) }}>AÑADIR AL CARRITO</button>
        <p className="productdisplay-right-category"><span>Categoría :</span> {product.category}</p>
        <p className="productdisplay-right-category"><span>Etiquetas :</span> Moderno, Resistente</p>
      </div>
    </div>
  );
};

export default ProductDisplay;
