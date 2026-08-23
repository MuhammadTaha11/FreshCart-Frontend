# FreshCart 🛒

A full-stack grocery shopping mobile application built with **React Native and Expo**, with a **Node.js backend** and **MongoDB database**.

FreshCart provides a complete shopping flow from browsing and filtering products to cart management, checkout, order placement, order history, and profile management.

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

These are the screenshots of UI in both dark/light Themes.

<img width="80" height="140" alt="4a7cb161-253f-4edd-ad64-f76f92aa691f" src="https://github.com/user-attachments/assets/b086ccd9-ad2e-4844-b480-f22650cac39e" />
<img width="80" height="140" alt="5c6574b5-21c9-4fc9-ad37-7e204bc8387d" src="https://github.com/user-attachments/assets/b947fa2c-e56f-4700-a66b-a4f961cedf9e" />
<img width="80" height="140" alt="ac5c9200-171a-4ab8-9813-99596c85d979" src="https://github.com/user-attachments/assets/87e89966-3e15-44e8-b677-3271f4ef5533" />
<img width="80" height="140" alt="fbbc1a94-0b6e-428a-8530-9bf5a9675142" src="https://github.com/user-attachments/assets/8dfd27e0-5432-4d01-855b-e796aec5d368" />
<img width="80" height="140" alt="f722d62a-03b7-40b4-9ff2-3c602496fd36" src="https://github.com/user-attachments/assets/75d6614c-0523-4b34-b8c4-71f93cf3b32d" />
<img width="80" height="140" alt="b0cd609c-04c0-4c65-b844-b0b4af82cc04" src="https://github.com/user-attachments/assets/c8b8d0e1-de9d-45de-84cd-d7739c2252e4" />
<img width="80" height="140" alt="768899ba-4253-4070-8acd-c1303d32a934" src="https://github.com/user-attachments/assets/7929e94f-b8e2-42f4-bebf-5ec64aad9ba6" />
<img width="80" height="140" alt="02f2cab2-4635-43f9-89e1-41c49370cf04" src="https://github.com/user-attachments/assets/3088529e-12a4-44e9-b657-99d9299e0304" />
<img width="80" height="140" alt="0e8127fa-439d-47d3-8ad0-bc4c78647043" src="https://github.com/user-attachments/assets/19e96ce1-9434-4473-862c-7df8ea01a959" />
<img width="80" height="140" alt="0a0535eb-0057-47bd-a4da-51edabe7d44f" src="https://github.com/user-attachments/assets/16e39d35-5e25-4844-8323-b21c3146254e" />
<img width="80" height="140" alt="75906a25-6645-4046-87bc-802287d90d2b" src="https://github.com/user-attachments/assets/6454bad0-29cc-4936-b62d-48df974f629e" />


## 🎥 Demo

**Demo:** [YOUR_DEMO_LINK](https://lnkd.in/p/dzadUJFH)

This Is Demo Video to Show All The Functionalities:

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
