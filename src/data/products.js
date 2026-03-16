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

function generateProducts(category, images, startId, itemList) {
  return itemList.map((item, idx) => ({
    id: startId + idx,
    title: item.title,
    description: item.description,
    price: item.price,
    category,
    image: images[idx % images.length],
    rating: item.rating
  }))
}

const electronicsProducts = [
  { title: 'Noise Cancelling Headphones', description: 'Wireless over-ear headphones with active noise cancellation and 30 hours battery.', price: 8999, rating: { rate: 4.7, count: 190 } },
  { title: 'Smart LED TV 43"', description: 'Full HD smart TV with built-in streaming apps and Dolby digital.', price: 25999, rating: { rate: 4.5, count: 132 } },
  { title: 'Bluetooth Portable Speaker', description: 'Waterproof speaker with 12-hour playtime and deep bass.', price: 3499, rating: { rate: 4.4, count: 88 } },
  { title: 'Fitness Tracker Band', description: 'Fitness tracker with heart rate monitor and sleep analysis.', price: 1999, rating: { rate: 4.3, count: 110 } },
  { title: 'Smartphone Pro 2026', description: '6.5" display, 128GB storage, triple camera, 5G.', price: 34999, rating: { rate: 4.6, count: 225 } }
]

const jeweleryProducts = [
  { title: 'Gold Hoop Earrings', description: '14k gold plated hoop earrings for everyday style.', price: 1799, rating: { rate: 4.8, count: 105 } },
  { title: 'Silver Necklace Set', description: 'Sterling silver necklace set with adjustable length.', price: 2599, rating: { rate: 4.4, count: 64 } },
  { title: 'Diamond Stud Earrings', description: 'Classic diamond stud earrings with secure backs.', price: 12999, rating: { rate: 4.9, count: 53 } },
  { title: 'Pearl Bracelet', description: 'Freshwater pearl bracelet with gold-tone clasp.', price: 3299, rating: { rate: 4.2, count: 41 } },
  { title: 'Vintage Pendant Necklace', description: 'Antique-style pendant with filigree design.', price: 2199, rating: { rate: 4.5, count: 77 } }
]

const menProducts = [
  { title: "Men's Denim Jacket", description: 'Classic fit denim jacket with button closure.', price: 3199, rating: { rate: 4.1, count: 63 } },
  { title: "Men's Casual Cotton Shirt", description: 'Breathable everyday wear shirt.', price: 1499, rating: { rate: 4.0, count: 90 } },
  { title: "Men's Slim Chinos", description: 'Stretch slim-fit chinos with comfort waistband.', price: 2199, rating: { rate: 4.3, count: 72 } },
  { title: "Men's Running Sneakers", description: 'Lightweight sneakers with cushioned soles.', price: 2799, rating: { rate: 4.4, count: 108 } },
  { title: "Men's Leather Belt", description: 'Genuine leather belt with metal buckle.', price: 999, rating: { rate: 4.2, count: 49 } }
]

const womenProducts = [
  { title: "Women's Summer Dress", description: 'Floral midi dress with breathable fabric.', price: 2599, rating: { rate: 4.6, count: 140 } },
  { title: "Women's Satin Blouse", description: 'Satin blouse with button-up front and cuff sleeves.', price: 1899, rating: { rate: 4.3, count: 85 } },
  { title: "Women's Maxi Skirt", description: 'Bohemian maxi skirt with elastic waist.', price: 1599, rating: { rate: 4.1, count: 59 } },
  { title: "Women's Cardigan", description: 'Knit cardigan with relaxed fit and button front.', price: 1799, rating: { rate: 4.5, count: 77 } },
  { title: "Women's Canvas Tote Bag", description: 'Spacious tote bag with zipper closure.', price: 1299, rating: { rate: 4.4, count: 98 } }
]

const groceryProducts = [
  { title: 'Organic Apples (1kg)', description: 'Fresh organic apples with crisp flavor.', price: 249, rating: { rate: 4.7, count: 111 } },
  { title: 'Premium Almonds (500g)', description: 'Roasted premium almonds.', price: 599, rating: { rate: 4.8, count: 73 } },
  { title: 'Extra Virgin Olive Oil (750ml)', description: 'Cold-pressed olive oil.', price: 1199, rating: { rate: 4.6, count: 96 } },
  { title: 'Whole Wheat Pasta (500g)', description: 'High-fiber whole wheat pasta.', price: 179, rating: { rate: 4.5, count: 45 } },
  { title: 'Herbal Green Tea (100 bags)', description: 'Antioxidant-rich green tea bags.', price: 299, rating: { rate: 4.2, count: 67 } }
]

