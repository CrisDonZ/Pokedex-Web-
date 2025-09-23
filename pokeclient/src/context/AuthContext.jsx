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
    const [isAuthenticated, setIsAunthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading]= useState(true);
 
    const signup = async (user) => {
        try {
            const res = await registerRequest(user);
            console.log(res.data);
            setUser(res.data);
            setIsAunthenticated(true);    
        } catch (error) {
            //console.log(error.response);
            setErrors(error.response.data);
        }
    }
    const signIn = async (user) => {
        try {
            const res = await loginRequest(user);
            console.log(res);   
            
            setIsAunthenticated(true);
            setUser(res.data);

            localStorage.setItem("userId", res.data.id);
        } catch (error) {
            if(Array.isArray(error.response.data)) {
                return setErrors(error.response.data);
            }
            setErrors([error.response.data.message]);
        }
    }

    useEffect(() => {
        if(errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 5000)
            return() => clearTimeout(timer);
        }
    }, [errors]);

    useEffect(()=> {
        async function checkLogin(){
            const cookies = Cookies.get();

            if(!cookies.token){
                setIsAunthenticated(false);
                setLoading(false);
                return setUser(null);
            }

            try {
                const res = await verifyTokenRequest(cookies.token);
                if(!res.data){
                    setIsAunthenticated(false);
                    setLoading(false);
                    return;
                }
                
                setIsAunthenticated(true);
                setUser(res.data);
                setLoading(false);

            } catch (error) {
                setIsAunthenticated(false);
                setUser(null);  
                setLoading(false); 
            }               
                
        }

        checkLogin();
    }, []);

    return(
        <AuthContext.Provider value={{
            signup, 
            signIn,
            loading,
            user,
            isAuthenticated,
            errors
            }}>
            {children}  
        </AuthContext.Provider>
    )
}

 
