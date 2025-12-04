# Ìæì Dissertation Registration System - PostgreSQL

A complete web application for student and teacher dissertation registration with email domain validation, built with **React** frontend and **Node.js + PostgreSQL** backend.

## ‚úÖ Key Features

### Ì¥ê Authentication & Authorization
- **Email Domain Validation**: Automatic user type detection based on educational email domains
- **Secure Registration**: Password hashing with bcrypt
- **JWT Authentication**: Token-based session management
- **Role-Based Access**: Student and Professor dashboards
- **Protected Routes**: Authentication-required pages

### Ì≥ä Database & Backend
- **PostgreSQL Database**: Modern, scalable relational database with Sequelize ORM
- **RESTful API**: Clean, documented API endpoints
- **Input Validation**: Comprehensive request validation with express-validator
- **Error Handling**: Graceful error responses
- **Production Ready**: Azure deployment configured

### Ìæ® Frontend
- **React 18**: Modern React with hooks and context
- **Responsive Design**: Mobile-first UI
- **Real-time Validation**: Instant feedback on forms
- **Dashboard System**: Role-specific interfaces
- **API Integration**: Axios-based API communication

## Ì∫Ä Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 15+
- npm or yarn

### 1. Backend Setup
```bash
cd backend
npm install

# Create .env file with PostgreSQL config
DB_HOST=localhost
DB_PORT=5432
DB_NAME=dissertation_registration_dev
DB_USERNAME=postgres
DB_PASSWORD=your-password
JWT_SECRET=your-super-secure-jwt-secret
PORT=5000
FRONTEND_URL=http://localhost:3000

npm start
```

### 2. Frontend Setup
```bash
cd dissertation-registration
npm install

# Create .env file
echo "REACT_APP_API_URL=http://localhost:5000" > .env

npm start
```

### 3. Access Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Health Check: http://localhost:5000/api/health

## ÌæØ Email Domain Validation

### Student Domains
- @stud.ase.ro, @student.ase.ro (ASE)
- @student.upt.ro (UPT), @student.utcluj.ro (UTC)
- @stud.ubbcluj.ro (UBB), @student.upb.ro (UPB)

### Professor Domains  
- @ase.ro, @ie.ase.ro (ASE)
- @upt.ro (UPT), @utcluj.ro (UTC)
- @ubbcluj.ro (UBB), @upb.ro (UPB)

## Ì≥ö API Endpoints

### Authentication
- POST /api/auth/register - User registration
- POST /api/auth/login - User login
- GET /api/auth/verify - Token validation
- GET /api/auth/profile - User profile
- PUT /api/auth/complete-profile - Profile completion

### Users
- GET /api/users/students - All students (protected)
- GET /api/users/professors - All professors (protected)
- GET /api/users/me - Current user (protected)

## Ì∑ÑÔ∏è PostgreSQL Database

### Users Table (Sequelize Model)
- id: SERIAL PRIMARY KEY
- email: VARCHAR(255) UNIQUE NOT NULL
- password: VARCHAR(255) (bcrypt hash)
- name: VARCHAR(255) NOT NULL
- user_type: ENUM('student', 'profesor')
- student_details: JSONB
- professor_details: JSONB
- is_verified: BOOLEAN DEFAULT false
- profile_complete: BOOLEAN DEFAULT false
- created_at, updated_at: TIMESTAMPS

## Ì∫Ä Azure Deployment

Ready for Azure cloud deployment:
- **Azure Database for PostgreSQL**: Database hosting
- **Azure App Service**: Backend API
- **Azure Static Web Apps**: Frontend hosting
- **Estimated cost**: ~$13-15/month

See `deployment/AZURE_DEPLOYMENT_GUIDE.md` for complete instructions.

## Ìª†Ô∏è Technology Stack

### Backend
- Node.js 18 + Express.js
- PostgreSQL 15 + Sequelize ORM
- JWT Authentication + bcrypt
- express-validator

### Frontend  
- React 18 + React Router v6
- Axios HTTP client
- React Context (state management)
- CSS3 responsive design

### Cloud
- Microsoft Azure
- Azure Database for PostgreSQL
- Azure App Service
- Azure Static Web Apps

## Ì≥ã Status

### ‚úÖ Completed
- [x] PostgreSQL migration from MongoDB
- [x] User authentication system
- [x] Email domain validation
- [x] Role-based dashboards
- [x] Azure deployment config
- [x] Production ready

### Ì¥Ñ Future Features
- [ ] Dissertation topic management
- [ ] Application submissions
- [ ] File upload system
- [ ] Email notifications

## Ì≥ù Migration Notes

**Successfully migrated from MongoDB/Mongoose to PostgreSQL/Sequelize:**
- ‚úÖ Replaced all Mongoose models with Sequelize
- ‚úÖ Updated database queries and connections
- ‚úÖ Maintained all existing functionality
- ‚úÖ Added proper constraints and indexing
- ‚úÖ Environment configuration updated

## Ì∑™ Testing

Register with educational emails to test:
- Student: test@stud.ase.ro
- Professor: prof@ase.ro

## Ì≥û Support

For issues or questions, contact your academic advisor.

---

**Ìæâ Production Ready!** PostgreSQL ‚úÖ | JWT Auth ‚úÖ | Azure Ready ‚úÖ

