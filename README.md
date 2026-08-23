# FreshCart 🛒

A full-stack grocery shopping mobile application built with **React Native and Expo**, with a **Node.js backend** and **MongoDB database**.

FreshCart provides a complete shopping flow from browsing and filtering products to cart management, checkout, order placement, order history, and profile management.

## 📱 Preview

> Add your screenshots or a demo video here.

### Main Screens
- Login / Authentication
- Home
- Categories
- Product Search & Filtering
- Cart
- Checkout
- Order Details
- All Orders
- Profile
- Dark & Light Themes

## ✨ Features

- 🔐 User authentication
- 🏠 Grocery home page
- 🛍️ Product browsing
- 🔎 Product search
- 🏷️ Category-based browsing
- 🎛️ Product filtering
- 💰 Price filtering
- 🛒 Add products to cart
- ➕ Increase product quantity
- ➖ Decrease product quantity
- 🗑️ Remove products from cart
- 💵 Automatic cart total calculation
- 📦 Checkout
- 🚚 Delivery address and order summary
- 💳 Cash on delivery payment option
- 📋 Order placement
- 🔎 Detailed order view
- 📜 Order history
- 👤 User profile
- 📊 Order status information
- 🌙 Dark theme
- ☀️ Light theme
- 📱 Mobile-first responsive UI

## 🛠️ Tech Stack

### Mobile App
- React Native
- Expo
- Expo Router
- JavaScript / TypeScript
- NativeWind / Tailwind CSS

### Backend
- Node.js
- Fastify
- REST APIs

### Database
- MongoDB
- Mongoose

### API & Storage
- Axios
- AsyncStorage
- JWT-based authentication

> Update this section if any of the technologies above are not used in the final version of the project.

## 🏗️ Application Architecture

```text
React Native + Expo
        │
        │ Axios / REST API
        ▼
Node.js + Fastify
        │
        │ Mongoose
        ▼
     MongoDB
```

The mobile application communicates with the backend through REST APIs. The backend handles authentication, products, cart operations, and orders, while MongoDB stores the application data.

## 🔄 Shopping Flow

```text
Login / Register
       ↓
     Home
       ↓
Categories / Search / Filters
       ↓
    Products
       ↓
      Cart
       ↓
   Checkout
       ↓
  Place Order
       ↓
Order Details / Order History
```

## 📂 Project Structure

```text
freshcart/
├── app/
├── components/
├── assets/
├── context/
├── hooks/
├── services/
├── utils/
├── constants/
├── package.json
├── app.json
├── tsconfig.json
└── README.md
```

The exact structure may vary depending on the final project organization.

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- Expo CLI / Expo tooling
- MongoDB
- Git

### Installation

Clone the repository:

```bash
git clone YOUR_REPOSITORY_URL
cd freshcart
```

Install dependencies:

```bash
npm install
```

Start the Expo development server:

```bash
npx expo start
```

Then open the application using Expo Go or an available Android/iOS emulator.

## 🔑 Environment Variables

Do not commit private credentials, database passwords, JWT secrets, or other sensitive information to GitHub.

Create an environment file for values such as:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Use the environment-variable names required by your actual backend configuration.

## 🧪 Testing the Application

A typical user flow can be tested with:

1. Create an account or log in.
2. Browse products from the home screen.
3. Open categories and apply filters.
4. Add products to the cart.
5. Increase or decrease quantities.
6. Review the cart total.
7. Continue to checkout.
8. Place an order.
9. Open order details.
10. View the order in All Orders.
11. Open the profile page.
12. Test both dark and light themes.

## 📸 Screenshots

Add screenshots to a `screenshots/` directory and display your best screens here.

Recommended screenshots:

- `login.png`
- `home.png`
- `categories.png`
- `filters.png`
- `cart.png`
- `checkout.png`
- `order-details.png`
- `orders.png`
- `profile.png`
- `dark-theme.png`

Example:

```markdown
![Home Screen](screenshots/home.png)
```

## 🎥 Demo

Add a short screen-recorded demonstration of the application here:

**Demo:** [YOUR_DEMO_LINK](https://lnkd.in/p/dzadUJFH)

A 60–90 second demo should show the main flow:

**Login → Browse → Filter → Add to Cart → Checkout → Place Order → Order Details → Profile**

## 📚 What I Learned

Building FreshCart provided practical experience with:

- Building a complete React Native application
- Creating reusable mobile UI components
- Navigation with Expo Router
- Connecting a mobile frontend to a backend API
- Designing and consuming REST APIs
- Working with Node.js and Fastify
- Working with MongoDB and Mongoose
- Implementing authentication
- Managing cart and order workflows
- Handling API requests and errors
- Managing application state
- Building dark and light themes
- Structuring a full-stack application

## 🔮 Future Improvements

Possible future improvements include:

- Online payment integration
- Push notifications
- Product reviews and ratings
- Wishlist functionality
- Admin dashboard
- Delivery partner tracking
- Product stock management
- Order status notifications

## 👨‍💻 Developer

**Muhammad Taha**

Student Software Developer

**Skills:** React • React Native • Node.js • MongoDB • Expo • Tailwind CSS

- GitHub: YOUR_GITHUB_PROFILE
- LinkedIn: YOUR_LINKEDIN_PROFILE

---

## ⭐ Project Note

FreshCart was developed as a personal full-stack project to practice building a real-world mobile shopping application from frontend to backend and database integration.
