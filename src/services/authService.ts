export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// Mock implementation - replace with real API calls
class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'user_data';

  async login(email: string, password: string): Promise<AuthResponse> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock validation
    if (email === 'test@example.com' && password === 'password') {
      const user: User = {
        id: '1',
        email: email,
        name: 'Test User'
      };
      const token = 'mock_jwt_token';
      
      localStorage.setItem(this.TOKEN_KEY, token);
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
      
      return { user, token };
    }
    
    throw new Error('Invalid credentials');
  }

  async signup(email: string, password: string, name: string): Promise<AuthResponse> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user: User = {
      id: Date.now().toString(),
      email: email,
      name: name
    };
    const token = 'mock_jwt_token';
    
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    
    return { user, token };
  }

  async getCurrentUser(): Promise<User | null> {
    const token = localStorage.getItem(this.TOKEN_KEY);
    const userData = localStorage.getItem(this.USER_KEY);
    
    if (token && userData) {
      return JSON.parse(userData);
    }
    
    return null;
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // TODO: Replace with real API integration
  // async login(email: string, password: string): Promise<AuthResponse> {
  //   const response = await fetch('/api/auth/login', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ email, password })
  //   });
  //   
  //   if (!response.ok) {
  //     throw new Error('Login failed');
  //   }
  //   
  //   return response.json();
  // }
}

export const authService = new AuthService();