# UdaanSetu 🚀

### AI-Powered Student Assistance & Opportunity Platform

<div align="center">
<img width="1200" height="475" alt="UdaanSetu Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

---

# 📌 Overview

**UdaanSetu** is an AI-powered web application designed to assist students with intelligent guidance, productivity enhancement, and opportunity discovery through modern AI integration.

Built using **React, TypeScript, Vite, and Gemini AI**, the platform delivers a fast, scalable, and responsive experience while maintaining a clean and modular architecture.

The project focuses on combining AI capabilities with an intuitive interface to create a seamless digital assistance ecosystem for students and learners.

---

# ✨ Features

* 🤖 AI-powered assistant integration
* ⚡ Fast and lightweight frontend using Vite
* 🎯 Intelligent query handling using Gemini AI
* 🧩 Modular and scalable architecture
* 📱 Responsive user interface
* 🔒 Environment-based API key management
* 🛠️ TypeScript support for maintainability
* 💾 Local database integration (`startupforge.db`)

---

# 🛠️ Tech Stack

## Frontend

* React.js
* TypeScript
* Vite
* CSS3

## AI Integration

* Gemini API

## Backend / Server

* Node.js
* TypeScript Server (`server.ts`)

## Database

* SQLite (`startupforge.db`)

---

# 📂 Project Structure

```bash
UdaanSetu/
│
├── dist/                          # Production build files
│   ├── assets/                    # Optimized static assets
│   └── index.html                 # Production entry HTML
│
├── node_modules/                  # Installed dependencies
│
├── src/
│   ├── services/
│   │   └── geminiService.ts       # Gemini AI service integration
│   │
│   ├── App.tsx                    # Main application component
│   ├── index.css                  # Global styles
│   ├── main.tsx                   # React application entry point
│   └── types.ts                   # Shared TypeScript types/interfaces
│
├── .env                           # Environment variables
├── .gitignore                     # Git ignored files
├── index.html                     # Root HTML template
├── metadata.json                  # Project metadata/configuration
├── package.json                   # Project dependencies & scripts
├── package-lock.json              # Dependency lock file
├── README.md                      # Project documentation
├── server.ts                      # Backend/server configuration
├── startupforge.db                # SQLite database file
├── tsconfig.json                  # TypeScript configuration
└── vite.config.ts                 # Vite configuration
```

---

# ⚙️ Installation & Setup

## Prerequisites

Ensure the following tools are installed:

* Node.js (v18+ recommended)
* npm
* Gemini API Key

---

# 🚀 Getting Started

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/UdaanSetu.git
cd UdaanSetu
```

---

## 2️⃣ Install Dependencies

```bash
npm install
```

---

## 3️⃣ Configure Environment Variables

Create a `.env` file in the root directory:

```env
GEMINI_API_KEY=your_gemini_api_key
```

---

## 4️⃣ Run the Development Server

```bash
npm run dev
```

The application will be available at:

```bash
http://localhost:5173
```

---

# 📦 Core Dependencies

```json
{
  "react": "^18.x",
  "typescript": "^5.x",
  "vite": "^5.x",
  "@google/generative-ai": "^0.x",
  "dotenv": "^16.x"
}
```

---

# 🧠 AI Integration

The project integrates the **Gemini API** through the `geminiService.ts` module, enabling intelligent conversational and AI-powered functionalities within the application.

---

# 🗄️ Database

UdaanSetu currently uses a lightweight SQLite database:

```bash
startupforge.db
```

This database can be used for:

* User session storage
* Application data management
* AI interaction logging
* Future authentication systems

---

# 🏗️ Build for Production

## Create Production Build

```bash
npm run build
```

---

## Preview Production Build

```bash
npm run preview
```

---

# 🔒 Environment Variables

| Variable         | Description                       |
| ---------------- | --------------------------------- |
| `GEMINI_API_KEY` | API key for Gemini AI integration |

---

# 📈 Future Scope

* Authentication & user profiles
* AI-based career recommendation engine
* Resume analysis system
* Internship & scholarship discovery
* Real-time AI chat enhancements
* Dashboard analytics
* Mobile application support

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push the branch
5. Open a Pull Request

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Developed By

**UdaanSetu Team**
Building intelligent solutions for the next generation of learners.
