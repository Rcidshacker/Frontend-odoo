# 🎨 Skill Swap Platform | Frontend

> **A React-based community platform connecting users for mutual skill exchange.**
> *Teach what you know, learn what you don't.*

  

-----

## 📖 Overview

The **Skill Swap Platform** is a responsive Single Page Application (SPA) designed to facilitate the exchange of services. This project focuses on creating an intuitive user journey—from profile creation to executing complex swap logic—managed entirely through a centralized React state.

The interface prioritizes usability, featuring dynamic form validation, real-time status updates for swap requests, and a clean, accessible design system.

-----

## ✨ Frontend & UI Features

### 🖥️ User Interface

  * **Dynamic Dashboard:** A personalized view displaying active swap requests, pending actions, and skill matches.
  * **Smart Search & Filtering:** Client-side filtering to instantly find users offering specific skills (e.g., "Photoshop", "Piano").
  * **Responsive Layout:** Optimized for mobile and desktop using flexible grid systems and media queries.
  * **Interactive Profiles:** Toggle visibility (Public/Private) and manage availability settings with immediate UI feedback.

### ⚙️ Application Logic

  * **Centralized State Management:** Utilizes **React Context API** to handle user authentication, theme preferences, and swap transaction states globally without prop-drilling.
  * **Custom Hooks:** Modular logic for API consumption (`useFetch`), form handling, and authentication checks.
  * **Protected Routes:** Higher-Order Components (HOCs) ensure secure navigation for authenticated-only pages (Profile, Swap Requests).
  * **Form Validation:** Real-time feedback on registration and login inputs to reduce API errors.

-----

## 🛠️ Tech Stack

| Layer | Technology | Usage |
| :--- | :--- | :--- |
| **Core** | **React.js** | Component-based UI architecture |
| **State** | **Context API** | Global state management (User/Auth/Theme) |
| **Routing** | **React Router** | Client-side navigation |
| **Styling** | **CSS3 / Modules** | Custom responsive styling |
| **Backend** | Node.js / Express | REST API Provider (Consumed by Frontend) |
| **Database** | MongoDB | Data Persistence |

-----

## 📂 Frontend Architecture

The client-side codebase is structured for scalability and component reusability:

```text
client/src/
├── 📂 components/         # Atomic UI Building Blocks
│   ├── Navbar.js          # Responsive Navigation
│   ├── SkillCard.js       # Reusable Card for Skill display
│   ├── SwapRequest.js     # Interactive Request Component
│   └── Modal.js           # Reusable Portal for popups
│
├── 📂 context/            # Global State Logic
│   ├── AuthContext.js     # User Session & Token Management
│   └── SkillContext.js    # Skill Data & Caching
│
├── 📂 hooks/              # Custom Logic
│   ├── useAuth.js         # Auth abstraction
│   └── useHttp.js         # Wrapper for fetch/axios
│
├── 📂 pages/              # Main View Controllers
│   ├── Dashboard.js       # User Hub
│   ├── Explore.js         # Search & Discovery Grid
│   └── Profile.js         # Settings & Analytics
│
└── 📂 services/           # API Integration
    └── api.js             # Centralized API calls
```

-----

## 🚀 Getting Started

Follow these steps to get the frontend running locally.

### Prerequisites

  * Node.js (v14+)
  * MongoDB (running locally or cloud URI)

### ⚡ Quick Setup (Full Stack)

Run the automated script to install dependencies for both Client and Server:

```bash
setup.bat
```

### 🔧 Manual Frontend Setup

1.  **Install Dependencies**

    ```bash
    cd skill_swap/client
    npm install
    ```

2.  **Start the Backend** (Required for API data)

    ```bash
    cd ../server
    npm start
    # Runs on http://localhost:5000
    ```

3.  **Start the React Application**

    ```bash
    cd ../client
    npm start
    # Opens http://localhost:3000
    ```

-----

## 🔌 API Integration

The frontend consumes the following REST endpoints:

  * **Auth:** `POST /api/users/login`, `POST /api/users/register`
  * **Discovery:** `GET /api/skills` (with query params for search)
  * **Transactions:** `POST /api/swap-requests`, `PUT /api/swap-requests/:id`

-----

## 👥 Development Team

| Name | Role | GitHub/Contact |
| :--- | :--- | :--- |
| **Ruchit Das** | **Frontend Engineer** | [ruchitdas36@gmail.com](mailto:ruchitdas36@gmail.com) |
| **Niharika Mishra** | Full Stack Developer | [048niharika@gmail.com](mailto:048niharika@gmail.com) |
| **Achyut Maheshka** | Backend Developer | [maheshkaachyut@gmail.com](mailto:maheshkaachyut@gmail.com) |

-----

## 📄 License

This project is licensed under the **MIT License**.
