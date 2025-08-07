# 💰 Expense Tracker

A full-stack MERN application for tracking personal finances, expenses, and income with beautiful visualizations and a modern UI.

## ✨ Features

- 📊 Interactive dashboards with charts and financial insights
- 💸 Track expenses and income with categories
- 📅 30-day expense analysis
- 📈 60-day income tracking
- 🔒 Secure user authentication
- 📱 Responsive design
- 🖼️ Profile photo customization
- 📤 Export data to Excel

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Recharts for data visualization
- Axios for API calls
- React Router for navigation
- Context API for state management

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Multer for file uploads
- CORS enabled

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/DiyanshShah/Expense-Tracker.git
cd Expense-Tracker
```

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Install frontend dependencies
```bash
cd ../frontend
npm install
```

4. Create a .env file in the backend directory with the following variables
```env
PORT=8000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```

5. Start the development servers

Backend:
```bash
cd backend
npm run dev
```

Frontend:
```bash
cd frontend
npm run dev
```

## 📱 Application Structure

### Backend
```
backend/
├── config/          # Database configuration
├── controllers/     # Request handlers
├── middleware/      # Custom middleware (auth, upload)
├── models/          # Mongoose models
├── routes/          # API routes
└── uploads/         # Uploaded files
```

### Frontend
```
frontend/
├── src/
│   ├── assets/      # Static assets
│   ├── components/  # Reusable components
│   ├── context/     # Context providers
│   ├── hooks/       # Custom hooks
│   ├── pages/       # Page components
│   └── utils/       # Helper functions
```

## 🔒 API Endpoints

### Authentication
- POST `/api/v1/auth/register` - Register new user
- POST `/api/v1/auth/login` - Login user
- GET `/api/v1/auth/getUser` - Get user info

### Dashboard
- GET `/api/v1/dashboard` - Get dashboard statistics

### Income
- POST `/api/v1/income/add` - Add new income
- GET `/api/v1/income/get` - Get all income
- DELETE `/api/v1/income/:id` - Delete income
- GET `/api/v1/income/downloadExcel` - Download income data

### Expenses
- POST `/api/v1/expense/add` - Add new expense
- GET `/api/v1/expense/get` - Get all expenses
- DELETE `/api/v1/expense/:id` - Delete expense
- GET `/api/v1/expense/downloadExcel` - Download expense data

## 🎨 Features in Detail

- **Dashboard Overview**: Shows total balance, income, and expenses
- **Expense Analysis**: Bar chart showing last 30 days of expenses
- **Income Tracking**: Line chart displaying 60-day income trend
- **Recent Transactions**: Quick view of latest financial activities
- **Data Export**: Download financial data in Excel format
- **Profile Management**: Update profile photo and user information

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/DiyanshShah/Expense-Tracker/issues).

## 📝 License

This project is [MIT](https://choosealicense.com/licenses/mit/) licensed.

## 👤 Author

**Diyansh Shah**

- Github: [@DiyanshShah](https://github.com/DiyanshShah)
