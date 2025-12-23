import { createContext, useContext, useState, useEffect } from 'react';
import { login as apiLogin, logout as apiLogout, getCurrentUser, hasPermission } from '../api/userService';

const AuthContext = createContext(null);

/**
 * AuthProvider Component
 * Provides authentication state and RBAC functionality to the entire app
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize - load user from localStorage or API
  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    setLoading(true);
    try {
      // Check if user data exists in localStorage
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } else {
        // Mock: Auto-login with default admin user
        const userData = await getCurrentUser();
        const authenticatedUser = {
          ...userData,
          role: 'admin',
          permissions: ['edit_content', 'view_reports', 'manage_users', 'manage_departments']
        };
        setUser(authenticatedUser);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(authenticatedUser));
      }
    } catch (error) {
      console.error('Auth initialization failed:', error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Login function
   * @param {string} email
   * @param {string} password
   * @returns {Promise<Object>}
   */
  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await apiLogin(email, password);
      if (response.success) {
        setUser(response.user);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('token', response.token);
        return { success: true };
      }
      throw new Error('Login failed');
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Logout function
   */
  const logout = async () => {
    setLoading(true);
    try {
      await apiLogout();
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Check if user has a specific permission
   * @param {string} permission - Permission name to check
   * @returns {boolean}
   */
  const checkPermission = (permission) => {
    if (!user) return false;
    return hasPermission(user, permission);
  };

  /**
   * Check if user has any of the specified permissions
   * @param {Array<string>} permissions - Array of permission names
   * @returns {boolean}
   */
  const checkAnyPermission = (permissions) => {
    if (!user) return false;
    return permissions.some(permission => hasPermission(user, permission));
  };

  /**
   * Check if user has all of the specified permissions
   * @param {Array<string>} permissions - Array of permission names
   * @returns {boolean}
   */
  const checkAllPermissions = (permissions) => {
    if (!user) return false;
    return permissions.every(permission => hasPermission(user, permission));
  };

  /**
   * Check if user has a specific role
   * @param {string} role - Role name to check
   * @returns {boolean}
   */
  const hasRole = (role) => {
    if (!user) return false;
    return user.role === role;
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    checkPermission,
    checkAnyPermission,
    checkAllPermissions,
    hasRole
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * useAuth Hook
 * Access authentication state and functions
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
