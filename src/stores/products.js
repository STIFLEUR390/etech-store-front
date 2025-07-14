import { defineStore } from 'pinia'

export const useProductsStore = defineStore('products', {
  state: () => ({
    categories: [
      { id: 1, name: 'Électronique', icon: 'fas fa-tv', color: '#0071BC' },
      { id: 2, name: 'Mode', icon: 'fas fa-tshirt', color: '#009966' },
      { id: 3, name: 'Maison', icon: 'fas fa-couch', color: '#F4A300' },
      { id: 4, name: 'Beauté', icon: 'fas fa-magic', color: '#E91E63' },
      { id: 5, name: 'Sport', icon: 'fas fa-basketball-ball', color: '#4CAF50' },
    ],
    brands: [
      'Samsung',
      'Apple',
      'Tecno',
      'Infinix',
      'Nokia',
      'Xiaomi',
      'Oppo',
      'Sony',
      'LG',
      'HP',
      'Dell',
      'Adidas',
      'Nike',
      'Puma',
      'Reebok',
      'Canon',
      'Philips',
      'Bose',
      'JBL',
      'GoPro',
    ],
    products: [],
  }),
  getters: {
    getCategories: (state) => state.categories,
    getBrands: (state) => state.brands,
    getProducts: (state) => state.products,
    getProductById: (state) => (id) => state.products.find((p) => p.id === Number(id)),
  },
  actions: {
    generateProducts() {
      if (this.products.length) return
      const names = [
        'Samsung Galaxy S22 Ultra',
        'iPhone 14 Pro Max',
        'Tecno Camon 19 Pro',
        'Infinix Note 12 VIP',
        'Nokia G21',
        'Redmi Note 12 Pro',
        'Itel S23+',
        'Oppo Reno 8',
        'Sony Bravia 4K',
        'LG OLED TV',
        'HP Pavilion 15',
        'Dell XPS 13',
        'Adidas Ultraboost',
        'Nike Air Max',
        'Puma RS-X',
        'Apple Watch Series 8',
        'Samsung Galaxy Buds',
        'Xiaomi Mi Band 7',
        'Canon EOS 250D',
        'GoPro Hero 11',
        'Dyson V11',
        'Philips Airfryer',
        'Bose QC45',
        'JBL Flip 6',
        'PlayStation 5',
        'Xbox Series X',
        'Nintendo Switch',
        'Fitbit Versa 4',
        'Huawei MateBook D15',
        'Lenovo ThinkPad X1',
        'Lisseur GHD',
        'Sèche-cheveux Dyson',
        'Parfum Dior Sauvage',
        'Crème Nivea',
        'Tapis Yoga Reebok',
        'Ballon Adidas',
        'Vélo Decathlon',
        'Tente Quechua',
        'Table basse Ikea',
        'Canapé Maisons du Monde',
        'Lampe Philips Hue',
        'Aspirateur Rowenta',
        'Montre Fossil',
        'Sac à dos Eastpak',
        'Lunettes Ray-Ban',
        'Baskets Converse',
      ]
      const descs = [
        'Le smartphone idéal pour la photo et la performance.',
        "L'ordinateur portable parfait pour le travail et le divertissement.",
        'Des baskets confortables pour le sport et la ville.',
        'Un accessoire tendance pour tous les styles.',
        "L'électroménager malin pour la maison.",
        'Un son immersif pour vos musiques préférées.',
        'La montre connectée pour suivre votre activité.',
        'Un objet design et pratique au quotidien.',
        'La meilleure expérience gaming à la maison.',
        'Un produit fiable et garanti 2 ans.',
      ]
      for (let i = 0; i < 45; i++) {
        const name = names[i % names.length]
        const brand = this.brands[i % this.brands.length]
        const category = this.categories[i % this.categories.length].name
        const price = Math.floor(Math.random() * 700000) + 10000
        const oldPrice = Math.random() > 0.7 ? price + Math.floor(Math.random() * 50000) : undefined
        const rating = Math.round((Math.random() * 2 + 3) * 2) / 2
        const reviews = Math.floor(Math.random() * 400) + 10
        const inStock = Math.random() > 0.15
        const description = descs[i % descs.length]
        this.products.push({
          id: i + 1,
          name,
          brand,
          category,
          price,
          oldPrice,
          rating,
          reviews,
          inStock,
          image: `https://placehold.co/300x200/${['0071BC', '009966', 'F4A300', 'E91E63', '4CAF50'][i % 5]}/fff?text=${encodeURIComponent(name)}`,
          description,
        })
      }
    },
  },
})
