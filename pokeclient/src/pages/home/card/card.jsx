import React from "react";
import css from "./card.module.scss";
import { useEffect } from "react"; 
import { useState } from "react";
import axios from "axios";
import { URL_POKEMON, URL_POKEMON_SPECIE } from "../../../api/apiRest";

export default function Card({ card }) {
    const [itemPokemon, setItemPokemon] = useState({});
    const [itemSpecie, setItemSpecie] = useState({});

    // URL base del backend en Render
    const API_BASE_URL = "https://pokedex-web-z4yg.onrender.com/api";

    useEffect(() => {
        const dataPokemon = async () => {
            const api = await axios.get(`${URL_POKEMON}/${card.name}`);
            setItemPokemon(api.data);
        }
        dataPokemon()
    }, [card]);

    useEffect(() => {
        const dataSpecie = async () => {
            const URL = card.url.split("/");
            const api = await axios.get(`${URL_POKEMON_SPECIE}/${URL[6]}`);
            setItemSpecie({
                url_specie: api?.data?.evolution_chain,
                data: api?.data,
            });
        }
        dataSpecie()
    }, [card]);

    let pokemonId = itemPokemon?.id?.toString();

    if (pokemonId?.length === 1) {
        pokemonId = "N.° 00" + pokemonId;
    } else if (pokemonId?.length === 2) {
        pokemonId = "N.° 0" + pokemonId;
    } else if (pokemonId?.length === 3){
        pokemonId = "N.° " + pokemonId;
    }

    const handleAddFavorite = async () => {
        const userId = localStorage.getItem("userId");
        
        // Verificar si el usuario está logueado
        if (!userId) {
            alert("Debes iniciar sesión para añadir favoritos");
            return;
        }

        const favoritePokemon = {
            id: itemPokemon.id,
            name: itemPokemon.name,
            image: itemPokemon.sprites?.other["official-artwork"]?.front_default
        };

        try {
            console.log("Añadiendo favorito:", {
                userId,
                pokemon: favoritePokemon
            });
            
            // ✅ URL CORREGIDA - usa la de Render
            const res = await axios.post(`${API_BASE_URL}/add-favorite`, {
                userId,
                pokemon: favoritePokemon
            }, {
                withCredentials: true
            });
            
            console.log("Respuesta del servidor:", res.data);
            alert("Pokémon añadido a favoritos");
        } catch (error) {
            console.error("Error al añadir favorito:", error);
            alert(error.response?.data?.message || "Error al añadir a favoritos");
        }
    };

    return(
        <div className={css.cardPoke}>
            <img 
                src={itemPokemon?.sprites?.other["official-artwork"]?.front_default} 
                alt={itemPokemon.name} 
                className={css.imgPoke}
            />
            <div className={`bg-${itemSpecie?.data?.color?.name} ${css.subCardPoke}`}>
                <div className={css.cardInfo}>
                    <strong className={css.idCard}>{pokemonId}</strong>
                    <strong className={css.nameCard}>{itemPokemon.name}</strong>
                </div>
                
                <div className={css.cardType}>
                    {itemPokemon?.types?.map((type, index) => {
                        return(
                            <div key={index} className={`color-${type.type.name} ${css.typeCard}`}>
                                <strong>{type.type.name}</strong>
                            </div>
                        )
                    })}
                </div>
                <button onClick={handleAddFavorite} className={css.addFavoriteButton}>
                    Añadir a favoritos
                </button>
            </div>
        </div>
    )
}