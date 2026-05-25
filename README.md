# VedaAI – AI Powered Assignment & Question Paper Generator

## 🚀 Overview

VedaAI is an AI-powered teacher assistant platform that helps educators generate professional school-level assignments and question papers instantly using uploaded study materials.

Teachers can:

* Upload PDFs, text files, or images
* Configure question types and marks
* Generate structured assessments using AI
* Download papers as PDFs
* Regenerate papers instantly
* Receive real-time generation updates

The platform is designed with a modern, premium UI and real-time architecture suitable for production-scale educational tools.

---

## 🌐 Live Demo

Frontend: [https://your-vercel-url.vercel.app](https://veda-ai-murex-seven.vercel.app/)

Backend API: [https://your-railway-url.up.railway.app](https://veda-ai-production-39b3.up.railway.app/)

---

# ✨ Features

## 📄 AI Question Paper Generation

* Generates structured school-level assessments
* Supports:

  * MCQs
  * Short Questions
  * Long Questions
  * Numerical Problems
  * Diagram-Based Questions
  * True/False

---

## 📚 Study Material Parsing

Supports:

* PDF Uploads
* Image OCR
* TXT Files

Uses:

* `pdfjs-dist`
* `Tesseract.js`

---

## ⚡ Real-Time Status Updates

Live assignment generation states:

* Queued
* Generating
* Completed
* Failed

Powered by:

* Socket.IO
* BullMQ Workers

---

## 📥 PDF Export

Teachers can download generated papers as professional PDFs.

---

## 🔁 Regenerate Assignments

Instantly regenerate a new paper using the same uploaded content and configuration.

---

## 🔔 Notification System

Real-time notifications for:

* Assignment generated
* Generation failed
* Pending generation

---

## 📱 Fully Responsive UI

* Mobile responsive
* Floating mobile dock
* Modern SaaS-style interface
* Premium microinteractions

---

# 🛠 Tech Stack

## Frontend

* Next.js 16
* TypeScript
* Tailwind CSS
* Zustand
* Axios
* Socket.IO Client
* Framer Motion
* Lucide Icons

---

## Backend

* Node.js
* Express.js
* TypeScript
* BullMQ
* Redis
* Socket.IO
* MongoDB + Mongoose
* Multer

---

## AI

* Groq API
* Llama 3.3 70B Versatile

---

## OCR & Parsing

* Tesseract.js
* pdfjs-dist

---

## Deployment

### Frontend

* Vercel

### Backend

* Railway

### Database

* MongoDB Atlas

### Queue System

* Upstash Redis

---

# 🏗 Architecture Overview

```txt
Frontend (Next.js)
        ↓
REST API (Express.js)
        ↓
MongoDB Atlas
        ↓
BullMQ Queue
        ↓
Redis (Upstash)
        ↓
AI Worker
        ↓
Groq / Llama 3.3
        ↓
Generated Question Paper
        ↓
Socket.IO Event
        ↓
Frontend Live Update
```

---

# ⚙️ Approach

## 1. Assignment Creation

Teacher uploads:

* study material
* question configuration
* instructions

The backend:

* extracts text
* validates OCR quality
* stores assignment in MongoDB
* queues generation job

---

## 2. Background Processing

BullMQ worker:

* fetches assignment
* builds AI prompt
* sends prompt to LLM
* validates JSON response
* stores generated paper

---

## 3. Real-Time Communication

Socket.IO emits:

* generation started
* generation completed
* generation failed

Frontend updates instantly without refresh.

---

## 4. PDF Generation

Generated papers are converted into downloadable PDFs using custom formatting.

---

# 📂 Project Structure

```txt
frontend/
 ├── app/
 ├── components/
 ├── hooks/
 ├── services/
 ├── store/
 └── lib/

backend/
 ├── controllers/
 ├── models/
 ├── routes/
 ├── services/
 ├── workers/
 ├── queues/
 ├── sockets/
 ├── middlewares/
 └── utils/
```

---

# 🔧 Setup Instructions

## 1. Clone Repository

```bash
git clone https://github.com/vyakhyaagoyal/veda-ai.git
```

---

# Frontend Setup

```bash
cd frontend
npm install
```

Create `.env.local`

```env
NEXT_PUBLIC_API_URL=your_backend_url
NEXT_PUBLIC_SOCKET_URL=your_backend_url
```

Run frontend:

```bash
npm run dev
```

---

# Backend Setup

```bash
cd backend
npm install
```

Create `.env`

```env
PORT=5000

MONGO_URI=your_mongodb_uri

CLIENT_URL=http://localhost:3000

GROQ_API_KEY=your_groq_api_key

REDIS_URL=your_upstash_redis_url
```

Run backend:

```bash
npm run dev
```

---

# 📦 Environment Variables

| Variable                 | Description              |
| ------------------------ | ------------------------ |
| `MONGO_URI`              | MongoDB Atlas connection |
| `GROQ_API_KEY`           | Groq API key             |
| `REDIS_URL`              | Upstash Redis URL        |
| `CLIENT_URL`             | Frontend URL             |
| `NEXT_PUBLIC_API_URL`    | Backend public URL       |
| `NEXT_PUBLIC_SOCKET_URL` | Socket server URL        |

---

# 📌 Key Challenges Solved

## OCR Validation

Implemented readability checks to avoid generating papers from unreadable images.

---

## AI Response Validation

Ensured:

* valid JSON
* structured sections
* proper marks
* difficulty consistency

---

## Real-Time Queue Processing

Used:

* BullMQ
* Redis
* Socket.IO

to create a scalable asynchronous generation pipeline.

---

## Responsive UI

Built a premium responsive UI with:

* floating mobile navigation
* responsive layouts
* microinteractions
* real-time UX feedback

---

# 🎯 Bonus Features Implemented

✅ PDF Export
✅ Real-Time Notifications
✅ Live Socket Updates
✅ Regenerate Functionality
✅ Improved UI Polish
✅ OCR Validation
✅ Mobile Responsive Design
✅ Animated Click Microinteractions

---

# 📸 Screenshots

<img width="1902" height="868" alt="image" src="https://github.com/user-attachments/assets/f36d8860-550f-4d74-a241-b8584c50729f" />
<img width="1902" height="868" alt="image" src="https://github.com/user-attachments/assets/8aa56a56-702c-48c1-95a0-96f2024fc487" />
<img width="1897" height="862" alt="image" src="https://github.com/user-attachments/assets/13070bdb-d5e2-47e1-b940-510a5591d357" />

---

# 👨‍💻 Author

Built by Vyakhya Goyal

---

# 📄 License

This project is for educational and internship submission purposes.
