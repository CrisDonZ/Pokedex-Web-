import React, { useEffect } from "react";
import logo from "../../../assets/logo.png";
import iconHome from "../../../assets/iconHome.png"
import iconHome2 from "../../../assets/iconHome2.png"
import css from "./header.module.scss"
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../../context/AuthContext";
import { logoutRequest } from "../../../api/auth";


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
                <div className={css.nav}>
                    <button className={css.option} onClick={() => navigate('/')} >
                        <img src={iconHome2} alt="iconHome" className={css.iconHover}/>
                        <strong>Inicio</strong>
                    </button>
                    <button className={css.option} onClick={() => navigate('/pokedex')}>
                        <img src="https://img.icons8.com/?size=100&id=59786&format=png&color=000000" alt="iconHome" className={css.iconHover}/>
                        <strong>Pokédex</strong>
                    </button>
                    <button className={css.option}>
                        <img src="https://img.icons8.com/?size=100&id=123441&format=png&color=000000" alt="iconHome" className={css.iconHover}/>
                        <strong>Favoritos</strong>
                    </button>
                    <button className={css.option} onClick={() => 
                        {if(!user){
                            navigate('/login')
                        }else{
                            navigate('/userPage')
                        }}}>
                        <img src="https://img.icons8.com/?size=100&id=83190&format=png&color=000000" alt="iconHome2" className={css.iconHover}/>
                        <strong>{user ? user.username : "Inicia sesión"}</strong>   
                    </button>
                    
                </div>
            </nav>
        
    )
}