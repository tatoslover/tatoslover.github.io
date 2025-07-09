# Express Labs - Introduction to Backend Development Portfolio

[![GitHub Repo](https://img.shields.io/badge/GitHub-Module5Lab-blue?logo=github)](https://github.com/tatoslover/Module5Lab)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-Available-brightgreen)](https://module5labportfolio.netlify.app)

This comprehensive portfolio demonstrates introduction to backend development practices, web services with JavaScript applications, MVC architecture development, backend service design, object-oriented development, and Swagger documentation across multiple exercises and technologies.

## Project Overview

A complete collection of introduction to backend development exercises showcasing:
- **Web Services & JavaScript Applications** (Server-side JavaScript implementation)
- **MVC Structure Development** (Model-View-Controller architecture patterns)
- **Backend Service Design** (RESTful API design and implementation)
- **Object-Oriented Development** (OOP principles in backend development)
- **Swagger Documentation** (API documentation and testing)
- **Professional Development Practices** (Testing, logging, and deployment)

## Technology Stack

| Exercise | Technology Stack | Key Features |
|----------|------------------|--------------|
| **Web Services** | Node.js, Express | Multiple server handling, Service architecture |
| **JavaScript Applications** | Node.js, Express | Server-side JavaScript, API endpoints |
| **MVC Structure** | Node.js, Express | Model-View-Controller development |
| **Backend Service Design** | Node.js, Express | RESTful design patterns, Service architecture |
| **Object-Oriented Development** | Node.js, Express, Classes | OOP principles, Class-based design |
| **Swagger Integration** | Swagger, OpenAPI | API documentation, Professional endpoints |
| **Testing & Validation** | Jest, Supertest | Backend testing strategies |
| **Enhanced Development** | Custom libraries | Logging, Security, Best practices |

## Project Structure

```
Module5Lab/
├── 📄 README.md                    # This comprehensive documentation
├── 📄 README Template.md           # Portfolio template reference
├── 🏠 index.html                   # Main portfolio landing page
├── 🔒 .gitignore                   # Git ignore patterns
├── .gitattributes                  # Git attributes
├──
├── 📁 exercise1/                   # Multiple Web Servers
│   ├── server1.js                  # Basic server (port 3001)
│   ├── server2.js                  # Data processing server (port 3002)
│   ├── server3.js                  # Utility server (port 3003)
│   └── swagger.yaml                # API documentation
├──
├── 📁 exercise2/                   # Calculator API
│   └── calculator.js               # Mathematical operations API
├──
├── 📁 exercise3/                   # Calculator Portfolio Interface
│   ├── calculator.html             # Frontend calculator interface
│   ├── calculator.css              # Calculator styling
│   └── calculator.js               # Frontend logic
├──
├── 📁 exercise4/                   # Friends API with Advanced Routing
│   └── friends.js                  # Advanced filtering and routing
├──
├── 📁 exercise5/                   # Friends API with MVC Architecture
│   ├── index.js                    # Main server file
│   ├── package.json                # Dependencies
│   ├── ARCHITECTURE.md             # Architecture documentation
│   ├── swagger.yaml                # API documentation
│   ├── controllers/                # Business logic
│   ├── models/                     # Data models
│   └── routes/                     # API routes
├──
├── 📁 exercise6/                   # Calculator API with Unit Tests
│   ├── calculator.js               # Calculator API
│   ├── calculator.test.js          # Unit tests
│   └── __tests__/                  # Test files
├──
├── 📁 exercise7/                   # Enhanced Calculator with Libraries
│   ├── app.js                      # Main application
│   ├── demo.js                     # Interactive demo
│   ├── package.json                # Dependencies
│   ├── README.md                   # Exercise documentation
│   ├── swagger.yaml                # API documentation
│   ├── controllers/                # HTTP controllers
│   ├── libraries/                  # Custom libraries (Calculator, Logger, IdGenerator)
│   ├── routes/                     # API routes
│   ├── tests/                      # Comprehensive test suite
│   └── coverage/                   # Test coverage reports
├──
├── 📁 exercise8/                   # eCommerce API with Swagger
│   ├── server.js                   # eCommerce API server
│   ├── swagger.yaml                # API documentation
│   └── routes/                     # API endpoints
└──
└── 📁 portfolio/                   # Portfolio Interface
    ├── index.html                  # Portfolio landing page
    ├── calculator.html             # Calculator demo
    ├── friends.html                # Friends API demo
    ├── fakestore.html              # eCommerce demo
    ├── ports.html                  # Server ports overview
    ├── swagger.html                # API documentation viewer
    ├── css/                        # Stylesheets
    │   ├── main.css                # Main portfolio styles
    │   ├── calculator.css          # Calculator styles
    │   ├── friends.css             # Friends API styles
    │   ├── fakestore.css           # eCommerce styles
    │   ├── ports.css               # Ports overview styles
    │   ├── swagger.css             # Swagger viewer styles
    │   └── redirect.css            # Redirect page styles
    ├── js/                         # JavaScript files
    │   ├── main.js                 # Main portfolio logic
    │   ├── calculator.js           # Calculator interface
    │   ├── friends.js              # Friends API interface
    │   ├── fakestore.js            # eCommerce interface
    │   ├── ports.js                # Ports management
    │   ├── swagger.js              # Swagger integration
    │   └── redirect.js             # Redirect handling
    └── swagger/                    # Swagger specifications
        ├── exercise1.yaml          # Multiple servers API
        ├── exercise2.yaml          # Calculator API
        ├── exercise3.yaml          # Portfolio interface
        ├── exercise4.yaml          # Friends API
        ├── exercise5.yaml          # MVC Friends API
        ├── exercise6.yaml          # Tested Calculator API
        ├── exercise7.yaml          # Enhanced Calculator API
        └── exercise8.yaml          # eCommerce API
```

## Key Learning Outcomes

1. **Backend Development Principles** - Server architecture and API design
2. **MVC Architecture Implementation** - Proper separation of concerns
3. **Testing Strategies** - Unit testing and integration testing
4. **API Documentation** - Professional documentation with Swagger
5. **Real-time Communication** - WebSocket implementation
6. **Production-ready Code** - Error handling, logging, and security

## Files in This Portfolio

- `README.md` - This comprehensive guide
- `package.json` - Project dependencies and npm scripts
- `index.html` - Portfolio landing page
- `exercise1/` - Multiple web servers demonstration
- `exercise2/` - Calculator API implementation
- `exercise3/` - Frontend-backend integration
- `exercise4/` - Advanced routing and filtering
- `exercise5/` - MVC architecture implementation
- `exercise6/` - Unit testing demonstration
- `exercise7/` - Enhanced libraries and logging
- `exercise8/` - Professional API documentation

---

## 🚀 Backend Exercises

### Exercise 1: Multiple Web Servers
Run multiple Express servers on different ports simultaneously.
```bash
npm run server1  # Port 3001 - Basic server
npm run server2  # Port 3002 - Data processing
npm run server3  # Port 3003 - Utility server
```

### Exercise 2: Calculator API
Mathematical operations via RESTful API endpoints.
```bash
npm run calculator  # Port 3004
# Endpoints: /add, /subtract, /multiply, /divide
```

### Exercise 3: Calculator Portfolio Interface
Frontend calculator connecting to backend API.
```bash
npm run portfolio  # Port 3005
# Full calculator interface with real-time calculations
```

### Exercise 4: Friends API with Advanced Routing
Advanced filtering, CRUD operations, and routing.
```bash
npm run friends  # Port 3006
# Features: Filter by gender, name, ID lookup, updates
```

### Exercise 5: Friends API with MVC Architecture
Clean MVC implementation with proper separation of concerns.
```bash
npm run friends-mvc  # Port 3007
# Enhanced architecture with controllers, models, routes
```

### Exercise 6: Calculator API with Unit Tests
Test-driven development with Jest and Supertest.
```bash
npm run calculator-tests  # Port 3008
npm test  # Run test suite
```

### Exercise 7: Enhanced Calculator with Libraries
Custom libraries for logging, ID generation, and security.
```bash
npm run enhanced-calculator  # Port 3009
# Features: Structured logging, secure ID generation
```

### Exercise 8: eCommerce API with Swagger Documentation
Professional API documentation with Swagger/OpenAPI.
```bash
npm run ecommerce  # Port 3010
# Access Swagger UI at: /api-docs
```

## 🧪 Testing

Run comprehensive test suites:
```bash
npm test           # Run all tests
npm run test:watch # Watch mode
npm run test:coverage # Test coverage report
```

## 📚 Documentation

Each exercise includes:
- **Setup instructions** - How to run the application
- **API endpoints** - Complete endpoint documentation
- **Testing examples** - Sample requests and responses
- **Architecture notes** - Implementation details and patterns

## 🔧 Development Scripts

```bash
npm install        # Install dependencies
npm run kill-ports # Free up ports
npm test          # Run test suite
npm run lint      # Code linting
npm run dev       # Development mode
```

---

*This portfolio demonstrates comprehensive backend development skills including API design, database integration, testing strategies, and professional documentation practices.*
