import React, { useState } from "react";
import "./AddProduct.css";
import upload_area from "../Assets/upload_area.svg";

const AddProduct = () => {
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "pajatoquilla",
    new_price: "",
    old_price: "",
    stock: "",
    description: ""
  });

  const validateProductDetails = () => {
    const { name, new_price, old_price, stock, description } = productDetails;
    if (!name || !new_price || !old_price || !stock || !description || !image) {
      return false;
    }
    return true;
  };

  const AddProduct = async () => {
    if (!validateProductDetails()) {
      alert("Por favor, completa todos los campos antes de añadir el producto.");
      return;
    }

    let dataObj;
    let product = productDetails;

    let formData = new FormData();
    formData.append('product', image);

    await fetch('http://localhost:4000/upload', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: formData,
    })
    .then((resp) => resp.json())
    .then((data) => { dataObj = data });

    if (dataObj.success) {
      product.image = dataObj.image_url;
      console.log(product);
      await fetch('http://localhost:4000/addproduct', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      })
      .then((resp) => resp.json())
      .then((data) => { data.success ? alert("Producto añadido") : alert("Error al añadir el producto") });
    }
  };

  const changeHandler = (e) => {
    console.log(e);
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  }

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  }

  return (
    <div className="addproduct">
      <div className="addproduct-itemfield">
        <p>Título del producto</p>
        <input type="text" name="name" value={productDetails.name} onChange={(e) => { changeHandler(e) }} placeholder="Escribe aquí" />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Precio</p>
          <input type="text" name="old_price" value={productDetails.old_price} onChange={(e) => { changeHandler(e) }} placeholder="Escribe aquí" />
        </div>
        <div className="addproduct-itemfield">
          <p>Precio de oferta</p>
          <input type="text" name="new_price" value={productDetails.new_price} onChange={(e) => { changeHandler(e) }} placeholder="Escribe aquí" />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Stock del producto</p>
        <input type="text" name="stock" value={productDetails.stock} onChange={(e) => { changeHandler(e) }} placeholder="Escribe aquí" />
      </div>
      <div className="addproduct-itemfield">
        <p>Descripción del producto</p>
        <textarea name="description" value={productDetails.description} onChange={(e) => { changeHandler(e) }} placeholder="Escribe aquí"></textarea>
      </div>
      <div className="addproduct-itemfield">
        <p>Categoría del producto</p>
        <select value={productDetails.category} name="category" className="add-product-selector" onChange={changeHandler}>
          <option value="pajatoquilla">Paja toquilla</option>
          <option value="totora">Totora</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <p>Imagen del producto</p>
        <label htmlFor="file-input">
          <img className="addproduct-thumbnail-img" src={!image ? upload_area : URL.createObjectURL(image)} alt="" />
        </label>
        <input onChange={(e) => { imageHandler(e) }} type="file" name="image" id="file-input" hidden />
      </div>
      <button className="addproduct-btn" onClick={() => { AddProduct() }}>AÑADIR</button>
    </div>
  );
};

export default AddProduct;
