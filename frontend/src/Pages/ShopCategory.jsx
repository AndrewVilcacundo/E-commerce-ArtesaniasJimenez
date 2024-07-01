import React, { useEffect, useState } from "react";
import "./CSS/ShopCategory.css";
import Item from "../Components/Item/Item";

const ShopCategory = (props) => {
  const [allproducts, setAllProducts] = useState([]);

  useEffect(() => {
    fetch('${process.env.REACT_APP_API_URL}/api/products')
      .then(response => response.json())
      .then(data => setAllProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <div className="shopcategory">
      <img src={props.banner} className="shopcategory-banner" alt="" />
      <div className="shopcategory-indexSort">
        <p><span>Mostrando los siguientes productos.</span> </p>
      </div>
      <div className="shopcategory-products">
        {allproducts.map((item, i) => {
          if (props.category === item.category) {
            return <Item id={item.id} key={i} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />;
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
};

export default ShopCategory;
