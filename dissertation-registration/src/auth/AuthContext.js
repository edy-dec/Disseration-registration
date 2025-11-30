import React, { createContext, useState, useContext, useEffect } from "react";
import { authAPI } from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState(null);
  const [requiresProfileCompletion, setRequiresProfileCompletion] = useState(false);

  // Verifică token-ul la încărcarea aplicației
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    setLoading(true);
    try {
      const savedToken = localStorage.getItem("token");
      const savedUser = localStorage.getItem("user");
      
      if (savedToken && savedUser) {
        // Verifică validitatea token-ului pe server
        const response = await authAPI.verify();
        
        if (response.data.success) {
          const userData = response.data.user;
          setToken(savedToken);
          setUser(userData);
          setUserType(userData.userType);
          setIsAuthenticated(true);
          setRequiresProfileCompletion(response.data.requiresProfileCompletion || false);
        } else {
          // Token invalid
          logout();
        }
      }
    } catch (error) {
      console.error('Eroare la verificarea autentificării:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      setLoading(true);
      const response = await authAPI.login(credentials);
      
      if (response.data.success) {
        const { token: newToken, user: userData, requiresProfileCompletion } = response.data;
        
        setToken(newToken);
        setUser(userData);
        setUserType(userData.userType);
        setIsAuthenticated(true);
        setRequiresProfileCompletion(requiresProfileCompletion || false);
        
        localStorage.setItem("token", newToken);
        localStorage.setItem("user", JSON.stringify(userData));
        
        return { success: true, data: response.data };
      }
    } catch (error) {
      console.error('Eroare la login:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Eroare la conectare' 
      };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      const response = await authAPI.register(userData);
      
      if (response.data.success) {
        const { token: newToken, user: newUser, requiresProfileCompletion } = response.data;
        
        setToken(newToken);
        setUser(newUser);
        setUserType(newUser.userType);
        setIsAuthenticated(true);
        setRequiresProfileCompletion(requiresProfileCompletion || false);
        
        localStorage.setItem("token", newToken);
        localStorage.setItem("user", JSON.stringify(newUser));
        
        return { success: true, data: response.data };
      }
    } catch (error) {
      console.error('Eroare la înregistrare:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Eroare la înregistrare' 
      };
    } finally {
      setLoading(false);
    }
  };

  const completeProfile = async (profileData) => {
    try {
      setLoading(true);
      const response = await authAPI.completeProfile(profileData);
      
      if (response.data.success) {
        const { token: newToken, user: updatedUser } = response.data;
        
        setToken(newToken);
        setUser(updatedUser);
        setRequiresProfileCompletion(false);
        
        localStorage.setItem("token", newToken);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        
        return { success: true, data: response.data };
      }
    } catch (error) {
      console.error('Eroare la completarea profilului:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Eroare la completarea profilului' 
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    setUserType(null);
    setRequiresProfileCompletion(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    
    // Opțional: apelează API-ul de logout
    try {
      authAPI.logout();
    } catch (error) {
      console.error('Eroare la logout pe server:', error);
    }
  };

  const value = {
    user,
    token,
    isAuthenticated,
    loading,
    userType,
    requiresProfileCompletion,
    login,
    register,
    logout,
    checkAuth,
    completeProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
