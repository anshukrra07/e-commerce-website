# S-E-Com Product Website

A modern e-commerce home page with auto-sliding carousel, multiple product sections, and role-based login system.

## Features

### 🎠 Auto-Sliding Carousel
- 4 promotional slides with auto-advance
- Manual navigation with arrows and dots
- Smooth transitions with gradient backgrounds
- 5-second interval auto-play

### 🛍️ Product Sections
1. **Electronics** - Headphones, Watches, Laptops, Speakers, Phones
2. **Fashion & Clothing** - Jackets, T-Shirts, Dresses, Hoodies
3. **Footwear** - Running Shoes, Sneakers, Formal Shoes, Sandals
4. **Accessories** - Wallets, Sunglasses, Backpacks, Phone Cases
5. **Home & Decor** - Lamps, Clocks, Cushions, Frames, Plants

### 👤 Login System
- **Customer Login** - Browse and shop
- **Seller Login** - Manage products
- **Admin Login** - Platform management
- Modal with tab-based role selection

### ✨ Key Features
- 🔍 Search bar in header
- 🛒 Shopping cart with item counter
- 💳 Add to cart functionality
- ⭐ Product ratings
- 💰 Pricing with discounts
- 📱 Fully responsive design
- 🎨 Modern UI with hover effects

## Quick Start

### Installation
```bash
cd frontend1
npm install
```

### Run Development Server
```bash
npm start
```

Visit: http://localhost:3000

## Project Structure

```
frontend1/
├── public/
│   └── index.html
├── src/
│   ├── pages/
│   │   └── HomePage.js       # Main home page
│   ├── styles/
│   │   └── App.css           # All styles
│   ├── App.js                # Root component
│   └── index.js              # Entry point
├── package.json
└── README.md
```

## Features in Detail

### Carousel
- Auto-advances every 5 seconds
- 4 promotional slides with different gradients
- Left/Right arrow navigation
- Dot indicators for current slide
- Click on dots to jump to specific slide

### Product Cards
Each product displays:
- Large emoji icon
- Category label
- Product name
- Star rating
- Current price & original price (strikethrough)
- "Add to Cart" button with hover effect

### Login Modal
- Appears when clicking "Login" button
- Three tabs: Customer, Seller, Admin
- Email and password fields
- Submit button changes text based on selected role
- Click outside modal to close

### Cart System
- Cart icon in header shows item count
- Counter badge appears when items added
- Alert notification on add to cart

## Customization

### Change Product Data
Edit the product arrays in `HomePage.js`:
```javascript
const electronics = [
  { id: 1, name: 'Product Name', price: 2999, original: 4999, rating: 4.5, emoji: '🎧' }
];
```

### Modify Carousel Slides
Update the `slides` array:
```javascript
const slides = [
  {
    title: 'Your Title',
    description: 'Your Description',
    bg: 'linear-gradient(...)',
  }
];
```

### Change Colors
Edit CSS variables in `App.css`:
```css
:root {
  --primary: #4f46e5;
  --secondary: #06b6d4;
  /* ... */
}
```

## Responsive Design

- **Desktop**: Full grid layout (4-5 columns)
- **Tablet**: 3 columns, adjusted spacing
- **Mobile**: 2 columns, stacked carousel

Breakpoints:
- 768px: Tablet adjustments
- 480px: Mobile optimizations

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Pure React (no heavy libraries)
- CSS-only animations
- Optimized for fast loading
- Responsive images with emojis

## Future Enhancements

- [ ] Backend API integration
- [ ] Real product images
- [ ] Filter and sort functionality
- [ ] Product detail pages
- [ ] Actual cart functionality
- [ ] Payment integration
- [ ] User authentication
- [ ] Wishlist feature
- [ ] Product reviews
- [ ] Order tracking

## Tech Stack

- **React 18** - UI library
- **Vanilla CSS** - Styling
- **React Hooks** - State management
- **ES6+** - Modern JavaScript

## License

MIT License - Free to use and modify

---

**Built with ❤️ for modern e-commerce**
