//Importart cloudinary
import { v2 as cloudinary } from 'cloudinary';

//Establecer ñas variables de entorno
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET,
    secure: true
});

//crear metodo para enviar la imagen a cloudinary y que la misma se almcene 
//en un directorio llamado portafolio
export const uploadImage = async (fileBuffer) => {
    try {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: 'ecommerce' },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        uploadStream.end(fileBuffer);
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };