import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Shop from "./Pages/Shop";
import Cart from "./Pages/Cart";
import Product from "./Pages/Product";
import Footer from "./Components/Footer/Footer";
import ShopCategory from "./Pages/ShopCategory";
import toquilla_banner from "./Components/Assets/toquilla.png";
import totora_banner from "./Components/Assets/totora.png";
import LoginSignup from "./Pages/LoginSignup";
import React from "react";


function App() {

  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Shop gender="all" />} />
          <Route path="/totoras" element={<ShopCategory banner={totora_banner} category="totora" />} />
          <Route path="/toquillas" element={<ShopCategory banner={toquilla_banner} category="pajatoquilla" />} />
          <Route path='/product' element={<Product />}>
            <Route path=':productId' element={<Product />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginSignup/>} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
