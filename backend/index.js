import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import cors from 'cors';
import bcrypt from 'bcrypt'; 
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import cloudinary from 'cloudinary';
import fs from 'fs-extra';

dotenv.config();
const port = 4000;
const app = express();



app.use(express.json());
app.use(cors());



// Configura nodemailer
let transporter = nodemailer.createTransport({
  service: 'hotmail',
  host: process.env.HOST_MAILTRAP,
  port: parseInt(process.env.PORT_MAILTRAP),
  auth: {
    user: process.env.USER_MAILTRAP,
    pass: process.env.PASS_MAILTRAP,
  },
  tls: {
    rejectUnauthorized: false
  }
});













//2GHjis1G1rc1EMpl

// Database Connection With MongoDB

mongoose.connect("mongodb+srv://sandovalbrandon1027:2GHjis1G1rc1EMpl@cluster0.8yp9gqt.mongodb.net/probando")
//mongoose.connect("mongodb+srv://sandovalbrandon1027:PvQEAZBx8F2aJyLU@cluster0.ixeawgw.mongodb.net/e-comerce");
//mongoose.connect("mongodb+srv://andrewmateo1503:kZujIsqjNPeRFbBX@cluster1.u8fdtxz.mongodb.net/tesis2");
// paste your mongoDB Connection string above with password
// password should not contain '@' special character

// //Image Storage Engine 
// const storage = multer.diskStorage({
  //     destination: './upload/images',
  //     filename: (req, file, cb) => {
    //       console.log(file);
    //         return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    //     }
// })
// const upload = multer({storage: storage})
// app.post("/upload", upload.single('product'), (req, res) => {
//     res.json({
//         success: 1,
//         image_url: `http://localhost:4000/images/${req.file.filename}`
//     })
// })
// app.use('/images', express.static('upload/images'));


//Establecer las variables de entorno
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET,
  secure: true
});


// Middleware para el almacenamiento de imágenes en Cloudinary
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  }
});

// Middleware de multer para cargar archivos
const upload = multer({ storage: storage });

// Ruta para subir imágenes
app.post("/upload", upload.single('product'), async (req, res) => {
  try {
    // Subir la imagen a Cloudinary
    const resultado = await cloudinary.uploader.upload(req.file.path, { 
      folder: 'tienda' // Crear la carpeta "tienda" en Cloudinary
    });

    // Eliminar la imagen local después de subirla a Cloudinary
    await fs.unlink(req.file.path);

    // Enviar la URL de la imagen subida
    res.json({
      success: 1,
      image_url: resultado.secure_url
    });
  } catch (error) {
    console.error('Error al subir la imagen a Cloudinary:', error);
    res.status(500).json({ success: 0, error: 'Error al subir la imagen a Cloudinary' });
  }
});





// MiddleWare to fetch user from database
const fetchuser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ errors: "Por favor, autentíquese con un token válido." });
  }
  try {
    const data = jwt.verify(token, "secret_ecom");
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ errors: "Por favor, autentíquese con un token válido." });
  }
};

// // Database Connection With MongoDB
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
// })
// .then(() => console.log("Conectado a MongoDB"))
// .catch((error) => console.error("Error al conectar a MongoDB:", error));

















// Esquema para crear el modelo Usuarios
const Users = mongoose.model("Users", {
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  cartData: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  isVerified:{
    type: Boolean,
    default: false,
  }
});

// Esquema para crear productos
const Product = mongoose.model("Product", {
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number
  },
  old_price: {
    type: Number
  },
  date: {
    type: Date,
    default: Date.now,
  },
  avilable: {
    type: Boolean,
    default: true,
  },
  stock: {
    type: Number,
    default: 0
  },
  description: {
    type: String,
    required: true
  }
});

app.get("/", (req, res) => {
  res.send("Root");
});

// Ruta para obtener todos los productos
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener productos' });
  }
});




//Create an endpoint at ip/login for login the user and giving auth-token
app.post('/login', async (req, res) => {
  console.log("Login");
  let success = false;
  let user = await Users.findOne({ email: req.body.email });
  
  if (user) {
    // Verificar si el usuario ha verificado su correo
    if (!user.isVerified) {
      return res.status(400).json({ success: success, errors: "Por favor, verifica tu correo electrónico antes de iniciar sesión." });
    }
    
    // Comparando la contraseña con la ingresada
    const passCompare = await bcrypt.compare(req.body.password, user.password);
    if (passCompare) {
      const data = {
        user: {
          id: user.id
        }
      };
      success = true;
      console.log(user.id);
      const token = jwt.sign(data, 'secret_ecom');
      res.json({ success, token });
    } else {
      return res.status(400).json({ success: success, errors: "Por favor, ingrese de nuevo su email o password." });
    }
  } else {
    return res.status(400).json({ success: success, errors: "Por favor, ingrese de nuevo su email o password." });
  }
});






//Create an endpoint at ip/auth for regestring the user in data base & sending token
app.post('/signup', async (req, res) => {
  console.log("Sign Up");
  let success = false;

  try {
    let check = await Users.findOne({ email: req.body.email });
    if (check) {
      return res.status(400).json({ success: success, errors: "Usuario existente encontrado con este correo electrónico." });
    }

    let cart = {};
    for (let i = 0; i < 300; i++) {
      cart[i] = 0;
    }

    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new Users({
      name: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      cartData: cart,
      isVerified: false, // Agrega un campo para verificar el correo
    });

    await user.save();

    // Crear un token de verificación
    const verificationToken = jwt.sign({ id: user.id }, 'verification_secret', { expiresIn: '1h' });

    // Enviar correo de verificación
    const verificationUrl = `http://localhost:${port}/verify/${verificationToken}`;
    await transporter.sendMail({
      from: 'brandon.sandoval@epn.edu.ec',
      to: user.email,
      subject: 'Verificación de correo electrónico',
      html: `<p>Por favor, verifica tu correo electrónico haciendo clic en el siguiente enlace: <a href="${verificationUrl}">Verificar correo</a></p>`,
    });

    success = true;
    // Cambiar la respuesta aquí para informar sobre el correo de verificación
    res.status(200).json({ success: success, message: "Usuario registrado. Se ha enviado un correo de verificación." });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del sistema");
  }
});




