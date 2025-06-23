import api from './api';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  profilePicture?: any; // FormData file
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export const authService = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const formData = new FormData();
    formData.append('email', credentials.email);
    formData.append('password', credentials.password);

    const response = await api.post('/auth/login', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async signup(userData: SignupRequest): Promise<AuthResponse> {
    const formData = new FormData();
    formData.append('firstName', userData.firstName);
    formData.append('lastName', userData.lastName);
    formData.append('email', userData.email);
    formData.append('phoneNumber', userData.phoneNumber);
    formData.append('password', userData.password);
    formData.append('skillLevel', userData.skillLevel);
    
    if (userData.profilePicture) {
      formData.append('profilePicture', userData.profilePicture);
    }

    const response = await api.post('/auth/signup', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
}; 