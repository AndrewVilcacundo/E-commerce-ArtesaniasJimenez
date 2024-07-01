import React, { useState } from "react";
import "./buscar.css";
import upload_area from "../Assets/upload_area.svg";

const Update = () => {
    const [image, setImage] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [productDetails, setProductDetails] = useState({
        id: "",
        name: "",
        category: "pajatoquilla",
        new_price: "",
        old_price: "",
        stock: "",
        description: "",
    });
    //const navigate = useNavigate();

    const updateProduct = async () => {
        let product = { ...productDetails };

        if (image) {
            let formData = new FormData();
            formData.append('product', image);

            const response = await fetch('${process.env.REACT_APP_API_URL}/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            if (data.success) {
                product.image = data.image_url;
            } else {
                alert("Error al subir la imagen");
                return;
            }
        }

        console.log("Producto a actualizar:", product);

        const response = await fetch('${process.env.REACT_APP_API_URL}/updateproduct', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        });

        const data = await response.json();
        if (data.success) {
            alert("Producto actualizado");
        } else {
            console.error("Error al actualizar el producto:", data.message);
            alert("Error al actualizar el producto");
        }
    };

    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    };

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    };

    const searchProduct = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/product/${searchTerm}`);
        const data = await response.json();
        if (data.success) {
            setProductDetails(data.product);
        } else {
            alert('Producto no encontrado');
        }
    };

    return (
        <div className="updateproduct">
            <div className="updateproduct-itemfield">
                <p>Buscar producto por nombre</p>
                <input
                    type="text"
                    name="search"
                    value={searchTerm}
                    placeholder="Escribe el nombre del producto"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="updateproduct-btn" onClick={searchProduct}>BUSCAR</button>
            </div>
            {productDetails.id && (
                <>
                    <div className="updateproduct-itemfield">
                        <p>Título del producto</p>
                        <input
                            type="text"
                            name="name"
                            value={productDetails.name}
                            onChange={changeHandler}
                            placeholder="Escribe aquí"
                        />
                    </div>
                    <div className="updateproduct-price">
                        <div className="addproduct-itemfield">
                            <p>Precio</p>
                            <input
                                type="text"
                                name="old_price"
                                value={productDetails.old_price}
                                onChange={changeHandler}
                                placeholder="Escribe aquí"
                            />
                        </div>
                        <div className="updateproduct-itemfield">
                            <p>Precio de oferta</p>
                            <input
                                type="text"
                                name="new_price"
                                value={productDetails.new_price}
                                onChange={changeHandler}
                                placeholder="Escribe aquí"
                            />
                        </div>
                    </div>
                    <div className="updateproduct-itemfield">
                        <p>Stock del producto</p>
                        <input
                            type="text"
                            name="stock"
                            value={productDetails.stock}
                            onChange={changeHandler}
                            placeholder="Escribe aquí"
                        />
                    </div>
                    <div className="updateproduct-itemfield">
                        <p>Descripción del producto</p>
                        <textarea
                            name="description"
                            value={productDetails.description}
                            onChange={changeHandler}
                            placeholder="Escribe aquí"
                        ></textarea>
                    </div>
                    <div className="updateproduct-itemfield">
                        <p>Categoría del producto</p>
                        <select
                            value={productDetails.category}
                            name="category"
                            className="update-product-selector"
                            onChange={changeHandler}
                        >
                            <option value="pajatoquilla">Paja toquilla</option>
                            <option value="totora">Totora</option>
                        </select>
                    </div>
                    <div className="updateproduct-itemfield">
                        <p>Imagen del producto</p>
                        <label htmlFor="file-input">
                            <img
                                className="updateproduct-thumbnail-img"
                                src={!image ? upload_area : URL.createObjectURL(image)}
                                alt=""
                            />
                        </label>
                        <input
                            onChange={imageHandler}
                            type="file"
                            name="image"
                            id="file-input"
                            hidden
                        />
                    </div>
                    <button className="updateproduct-btn" onClick={updateProduct}>ACTUALIZAR</button>
                </>
            )}
        </div>
    );
};
export default Update;
