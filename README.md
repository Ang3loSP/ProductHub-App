# ProductHub - Premium Product Showcase

A modern, feature-rich product showcase website with a sleek design, dark mode support, and interactive user features.

## 🌟 Live Demo

[View the website](#) *(Open `Index.html` in your browser)*

## 📋 Overview

ProductHub is a fully responsive e-commerce style product showcase website that demonstrates modern front-end development practices. It features a product catalog with search, filtering, wishlist functionality, contact form, and user registration modal.

## ✨ Features

### Core Features
- **Product Catalog** - Grid/List view toggle with 8 sample products
- **Search & Filter** - Search by product name or category, filter by product category
- **Wishlist System** - Add/remove products to wishlist with localStorage persistence
- **Dark/Light Mode** - Theme toggle with system preference detection
- **Responsive Design** - Mobile-first approach with hamburger menu on smaller screens

### Enhanced Features
- **Glassmorphism Hero Section** - Animated gradient background with blur effect
- **Registration Modal** - Smooth popup form with validation
- **Toast Notifications** - User feedback for actions (wishlist, registration)
- **Product Badges** - Sale, New, and Bestseller indicators
- **Discount Display** - Percentage off badges for sale items
- **Smooth Animations** - Hover effects, transitions, and micro-interactions

## 🛠️ Technologies Used

| Technology | Purpose |
|------------|---------|
| HTML5 | Semantic document structure |
| CSS3 | Custom styling, animations, responsive layout |
| JavaScript (ES6+) | Dynamic functionality, state management |
| Google Fonts | Playfair Display & Inter fonts |
| LocalStorage | Persistent wishlist & theme preferences |

## 📁 Project Structure

ProductHub/
├── Index.html # Main HTML document
├── Styles.css # Complete styling with dark mode
├── Script.js # All JavaScript functionality
├── README.md # Project documentation
└── assets/ # Product images (referenced in productsData)


## 🚀 Getting Started

### Prerequisites
- Any modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional - works directly via file protocol)

### Installation

1. **Clone or download** the project files to your local machine
2. **Image Assets Note**: The website expects product images in an `assets/` folder. The current implementation uses placeholder image paths. To display actual images:

assets/
├── wireless-headphones.jpg
├── smart-watch.jpg
├── laptop-backpack.jpg
├── coffee-maker.jpg
├── running-shoes.jpg
├── desk-lamp.jpg
├── water-bottle.jpg
└── bluetooth-speaker.jpg


3. **Open the website**:
- Double-click `Index.html` OR
- Use a local development server (e.g., Live Server in VS Code)

## 🎮 Usage Guide

### Product Navigation
- **Search**: Type product name or category in search bar → Click "Search" or press Enter
- **Filter**: Select category from dropdown to filter products
- **View Toggle**: Switch between Grid (⊞) and List (☰) views

### Wishlist (❤️)
- Click heart icon on any product card to add to wishlist
- Access wishlist section below products to view saved items
- Remove items using the ✕ button in wishlist

### Registration (✨)
- Click "Register" button in navigation menu
- Fill in Name, Email, and Password
- Form validates email format and required fields

### Dark Mode (🌙/☀️)
- Click theme toggle button in header
- Preference saved to localStorage

### Contact Form
- Fill in all required fields (Name, Email, Message)
- Valid email format required
- Displays confirmation message on successful submission

## 📱 Responsive Breakpoints

| Breakpoint | Behavior |
|------------|----------|
| > 767px | Full desktop layout with horizontal navigation |
| ≤ 767px | Hamburger menu, stacked controls, adjusted typography |
| ≤ 480px | Single column grids, smaller hero text |

## 🎨 Design Highlights

- **Color Scheme**: Blue/purple gradient primary with warm accent gradient
- **Typography**: Playfair Display for headings, Inter for body text
- **Effects**: Glassmorphism, hover scaling, shine animations, heartbeat on favourite
- **Dark Mode**: Comprehensive dark theme with adjusted shadows and borders

## 📝 Form Validation

### Registration Form
- All fields required
- Valid email format (regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`)

### Contact Form
- All fields required
- Valid email format
- Success message with user name and email confirmation

## 💾 LocalStorage Keys

| Key | Purpose | Data Type |
|-----|---------|-----------|
| `favourites` | Saved wishlist product IDs | Array of numbers |
| `theme` | Dark/light mode preference | `"dark"` or `"light"` |
| `viewPreference` | Grid/list view mode | `"grid"` or `"list"` |

## 🔧 Customization

### Adding New Products
Edit the `productsData` array in `Script.js`:

```javascript
{
id: 9,
name: "Product Name",
price: 99.99,
originalPrice: 129.99,  // Optional, null if no discount
category: "electronics",  // Options: electronics, accessories, home, clothing
image: "assets/product-image.jpg",
description: "Product description",
badge: "New"  // Optional: "Sale", "New", "Bestseller", or null
}

Modifying Categories
Update the productsData category values

Update the <select> options in HTML:

<option value="new-category">New Category</option>

🌐 Browser Support
Chrome (latest)

Firefox (latest)

Safari (latest)

Edge (latest)

Opera (latest)

⚠️ Known Limitations
Product images are currently placeholder paths - actual images required

Registration is frontend-only (no backend integration)

Contact form does not send actual emails (demo purposes)

🔜 Future Enhancements
Backend integration for user authentication

Product rating system

Shopping cart functionality

Email delivery for contact form

Pagination for product listing

Product comparison feature

📄 License
This project is for educational/demonstration purposes.
