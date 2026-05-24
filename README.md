# BDA CRM Dashboard for Manufacturing Company

A comprehensive Customer Relationship Management (CRM) dashboard built with the MERN stack for Business Development Associates to manage customer leads, monitor sales workflows, and track analytics.

## Project Overview

BDA CRM is a modern web application designed for manufacturing companies to streamline their business development operations. It provides an intuitive interface for tracking lead status, managing customer information, monitoring conversion rates, and analyzing sales performance through interactive dashboards and analytics.

## Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **Lucide React** - Icon library
- **Recharts** - Data visualization library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB Atlas** - NoSQL cloud database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## Features

### Authentication & Authorization
- User registration and login with JWT authentication
- Secure password hashing with bcrypt
- Protected routes requiring authentication
- Automatic token management with localStorage
- Role-based access control (BDA, Manager, Admin)
- Automatic role assignment based on email during registration

### Lead Management
- Create, read, update, and delete leads
- Lead status tracking (New, Contacted, In Progress, Converted)
- Search leads by name, company, email, or phone
- Filter leads by status
- Edit permissions based on ownership and role
- Delete permissions restricted to Manager and Admin roles
- Lead ownership tracking with createdBy field

### Dashboard
- Welcome message with personalized greeting
- Summary cards showing key metrics
- Total leads count
- New leads count
- Converted leads count
- In-progress leads count
- Recent leads table with status indicators
- Visual status badges

### Analytics
- Lead status distribution with pie chart
- Monthly lead activity with bar chart
- Conversion rate calculation
- Detailed status breakdown table
- Summary cards with analytics metrics
- Real-time data visualization

### User Interface
- Modern, responsive design with Tailwind CSS
- Mobile-friendly sidebar navigation
- Clean and intuitive user experience
- Loading states and error handling
- User profile display with role information
- Professional color scheme and typography

## Folder Structure

```
BDA_CRM/
├── client/                 # React frontend
│   ├── components/         # Reusable components
│   │   ├── DashboardLayout.jsx
│   │   ├── Navbar.jsx
│   │   └── Sidebar.jsx
│   ├── context/            # React context
│   │   └── AuthContext.jsx
│   ├── pages/              # Page components
│   │   ├── Dashboard.jsx
│   │   ├── Leads.jsx
│   │   ├── Analytics.jsx
│   │   └── Login.jsx
│   ├── services/           # API services
│   │   ├── axios.js
│   │   ├── authService.js
│   │   └── leadService.js
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── postcss.config.js
└── server/                 # Express backend
    ├── controllers/        # Route controllers
    │   ├── authController.js
    │   └── leadController.js
    ├── middleware/         # Custom middleware
    │   └── authMiddleware.js
    ├── models/             # Mongoose models
    │   ├── User.js
    │   └── Lead.js
    ├── routes/             # API routes
    │   ├── authRoutes.js
    │   └── leadRoutes.js
    ├── index.js            # Server entry point
    ├── .env.example        # Environment variables template
    └── package.json
```

## Installation and Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account
- npm or yarn

### Backend Setup

1. **Navigate to server directory**
```bash
cd server
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:
```env
PORT=7001
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secure_jwt_secret_key
```

4. **Start the server**
```bash
npm run dev
```
Server will run on `http://localhost:7001`

### Frontend Setup

1. **Navigate to client directory**
```bash
cd client
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```
Client will run on `http://localhost:3000`

## Environment Variables

Create a `.env` file in the `server` directory with the following variables:

```env
PORT=7001
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/bda_crm
JWT_SECRET=your_secure_jwt_secret_key_here
```

### Variable Descriptions
- **PORT**: Server port number (default: 7001)
- **MONGODB_URI**: MongoDB Atlas connection string
- **JWT_SECRET**: Secret key for JWT token generation (use a strong, random string)

## API Routes

### Authentication

**Register User**
```
POST /api/auth/register
Content-Type: application/json

Body:
{
  "name": "Sravs",
  "email": "sravs@example.com",
  "password": "password123"
}

Response:
{
  "message": "User registered successfully",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "Sravs",
    "email": "sravs@example.com",
    "role": "bda"
  }
}
```

**Login User**
```
POST /api/auth/login
Content-Type: application/json

Body:
{
  "email": "sravs@example.com",
  "password": "password123"
}

Response:
{
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "Sravs",
    "email": "sravs@example.com",
    "role": "bda"
  }
}
```

### Role Assignment
- Default role: `bda`
- Manager role: Register with email `manager@company.com`
- Admin role: Register with email `admin@company.com`

### Lead Management

**Get All Leads**
```
GET /api/leads
Headers:
Authorization: Bearer <jwt_token>
```

**Create Lead**
```
POST /api/leads
Headers:
Authorization: Bearer <jwt_token>
Content-Type: application/json

Body:
{
  "leadName": "user1",
  "company": "ABC",
  "email": "user@abc.com",
  "phone": "9876543210",
  "status": "New",
  "notes": "Potential manufacturing client"
}
```

**Update Lead**
```
PUT /api/leads/:id
Headers:
Authorization: Bearer <jwt_token>
Content-Type: application/json

Body:
{
  "leadName": "user1",
  "company": "ABC",
  "email": "user@abc.com",
  "phone": "9876543210",
  "status": "Contacted",
  "notes": "Initial meeting scheduled"
}
```

**Delete Lead**
```
DELETE /api/leads/:id
Headers:
Authorization: Bearer <jwt_token>
```

### Permission Rules

**Edit Permission**
- BDA users can edit only their own leads
- Manager and Admin users can edit all leads

**Delete Permission**
- BDA users cannot delete leads
- Manager and Admin users can delete all leads

## Role-Based Access Control

### BDA (Business Development Associate)
- Create leads
- View all leads
- Edit own leads only
- Cannot delete leads
- Access to Dashboard, Leads, and Analytics

### Manager
- Create leads
- View all leads
- Edit all leads
- Delete all leads
- Access to Dashboard, Leads, and Analytics

### Admin
- Create leads
- View all leads
- Edit all leads
- Delete all leads
- Full system access
- Access to Dashboard, Leads, and Analytics

## Future Enhancements

- **Notifications System** - Real-time alerts for lead updates and status changes
- **Lead Assignment** - Ability to assign leads to specific team members
- **Team Chat** - Internal messaging system for team collaboration
- **Email Integration** - Automated email notifications and follow-ups
- **Advanced Analytics** - More detailed reporting and forecasting
- **Export Functionality** - Export leads to CSV/PDF formats
- **Custom Fields** - Configurable lead fields based on business needs
- **Activity Timeline** - Track all lead activities and interactions
- **Mobile App** - Native mobile application for on-the-go access
- **Integration Hub** - Connect with third-party CRM and marketing tools

## License

This project is licensed under the ISC License.
