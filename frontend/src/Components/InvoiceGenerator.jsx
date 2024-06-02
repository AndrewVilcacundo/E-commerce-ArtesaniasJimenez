import React from 'react';
import jsPDF from 'jspdf';
import storeLogo from './Assets/Logocafe.png';

const InvoiceGenerator = ({ cartItems, products, totalAmount }) => {
  const generateInvoice = () => {
    // Get the current order number from localStorage, or start at 1 if it doesn't exist
    let orderNumber = localStorage.getItem('orderNumber');
    if (!orderNumber) {
      orderNumber = 1;
    } else {
      orderNumber = parseInt(orderNumber) + 1;
    }
    // Save the new order number back to localStorage
    localStorage.setItem('orderNumber', orderNumber);

    const doc = new jsPDF();

    // Adding store logo
    doc.addImage(storeLogo, 'PNG', 10, 10, 50, 20);

    // Adding store information
    doc.setFontSize(20);
    doc.text("Factura de Compra", 70, 25);

    doc.setFontSize(12);
    doc.text("Artesanias Jimenez", 10, 40);
    doc.text("Dirección: Antonio de Ulloa N23-49 y Mercadillo", 10, 45);
    doc.text("Teléfono: +593 98 832 5130", 10, 50);
    doc.text("Correo: ", 10, 55);
    
    // Adding order number
    doc.setFontSize(14);
    doc.text(`Orden de Compra No: ${orderNumber}`, 10, 65);

    let y = 80;
    doc.setFontSize(14);
    doc.text("Detalles de la factura", 10, y);

    y += 10;
    doc.setFontSize(12);
    doc.text("Productos", 10, y);
    doc.text("Titulo", 50, y);
    doc.text("Precio", 90, y);
    doc.text("Cantidad", 110, y);
    doc.text("Total", 150, y);
    y += 10;

    products.forEach((product) => {
      if (cartItems[product.id] > 0) {
        doc.text(product.name, 10, y);
        doc.text(product.title, 50, y);
        doc.text(`$${product.new_price.toFixed(2)}`, 90, y);
        doc.text(`${cartItems[product.id]}`, 110, y);
        doc.text(`$${(product.new_price * cartItems[product.id]).toFixed(2)}`, 150, y);
        y += 10;
      }
    });

    y += 10;
    doc.setFontSize(14);
    doc.text(`Total: $${totalAmount.toFixed(2)}`, 10, y);

    // Adding footer
    doc.setFontSize(10);
    doc.text("Gracias por su compra!", 10, y + 20);

    doc.save(`factura_${orderNumber}.pdf`);
  };

  return (
    <button onClick={generateInvoice}>PROCEDER A PAGAR</button>
  );
};

export default InvoiceGenerator;
