const electronicsImages = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_BWZWXjAZxddByC2Oob1GQoRjDcAwbPrhdQ&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy854dDjfum-bZbC6OxDiVzZHG7_4mIwUiWA&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ8CcS0oM6cKsp7RhLUyuNxjsobunvUeBiSw&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSN2w3FITtihEsUyD3NW_bosrq7ixOGV_tJaQ&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9w9vq01wbhcK5iJYklQdWBPVDhYiliXWzvg&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmPXfeDt5hJmrEqteqyEK7xxJLaBb9CvmoHg&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW1yhlTpkCnujnhzP-xioiy9RdDQkKLMnMSg&s",
  "https://5.imimg.com/data5/VW/WV/MY-61397565/headphone-blue_1.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_PMYOAavmiNDnfCcf9b6a6OS-rfbnPxRc6w&s",
  "https://pickurneeds.in/cdn/shop/files/T-40White1.3.jpg?v=1727266386",
  "https://cdn.shopify.com/s/files/1/0057/8938/4802/files/Rockerz_650_pp_renders_main_banner.124.png?v=1740735495",
  "https://cdns3.thecosmicbyte.com/wp-content/uploads/white-bg-2.jpg.webp"
]

const jeweleryImages = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv_8JowppLF97vqlx9oPEmYlgawR8Fr5JPVg&s",
  "https://t3.ftcdn.net/jpg/05/64/35/80/360_F_564358021_KBRaemBSj9FGjZlupRQsloTJIMo1MATC.jpg",
  "https://kymee.in/cdn/shop/files/KRD0025.1748copy.webp?v=1755773453",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxD5xgpnPvd7G2e5r401_ba2f4yUaW4iV0Zw&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBTILtpu3gwpFw-XIpGbe1toY_txL8wqgA0w&s",
  
]

const mensImages = [
  "https://assets.myntassets.com/dpr_1.5,q_30,w_400,c_limit,fl_progressive/assets/images/2025/APRIL/24/tjlztGaF_822d160dea33450c94a27cc17dfdaf4c.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo25_fJZPj-gTaYWZUCxw2SXRLzXeTrLHzMQ&s",
  "https://contents.mediadecathlon.com/p3060366/216d0d014f2dda791881f55ac4d18af8/p3060366.jpg",
  "https://m.media-amazon.com/images/I/41Yu6oKmziL._SX679_.jpg",
]


const womensImages = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCnWTrHrlFEhKraI9saGeuJJ_uPNWm-1BEGg&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn_8IWhFUgfipt7mw2Fp7OKWv_d-U10uQsPw&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA1uHomUxbKQ3xwJUpEdPg2cuQ0W1ldNe1-Q&s",
  "https://www.vogpap.com/cdn/shop/files/vogpap-graccy-tipstops-women-midi-dress-aline-kurti-201_e0d01756-8ea3-4a2f-9d39-7115587847da.jpg?v=1753201582",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQsWQupPClfOUgNQO0LTBm0cGhnpFddqF88w&s",
  "https://4.imimg.com/data4/WN/PV/ANDROID-63403802/product.jpeg"
]

const groceryImages = [
 "https://5.imimg.com/data5/SELLER/Default/2021/9/YP/XC/AS/22640664/potato-aalu.jpg",
 "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4B1deHAc7g4lYllR1b9gbXVy1oHz_vSw7bA&s",
 "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoIJjbXvJZeiMDlC1KQpUEgsKXLs8V91bRhg&s",
 "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHnUzdV-BLuKGHUNWLPkkZuxmyI-uRg6A7nw&s"
]

function generateProducts(category, images, startId) {
  return Array.from({ length: 25 }, (_, i) => ({
    id: startId + i,
    title: `${category} Product ${i + 1}`,
    description: `Premium quality ${category} item designed for everyday use.`,
    price: Math.floor(Math.random() * 20000) + 1000,
    category,
    image: images[i % images.length],
    rating: {
      rate: (Math.random() * 2 + 3).toFixed(1),
      count: Math.floor(Math.random() * 500) + 50
    }
  }))
}

const products = [
  ...generateProducts("electronics", electronicsImages, 1),
  ...generateProducts("jewelery", jeweleryImages, 26),
  ...generateProducts("men's clothing", mensImages, 51),
  ...generateProducts("women's clothing", womensImages, 76),
  ...generateProducts("grocery", groceryImages, 101)
]

export default products
