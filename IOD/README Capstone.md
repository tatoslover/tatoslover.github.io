# 🧙‍♂️ Planeswalker's Primer

> **A comprehensive Magic: The Gathering learning platform for beginners**

[![Production Ready](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)](https://capstone-rho-wheat.vercel.app)
[![Security Score](https://img.shields.io/badge/Security-100%2F100-brightgreen)](#security--production-readiness)
[![Tests Passing](https://img.shields.io/badge/Tests-96%20Passing-brightgreen)](#testing--quality-assurance)
[![Performance](https://img.shields.io/badge/Performance-Monitored-blue)](#performance-monitoring)

A professional-grade MTG beginner's guide featuring interactive learning, card search, favourites management, and real-time performance monitoring. Built with modern web technologies and production-ready architecture.

## 🌟 Key Features

### 📚 **Comprehensive Learning System**
- ✅ **Comprehensive Reference** - Access all MTG fundamentals in one place
- ✅ **Six Colours Guide** - Complete colour identity system including colourless
- ✅ **Card Types & Anatomy** - Detailed breakdowns of card components
- ✅ **Turn Phases** - Interactive phase-by-phase gameplay guide
- ✅ **Win Conditions** - Primary and alternative victory conditions
- ✅ **Deck Building** - Fundamental rules and construction principles
- ✅ **Combat System** - Step-by-step combat mechanics
- ✅ **273 Mechanics Database** - Complete keyword and ability reference with categorisation
- ✅ **23 Game Formats** - All major MTG formats with accurate categorisation

### 🔍 **Advanced Card Management**
- ✅ **Live Card Search** - Real-time Scryfall API integration with 20,000+ cards
- ✅ **Advanced Filtering** - Search by colour, type, rarity, mana cost
- ✅ **Favourites System** - Save and manage your favourite cards with notes
- ✅ **Card Details Modal** - Comprehensive card information display
- ✅ **Mobile-Responsive Design** - Optimised for all device sizes

### ⚡ **Performance & Monitoring**
- ✅ **Real-time Performance Dashboard** - Monitor Web Vitals, API response times, memory usage
- ✅ **Health Indicators** - System status monitoring with recommendations
- ✅ **Error Tracking** - Comprehensive error handling and reporting
- ✅ **Connection Status** - Live backend connectivity monitoring

### 🎨 **Professional UI/UX**
- ✅ **MTG-Themed Design** - Wizard icons, mana symbols, immersive colour schemes
- ✅ **Dark Mode Optimised** - Professional dark theme with UK English throughout
- ✅ **Accessibility Features** - Keyboard shortcuts, screen reader support
- ✅ **Quick Reference Panel** - Floating MTG rules reference

### 📊 **Data Integration**
- ✅ **Automated Data Pipeline** - Scripts for updating all content from authoritative sources
- ✅ **Game Modes Data** - Comprehensive scraped data for 23 MTG formats
- ✅ **Enhanced Mechanics Scraper** - 273 mechanics with descriptions and rules text
- ✅ **Wiki Integration** - Curated content from MTG Wiki and official sources

## 🚀 Live Demo

- **🌐 Frontend**: [https://capstone-rho-wheat.vercel.app](https://capstone-rho-wheat.vercel.app)
- **🔧 Backend API**: [https://capstone-production-e2db.up.railway.app](https://capstone-production-e2db.up.railway.app)
- **📖 API Documentation**: [/api-docs](https://capstone-production-e2db.up.railway.app/api-docs)

## 🎨 Design

- **📱 Figma Design**: [View Mobile Design Mockups](https://www.figma.com/proto/X6Yi5UFrELNmPJqNR5Ghbr/Capstone_Mobile?node-id=1-125&p=f&t=iCqmRz0wtU6cs5wZ-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1)

## 🏗️ Architecture & Tech Stack

### **Frontend** (Next.js 14)
- **Framework**: Next.js 14 with React 18
- **Styling**: CSS-in-JS with comprehensive globals.css
- **State Management**: React Context API with custom hooks
- **Performance**: Web Vitals monitoring, code splitting, optimised images
- **Deployment**: Vercel with automatic deployments

### **Backend** (Express.js)
- **Framework**: Express.js with comprehensive middleware
- **Database**: PostgreSQL with connection pooling
- **API**: RESTful design with Swagger/OpenAPI documentation
- **Security**: Rate limiting, CORS, input validation, security headers
- **Deployment**: Railway with manual deployment process

#### API Endpoints
- **Health**: `GET /health` - System health cheque
- **Users**: Full CRUD operations for user management
- **Favourites**: Create, read, update, delete favourite cards
- **Messages**: CRUD operations for system messages
- **Monitoring**: `/api/monitoring/*` - Performance metrics and dashboards

### **Data Sources**
- **Scryfall API**: Live MTG card data and search
- **Custom Database**: User management and favourites system
- **Scraped Content**: 273 mechanics, 23 game formats, comprehensive rules

## 📊 Release History

| Version | Date | Description | Key Features |
|---------|------|-------------|--------------|
| **v1.0.0** | Current | 🎉 Final Release | Complete production-ready application with all features implemented |
| **v0.3.0** | - | 🚀 Production Ready | Testing suite (96 tests), security audit (100/100), deployment |
| **v0.2.0** | - | ⚡ Performance & Monitoring | Real-time dashboard, health indicators, performance optimisation |
| **v0.1.0** | - | 🎯 Core Foundation | User system, favourites, MTG card integration, responsive UI |

*View detailed release notes on [GitHub Releases](https://github.com/tatoslover/Capstone/releases)*

## 🛡️ Security & Production Readiness

### **Perfect Security Score: 100/100** ✅

- ✅ **Zero Vulnerabilities** - All dependencies clean and updated
- ✅ **Security Headers** - Comprehensive frontend + backend security headers
- ✅ **Rate Limiting** - API protection (100 req/15min general, 10 req/sec Scryfall)
- ✅ **CORS Protection** - Proper origin validation and security policies
- ✅ **Input Validation** - Payload size limits and data sanitisation
- ✅ **HTTPS Enforcement** - SSL/TLS encryption across all connections
- ✅ **Error Handling** - Secure error responses without data leakage

*See [`SECURITY.md`](SECURITY.md) for complete security documentation*

## 🧪 Testing & Quality Assurance

### **96 Tests Passing** ✅

- **Unit Tests** - Component and utility function testing
- **Integration Tests** - API endpoint and database operation testing
- **Performance Tests** - Response time and memory usage validation
- **Security Tests** - Vulnerability scanning and penetration testing
- **E2E Testing** - Complete user workflow validation

```bash
# Run test suite
cd frontend && npm test
cd backend && npm test
```

*See [`TESTING.md`](TESTING.md) for comprehensive testing documentation*

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- Git

### Development Setup

**1. Clone the repository**
```bash
git clone https://github.com/tatoslover/Capstone.git
cd Capstone
```

**2. Backend setup**
```bash
cd backend
npm install
cp .env.example .env
# Configure your database URL in .env
npm run dev
```
*Backend runs on `http://localhost:3001`*

**3. Frontend setup**
```bash
cd frontend
npm install
cp .env.local.example .env.local
# Set NEXT_PUBLIC_API_URL=http://localhost:3001
npm run dev
```
*Frontend runs on `http://localhost:3000`*

### Environment Variables

**Backend** (`.env`)
```env
DATABASE_URL=postgresql://username:password@localhost:5432/database
PORT=3001
NODE_ENV=development
```

**Frontend** (`.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 📈 Performance Monitoring

Access the performance dashboard in development:
- **Keyboard Shortcut**: `Ctrl+Shift+P`
- **Floating Button**: 📊 (top-right corner)
- **Documentation Page**: Performance Monitoring section

**Production Access**: Set `localStorage.setItem('enablePerformanceDashboard', 'true')`

### Monitoring Features
- 📊 **Web Vitals** - LCP, FID, CLS tracking
- 🚀 **API Performance** - Response times and error rates
- 💾 **Memory Usage** - Real-time memory monitoring
- 🔗 **Connection Health** - Backend connectivity status
- 📱 **Device Metrics** - Screen size and performance correlation

## 📁 Project Structure

```
Capstone/
├── frontend/                    # Next.js React application
│   ├── components/             # Reusable React components
│   │   ├── Layout/            # Page layout and navigation
│   │   ├── PerformanceDashboard.js
│   │   └── UserSelector.js    # User management
│   ├── contexts/              # React context providers
│   ├── data/                  # Static JSON data files
│   ├── pages/                 # Next.js page components
│   ├── services/              # API integration services
│   ├── styles/                # CSS and styling
│   ├── tests/                 # Jest test suites
│   └── utils/                 # Utility functions
├── backend/                    # Express.js API server
│   ├── routes/                # API route handlers
│   ├── middleware/            # Express middleware
│   ├── scripts/               # Database and utility scripts
│   └── tests/                 # API test suites
├── security/                   # Security documentation
├── scripts/                    # Data scraping and automation
└── docs/                      # Project documentation
```

## 🎯 Learning Objectives Achieved

- ✅ **Full-Stack Development** - Modern React frontend with Express.js backend
- ✅ **Database Integration** - PostgreSQL with complex queries and relationships
- ✅ **API Development** - RESTful API design with comprehensive documentation
- ✅ **Security Implementation** - Production-grade security measures
- ✅ **Performance Optimisation** - Real-time monitoring and optimisation
- ✅ **Testing Strategy** - Comprehensive test coverage across stack
- ✅ **DevOps Practices** - Monitoring, deployment, and infrastructure management
- ✅ **Professional Documentation** - Technical writing and code documentation

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Health cheque and system status |
| `GET` | `/api/users` | Get all users |
| `POST` | `/api/users` | Create new user |
| `GET` | `/api/favourites/:userId` | Get user's favourite cards |
| `POST` | `/api/favourites` | Add card to favourites |
| `DELETE` | `/api/favourites/:id` | Remove favourite card |
| `GET` | `/api/monitoring/performance` | Performance metrics |
| `GET` | `/api-docs` | Swagger API documentation |

*Complete API documentation available at `/api-docs`*

## 📁 Project Structure

```
Capstone/
├── frontend/          # Next.js application
│   ├── components/    # React components
│   ├── pages/         # Next.js pages
│   ├── styles/        # Global CSS and styling
│   ├── services/      # API service layer
│   ├── contexts/      # React contexts
│   ├── data/          # Static JSON data
│   └── tests/         # Frontend test suite
├── backend/           # Express.js API
│   ├── server.js      # Main server file
│   ├── db-enhanced.js # Database operations
│   ├── middleware/    # Custom middleware
│   └── routes/        # API routes
├── scripts/           # Utility scripts
│   └── scrapers/      # Data collection scripts
├── security/          # Security validation
└── docs/              # Documentation
```

## 🤝 Contributing

This is an academic capstone project. For assessment purposes, please refer to:
- [`README.md`](README.md) - Project overview and features
- [`TESTING.md`](TESTING.md) - Testing strategy and results
- [`SECURITY.md`](SECURITY.md) - Security implementation and audit
- [Figma Design](https://www.figma.com/proto/X6Yi5UFrELNmPJqNR5Ghbr/Capstone_Mobile?node-id=1-125&p=f&t=iCqmRz0wtU6cs5wZ-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1) - Mobile UI/UX mockups

## 📄 Licence & Legal

This is an independent academic project. Magic: The Gathering is a trademark of Wizards of the Coast. Card data provided by [Scryfall](https://scryfall.com) under their generous API terms.

## 🎖️ Achievement Summary

- 🏆 **Production-Ready Application** with comprehensive feature set
- 🔒 **Perfect Security Score** (100/100) with zero vulnerabilities
- ⚡ **Performance Excellence** with real-time monitoring and optimisation
- 🧪 **Quality Assurance** with 96 passing tests across frontend and backend
- 🎨 **Professional UI/UX** with responsive design and accessibility features
- 📚 **Comprehensive Documentation** with technical and user guides
- 🚀 **Modern DevOps** with automated deployment and monitoring

---

*Built with ❤️ for the Magic: The Gathering community*