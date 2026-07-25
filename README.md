#Shopsphere
A full-stack MERN E-Commerce platform with authentication, product management, cart, wishlist, Razorpay integration, and an admin dashboard.

##Project Structure
```text
ShopSphere_Frontend/
│
├── screenshots/
├── src/
│   ├── api/
│   ├── components/
│   ├── layouts/
│   ├── pages/
│   ├── redux/
│   ├── routes/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
```

###Banner
<p align="center">
    <img src="screenshots/banner.png" width="300" alt="Home Page">
</p>

###Home page
<p align="center">
  <img src="screenshots/HOME.png" width="700">
</p>

###Product
<p align="center">
  <img src="screenshots/product.png" width="700">
</p>

###Cart
<p align="center">
  <img src="screenshots/cart.png" width="700">
</p>

###Wishlist
<p align="center">
  <img src="screenshots/wishlist.png" width="700">
</p>

###orders
<p align="center">
  <img src="screenshots/order.png" width="700">
</p>

###Admin Dash board
<p align="center">
  <img src="screenshots/admin.png" width="700">
</p>

###Add product
<p align="center">
  <img src="screenshots/addProduct.png" width="700">
</p>

###Product update&delete
<p align="center">
  <img src="screenshots/editProduct.png" width="700">
</p>

###Manage Orders
<p align="center">
  <img src="screenshots/manageOrder.png" width="700">
</p>

##Installation



##API End points

| Method | Endpoint       | Description  |
| ------ | -------------- | ------------ |
| POST   | /auth/login    | Login        |
| POST   | /auth/register | Register     |
| GET    | /products      | Get Products |
| POST   | /cart/add      | Add Cart     |
| PUT    | /cart/update   | Update Cart  |

###Environment Variables
 
#Backend

PORT=

MONGO_URI=

JWT_SECRET=

CLOUDINARY_NAME=

CLOUDINARY_KEY=

CLOUDINARY_SECRET=

RAZORPAY_KEY=

RAZORPAY_SECRET=

#Frontend

VITE_RAZORPAY_KEY=

VITE_BASE_URL=```text http://localhost:5000/api```

