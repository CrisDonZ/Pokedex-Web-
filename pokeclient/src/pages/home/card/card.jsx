import React from "react";
import css from "./card.module.scss";
import { useEffect } from "react"; 
import { useState } from "react";
import axios from "axios";
import { URL_POKEMON, URL_POKEMON_SPECIE } from "../../../api/apiRest";

export default function Card({ card }) {

    const [itemPokemon, setItemPokemon] = useState({});
    const [itemSpecie, setItemSpecie] = useState({});


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
                url_specie : api?.data?.evolution_chain,
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
    return(
        <div className={css.cardPoke}>
            <img src={itemPokemon?.sprites?.other["official-artwork"].front_default} alt={itemPokemon.name} className={css.imgPoke}/>
            <div className={`bg-${itemSpecie?.data?.color?.name} ${css.subCardPoke}`}>
                <div className={css.cardInfo}>
                    <strong className = {css.idCard}>{pokemonId}</strong>
                    <strong className={css.nameCard}>{itemPokemon.name}</strong>
                </div>
                
                <div className= {css.cardType}>
                    {itemPokemon?.types?.map((type, index) => {
                        return(
                            <div key={index} className={`color-${type.type.name} ${css.typeCard}`}>
                                <strong>{type.type.name}</strong>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}