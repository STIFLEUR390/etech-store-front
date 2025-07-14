import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [], // {id, name, image, price, quantity}
    promoCode: '',
    promoValid: false,
    promoError: '',
    delivery: 'home', // 'home' ou 'pickup'
    deliveryFee: 2500,
    vatRate: 0.1925,
  }),
  getters: {
    subtotal(state) {
      return state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    },
    vat(state) {
      return Math.round(this.subtotal * state.vatRate)
    },
    total(state) {
      return (
        this.subtotal + this.vat + (state.items.length ? state.deliveryFee : 0) - this.promoDiscount
      )
    },
    promoDiscount(state) {
      // Exemple : -10% si code "EKEY10" valide
      if (state.promoValid && state.promoCode.toUpperCase() === 'EKEY10') {
        return Math.round(this.subtotal * 0.1)
      }
      return 0
    },
    itemCount(state) {
      return state.items.reduce((sum, item) => sum + item.quantity, 0)
    },
  },
  actions: {
    addToCart(product, qty = 1) {
      const found = this.items.find((i) => i.id === product.id)
      if (found) {
        found.quantity += qty
      } else {
        this.items.push({ ...product, quantity: qty })
      }
    },
    removeFromCart(id) {
      this.items = this.items.filter((i) => i.id !== id)
    },
    updateQuantity(id, qty) {
      const item = this.items.find((i) => i.id === id)
      if (item && qty > 0) item.quantity = qty
    },
    setPromoCode(code) {
      this.promoCode = code
      // Validation simple : code "EKEY10" valide
      if (!code) {
        this.promoValid = false
        this.promoError = ''
      } else if (code.toUpperCase() === 'EKEY10') {
        this.promoValid = true
        this.promoError = ''
      } else {
        this.promoValid = false
        this.promoError = 'Code promo invalide'
      }
    },
    setDelivery(option) {
      this.delivery = option
    },
    clearCart() {
      this.items = []
      this.promoCode = ''
      this.promoValid = false
      this.promoError = ''
      this.delivery = 'home'
    },
  },
})
