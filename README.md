# Shasto Sheba – Healthcare Management System Frontend

A scalable, production-grade, and fully responsive healthcare management platform similar to modern telemedicine solutions, built with Next.js 16, TypeScript, and modern web technologies.

**[Live Demo]** [(your-demo-link)](https://shato-sheba-frontend.vercel.app/) **[Live Backend]** [(your-backend-link)](https://shastho-sheba-server.onrender.com/)

## Demo Credentials

**seed Admin**
- email: admin@gmail.com 
- password: 123456

**Admin**
- email: rahat@admin.com 
- password: 123456

**Doctor**
- email: rahat@doctor.com  
- password: 123456

**Patient**
- email: rahat@gmail.com   
- password: 123456

## 📖 Project Overview

This project provides a comprehensive role-based healthcare management application for Patients, Doctors, and Admins. It integrates with a backend API to offer AI-powered doctor matching, appointment booking, real-time consultations, user management, analytics, and more, with a polished and intuitive user interface.

## 🚀 Features

### Public Features
- **Modern Landing Page** with hero banner, service overview, testimonials, and CTA
- **AI Doctor Finder** with symptom analysis and smart recommendations
- **Specialty Browsing** with database-driven medical specialties
- **About, Services, FAQ, and Contact** pages
- **Fully responsive** and visually consistent across devices

### Authentication & Authorization
- **JWT-based authentication** with refresh token support
- **Role-based dashboards** for Patient, Doctor, and Admin
- **Persistent session management** and secure logout functionality
- **Password management** (forgot, reset, change password)
- **Profile management** with photo uploads and specialty selection

### Patient Dashboard
- **AI-Powered Doctor Discovery** with symptom-based matching
- **Appointment Booking** with real-time availability
- **Health Records Management** and prescription tracking
- **Payment Integration** with secure payment processing
- **Appointment History** with filtering and status tracking

### Doctor Dashboard
- **Schedule Management** with availability controls
- **Appointment Handling** (accept, reject, manage consultations)
- **Specialty Management** (add/remove medical specialties)
- **Patient Consultations** with appointment details
- **Profile & Credentials** management with verification

### Admin Dashboard
- **User Management** (search, filter, block/unblock users)
- **Advanced Appointment Management** with analytics
- **Doctor Verification** and specialty administration
- **System Analytics** with data visualizations
- **Content Management** for platform settings

### General Enhancements
- **Dark/Light Mode** with system preference detection
- **Ultra-Modern UI** with glass-morphism effects and animations
- **Skeleton loaders**, smooth transitions, and comprehensive error handling
- **Toast notifications** for success/error states
- **Lazy-loading** for optimal performance
- **Accessibility-compliant** and semantic HTML

## 🛠️ Technology Stack

### Frontend
- **Next.js 16** – React framework with App Router
- **TypeScript** – Type safety and enhanced development
- **Tailwind CSS** – Utility-first styling with custom animations
- **Radix UI** – Accessible component primitives
- **next-themes** – Dark/light mode management
- **Zod** – Runtime type validation
- **date-fns** – Date manipulation and formatting

### Backend Integration
- **RESTful API** – Comprehensive backend integration
- **JWT Authentication** – Secure token-based auth
- **File Upload** – Profile photos and document management
- **Real-time Updates** – Dynamic data synchronization

### Development Tools
- **Turbopack** – Fast development builds
- **ESLint** – Code linting and quality
- **TypeScript Strict Mode** – Enhanced type checking

## ⚙️ Setup Instructions

### 1. Clone the repository
```bash
git clone <repository-url>

```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_APP_URL=http://localhost:3000
JWT_SECRET=your-jwt-secret
RESET_PASS_TOKEN=your-reset-token
```

### 4. Run the development server
```bash
npm run dev
```
Frontend will run at `http://localhost:3000`

### 5. Build for production
```bash
npm run build
npm start
```

## 📂 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (commonLayout)/     # Public pages layout
│   ├── (dashboardLayout)/  # Dashboard pages layout
│   └── globals.css         # Global styles and animations
├── components/
│   ├── modules/            # Feature-specific components
│   ├── shared/             # Reusable UI components
│   ├── ui/                 # Base UI components (Radix)
│   └── providers/          # Context providers
├── services/               # API service layers
│   ├── auth/               # Authentication services
│   ├── admin/              # Admin management APIs
│   └── public/             # Public APIs
├── types/                  # TypeScript type definitions
├── lib/                    # Utility functions and configs
├── hooks/                  # Custom React hooks
└── zod/                    # Validation schemas
```

## 🎨 UI/UX Features

### Design System
- **Glass-morphism Effects** – Modern translucent design elements
- **Gradient Animations** – Dynamic color transitions and effects
- **Micro-interactions** – Smooth hover effects and transitions
- **Loading States** – Elegant skeleton loaders and spinners
- **Toast System** – User-friendly notifications

### Responsive Design
- **Mobile-First Approach** – Optimized for mobile devices
- **Tablet Support** – Enhanced layouts for tablet screens
- **Desktop Experience** – Full-featured desktop interface
- **Cross-Browser Compatibility** – Works on all modern browsers

## � Tecchnical Highlights

### Performance Optimizations
- **Static Site Generation** – Pre-rendered pages for optimal performance
- **Code Splitting** – Automatic route-based code splitting
- **Image Optimization** – Next.js Image component with lazy loading
- **API Caching** – Intelligent caching strategies with revalidation

### Type Safety
- **100% TypeScript Coverage** – Full type safety across the application
- **Strict Mode Configuration** – Enhanced type checking
- **Runtime Validation** – Zod schemas for API responses
- **Interface Definitions** – Comprehensive type definitions

### Security Features
- **Input Sanitization** – Protection against XSS attacks
- **CSRF Protection** – Cross-site request forgery prevention
- **Secure Headers** – Security headers configuration
- **Data Validation** – Client and server-side validation

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📝 Additional Notes

- **Server-side rendering** for SEO optimization
- **Role-based access control** with protected routes
- **Form validation** with comprehensive error handling
- **Accessibility compliance** with WCAG guidelines
- **Progressive enhancement** for better user experience

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For support, email: riwanhossainrahat@gmail.com or create an issue in this repository.

---

**Built with ❤️ for accessible healthcare solutions**
