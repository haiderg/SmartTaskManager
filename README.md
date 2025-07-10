# SmartTaskManager

A modern, full-stack task management application built with React, Node.js, and TypeScript. Features real-time task tracking, data visualization, and responsive design.

## URL
https://smarttaskmanager-frontend.vercel.app/

## 🚀 Features

- **Full CRUD Operations** - Create, read, update, and delete tasks
- **Real-time Updates** - Instant UI updates after task operations
- **Data Visualization** - Interactive line charts showing task completion trends
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Advanced Table Features** - Pagination, sorting, and filtering
- **Modal Dialogs** - Clean UI for task creation and editing
- **Type Safety** - Full TypeScript implementation with shared types

## 🛠️ Tech Stack

### Frontend

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **TanStack React Table** for advanced table functionality
- **Chart.js** with React Chart.js 2 for data visualization
- **Axios** for HTTP requests

### Backend

- **Node.js** with Express
- **TypeScript** for type safety
- **Zod** for runtime validation
- **CORS** enabled for cross-origin requests

### Shared

- **Shared TypeScript types** between frontend and backend
- **Zod schemas** for consistent validation

## 📁 Project Structure

Copy
SmartTaskManager/
├── frontend/ # React application
├── backend/ # Node.js API server
├── shared/ # Shared types and schemas
└── README.md

## 🎯 Key Highlights

- **Monorepo Architecture** - Organized codebase with shared dependencies
- **Type-Safe API** - End-to-end type safety from frontend to backend
- **Modern React Patterns** - Custom hooks, context, and functional components
- **Responsive Tables** - Mobile-friendly data tables with pagination
- **Real-time Charts** - Dynamic visualization of task completion over time
- **Professional UI/UX** - Clean, intuitive interface with loading states

### 🌟 Future Enhancements

User authentication and authorization
Task categories and tags
Due date reminders
File attachments
Team collaboration features
Dark mode theme

### 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### 👨‍💻 Author

- **Ghulam Haider**
- **GitHub** - https://github.com/haiderg
- **LinkedIn** - https://www.linkedin.com/in/haiderg

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/haiderg/SmartTaskManager.git
cd SmartTaskManager

Copy
Install dependencies for all packages

# Install shared dependencies
cd shared && npm install

# Install backend dependencies
cd ../backend && npm install

# Install frontend dependencies
cd ../frontend && npm install

Copy
bash
Start the development servers

# Terminal 1 - Backend (Port 3001)
cd backend && npm start

# Terminal 2 - Frontend (Port 5173)
cd frontend && npm run dev

Copy
bash
Open your browser and navigate to http://localhost:5173

🔧 Available Scripts
Frontend
npm run dev - Start development server
npm run build - Build for production
npm run preview - Preview production build

Backend
npm run dev - Start development server with hot reload
npm run build - Compile TypeScript
npm start - Start production server


```
