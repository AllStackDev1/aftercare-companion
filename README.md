# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/37f7fb5e-8a70-47a6-b641-cd1883554d65

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/37f7fb5e-8a70-47a6-b641-cd1883554d65) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Authentication System Documentation

This project includes a comprehensive authentication system that provides secure user management and route protection.

### Overview

The authentication system is built with a modular architecture that separates concerns between UI components, business logic, and data management. It's designed to be easily integrated with external APIs while providing a seamless user experience.

### Architecture

```
src/
├── contexts/
│   └── AuthContext.tsx          # Global authentication state management
├── services/
│   └── authService.ts           # Authentication business logic and API integration
├── components/
│   ├── AuthLayout.tsx           # Shared layout for authentication pages
│   ├── AuthNavigation.tsx       # Navigation component with auth-aware rendering
│   └── ProtectedRoute.tsx       # Route protection wrapper component
└── pages/
    ├── Login.tsx                # User login page
    ├── Signup.tsx               # User registration page
    └── ForgotPassword.tsx       # Password recovery page
```

### Core Components

#### AuthContext (`src/contexts/AuthContext.tsx`)
- **Purpose**: Centralized authentication state management using React Context
- **Features**:
  - User state management (authenticated user info)
  - Loading states for async operations
  - Authentication methods (login, signup, logout)
  - Persistent authentication state across app reloads

#### AuthService (`src/services/authService.ts`)
- **Purpose**: Abstraction layer for authentication operations
- **Features**:
  - Mock authentication for development (easily replaceable with real API)
  - Token management with localStorage
  - User session persistence
  - Type-safe interfaces for User and AuthResponse

#### ProtectedRoute (`src/components/ProtectedRoute.tsx`)
- **Purpose**: Automatically protect routes that require authentication
- **Features**:
  - Redirects unauthenticated users to login
  - Preserves intended destination for post-login redirect
  - Loading state handling during authentication checks

### Authentication Pages

#### Login Page (`src/pages/Login.tsx`)
- **Features**:
  - Form validation using React Hook Form + Zod
  - Email and password fields with real-time validation
  - "Remember me" functionality through persistent tokens
  - Link to password recovery
  - Link to registration page
  - Demo credentials for testing (test@example.com / password)

#### Signup Page (`src/pages/Signup.tsx`)
- **Features**:
  - User registration with name, email, and password
  - Password confirmation validation
  - Form validation using React Hook Form + Zod
  - Automatic login after successful registration
  - Link to login page for existing users

#### Forgot Password Page (`src/pages/ForgotPassword.tsx`)
- **Features**:
  - Email-based password recovery
  - Form validation for email format
  - Success/error feedback
  - Navigation back to login

### Security Features

1. **Form Validation**: All authentication forms use Zod schemas for type-safe validation
2. **Error Handling**: Comprehensive error states with user-friendly messages
3. **Loading States**: Visual feedback during authentication operations
4. **Token Management**: Secure token storage and retrieval
5. **Route Protection**: Automatic redirection for unauthorized access attempts

### User Experience Features

1. **Responsive Design**: Mobile-first approach with medical-themed styling
2. **Toast Notifications**: Real-time feedback for user actions
3. **Loading Indicators**: Visual feedback during async operations
4. **Form State Management**: Proper handling of form errors and success states
5. **Navigation Flow**: Seamless transitions between authentication states

### Integration with External APIs

The authentication system is designed for easy integration with external backends:

#### Current Implementation (Mock)
```typescript
// Mock authentication - development only
async login(email: string, password: string): Promise<AuthResponse> {
  // Simulated API call with localStorage
}
```

#### Production Implementation (Ready to uncomment)
```typescript
// Real API integration - production ready
async login(email: string, password: string): Promise<AuthResponse> {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  
  if (!response.ok) {
    throw new Error('Login failed');
  }
  
  return response.json();
}
```

### Usage Examples

#### Protecting a Route
```tsx
import ProtectedRoute from '@/components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}
```

#### Using Authentication Context
```tsx
import { useAuth } from '@/contexts/AuthContext';

function UserProfile() {
  const { user, logout, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return (
    <div>
      <h1>Welcome, {user?.name}!</h1>
      <button onClick={logout}>Sign Out</button>
    </div>
  );
}
```

### Styling and Theming

The authentication system uses a consistent design language:
- **Medical Theme**: Professional healthcare-focused color scheme
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **shadcn/ui**: High-quality, accessible UI components
- **Custom Color Palette**: Medical-inspired colors (medical-50, medical-600, etc.)

### Development vs Production

#### Development Features
- Mock authentication with predefined test credentials
- localStorage-based session management
- Console logging for debugging
- Simulated API delays for realistic testing

#### Production Readiness
- Easy API endpoint configuration
- Token-based authentication ready
- Error handling for network failures
- Security best practices implemented

### Future Enhancements

The system is designed to easily accommodate:
1. **OAuth Integration**: Social login with Google, GitHub, etc.
2. **Multi-factor Authentication**: SMS or email-based 2FA
3. **Role-based Access Control**: User permissions and roles
4. **Session Management**: Advanced session handling and refresh tokens
5. **Password Policies**: Configurable password requirements
6. **Account Management**: Profile updates, password changes, account deletion

### Testing Credentials

For development and testing:
- **Email**: test@example.com
- **Password**: password

### API Integration Notes

When integrating with a backend API:
1. Update the `authService.ts` endpoints to match your API
2. Configure proper CORS settings on your backend
3. Implement proper error handling for network failures
4. Set up refresh token logic if using JWT
5. Configure secure HTTP-only cookies for production

This authentication system provides a solid foundation for any React application requiring user management, with the flexibility to scale from a simple prototype to a production-ready application.

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/37f7fb5e-8a70-47a6-b641-cd1883554d65) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
