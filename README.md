# MERN Stack E-commerce Website

## Table of Contents
1. Introduction  
2. Modules Overview  
3. Technologies and Packages Used  
4. Features and Functionalities  
5. API Endpoints  


## 1. Introduction
This is a full-stack e-commerce website built using the **MERN (MongoDB, Express, React, Node.js) stack**. It allows users to browse products, add items to their cart, process payments securely, and track orders. Admins can manage products and update order statuses.

## 2. Modules Overview

### **Frontend (React.js)**
- Users can view, search, and filter products.  
- Implements **JWT-based authentication**.  
- Uses **React Hooks** and **Axios** for API interactions.  
- Secure **Stripe payment integration**.  
- Real-time **order tracking updates**.

### **Backend (Node.js + Express.js)**
- Handles **user authentication (JWT)**.  
- Manages **product, cart, and order data** in **MongoDB**.  
- Provides **RESTful APIs** for frontend and admin interactions.  
- **Multer & Cloudinary** for image uploads.  
- **Stripe API** for secure payments.

### **Admin Panel**
- **Manage products** (add, update, delete).  
- **View & update order status** in real-time.  
- Uses **Axios** for API calls.  

## 3. Technologies and Packages Used

### **Frontend**
- React.js, React Router, Axios  
- JWT Authentication, Stripe API  

### **Backend**
- Node.js, Express.js, MongoDB, Mongoose  
- JWT, bcryptjs, Multer, Cloudinary, Stripe  

## 4. Features and Functionalities

### **User Features**
- **Product browsing & filtering**  
- **JWT-based authentication**  
- **Add to cart & checkout**  
- **Stripe payment & order tracking**  

### **Admin Features**
- **Product management (CRUD)**  
- **Order management & tracking**  

## 5. API Endpoints

### **User Authentication**
- `POST /api/auth/register` - Register user  
- `POST /api/auth/login` - Login user  

### **Products**
- `GET /api/products` - Get all products  
- `POST /api/products` - Add product (Admin)  
- `PUT /api/products/:id` - Update product (Admin)  
- `DELETE /api/products/:id` - Delete product (Admin)  

### **Orders**
- `POST /api/orders` - Place order  
- `GET /api/orders/:id` - Get order details  
- `PUT /api/orders/:id` - Update order status  

### **Payments**
- `POST /api/payments/stripe` - Stripe payment  
- `POST /api/payments/offline` - Offline payment 
