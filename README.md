# 📝 To-Do App

A full-stack **To-Do App** built with **Express.js, React, MongoDB, and Docker**. The app provides user authentication using **JWT with HTTP-only cookies** and manages state using **React Context API & useState**.

---

## 📌 Features
✅ **User Authentication** (JWT & HTTP-only cookies)
✅ **Create, Read, Update, and Delete (CRUD) To-Dos**
✅ **State Management with React Context API**
✅ **Protected Routes for Authenticated Users**
✅ **MongoDB Containerized with Docker**
✅ **Full App Dockerized (Backend & Frontend)**

---

## 🛠️ Tech Stack
### **Backend**
- **Express.js** - API development
- **JWT (JSON Web Token)** - Secure authentication
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Cookie-Parser** - HTTP-only cookie authentication
- **Cors & Helmet** - Security enhancements

### **Frontend**
- **React.js** - UI development
- **Axios** - API requests
- **Context API + useState** - State management

### **Database**
- **MongoDB** - Running as a Docker container

### **Deployment & DevOps**
- **Docker** - Containerized backend & frontend
- **Docker Compose** - Multi-container setup

---

## 🚀 Getting Started
### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/your-username/todo-app.git
cd todo-app
```

### **2️⃣ Set Up Environment Variables**
Create a `.env` file in the backend directory:
```ini
PORT=5000
MONGO_URI=mongodb://mongo:27017/todoDB
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:3000
```

### **3️⃣ Run the App with Docker Compose**
```bash
docker-compose up --build
```

This starts:
- **MongoDB** (database)
- **Express.js Backend** (API at `http://localhost:5000`)
- **React Frontend** (UI at `http://localhost:3000`)

---

## 📦 Docker Setup
### **Dockerfile for Backend** (`backend/Dockerfile`)
```dockerfile
FROM node:18
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
CMD ["node", "server.js"]
EXPOSE 5000
```

### **Dockerfile for Frontend** (`frontend/Dockerfile`)
```dockerfile
FROM node:18
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]
EXPOSE 3000
```

### **Docker Compose File** (`docker-compose.yml`)
```yaml
version: "3.8"

services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - MONGO_URI=mongodb://mongo:27017/todoDB
      - JWT_SECRET=your_secret_key
      - CLIENT_URL=http://localhost:3000
    depends_on:
      - mongo
    networks:
      - todo-network

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend
    networks:
      - todo-network

  mongo:
    image: mongo
    ports:
      - "27017:27017"
    networks:
      - todo-network

networks:
  todo-network:
```

---

## 🎯 API Endpoints
### **Authentication**
- `POST /api/auth/register` → Register new user
- `POST /api/auth/login` → Login & set HTTP-only cookie
- `GET /api/auth/logout` → Logout user
- `GET /api/auth/user` → Get authenticated user data

### **To-Do CRUD**
- `GET /api/todos` → Fetch all todos
- `POST /api/todos` → Create a new todo
- `PUT /api/todos/:id` → Update a todo
- `DELETE /api/todos/:id` → Delete a todo

---

## 🔥 Future Improvements
- ✅ Add UI validation & error handling
- ✅ Implement role-based access control (RBAC)
- ✅ Improve UI/UX with animations

---

## 👨‍💻 Author
- **Your Name**  
- GitHub: [your-github](https://github.com/your-username)
- LinkedIn: [your-linkedin](https://linkedin.com/in/your-profile)

---

## 📜 License
This project is licensed under the **MIT License**.

