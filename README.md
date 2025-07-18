## 🌿 Velmure — Minimalist Skincare E‑Commerce App

A clean, user-friendly, full-stack MERN application for a minimalist skincare brand. Built with **MongoDB**, **Express**, **React**, **Node**, and **Tailwind/SASS** (or your preferred styling).

### 🔹 Features

* **Product Catalog**: Browse all skincare products with details and images.
* **Admin Dashboard**:

  * Admin-only access to **add**, **edit**, and **delete** products.
  * Uses **Multer** for product image uploads.
* **User Authentication**:

  * Users can **register**, **login**, and manage their account.
  * Only authenticated users can add items to the cart.
* **Shopping Cart**:

  * Cart persists per user.
  * Cart actions (**add**, **remove**, **checkout**) are locked behind authentication.
* **Order Flow**:

  * Logged-in users can checkout and view their order status.

---

## 📌 Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/) (v18+ recommended)
* MongoDB Atlas or local MongoDB instance
* (Optional) JWT secret key and email provider credentials if using email features

### Installation Steps

1. **Clone the repo**

   ```bash
   git clone https://github.com/yasraa/velmure.git
   cd velmure
   ```

2. **Environment Variables**

   Create a `.env` file in both root and `client/` (if used) and configure:

   ```env
   MONGO_URI=mongodb://localhost:27017/velmure
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development
   PORT=5000
   ```

3. **Backend Setup**

   ```bash
   npm install
   npm run dev    # Starts server on http://localhost:5000
   ```

4. **Frontend Setup**

   ```bash
   cd client
   npm install
   npm start      # Starts React dev server (e.g., http://localhost:3000)
   ```

5. **Access the App**

   * Visit frontend: `http://localhost:3000`
   * API runs at: `http://localhost:5000/api`

---

## 🔐 User & Admin Access

* **Cart functionality** is disabled until a user logs in.
* Only users with **admin credentials** can:

  * Add/edit/delete products
  * Upload product images via **Multer**

> ⚠️ *Ensure you create an admin user manually in the database (e.g., set `isAdmin: true`)* or register and update via database tool (Mongo Compass).

---

## 🖥️ How It Works

* **Frontend** in React handles user interactions and routing (Home, Product, Cart, Profile, Admin).
* **Backend** in Express:

  * Protects routes using JWT auth middleware.
  * **Cart routes** return 401 if user is not logged in.
  * **Product routes** check `isAdmin`.
* **Multer** handles file uploads to `/uploads`; images are stored locally or can be extended to S3.
* **MongoDB** stores users, products, orders, and carts.

---

## 📄 Example Code Usage

### Protecting Cart Routes (Backend)

```js
app.post('/api/cart', authMiddleware, cartController.addToCart);
// authMiddleware checks user JWT and denies if not authenticated
```

### Image Upload with Multer

```js
const upload = multer({ dest: 'uploads/' });
app.post('/api/products', authMiddleware, isAdmin, upload.single('image'), productController.createProduct);
```

---

## 👥 Admin Account Setup

1. Run the server
2. Open MongoDB shell or Compass
3. Add a new user document:

   ```json
   {
     "name": "Admin",
     "email": "admin@velmure.com",
     "password": "<hashed_password>",
     "isAdmin": true
   }
   ```
4. Login via the app to register as admin.

---

## 💡 Ideas for Next Steps

* Implement **order payment flow** with Stripe.
* Deploy to **Heroku/Vercel** and serve backend + uploads using S3 or Cloudinary.
* Add **product reviews**, **Admin UI**, and **email notifications**.

---

### ✅ Start Using the App

Clone, install dependencies, set up `.env`, then:

```bash
npm run dev       # backend
cd client; npm start  # frontend
```

Explore the store, register as a user, test the cart, and manage products with an admin account.

