import React from 'react'
import './Footer.css'

import footer_logo from '../Assets/Logocafe.png'
import instagram_icon from '../Assets/instagram_icon.png'
import facebook_icon from '../Assets/facebookk_icon.png'
import whatsapp_icon from '../Assets/whatsapp_icon.png'

const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-logo">
        <img src={footer_logo} alt="" />
        <p>ARTESANIAS JIMENEZ</p>
      </div>
      <ul className="footer-links">
        <li>Compañía</li>
        <li>Productos</li>
        <li>Acerca</li>
        <li>Contacto</li>
      </ul>
      <div className="footer-social-icons">
        <div className="footer-icons-container">
          <a href="https://www.instagram.com/artesanias.jimenez/" target="_blank" rel="noopener noreferrer">
            <img src={instagram_icon} alt="Instagram" />
          </a>
        </div>
        <div className="footer-icons-container">
          <a href="https://www.facebook.com/profile.php?id=100083196733772" target="_blank" rel="noopener noreferrer">
            <img src={facebook_icon} alt="Facebook" />
          </a>
        </div>
        <div className="footer-icons-container">
          <a href="https://api.whatsapp.com/send?phone=%2B593988325130&context=ARACzpqXqmaCGi25F9DtDiQv8TPzpQt2sCqMeqjyQqvylQPt98ZBKfGUTBsCPi2JSzVkFQez6JBCKHdsTsf3HgGyVaMhRPW-rEg_amS5_nrwc0AAEwIMzyU20n8ZNC4Txtzr2knA0jB-ef86zuk6wj2hOA&source=FB_Page&app=facebook&entry_point=page_cta&fbclid=IwZXh0bgNhZW0CMTAAAR3B0l3UEAY913pNU13ERRkgCoG3e2x3TONmLoVF6BEs8YbG6XnPrwhHpoc_aem_AQyPSSViiL6CifM2YXFjDFpt0RUaDQoYhXC82_hwCcp-qa2BtK5mKRn0VYZl3cCYNg8B3S5o5zb2eYlUBPB9sWmi" target="_blank" rel="noopener noreferrer">
            <img src={whatsapp_icon} alt="WhatsApp" />
          </a>
        </div>
      </div>
      <div className="footer-copyright">
        <hr />
        <p>Copyright @ 2024 - Todos los derechos reservados.</p>
      </div>
    </div>
  )
}

export default Footer
