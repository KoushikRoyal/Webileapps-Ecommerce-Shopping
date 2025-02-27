Table of Contents 
1. Introduction 
2. Modules Overview  
o Frontend 
o Backend 
o Admin Panel 
3. Technologies and Packages Used 
4. Features and Functionalities 
5. API Endpoints 
6. Database Schema 
7. Image Storage and Management 
8. Conclusion 
 
1. Introduction 
This document outlines the technical details of a MERN (MongoDB, Express, React, 
Node.js) stack-based e-commerce website. The website consists of three main 
modules: Frontend, Backend, and Admin Panel. The system enables users to browse 
products, filter items, authenticate users, add items to the cart, process payments, and 
track orders. 
Abstract 
E-commerce platforms provide convenience, accessibility, and diverse product 
offerings. Features such as secure payment gateways, fast delivery, and AI-driven 
recommendations enhance the user experience. Businesses benefit from reduced 
operational costs, broader market reach, and data-driven insights. Advanced 
technologies, including chatbots and seamless checkout systems, continue to improve 
online shopping experiences. 
 
2. Modules Overview 
Frontend Module 
• Developed using React.js. 
• Allows users to view and filter products by category and price. 
• Implements authentication using JWT tokens stored in localStorage. 
• Uses React Hooks (useState, useEffect, useLocation, useContext) for state 
management. 
• Communicates with the backend using Axios. 
• Calculates the total sum of the cart before placing an order. 
• Supports Stripe payment integration and offline payment. 
• Displays real-time order tracking updates received from the admin panel. 
Backend Module 
• Built using Node.js and Express.js. 
• Implements user authentication using JWT (jwt.sign()) and token verification 
middleware. 
• Handles product retrieval, filtering, and cart operations. 
• Manages order placement and payment processing. 
• Uses MongoDB as the database. 
• Exposes RESTful APIs for frontend and admin interactions. 
• Utilizes Multer for uploading images to Cloudinary, storing the secure_url in 
MongoDB. 
Admin Panel 
• Developed using React.js (frontend) and Node.js (backend). 
• Allows admins to add, update, and delete products. 
• Provides an order tracking system with real-time updates. 
• Uses Axios for API calls. 
• Stores product and order data in MongoDB. 
• Supports image uploads using Multer and Cloudinary. 
 
 
3. Technologies and Packages Used 
Frontend 
• React.js - UI development 
• React Hooks (useState, useEffect, useLocation, useContext) 
• React Router - Navigation handling 
• Axios - HTTP requests 
• LocalStorage - Storing authentication tokens 
• Stripe API - Payment processing 
Backend 
• Node.js - Server-side runtime 
• Express.js - Web framework 
• MongoDB - NoSQL database 
• Mongoose - ODM library 
• JWT (jsonwebtoken) - Authentication 
• bcryptjs - Password hashing 
• CORS - Handling cross-origin requests 
• Stripe API - Payment processing 
• Dotenv - Environment variable management 
• Multer - Image uploads 
• Cloudinary - Cloud image storage 
 
4. Features and Functionalities 
User Side (Frontend) 
• View and filter products by category and price. 
• Authentication using JWT. 
• Add products to the cart and calculate the total price. 
• Payment processing with Stripe and offline payment support. 
• Real-time order tracking updates. 
Admin Side 
• Add, update, and delete products. 
• View product details. 
• Update order tracking status. 
 
5. API Endpoints 
User Authentication 
• POST /api/auth/register - Register a new user. 
• POST /api/auth/login - Authenticate and generate JWT. 
Products 
• GET /api/products - Fetch all products. 
• GET /api/products/:id - Fetch product details. 
• POST /api/products - Add new product (Admin only). 
• PUT /api/products/:id - Update product (Admin only). 
• DELETE /api/products/:id - Delete product (Admin only). 
Cart and Orders 
• POST /api/cart - Add items to the cart. 
• GET /api/cart - Retrieve cart details. 
• POST /api/orders - Place order. 
• GET /api/orders/:id - Fetch order details. 
• PUT /api/orders/:id - Update order tracking status. 
Payments 
• POST /api/payments/stripe - Process Stripe payment. 
• POST /api/payments/offline - Handle offline payment. 
 
6. Database Schema 
User Schema 
{ 
  "name": "String", 
  "email": "String", 
  "password": "String", 
  "isAdmin": "Boolean", 
  "cartData": [{ "productId": "ObjectId", "quantity": "Number" }] 
} 
Product Schema 
{ 
  "name": "String", 
  "price": "Number", 
  "category": "String", 
  "description": "String", 
  "image": "String" 
} 
Order Schema 
{ 
  "userId": "ObjectId", 
  "products": [{ "productId": "ObjectId", "quantity": "Number" }], 
  "totalPrice": "Number", 
  "status": "String", 
  "paymentMethod": "String", 
  "address": "String", 
  "phoneNumber": "String" 
} 
 
7. Image Storage and Management 
• Multer - Handles image uploads from the frontend. 
• Cloudinary - Secure cloud image storage. 
• MongoDB Storage - secure_url from Cloudinary is stored for dynamic rendering. 
 
8. Conclusion 
This document provides a detailed technical overview of the MERN stack-based e
commerce website, covering its modules, technologies, features, API endpoints, and 
database schemas. The system ensures a seamless user experience through 
authentication, order management, and payment processing while allowing admins full 
control over products and order tracking. Additionally, secure and scalable image 
storage is implemented using Multer and Cloudinary. 
The next phase may include AI-driven recommendations and enhanced analytics to 
further personalize the shopping experience. 
