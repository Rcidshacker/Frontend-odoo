# 🔄 Skill Swap Platform - MongoDB Edition

> **Teach what you know, learn what you don't.**

A full-stack web application that enables users to list their skills and exchange them with others. This platform facilitates a community-driven learning environment where services are swapped rather than bought.

-----

## 📑 Table of Contents

  - [About the Project](https://www.google.com/search?q=%23-about-the-project)
  - [Key Features](https://www.google.com/search?q=%23-key-features)
  - [Tech Stack](https://www.google.com/search?q=%23-tech-stack)
  - [Getting Started](https://www.google.com/search?q=%23-getting-started)
  - [Project Structure](https://www.google.com/search?q=%23-project-structure)
  - [API Endpoints](https://www.google.com/search?q=%23-api-endpoints)
  - [Troubleshooting](https://www.google.com/search?q=%23-troubleshooting)
  - [Meet the Team](https://www.google.com/search?q=%23-meet-the-team)

-----

## 📖 About the Project

The **Skill Swap Platform** solves the problem of expensive learning resources by connecting individuals who want to trade expertise. Users can create profiles, search for specific skills (e.g., "Photoshop", "Excel"), and initiate swap requests.

-----

## ✨ Key Features

### 👤 User Functionality

  * **Profile Management**: Create profiles with location, photos, and availability (weekends/evenings).
  * **Skill Listing**: customizable lists for "Skills Offered" and "Skills Wanted".
  * **Privacy Controls**: Toggle profile visibility between Public and Private.
  * **Smart Search**: Browse or search for users by specific skills.
  * **Swap Logic**: Send, accept, reject, or cancel swap requests.
  * **Reputation System**: Rate and review users after a completed swap.

### 🛡️ Admin Privileges

  * **Content Moderation**: Reject inappropriate skill descriptions.
  * **User Management**: Ban users violating platform policies.
  * **Monitoring**: Track pending, accepted, and cancelled swaps.
  * **Broadcasting**: Send platform-wide alerts (updates/downtime).
  * **Analytics**: Download reports on activity logs and swap statistics.

-----

## 🛠️ Tech Stack

  * **Frontend:** React.js, Context API
  * **Backend:** Node.js, Express.js
  * **Database:** MongoDB
  * **Authentication:** JWT (JSON Web Tokens)

-----

## 🚀 Getting Started

### 📋 Prerequisites

Before you begin, ensure you have the following installed:

  * [Node.js](https://nodejs.org/) (v14 or higher)
  * [MongoDB](https://www.mongodb.com/try/download/community) (v4.4 or higher)

### ⚡ Option 1: Quick Start (Windows)

Run the automated batch scripts to set up the environment instantly.

1.  **Install Dependencies & Start App:**
    ```bash
    setup.bat
    ```
2.  **Install MongoDB (if missing):**
    ```bash
    setup-mongodb.bat
    ```
    *The app will launch at:* `Frontend: http://localhost:3000` | `Backend: http://localhost:5000`

### 🔧 Option 2: Manual Installation

1.  **Clone the Repository**

    ```bash
    git clone <your-repo-url>
    ```

2.  **Install Server Dependencies**

    ```bash
    cd skill_swap/server
    npm install
    ```

3.  **Install Client Dependencies**

    ```bash
    cd ../client
    npm install
    ```

4.  **Configure Database**

      * Ensure MongoDB is running locally.
      * *Optional:* Update the MongoDB connection string in `server/.env`.

5.  **Run the Application**

      * **Terminal 1 (Server):**
        ```bash
        cd server
        npm start
        ```
      * **Terminal 2 (Client):**
        ```bash
        cd client
        npm start
        ```

-----

## 📂 Project Structure

```text
skill_swap/
├── 📂 server/                 # Backend API (Node/Express)
│   ├── 📂 config/             # DB & Auth configurations
│   ├── 📂 controllers/        # Logic for Users, Skills, Swaps, Admin
│   ├── 📂 models/             # Mongoose Schemas (User, Skill, Rating)
│   ├── 📂 middleware/         # Auth & Admin verification
│   ├── 📂 routes/             # API Endpoint definitions
│   └── server.js              # Entry point
│
├── 📂 client/                 # Frontend (React)
│   ├── 📂 src/
│   │   ├── 📂 components/     # Reusable UI components
│   │   ├── 📂 context/        # Global state management
│   │   ├── 📂 hooks/          # Custom React hooks
│   │   └── 📂 pages/          # Main application views
│   └── package.json
│
└── .env                       # Environment variables
```

-----

## 🔌 API Endpoints

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| **Auth** | | | |
| `POST` | `/api/users/register` | Register new user | Public |
| `POST` | `/api/users/login` | User login | Public |
| **User** | | | |
| `GET` | `/api/users/profile` | Get current profile | 🔒 Protected |
| `PUT` | `/api/users/profile` | Update profile | 🔒 Protected |
| **Skills** | | | |
| `GET` | `/api/skills` | List all skills | Public |
| `POST` | `/api/skills` | Add a new skill | 🔒 Protected |
| `DELETE` | `/api/skills/:id` | Remove a skill | 🔒 Protected |
| **Swaps** | | | |
| `POST` | `/api/swap-requests` | Initiate a swap | 🔒 Protected |
| `PUT` | `/api/swap-requests/:id` | Accept/Reject swap | 🔒 Protected |
| **Admin** | | | |
| `PUT` | `/api/admin/users/:id/ban` | Ban a user | 🛡️ Admin |
| `GET` | `/api/admin/users` | Get all users | 🛡️ Admin |

-----

## ❓ Troubleshooting

If you encounter issues during setup, check the following:

  * **❌ Database Connection Error:**
      * Ensure the MongoDB service is running in your background processes.
      * Check if the connection string in `.env` is correct.
  * **❌ Server Not Starting:**
      * Check if **Port 5000** is being used by another application.
  * **❌ Registration Failed:**
      * Check server logs for specific error messages.
      * Ensure the email address isn't already registered in the database.

-----

## 👥 Meet the Team

| Name | Role | Contact |
| :--- | :--- | :--- |
| **Niharika Mishra** | Developer | [048niharika@gmail.com](mailto:048niharika@gmail.com) |
| **Achyut Maheshka** | Developer | [maheshkaachyut@gmail.com](mailto:maheshkaachyut@gmail.com) |
| **Ruchit Das** | Developer | [ruchitdas36@gmail.com](mailto:ruchitdas36@gmail.com) |

-----

## 📄 License

This project is licensed under the **MIT License**.
