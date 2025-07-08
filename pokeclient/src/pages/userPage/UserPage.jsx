// src/pages/userPage.jsx
import React from 'react';
import css from './userPage.module.scss';
import Footer from "../home/footer/footer.jsx";
import { FaHome, FaStar, FaCheckSquare, FaUserAlt, FaFolder, FaAt, FaCog, FaCamera } from 'react-icons/fa';

const UserPage = () => {
  const favorites = [
    { id: 1, name: 'N.º 0001', img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png' },
    { id: 2, name: 'N.º 0001', img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/26.png' },
    { id: 3, name: 'N.º 0001', img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/130.png' }
  ];

  return (
    <div className={css.container}>
      <header className={css.header}>
        <h1>POKEDEX WEB</h1>
        <nav className={css.navbar}>
          <button><FaHome /> Inicio</button>
          <button><FaStar /> Pokedex</button>
          <button><FaCheckSquare /> Favoritos</button>
        </nav>
        
      </header>
      <img src='https://avatars.githubusercontent.com/u/182382072?v=4' alt='Ash' className={css.profileImage} />
      <div className={css.content}>
        <aside className={css.sidebar}>
          <img
            src="https://i.pinimg.com/originals/f4/6a/9a/f46a9ad4ab389252fbcd759732d2d10c.png"
            alt="Ash"
            className={css.profileImage}
          />
          <ul>
            <li><FaUserAlt /> Mis Pokemon</li>
            <li><FaFolder /> Colecciones</li>
            <li><FaAt /> Ajustes de información</li>
            <li><FaCog /> Ajustes de sistema</li>
            <li><FaCamera /> Ajustes de privacidad</li>
          </ul>
        </aside>

        <main className={css.main}>
          <h2>POKEMON FAVORITOS</h2>
          <div className={css.favoritesGrid}>
            {favorites.map((pokemon) => (
              <div key={pokemon.id} className={css.pokemonCard}>
                <img src={pokemon.img} alt={pokemon.name} />
                <p>{pokemon.name}</p>
              </div>
            ))}
          </div>
        </main>
      </div>
      <Footer/>
    </div>
  );
};

export default UserPage;
