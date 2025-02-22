# Pierre's General Store

Pierre's General Store is an e-commerce platform inspired by the "Pierre's General Store" from *Stardew Valley*. The platform allows customers to browse products by season, place orders, and receive receipts without requiring account creation. The project is fully developed with a Node.js and Express.js backend, and a simple HTML, CSS, and JavaScript frontend.

## 📌 Technologies Used

- **Frontend:** HTML, CSS, JavaScript  
- **Backend:** Node.js, Express.js  
- **Database:** MySQL (originally developed in phpMyAdmin and Workbench, later migrated to Railway)  
- **Hosting:** Render (for both frontend and backend)

## 🌐 Live Demo

You can check out the live project at:  
[https://pierres-store.onrender.com](https://pierres-store.onrender.com)

## 📂 Project Structure

- `/backend` - Contains the backend code, including API routes to filter products by season and manage orders.
- `/docs` - Contains full project documentation, including UML diagrams and system specifications.
- `/frontend` - Contains the frontend code (HTML, CSS, JavaScript) that implements the user interface.

## 🛠 Features

- **Product Filtering by Season**:  
  APIs to filter products by season (Spring, Summer, Fall, Winter).
  
- **Order Management**:  
  APIs to list orders and generate receipts after purchase.
  
- **No Account Needed**:  
  Shopping is done entirely through the frontend with `localStorage` handling the shopping cart.

---

## 📈 Future Improvements

- Expand product categories and enhance the shopping experience.
- Optimize backend performance and improve API response times.
- Add user authentication for personalized shopping experience.
- Improve frontend with more dynamic features and interactivity.
- Implement a review and rating system for products.
