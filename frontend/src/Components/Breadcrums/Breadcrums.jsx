import React from 'react'
import './Breadcrums.css'
import arrow_icon from '../Assets/breadcrum_arrow.png'

const Breadcrums = (props) => {
  const { product } = props;

  // Verifica si product está definido y tiene las propiedades category y name
  if (!product || !product.category || !product.name) {
    return <div>Loading...</div>; // O algún otro componente de respaldo
  }

  return (
    <div className='breadcrums'>
      PRINCIPAL <img src={arrow_icon} alt="Arrow Icon" /> TIENDA <img src={arrow_icon} alt="Arrow Icon" /> {product.category} <img src={arrow_icon} alt="Arrow Icon" /> {product.name}
    </div>
  )
}

export default Breadcrums
