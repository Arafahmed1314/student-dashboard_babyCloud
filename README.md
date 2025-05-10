# 🎓 Student Management Dashboard

A web application built with **React**, **Tailwind CSS**, and **Firebase** to manage student data. It features user authentication with separate **Admin** and **Student** roles, modal-based login/registration, and a clean, responsive dashboard interface.

---

## 🛠️ Technologies Used

### 🧩 Frontend

- **React 18** – UI library
- **Tailwind CSS 3** – Utility-first CSS framework
- **React Hook Form 7** – Form handling and validation

### 🔐 Backend

- **Firebase Authentication 10+** – Auth system
- **JSON Server 0.17** – Mock REST API for student data

### 📦 State Management

- **React Context API** – Handle admin state globally

### ⚙️ Dev Tools

- **Vite 5** – Lightning-fast frontend tooling
- **Node.js 18+** – JavaScript runtime

---

## ✨ Features

- 🔐 **User Authentication**: Register and log in using Firebase Authentication.
- 🧑‍🏫 **Role-Based Access**: Admin and Student roles with a checkbox to switch during login/register.
- 🪟 **Modal Forms**: Login and registration displayed as modals with backdrop effects.
- ⚙️ **Context API**: Manage admin privileges using React Context.
- ✅ **Form Validation**: Client-side validation using `react-hook-form`.
- 📱 **Responsive Design**: Clean layout with Tailwind CSS for all devices.

---

## 📦 Prerequisites

Make sure the following are installed before starting:

- [Node.js (v18 or later)](https://nodejs.org/)
- `npm` or `yarn`
- A [Firebase Account](https://console.firebase.google.com/) for setting up authentication

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/student-management-dashboard.git
cd student-management-dashboard ```

#Firebase Setup
Go to the Firebase Console, create a new project.

Enable Email/Password authentication under Authentication > Sign-in method.

Get your Firebase configuration from Project Settings and create a new file:

js
Copy
Edit
// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);



JSON Server Setup
Create a db.json file in the root directory with the following content:

json
Copy
Edit
{
  "students": []
}
Start the JSON server in a separate terminal:

bash
npx json-server --watch db.json --port 3000

▶️ Running the App
Start the Vite development server:
bash
npm run dev
# OR
yarn dev
Visit: http://localhost:5173

#file stacture
student-management-dashboard/
├── public/
├── src/
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── firebase.js
│   └── App.jsx
├── db.json
├── tailwind.config.js
├── vite.config.js
└── README.md
