# **Laptop Store API** 🛒💻  
A RESTful API built with **Node.js, Express, and MongoDB** for managing laptop products, user authentication, and order processing.  

---

## **🚀 Features**  
✅ **User Authentication** – Signup, login, and token-based authentication (JWT)  
✅ **Laptop Management** – Create, update, delete, and fetch laptop products  
✅ **Category-Based Filtering** – Fetch laptops by brand (HP, Dell, MSI, etc.)  
✅ **File Uploads** – Upload and store product images  
✅ **Standardized API Responses** – Consistent JSON responses  
✅ **Admin Panel Support** – Admin users can manage laptop listings  

---

## **🛠️ Tech Stack**  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB + Mongoose  
- **Authentication:** JWT (JSON Web Tokens)  
- **File Uploads:** Multer  
- **Environment Variables:** dotenv  
- **Validation:** Express Validator  

---

## **📌 Installation & Setup**  

1️⃣ **Clone the repository:**  
```bash
git clone https://github.com/yourusername/laptop-store-api.git
cd laptop-store-api
```
  
2️⃣ **Install dependencies:**  
```bash
npm install
```

3️⃣ **Set up environment variables:**  
Create a **.env** file in the root and add:  
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

4️⃣ **Run the server:**  
```bash
npm start
```

---

## **📂 API Endpoints**  

### **🔹 Authentication**  
| Method | Endpoint          | Description       | Protected |
|--------|------------------|------------------|-----------|
| POST   | `/api/auth/signup` | User signup     | ✅ Yes |
| POST   | `/api/auth/login`  | User login      | ❌ No  |

### **🔹 Laptops Management**  
| Method | Endpoint              | Description                 | Protected |
|--------|----------------------|-----------------------------|-----------|
| GET    | `/api/laptops`        | Fetch all laptops          | ❌ No |
| GET    | `/api/laptops/:id`    | Fetch single laptop        | ❌ No |
| POST   | `/api/laptops`        | Add new laptop (Admin)     | ✅ Yes |
| PUT    | `/api/laptops/:id`    | Update laptop (Admin)      | ✅ Yes |
| DELETE | `/api/laptops/:id`    | Delete laptop (Admin)      | ✅ Yes |

### **🔹 File Uploads**  
| Method | Endpoint              | Description          | Protected |
|--------|----------------------|----------------------|-----------|
| POST   | `/api/upload`        | Upload product image | ✅ Yes |

---

## **📌 Sample API Response**  

### **✅ Get All Laptops**
**Request:**  
```http
GET /api/laptops
```
**Response:**  
```json
{
  "success": true,
  "data": [
    {
      "_id": "65f7c8c8f8b3f2a4d0e69c12",
      "name": "Dell XPS 15",
      "brand": "Dell",
      "price": 1200,
      "image": "uploads/dellxps.jpg"
    }
  ]
}
```

---

## **📝 License**  
This project is licensed under the **MIT License**.  
