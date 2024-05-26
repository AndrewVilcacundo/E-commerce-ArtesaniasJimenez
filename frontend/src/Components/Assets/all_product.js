import p1_img from "./cesta.jpg";
import p2_img from "./cesta1.jpg";
import p3_img from "./cesto.jpg";
import p4_img from "./cesto1.jpg";
import p5_img from "./bolsos.jpg"
import p6_img from "./bolsos1.jpg"
import p7_img from "./bolsos2.jpg"
import p8_img from "./bolsos3.jpg"
import p9_img from "./bolsos4.jpg"
import p10_img from "./bolsos5.jpg"
import p11_img from "./canastao.jpg"
import p12_img from "./canastao1.jpg"
import p13_img from "./canastasminis.jpg"
import p14_img from "./canastasminis1.jpg"
import p15_img from "./canastasminis3.jpg"
import p16_img from "./canastasminis4.jpg"
import p17_img from "./canasto.jpg"
import p18_img from "./canasto1.jpg"
import p19_img from "./cubierteros.jpg"
import p20_img from "./cubierteros1.jpg"
import p21_img from "./desayunador.jpg"
import p22_img from "./desayunador1.jpg"
import p23_img from "./individuales.jpg"
import p24_img from "./individuales1.jpg"
import p25_img from "./individuales2.jpg"
import p26_img from "./individuales3.jpg"
import p27_img from "./individuales4.jpg"
import p28_img from "./individuales5.jpg"
import p29_img from "./individuales6.jpg"
import p30_img from "./individuales7.jpg"
import p31_img from "./individuales8.jpg"

let allproducts = [
  {
    id: 1,
    name: "Cesta rectangular en fibra",
    category: "women",
    image: p1_img,
    new_price: 10.0,
  },
  {
    id: 2,
    name: "Cesta rectangular en fibra",
    category: "women",
    image: p2_img,
    new_price: 10.0,
    old_price: 8.50,
  },
  {
    id: 3,
    name: "Cesto de pajatoquilla con tapa, multiusos",
    category: "women",
    image: p3_img,
    new_price: 12,
  },
  {
    id: 4,
    name: "Cesto de pajatoquilla con tapa, multiusos",
    category: "women",
    image: p4_img,
    new_price: 12
  },
  {
    id: 5,
    name: "Bolsos tejidos en paja toquilla",
    category: "women",
    image: p5_img,
    new_price: 45,
    old_price: 50,
  },
  {
    id: 6,
    name: "Bolsos tejidos en paja toquilla",
    category: "women",
    image: p6_img,
    new_price: 45,
    old_price: 50,
  },
  {
    id: 7,
    name: "Bolsos tejidos en paja toquilla",
    category: "women",
    image: p7_img,
    new_price: 45,
    old_price: 50,
  },
  {
    id: 8,
    name: "Bolsos tejidos en paja toquilla",
    category: "women",
    image: p8_img,
    new_price: 45,
    old_price: 50,
  },
  {
    id: 9,
    name: "Bolsos tejidos en paja toquilla",
    category: "women",
    image: p9_img,
    new_price: 45,
    old_price: 50,
  },
  {
    id: 10,
    name: "Bolsos tejidos en paja toquilla",
    category: "women",
    image: p10_img,
    new_price: 45,
    old_price: 50,
  },
  {
    id: 11,
    name: "Canasta ovalada grande tejida en pajatoquilla",
    category: "women",
    image: p11_img,
    new_price: 5
  },
  {
    id: 12,
    name: "Canasta ovalada grande tejida en pajatoquilla",
    category: "women",
    image: p12_img,
    new_price: 5
  },
  {
    id: 13,
    name: "Canastas pequeñas con tapa tejidas en pajatoquilla",
    category: "women",
    image: p13_img,
    new_price: 1.50
  },
  {
    id: 14,
    name: "Canastas pequeñas con tapa tejidas en pajatoquilla",
    category: "women",
    image: p14_img,
    new_price: 1.50
  },
  {
    id: 15,
    name: "Canastas pequeñas con tapa en varios colores, tejidas en pajatoquilla",
    category: "women",
    image: p15_img,
    new_price: 1.50
  },
  {
    id: 16,
    name: "Canastas pequeñas con tapa en varios colores, tejidas en pajatoquilla",
    category: "women",
    image: p16_img,
    new_price: 1.50
  },
  {
    id: 17,
    name: "Canasto tejido en pajatoquilla",
    category: "women",
    image: p17_img,
    new_price: 1.50
  },
  {
    id: 18,
    name: "Canasto tejido en pajatoquilla",
    category: "women",
    image: p18_img,
    new_price: 12
  },
  {
    id: 19,
    name: "Cubierteros tejidos en pajatoquilla",
    category: "women",
    image: p19_img,
    new_price: 5
  },
  {
    id: 20,
    name: "Cubierteros tejidos en pajatoquilla",
    category: "women",
    image: p20_img,
    new_price: 5
  },
  {
    id: 21,
    name: "Desayunador con agarraderas de cabuya",
    category: "men",
    image: p21_img,
    new_price: 85.0,
    old_price: 120.5,
  },
  {
    id: 22,
    name: "Desayunador con agarraderas de cabuya",
    category: "men",
    image: p22_img,
    new_price: 15,
  },
  {
    id: 23,
    name: "Hermosos individuales elaborados a mano en fibra de totora",
    category: "men",
    image: p23_img,
    new_price: 15
  },
  {
    id: 24,
    name: "Hermosos individuales elaborados a mano en fibra de totora",
    category: "men",
    image: p24_img,
    new_price: 3.50,
    old_price: 4.50,
  },
  {
    id: 25,
    name: "Hermosos individuales elaborados a mano en fibra de totora",
    category: "men",
    image: p25_img,
    new_price: 3.50,
    old_price: 4.50,
  },
  {
    id: 26,
    name: "Hermosos individuales elaborados a mano en fibra de totora",
    category: "men",
    image: p26_img,
    new_price: 3.50,
    old_price: 4.50,
  },
  {
    id: 27,
    name: "Hermosos individuales elaborados a mano en fibra de totora",
    category: "men",
    image: p27_img,
    new_price: 3.50,
    old_price: 4.50
  },
  {
    id: 28,
    name: "Hermosos individuales elaborados a mano en fibra de totora",
    category: "men",
    image: p28_img,
    new_price: 3.50,
    old_price: 4.50,
  },
  {
    id: 29,
    name: "Hermosos individuales elaborados a mano en fibra de totora",
    category: "men",
    image: p29_img,
    new_price: 3.50,
    old_price: 4.50,
  },
  {
    id: 30,
    name: "Hermosos individuales elaborados a mano en fibra de totora",
    category: "men",
    image: p30_img,
    new_price: 3.50,
    old_price: 4.50,
  },
  {
    id: 31,
    name: "Hermosos individuales elaborados a mano en fibra de totora",
    category: "men",
    image: p31_img,
    new_price: 4.50
  },

];

export default allproducts;