app.get('/verify/:token', async (req, res) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, 'verification_secret');
    const userId = decoded.id;

    const user = await Users.findById(userId);
    if (!user) {
      return res.status(400).json({ success: false, message: "Usuario no encontrado." });
    }

    if (user.isVerified) {
      return res.status(400).json({ success: false, message: "El usuario ya está verificado." });
    }

    user.isVerified = true;
    await user.save();

    res.json({ success: true, message: "Correo electrónico verificado correctamente." });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});





// Endpoint para iniciar el proceso de restablecimiento de contraseña
app.post('/request-reset-password', async (req, res) => {
  const { email } = req.body;
  const user = await Users.findOne({ email });
  if (!user) {
    return res.status(400).json({ success: false, errors: "El correo no está registrado" });
  }

  // Aquí normalmente enviarías un correo con un enlace para restablecer la contraseña,
  // pero como quieres evitar la complejidad, omitimos esta parte.
  
  res.json({ success: true, message: "Correo de recuperación enviado (no realmente)" });
});

// Endpoint para restablecer la contraseña
app.post('/reset-password', async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ email });
  if (!user) {
    return res.status(400).json({ success: false, errors: "El correo no está registrado" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  user.password = hashedPassword;
  await user.save();

  res.json({ success: true, message: "Contraseña restablecida con éxito" });
});



app.get('/product/:name', async (req, res) => {
  try {
    const product = await Product.findOne({ name: req.params.name });
    if (product) {
      res.json({ success: true, product });
    } else {
      res.json({ success: false, message: 'Producto no encontrado' });
    }
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ success: false, message: 'Error al buscar el producto' });
  }
});

app.put('/updateproduct', async (req, res) => {
  try {
    const { id, ...productDetails } = req.body;
    console.log("ID recibido:", id);
    console.log("Detalles del producto recibidos:", productDetails);

    const updatedProduct = await Product.findOneAndUpdate({ id }, productDetails, { new: true });

    if (updatedProduct) {
      console.log("Producto actualizado:", updatedProduct);
      res.json({ success: true, product: updatedProduct });
    } else {
      res.status(404).json({ success: false, message: 'Producto no encontrado' });
    }
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ success: false, message: 'Error al actualizar el producto' });
  }
});






app.get("/allproducts", async (req, res) => {
	let products = await Product.find({});
  console.log("All Products");
    res.send(products);
});

app.get("/newcollections", async (req, res) => {
	let products = await Product.find({});
  let arr = products.slice(1).slice(-8);
  console.log("Nuevas collecciones");
  res.send(arr);
});

app.get("/popularinpajatoquilla", async (req, res) => {
  try {
    let products = await Product.find({});
    let arr = products.splice(0, 4);
    console.log("Lo más popular en la tienda");
    res.send(arr);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ message: 'Error al obtener productos' });
  }
});

//Create an endpoint for saving the product in cart
app.post('/addtocart', fetchuser, async (req, res) => {
  console.log("Add Cart");
  try {
    const user = await Users.findById(req.user.id);
    const product = await Product.findById(req.body.productId);

    if (!product || product.stock < req.body.quantity) {
      return res.status(400).json({ success: false, message: "Stock insuficiente" });
    }

    user.cartData[req.body.productId] = (user.cartData[req.body.productId] || 0) + req.body.quantity;
    product.stock -= req.body.quantity;

    await user.save();
    await product.save();

    res.json({ success: true, message: "Producto añadido al carrito" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del sistema");
  }
});



  //Create an endpoint for saving the product in cart
  app.post('/removefromcart', fetchuser, async (req, res) => {
    console.log("Remove Cart");
    try {
      const user = await Users.findById(req.user.id);
      const product = await Product.findById(req.body.productId);
  
      if (!product || user.cartData[req.body.productId] < req.body.quantity) {
        return res.status(400).json({ success: false, message: "Cantidad en el carrito insuficiente" });
      }
  
      user.cartData[req.body.productId] -= req.body.quantity;
      product.stock += req.body.quantity;
  
      if (user.cartData[req.body.productId] <= 0) {
        delete user.cartData[req.body.productId];
      }
  
      await user.save();
      await product.save();
  
      res.json({ success: true, message: "Producto removido del carrito" });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error interno del sistema");
    }
  });
  

  //Create an endpoint for saving the product in cart
app.post('/getcart', fetchuser, async (req, res) => {
  console.log("Get Cart");
  let userData = await Users.findOne({_id:req.user.id});
  res.json(userData.cartData);

  })


app.post("/addproduct", async (req, res) => {
  let products = await Product.find({});
  let id;
  if (products.length>0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id+1;
  }
  else
  { id = 1; }
  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: parseFloat(req.body.new_price),
    old_price: parseFloat(req.body.old_price),
    stock: parseInt(req.body.stock,10),
    description: req.body.description
  });
  console.log(product);
  await product.save();
  console.log("Guardado");
  res.json({success:true,name:req.body.name})
});

app.post("/removeproduct", async (req, res) => {
  const product = await Product.findOneAndDelete({ id: req.body.id });
  console.log("Removido");
  res.json({success:true,name:req.body.name})
});















app.listen(port, (error) => {
  if (!error) console.log("Servidor corriendo en el puerto " + port);
  else console.log("Error : ", error);
});
