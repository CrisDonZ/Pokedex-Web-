import React, { useState, useEffect } from 'react';
import css from './userPage.module.scss';
import { useNavigate } from "react-router-dom";
import { logoutRequest } from "../../api/auth.js";
import profileUser from '../../assets/profile-user.png';
import Footer from "../home/footer/footer.jsx";
import { useAuth } from '../../context/AuthContext.jsx';
import { FaHome, FaUserAlt, FaFolder, FaAt, FaCog, FaCamera, FaHeart } from 'react-icons/fa';
import axios from "axios";

const UserPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);

  const logout = () => {
    logoutRequest(user.token)
      .then((res) => {
        navigate("/login");
        localStorage.clear();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        console.error("Usuario no autenticado");
        return;
      }

      try {
        const res = await axios.get(`http://localhost:4000/api/favorites/${userId}`);
        console.log(res.data);
        
        // Filtrar los valores nulos del array de favoritos
        const validFavorites = res.data.filter(fav => fav !== null);
        setFavorites(validFavorites);
      } catch (error) {
        console.error(error.response?.data || error.message);
      }
    };

    fetchFavorites();
  }, []);

  // Función para obtener el color según el tipo de Pokémon (puedes expandir esta función)
  const getTypeColor = (type) => {
    const typeColors = {
      normal: '#A8A878',
      fire: '#F08030',
      water: '#6890F0',
      grass: '#78C850',
      electric: '#F8D030',
      ice: '#98D8D8',
      fighting: '#C03028',
      poison: '#A040A0',
      ground: '#E0C068',
      flying: '#A890F0',
      psychic: '#F85888',
      bug: '#A8B820',
      rock: '#B8A038',
      ghost: '#705898',
      dark: '#705848',
      dragon: '#7038F8',
      steel: '#B8B8D0',
      fairy: '#EE99AC'
    };
    
    return typeColors[type] || '#68A090'; // Color por defecto
  };

  return (
    <div className={css.container}>
      <div className={css.header}>

        <div className={css.userInfo}>
          <img src={profileUser}alt="User Avatar" className={css.avatar} />
          <div className={css.userDetails}>
            <strong className={css.username}>{user ? user.username : "Inicia sesión"}</strong>
            <button onClick={() => {logout()}}>Cerrar Sesión</button>
          </div>  
        </div>

        <div className={css.navbar}>
          <button className={css.navButton} onClick={() => navigate('/')}>
            <FaHome className={css.icon} />
            <span>Inicio</span>
          </button>
          <button className={css.navButton} onClick={() => navigate('/pokedex')}>
            <FaFolder className={css.icon} />
            <span>Pokedex</span>
          </button>
          <button className={css.navButton} onClick={() => navigate('/favorites')}>
            <FaUserAlt className={css.icon} />
            <span>Favoritos</span>
          </button>
        </div>
      </div>

      <div className={css.userContent}>
        <div className={css.userOptions}>
          <ul>
            <li><FaUserAlt/> <span>Mis Pokemon</span></li>
            <li><FaFolder /> <span>Colecciones</span></li>
            <li><FaAt /> <span>Ajustes de información</span></li>
            <li><FaCog /> <span>Ajustes de sistema</span></li>
            <li><FaCamera /><span>Ajustes de privacidad</span> </li>
          </ul>
        </div>

        <div className={css.favorites}>
          <h1>MIS FAVORITOS</h1>
          <div className={css.listaPokemon}>
            {favorites.length > 0 ? (
              favorites.map((pokemon, index) => (
                <div key={index} className={css.cardPoke}>
                  
                  <img 
                    src={pokemon.image} 
                    alt={pokemon.name} 
                    className={css.imgPoke}
                  />
                  <div className={css.subCardPoke}>
                    <div className={css.cardInfo}>
                      <div className={css.idCard}>#{pokemon.id.toString().padStart(3, '0')}</div>
                      <h2 className={css.nameCard}>{pokemon.name}</h2>
                      <div className={css.cardType}>
                      </div>
                      <button className={css.addFavoriteButton}>
                        <FaHeart /> Quitar de favoritos
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No tienes Pokémon favoritos aún.</p>
            )}
          </div>
        </div>
      </div>
      
      <Footer/>
    </div>
  );
};

export default UserPage;
