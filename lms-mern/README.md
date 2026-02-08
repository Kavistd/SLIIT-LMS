# LMS MERN Stack Application

A comprehensive Learning Management System built with the MERN stack (MongoDB, Express.js, React, Node.js).

## Features

### 🎓 **Core LMS Features**
- **User Management**: Student, Instructor, and Admin roles
- **Department & Module Management**: Organize courses by departments and modules
- **Course Management**: Create and manage courses with enrollment
- **Quiz System**: Create quizzes with multiple question types
- **Attempt Tracking**: Track student quiz attempts and scores
- **Certificate Generation**: Automatic certificate generation upon course completion
- **Learning Materials**: Upload and manage course materials (videos, documents, etc.)
- **Community Forum**: Discussion boards for courses
- **Notifications**: Real-time notifications for important events

### 🚀 **Advanced Features**
- **Transcript Generation**: Generate academic transcripts
- **Study Guides**: AI-powered study guide generation
- **Text Summarization**: Summarize course content
- **Quiz Generation**: AI-powered quiz generation from course materials
- **PDF Generation**: Generate certificates and transcripts as PDFs

## Tech Stack

### Backend (Node.js/Express)
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer with Cloudinary integration
- **PDF Generation**: Puppeteer
- **Validation**: Custom validation middleware

### Frontend (React)
- **Framework**: React 18
- **Routing**: React Router v6
- **State Management**: Context API
- **HTTP Client**: Axios with interceptors
- **Styling**: Tailwind CSS
- **Build Tool**: Create React App

## Project Structure

```
lms-mern/
├── backend/                 # Backend API
│   ├── src/
│   │   ├── config/         # Configuration files
│   │   ├── controllers/    # Route controllers
│   │   ├── middlewares/    # Custom middleware
│   │   ├── models/         # MongoDB models
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic services
│   │   ├── utils/          # Utility functions
│   │   ├── app.js          # Express app
│   │   └── server.js       # Server entry point
│   ├── uploads/            # File uploads directory
│   ├── .env               # Environment variables
│   └── package.json
├── frontend/               # React frontend
│   ├── src/
│   │   ├── api/           # API calls
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── context/       # Context providers
│   │   ├── hooks/         # Custom hooks
│   │   ├── routes/        # Route definitions
│   │   ├── styles/        # Global styles
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # App entry point
│   ├── .env              # Environment variables
│   └── package.json
└── README.md             # This file
```

## Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- Cloudinary account (for file uploads)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd lms-mern/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE=30d
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   FRONTEND_URL=http://localhost:3000
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd lms-mern/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. Start the development server:
   ```bash
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Users
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user (Admin only)

### Courses
- `GET /api/courses` - Get all courses
- `POST /api/courses` - Create course (Admin only)
- `PUT /api/courses/:id` - Update course (Admin only)
- `DELETE /api/courses/:id` - Delete course (Admin only)

### Quizzes
- `GET /api/quizzes` - Get all quizzes
- `POST /api/quizzes` - Create quiz (Instructor only)
- `POST /api/quizzes/:id/submit` - Submit quiz attempt

### Materials
- `GET /api/materials` - Get all materials
- `POST /api/materials` - Upload material (Instructor only)
- `DELETE /api/materials/:id` - Delete material (Instructor only)

## Usage

1. **Start both servers** (backend on port 5000, frontend on port 3000)
2. **Register an account** or use the admin account
3. **Create departments and modules** (Admin only)
4. **Create courses** and assign instructors
5. **Upload materials** and create quizzes
6. **Enroll students** in courses
7. **Track progress** and generate certificates

## Roles and Permissions

### Student
- View courses and materials
- Take quizzes
- View grades and certificates
- Participate in community discussions

### Instructor
- All student permissions
- Create and manage courses
- Upload materials
- Create quizzes
- View student progress

### Admin
- All instructor permissions
- Manage users, departments, and modules
- View system analytics
- Manage all content

## Development

### Adding New Features
1. Create database models in `backend/src/models/`
2. Add controllers in `backend/src/controllers/`
3. Create routes in `backend/src/routes/`
4. Add API calls in `frontend/src/api/`
5. Create components in `frontend/src/components/`
6. Add pages in `frontend/src/pages/`

### Testing
- Backend: Add tests in `backend/tests/`
- Frontend: Add tests in `frontend/src/__tests__/`

## Deployment

### Backend Deployment
1. Set up MongoDB Atlas or similar
2. Configure environment variables
3. Deploy to Heroku, AWS, or similar platform

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy to Netlify, Vercel, or similar platform
3. Configure environment variables

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Create an issue in this repository
- Email: your-email@example.com