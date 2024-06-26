import React from 'react';
import jsPDF from 'jspdf';
import storeLogo from './Assets/Logocafereal.png';
import fondoClaro from './Assets/fondoclaro.jpg';

const InvoiceGenerator = ({ cartItems, products, totalAmount, address }) => {
  
  const generateInvoice = () => {
    let orderNumber = localStorage.getItem('orderNumber') || 1;
    orderNumber = parseInt(orderNumber) + 1;
    localStorage.setItem('orderNumber', orderNumber);

    // Crear un nuevo documento jsPDF en orientación horizontal
    const doc = new jsPDF({
      orientation: 'landscape'
    });

    // Agregar la imagen de fondo
    doc.addImage(fondoClaro, 'JPG', 0, 0, 297, 210); // Ajuste según el tamaño del documento

    // Función para agregar la información de la tienda
    const addStoreInfo = () => {
      doc.setFontSize(20);
      doc.setFont("times", "bold");
      doc.text("Nota de Compra", 140, 25, { align: 'center' });

      doc.setFontSize(12);
      doc.setFont("times", "normal");
      
      // Añadir líneas de separación
      doc.text("Artesanias Jimenez", 10, 40);
      doc.line(10, 42, 100, 42);
      
      doc.text("Dirección: Antonio de Ulloa N23-49 y Mercadillo", 10, 50);
      doc.line(10, 52, 100, 52);
      
      doc.text("Teléfono: +593 98 832 5130", 10, 60);
      doc.line(10, 62, 100, 62);
      
      doc.text("Correo: clarajimenez53@hotmail.com", 10, 70);
      doc.line(10, 72, 100, 72);
    };

    // Función para agregar detalles de la orden en celdas
    const addOrderDetails = () => {
      let y = 80;
      const cellPadding = 5;
      const colWidths = [100, 50, 50, 50];
      const headers = ["Productos", "Precio", "Cantidad", "Total"];

      doc.setFontSize(14);
      doc.setFont("times", "bold");
      doc.text(`Orden de Compra No: ${orderNumber}`, 10, y);

      y += 10;
      doc.setFontSize(12);
      doc.setFont("times", "bold");

      // Dibujar encabezados de la tabla
      headers.forEach((header, index) => {
        doc.rect(10 + colWidths.slice(0, index).reduce((a, b) => a + b, 0), y, colWidths[index], 10);
        doc.text(header, 10 + colWidths.slice(0, index).reduce((a, b) => a + b, 0) + cellPadding, y + 7);
      });

      y += 10;
      doc.setFont("times", "normal");

      // Dibujar productos en la tabla
      products.forEach((product) => {
        if (cartItems[product.id] > 0) {
          const row = [
            product.name,
            `$${product.new_price.toFixed(2)}`,
            String(cartItems[product.id]),
            `$${(product.new_price * cartItems[product.id]).toFixed(2)}`
          ];

          row.forEach((cell, index) => {
            doc.rect(10 + colWidths.slice(0, index).reduce((a, b) => a + b, 0), y, colWidths[index], 10);
            doc.text(cell, 10 + colWidths.slice(0, index).reduce((a, b) => a + b, 0) + cellPadding, y + 7);
          });

          y += 10;
        }
      });
    };

    // Función para agregar el total y la dirección de envío
    const addTotalAndAddress = () => {
      let y = 180; // Ajusta la posición vertical según sea necesario
      doc.setFontSize(14);
      doc.setFont("times", "bold");
      doc.text(`Total: $${totalAmount.toFixed(2)}`, 10, y);

      y += 10;
      doc.setFontSize(12);
      doc.setFont("times", "normal");
      doc.text(`Envio: ${address}`, 10, y);

      // Agregar textos de Facebook e Instagram
      const socialMediaText = "Síguenos en Facebook e Instagram:";
      const facebookText = "Facebook: /Artesanias Jimenez";
      const instagramText = "Instagram: @artesanias.jimenez";
      
      doc.setFontSize(10);
      doc.setFont("times","bold")
      doc.text(socialMediaText, 230, y - 10);
      doc.text(facebookText, 230, y);
      doc.text(instagramText, 230, y + 10);
    };

    // Función para finalizar la factura
    const finalizeInvoice = () => {
      doc.setFontSize(14);
      doc.setFont("times", "bold");
      doc.text("Gracias por su compra!", 140, 190, { align: 'center' }); // Centrado horizontalmente
    };

    // Agregar la imagen del logo de la tienda con tamaño ajustable
    const logoWidth = 50;
    const logoHeight = 30;
    doc.addImage(storeLogo, 'PNG', 10, 10, logoWidth, logoHeight);

    // Llamar a las funciones para agregar contenido al documento
    addStoreInfo();
    addOrderDetails();
    addTotalAndAddress();
    finalizeInvoice();

    // Guardar el documento con un nombre específico
    doc.save(`factura_${orderNumber}.pdf`);
  };

  return (
    <button onClick={generateInvoice}>PROCEDER A PAGAR</button>
  );
};

export default InvoiceGenerator;
