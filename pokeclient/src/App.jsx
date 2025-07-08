import { BrowserRouter, Routes, Route} from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import Pokedex from "./pages/home/layout/Pokedex.jsx";
import HomePage from "./pages/Inicio/HomePage.jsx";
import UserPage from "./pages/userPage/UserPage.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

function App () {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage/>} />
          

          <Route element={<ProtectedRoute/>}>
            <Route path="/pokedex" element={<Pokedex/>} />
            <Route path="/favorite" element={<h1>Favorites</h1>} />
            <Route path="/userPage" element={<UserPage/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
export default App;