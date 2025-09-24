import { createContext, useContext, useState, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth.js";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context) throw new Error("useAuth must be used within an AuthProvider")
    return context;
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);

    // ✅ Persistir el estado en localStorage
    useEffect(() => {
        const savedUser = localStorage.getItem('authUser');
        const savedAuth = localStorage.getItem('isAuthenticated');
        
        if (savedUser && savedAuth === 'true') {
            setUser(JSON.parse(savedUser));
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, []);

    // ✅ Guardar en localStorage cuando cambie el estado
    useEffect(() => {
        if (user && isAuthenticated) {
            localStorage.setItem('authUser', JSON.stringify(user));
            localStorage.setItem('isAuthenticated', 'true');
        } else {
            localStorage.removeItem('authUser');
            localStorage.removeItem('isAuthenticated');
        }
    }, [user, isAuthenticated]);

    const signup = async (userData) => {
        try {
            const res = await registerRequest(userData);
            console.log(res.data);
            setUser(res.data);
            setIsAuthenticated(true);    
        } catch (error) {
            console.error('Signup error:', error);
            setErrors(error.response?.data || ['Error en el registro']);
        }
    }

    const signIn = async (userData) => {
        try {
            const res = await loginRequest(userData);
            console.log(res);   
            
            setIsAuthenticated(true);
            setUser(res.data);

            localStorage.setItem("userId", res.data.id);
        } catch (error) {
            console.error('Login error:', error);
            if(Array.isArray(error.response?.data)) {
                return setErrors(error.response.data);
            }
            setErrors([error.response?.data?.message || 'Error en el login']);
        }
    }

    // ✅ Verificar token periódicamente y al recargar
    useEffect(() => {
        const checkAuth = async () => {
            const cookies = Cookies.get();
            const savedUser = localStorage.getItem('authUser');

            if (!cookies.token && !savedUser) {
                setIsAuthenticated(false);
                setLoading(false);
                setUser(null);
                return;
            }

            try {
                // Si hay cookie, verificar con el servidor
                if (cookies.token) {
                    const res = await verifyTokenRequest();
                    if (!res.data) {
                        throw new Error('Token inválido');
                    }
                    setUser(res.data);
                    setIsAuthenticated(true);
                }
                // Si no hay cookie pero hay usuario guardado, mantener el estado
                else if (savedUser) {
                    setUser(JSON.parse(savedUser));
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.error('Auth check error:', error);
                // Limpiar todo si el token es inválido
                Cookies.remove('token');
                localStorage.removeItem('authUser');
                localStorage.removeItem('isAuthenticated');
                setIsAuthenticated(false);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    // ✅ Verificar token cada 5 minutos para mantener sesión
    useEffect(() => {
        const interval = setInterval(async () => {
            const cookies = Cookies.get();
            if (cookies.token && isAuthenticated) {
                try {
                    await verifyTokenRequest();
                } catch (error) {
                    console.log('Session expired, logging out...');
                    logout();
                }
            }
        }, 300000); // 5 minutos

        return () => clearInterval(interval);
    }, [isAuthenticated]);

    const logout = async () => {
        try {
            await logoutRequest();
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            // Limpiar todo siempre
            Cookies.remove('token');
            localStorage.removeItem('authUser');
            localStorage.removeItem('isAuthenticated');
            localStorage.removeItem('userId');
            setUser(null);
            setIsAuthenticated(false);
            setErrors([]);
        }
    };

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [errors]);

    return (
        <AuthContext.Provider value={{
            signup, 
            signIn,
            logout, // ✅ Exportar logout
            loading,
            user,
            isAuthenticated,
            errors
        }}>
            {children}  
        </AuthContext.Provider>
    );
}