# E-Key Market – Frontend

Marketplace e-commerce moderne développée avec Vue 3, Vite et Tailwind CSS.

## Fonctionnalités principales

- Parcours d’achat complet : catalogue, panier, tunnel de commande (checkout)
- Authentification : inscription, connexion, mot de passe oublié/réinitialisation, confirmation email
- Tableau de bord utilisateur : commandes récentes, recommandations, points fidélité
- Historique des commandes : suivi en temps réel, détails, tracking
- Gestion du profil : infos personnelles, adresses, préférences
- Wishlist : favoris, alertes de prix, ajout au panier
- Programme de fidélité : points, badges, récompenses
- Responsive design (desktop/mobile), UI moderne, accessibilité

## Structure du projet

```
src/
  assets/         # Images, icônes, styles
  components/     # Layout, UI partagées
  stores/         # Pinia stores (cart, products, etc.)
  views/
    auth/         # Pages Auth (login, register, confirm, reset)
    user/         # Dashboard, commandes, profil, wishlist, fidélité
    ...           # Home, catégories, produits, panier, checkout
  router/         # Vue Router config
  main.js         # Entrée app
```

## Stack technique

- [Vue 3](https://vuejs.org/) + [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/) (UI responsive)
- [Pinia](https://pinia.vuejs.org/) (state management)
- [Vue Router](https://router.vuejs.org/)
- [FontAwesome](https://fontawesome.com/) + Material Icons

## Installation

```sh
npm install
```

### Lancer le projet en développement

```sh
npm run dev
```

### Build production

```sh
npm run build
```

### Lint

```sh
npm run lint
```

## Liens utiles

- [Documentation Vue 3](https://vuejs.org/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vite](https://vitejs.dev/guide/)

---

Projet réalisé pour E-Key Market – 2024.
