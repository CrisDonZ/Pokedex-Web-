import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

function ProtectedRoute() {
    const { loading, isAuthenticated } = useAuth();

    // ✅ Estado de carga mejorado
    if (loading) {
        return (
            <div style={{ 
                textAlign: 'center', 
                padding: '50px',
                fontFamily: 'Arial, sans-serif'
            }}>
                <h2>Cargando...</h2>
                <p>Verificando tu sesión</p>
            </div>
        );
    }

    // ✅ Redirigir si no está autenticado
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // ✅ Usuario autenticado - renderizar rutas
    return <Outlet />;
}

export default ProtectedRoute;