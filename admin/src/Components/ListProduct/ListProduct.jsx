import React, { useEffect, useState } from "react";
import "./ListProduct.css";
import cross_icon from '../Assets/cross_icon.png';

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);

  const fetchInfo = () => { 
    fetch('https://e-commerce-artesaniasjimenez-backend.onrender.com/allproducts') 
      .then((res) => res.json()) 
      .then((data) => setAllProducts(data));
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const removeProduct = async (id) => {
    await fetch('https://e-commerce-artesaniasjimenez-backend.onrender.com/removeproduct', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id }),
    });

    fetchInfo(); // Refresca la lista de productos después de eliminar uno
  };

  return (
    <div className="listproduct">
      <h1>Todos los productos de la lista</h1>
      <div className="listproduct-format-main">
        <p>Productos</p>
        <p>Título</p>
        <p>Precio antiguo</p>
        <p>Precio nuevo</p>
        <p>Categoria</p>
        <p>Stock</p> {/* Añadir columna para Stock */}
        <p>Remover</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((e) => {
          return (
            <div key={e.id}>
              <div className="listproduct-format-main listproduct-format">
                <img className="listproduct-product-icon" src={e.image} alt="" />
                <p className="listproduct-product-title">{e.name}</p>
                <p>${e.old_price}</p>
                <p>${e.new_price}</p>
                <p>{e.category}</p>
                <p>{e.stock}</p> {/* Mostrar el stock del producto */}
                <img 
                  className="listproduct-remove-icon" 
                  onClick={() => { removeProduct(e.id) }} 
                  src={cross_icon} 
                  alt="Remover" 
                />
              </div>
              <hr />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListProduct;
