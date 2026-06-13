import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react';
import { authAPI, marketAPI } from '../services/api';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser debe ser usado dentro de un UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    isLoggedIn: false,
    id: null,
    name: '',
    email: '',
    role: 'user'
  });

  const [goldPrice, setGoldPrice] = useState(null);
  const [goldLoading, setGoldLoading] = useState(true);
  const [goldUpdatedAt, setGoldUpdatedAt] = useState(null);
  const [goldCached, setGoldCached] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const goldRequestRef = useRef(null);

  const fetchGoldPrice = useCallback(async ({ showLoading = false } = {}) => {
    if (goldRequestRef.current) {
      return goldRequestRef.current;
    }

    if (showLoading) {
      setGoldLoading(true);
    }

    const request = (async () => {
      try {
        setError(null);
        const response = await marketAPI.getGoldPrice();
        const gold = response.data.gold;

        setGoldPrice(gold.price);
        setGoldUpdatedAt(gold.updatedAt);
        setGoldCached(Boolean(gold.cached));

        if (gold.isFallback) {
          setError('Se está mostrando un precio de referencia temporal');
        }

        return gold;
      } catch {
        setError('No se pudo actualizar el precio del oro');
        return null;
      } finally {
        setGoldLoading(false);
      }
    })();

    goldRequestRef.current = request;

    try {
      return await request;
    } finally {
      goldRequestRef.current = null;
    }
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await authAPI.getMe();
        setUser({
          isLoggedIn: true,
          id: response.data.user.id,
          name: response.data.user.name,
          email: response.data.user.email,
          role: response.data.user.role
        });
      } catch (error) {
        localStorage.removeItem('token');
        setUser({
          isLoggedIn: false,
          id: null,
          name: '',
          email: '',
          role: 'user'
        });
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const register = async (userData) => {
    const response = await authAPI.register(userData);
    const { token, user: userInfo } = response.data;

    localStorage.setItem('token', token);
    setUser({
      isLoggedIn: true,
      id: userInfo.id,
      name: userInfo.name,
      email: userInfo.email,
      role: userInfo.role
    });
  };

  const login = async (credentials) => {
    const response = await authAPI.login(credentials);
    const { token, user: userInfo } = response.data;

    localStorage.setItem('token', token);
    setUser({
      isLoggedIn: true,
      id: userInfo.id,
      name: userInfo.name,
      email: userInfo.email,
      role: userInfo.role
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser({
      isLoggedIn: false,
      id: null,
      name: '',
      email: '',
      role: 'user'
    });
  };

  const value = {
    user,
    goldPrice,
    goldLoading,
    goldUpdatedAt,
    goldCached,
    loading,
    error,
    register,
    login,
    logout,
    fetchGoldPrice
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};



