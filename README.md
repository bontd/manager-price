# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Manager Price

A React-based expense management application with comprehensive error handling and internationalization support.

## Features

- **Expense Management**: Track and categorize expenses
- **User Management**: Manage user accounts and permissions
- **Analytics**: Visualize expense data with charts
- **Internationalization**: Support for English and Vietnamese
- **Comprehensive Error Handling**: Detailed error messages for different scenarios

## Error Handling System

The application implements a sophisticated error handling system that provides specific error messages for different HTTP status codes and response formats.

### Response Format Support

The system supports multiple response formats from the server:

1. **Custom Status in Body** (Highest Priority):
   ```json
   {
     "status": 404,
     "message": "Expense not found"
   }
   ```

2. **Custom Message Only**:
   ```json
   {
     "message": "Invalid expense data"
   }
   ```

3. **HTTP Status Code Only** (Fallback):
   ```http
   HTTP/1.1 404 Not Found
   ```

### HTTP Status Code Mapping

| Status Code | Error Type | Description |
|-------------|------------|-------------|
| 400 | BAD_REQUEST | Invalid request data |
| 401 | UNAUTHORIZED | Authentication required |
| 403 | FORBIDDEN | Access denied |
| 404 | NOT_FOUND | Resource not found |
| 409 | CONFLICT | Resource conflict |
| 422 | UNPROCESSABLE_ENTITY | Invalid data format |
| 500 | INTERNAL_SERVER_ERROR | Server internal error |
| 502 | BAD_GATEWAY | Gateway error |
| 503 | SERVICE_UNAVAILABLE | Service unavailable |

### Error Message Features

- **Specific Messages**: Each error type has a dedicated, user-friendly message
- **Internationalization**: Error messages are available in both English and Vietnamese
- **Debouncing**: Prevents duplicate error messages within 3 seconds
- **Retry Mechanism**: Automatic retry for network errors
- **Token Refresh**: Automatic token refresh for authentication errors
- **Flexible Response Handling**: Supports multiple server response formats

### Usage

The error handling is automatically applied to all API calls. Error messages will be displayed as toast notifications with appropriate styling and content based on the error type.

**Example:**
```javascript
// When server returns: {"status": 404, "message": "Expense not found"}
// User sees: "Expense not found" (custom message from server)

// When server returns: HTTP 404 without custom message
// User sees: "Resource not found" (default message)
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── api/
│   ├── config.ts          # API configuration with error handling
│   └── index.ts           # API endpoints
├── components/            # Reusable components
├── hooks/                 # Custom React hooks
├── locales/               # Internationalization files
│   ├── en.json           # English translations
│   └── vi.json           # Vietnamese translations
├── pages/                 # Page components
├── stores/                # State management
├── types/                 # TypeScript type definitions
└── utils/                 # Utility functions
    └── constants/
        └── api.ts        # API constants and error message keys
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
