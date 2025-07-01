import css from "./homePage.module.scss";
import Header from "../home/header/header.jsx";
import { logoutRequest } from "../../api/auth.js";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import CarouselDemo from "../../components/carousel.jsx";
import Footer from "../home/footer/footer.jsx";

function HomePage() {
    const { user } = useAuth();
    const navigate = useNavigate();

    
    const logout = () => {
        logoutRequest(user.token)
            .then((res) => {
                navigate("/login");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="bg-white w-full h-full">
            <Header />
            <div className={css.containerImages}>
                <CarouselDemo/>
            </div>
            <div>
                <button className={css.logout} onClick={() => {logout()}}></button>
            </div>
            
                        
            <Footer/>
            
            
        </div>
    );
}

export default HomePage;