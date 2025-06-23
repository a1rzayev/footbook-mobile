# Footbook Mobile Authentication

This document describes the authentication implementation in the Footbook mobile app.

## Features

- **Login Screen**: Email and password authentication
- **Signup Screen**: Complete user registration with profile picture
- **Secure Token Storage**: Using Expo SecureStore for JWT tokens
- **Automatic Token Refresh**: Handles expired tokens automatically
- **Authentication Context**: Global state management for auth
- **Form Validation**: Using react-hook-form and yup validation

## File Structure

```
footbook-mobile/
├── app/
│   ├── auth/
│   │   ├── _layout.tsx          # Auth navigation layout
│   │   ├── login.tsx            # Login screen
│   │   └── signup.tsx           # Signup screen
│   └── _layout.tsx              # Root layout with auth routing
├── components/
│   └── ui/
│       ├── Button.tsx           # Reusable button component
│       ├── Input.tsx            # Reusable input component
│       └── Picker.tsx           # Reusable picker component
├── contexts/
│   └── AuthContext.tsx          # Authentication context
├── services/
│   ├── api.ts                   # API configuration with interceptors
│   └── auth.ts                  # Authentication service
└── README-AUTH.md               # This file
```

## API Integration

The app integrates with your Footbook API endpoints:

- **Login**: `POST /api/v1/auth/login`
- **Signup**: `POST /api/v1/auth/signup`
- **Refresh Token**: `POST /api/v1/auth/refresh`

### Request Formats

#### Login Request
```typescript
{
  email: string;
  password: string;
}
```

#### Signup Request
```typescript
{
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  profilePicture?: File; // Optional
}
```

#### Response Format
```typescript
{
  accessToken: string;
  refreshToken: string;
}
```

## Authentication Flow

1. **App Launch**: Checks for stored tokens
2. **Token Found**: Automatically navigates to main app
3. **No Token**: Shows login screen
4. **Login/Signup**: Calls API and stores tokens securely
5. **Token Expiry**: Automatically refreshes tokens
6. **Logout**: Clears tokens and returns to auth screens

## Security Features

- **Secure Token Storage**: Uses Expo SecureStore for encrypted storage
- **Automatic Token Refresh**: Handles expired access tokens
- **Form Validation**: Client-side validation with yup schemas
- **Error Handling**: Comprehensive error messages and alerts

## Usage

### Login Screen
- Email validation
- Password requirements (minimum 6 characters)
- Loading states
- Error handling

### Signup Screen
- Complete user registration
- Profile picture upload
- Skill level selection
- Password confirmation
- Form validation

### Authentication Context
```typescript
import { useAuth } from '../contexts/AuthContext';

const { isAuthenticated, login, logout, accessToken } = useAuth();
```

## Configuration

### API Base URL
Update the API base URL in `services/api.ts`:
```typescript
const API_BASE_URL = 'http://your-api-url/api/v1';
```

### Environment Variables
Consider using environment variables for:
- API base URL
- API keys
- Feature flags

## Dependencies

The following packages were added for authentication:

```json
{
  "axios": "^1.6.0",
  "react-hook-form": "^7.48.0",
  "@hookform/resolvers": "^3.3.0",
  "yup": "^1.3.0",
  "expo-image-picker": "^14.7.0",
  "expo-secure-store": "^12.8.0"
}
```

## Testing

To test the authentication:

1. Start your Footbook API server
2. Update the API base URL in `services/api.ts`
3. Run the mobile app: `npm start`
4. Test login and signup flows
5. Verify token storage and automatic navigation

## Next Steps

Consider implementing:

1. **Biometric Authentication**: Face ID / Touch ID
2. **Social Login**: Google, Facebook, Apple
3. **Password Reset**: Forgot password functionality
4. **Email Verification**: Account verification flow
5. **Profile Management**: Edit user profile
6. **Session Management**: Handle multiple devices

## Troubleshooting

### Common Issues

1. **API Connection**: Ensure your API server is running and accessible
2. **CORS Issues**: Configure your API to allow mobile app requests
3. **Token Storage**: Check SecureStore permissions on device
4. **Image Upload**: Verify image picker permissions

### Debug Mode

Enable debug logging by adding console.log statements in:
- `services/api.ts` for API requests
- `contexts/AuthContext.tsx` for token operations
- Authentication screens for form data 