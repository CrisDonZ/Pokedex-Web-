
import logo from "../../../assets/logo.png";
import css from "./header.module.scss"
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../../context/AuthContext";
import { logoutRequest } from "../../../api/auth";
import { FaHome, FaStar, FaCheckSquare, FaUserAlt, FaFolder, FaAt, FaCog, FaCamera, FaUser } from 'react-icons/fa';


export default function Header() {

    const {user} = useAuth();

    const navigate = useNavigate();
    const logout = () => {
            logoutRequest(user.token)
                .then((res) => {
                    navigate("/login");
                })
                .catch((err) => {
                    console.log(err);
                    
                })
        }


    return(
            <nav className={css.navbarContainer}>
                <div className="p-5 items-center">
                    <img src={logo} alt="Logo" className="w-48 justify-stretch"/>
                </div>
                <div className="p-5 items-center">
                    <h1 className="text-black w-10">POKEDEX WEB</h1>
                </div>
                <div className={css.nav}>
                    <button className={css.option} onClick={() => navigate('/pokedex')}>
                        <FaFolder className={css.icon} />
                        <strong>Pokedex</strong>
                    </button>
                    <button className={css.option}>
                        <FaStar className={css.icon} />
                        <strong>Favoritos</strong>
                    </button>
                    <button className={css.option} onClick={() => 
                        {if(!user){
                            navigate('/login')
                        }else{
                            navigate('/userPage')
                        }}}>
                        <FaUserAlt className={css.iconHover}/>
                        <strong>{user ? user.username : "Inicia sesión"}</strong>   
                    </button>
                    
                </div>
            </nav>
        
    )
}