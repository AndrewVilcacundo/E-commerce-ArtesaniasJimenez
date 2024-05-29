import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import cors from 'cors';
import bcrypt from 'bcrypt'; 
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

const port = 4000;
const app = express();



dotenv.config();
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















// Database Connection With MongoDB
<<<<<<< HEAD
mongoose.connect("mongodb+srv://sandovalbrandon1027:PvQEAZBx8F2aJyLU@cluster0.ixeawgw.mongodb.net/e-comerce");
=======
mongoose.connect("mongodb+srv://andrewmateo1503:kZujIsqjNPeRFbBX@cluster1.u8fdtxz.mongodb.net/tesis2");
>>>>>>> 8a71746afb459f71fbe4b00258e1152bc0194a6b
// paste your mongoDB Connection string above with password
// password should not contain '@' special character

//Image Storage Engine 
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
      console.log(file);
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload = multer({storage: storage})
app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:4000/images/${req.file.filename}`
    })
})
app.use('/images', express.static('upload/images'));

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


// Schema for creating user model
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

// Schema for creating Product
const Product = mongoose.model("Product", {
  id: {
    type: Number,
    required: true,
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
});

app.get("/", (req, res) => {
  res.send("Root");
});

//Create an endpoint at ip/login for login the user and giving auth-token
app.post('/login', async (req, res) => {
  console.log("Login");
    let success = false;
    let user = await Users.findOne({ email: req.body.email });
    if (user) {
      //comparando la contraseña con la ingrese primeramente
        const passCompare = await bcrypt.compare(req.body.password, user.password)
        if (passCompare) {
            const data = {
                user: {
                    id: user.id
                }
            }
			success = true;
      console.log(user.id);
			const token = jwt.sign(data, 'secret_ecom');
			res.json({ success, token });
        }
        else {
            return res.status(400).json({success: success, errors: "por favor ingrese de nuevo su email o password"})
        }
    }
    else {
        return res.status(400).json({success: success, errors: "por favor ingrese de nuevo su email o password"})
    }
})




//Create an endpoint at ip/auth for regestring the user in data base & sending token
app.post('/signup', async (req, res) => {
  console.log("Sign Up");
  let success = false;

  try {
    let check = await Users.findOne({ email: req.body.email });
    if (check) {
      return res.status(400).json({ success: success, errors: "Usuario existente encontrada con este correo electrónico" });
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
    res.json({ success, message: "Usuario registrado. Por favor, verifica tu correo electrónico." });
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
	let products = await Product.find({});
  let arr = products.splice(0,  4);
  console.log("Lo más popular en la tienda");
  res.send(arr);
});

//Create an endpoint for saving the product in cart
app.post('/addtocart', fetchuser, async (req, res) => {
	console.log("Add Cart");
    let userData = await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({_id:req.user.id}, {cartData:userData.cartData});
    res.send("Añadido")
  })

  //Create an endpoint for saving the product in cart
app.post('/removefromcart', fetchuser, async (req, res) => {
	console.log("Remove Cart");
    let userData = await Users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId]!=0)
    {
      userData.cartData[req.body.itemId] -= 1;
    }
    await Users.findOneAndUpdate({_id:req.user.id}, {cartData:userData.cartData});
    res.send("Removido");
  })

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
    new_price: req.body.new_price,
    old_price: req.body.old_price,
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