const categoryData = {
  electronics: {
    label: 'Electronics',
    images: electronicsImages,
    base: electronicsProducts,
    price: { min: 1500, max: 45000 },
    nouns: ['Headphones', 'Smartwatch', 'Bluetooth Speaker', 'Gaming Mouse', 'Wireless Charger', 'Tablet', 'Laptop Sleeve']
  },
  jewelery: {
    label: 'Jewelery',
    images: jeweleryImages,
    base: jeweleryProducts,
    price: { min: 1200, max: 18000 },
    nouns: ['Pendant', 'Charm Bracelet', 'Hoop Earrings', 'Stack Ring', 'Pearl Necklace', 'Bangle Set']
  },
  "men's clothing": {
    label: "Men's Clothing",
    images: mensImages,
    base: menProducts,
    price: { min: 799, max: 7999 },
    nouns: ['Denim Jacket', 'Cotton Shirt', 'Chinos', 'Sneakers', 'Leather Belt', 'Hoodie', 'Running Tee']
  },
  "women's clothing": {
    label: "Women's Clothing",
    images: womensImages,
    base: womenProducts,
    price: { min: 899, max: 8999 },
    nouns: ['Summer Dress', 'Satin Blouse', 'Maxi Skirt', 'Cardigan', 'Tote Bag', 'Heels', 'Kurti']
  },
  grocery: {
    label: 'Grocery',
    images: groceryImages,
    base: groceryProducts,
    price: { min: 99, max: 1999 },
    nouns: ['Organic Rice', 'Cold Pressed Oil', 'Almonds', 'Green Tea', 'Protein Oats', 'Spice Mix']
  }
}

const adjectives = [
  'Aurora', 'Prime', 'Nova', 'Luxe', 'Zen', 'Pulse', 'Vertex', 'Nimbus', 'Terra', 'Apex',
  'Halo', 'Metro', 'Echo', 'Sol', 'Vivid', 'Glide', 'Sage', 'Cobalt', 'Amber', 'Quartz'
]

const materials = ['alloy', 'cotton', 'leather', 'steel', 'silk', 'wood', 'ceramic', 'polyester']
const features = [
  'durable build', 'premium finish', 'lightweight feel', 'all-day comfort',
  'sleek design', 'enhanced performance', 'eco-friendly materials', 'limited edition detailing'
]

const buildInitialProducts = () => {
  let startId = 1
  const all = []
  Object.entries(categoryData).forEach(([category, data]) => {
    const list = generateProducts(category, data.images, startId, data.base)
    all.push(...list)
    startId += data.base.length
  })
  return { products: all, nextId: startId }
}

const { products, nextId: initialNextId } = buildInitialProducts()

export const createProductFactory = () => {
  const categoryKeys = Object.keys(categoryData)
  let nextId = initialNextId
  const counters = Object.fromEntries(categoryKeys.map(key => [key, 0]))

  const pick = (list, seed) => list[seed % list.length]

  return (count = 20) => {
    const batch = []
    for (let i = 0; i < count; i += 1) {
      const category = categoryKeys[nextId % categoryKeys.length]
      const data = categoryData[category]
      const idx = counters[category]
      counters[category] += 1

      const adjective = pick(adjectives, nextId + idx)
      const noun = pick(data.nouns, nextId + idx * 3)
      const sku = `SZ-${nextId.toString().padStart(6, '0')}`
      const price = Math.floor(
        data.price.min + Math.random() * (data.price.max - data.price.min)
      )
      const rating = {
        rate: (Math.random() * 1.8 + 3.2).toFixed(1),
        count: Math.floor(Math.random() * 500) + 50
      }

      batch.push({
        id: nextId,
        title: `${adjective} ${noun} ${data.label} ${idx + 1}`,
        description: `A ${pick(materials, nextId)} ${data.label.toLowerCase()} item with ${pick(features, nextId + 2)}. SKU ${sku}.`,
        price,
        category,
        image: data.images[(nextId + idx) % data.images.length],
        rating
      })

      nextId += 1
    }
    return batch
  }
}

export default products
