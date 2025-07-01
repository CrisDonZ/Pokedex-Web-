import React, { useState } from "react";
import Header from "../header/header.jsx";
import { useEffect } from "react";
import {URL_POKEMON } from "../../../api/apiRest.js";
import Card from "../card/card.jsx";
import iconSearch from "../../../assets/iconSearch.png";
import css from "./pokedex.module.scss";
import axios from "axios";
import * as FaIcons from "react-icons/fa";
import Footer from "../footer/footer.jsx";




export default function Pokedex(){
    const [arrayPokemon, setArrayPokemon] = useState([]);
    const [globalPokemon, setGlobalPokemon] = useState([]);
    const [xpage, setXPage] = useState(1);
    const [search, setSearch] = useState('');
    
    useEffect(() => {
        const api = async () => {

            const limit = 20;
            const xp = (xpage - 1) * limit;

            const apiPoke = await axios.get(`${URL_POKEMON}/?offset=${xp}&limit=${limit}`);

            setArrayPokemon(apiPoke.data.results);
        }
        api()
        getGlobalPokemon()
    }, [xpage]);


    const getGlobalPokemon = async () => {
        const res = await axios.get(`${URL_POKEMON}/?offset=0&limit=1000`);
        const promises = res.data.results.map(pokemon => {
            return pokemon;
        });

        const results = await Promise.all(promises);
        setGlobalPokemon(results);

    }

    const filterPokemon = search?.length > 0
    ? globalPokemon?.filter(pokemon => pokemon?.name?.includes(search))
    : arrayPokemon

    const obtenerSearch = (e) => {
        const texto = e.toLowerCase()
        setSearch(texto)
        setXPage(1)
    }
    return(
        <div className="bg-zinc-50 w-full">
            <Header/>
            <section className={css.searchSec}>
                <label className={css.labelSearch}>Nombre o número</label>
                <div className={css.searchInput}>
                    <input type="search"  onChange={e => obtenerSearch(e.target.value)} placeholder="Buscar Pokemon" className={css.inputSearch}/>
                    <button className={css.btnSearch}>
                        <img src={iconSearch} alt="iconSearch" className={css.iconSearch}/>
                    </button>
                </div>

                
            </section>
            <div className={css.ord}>
                    Ordenar por
            </div>
            
            
            <div className="card_content">
                {filterPokemon.map((card, index) =>{
                    return <Card key = {index} card ={card} />
                })};
            </div>


            <section className={css.section_pagination}>
                <div className={css.div_pagination}>
                    <span className={css.itemIzquierdo}
                    onClick={() => {
                        if(xpage == 1){
                            return console.log("no hay mas paginas")
                        }
                        setXPage(xpage - 1)
                        
                    }}>
                        {" "}
                        <FaIcons.FaAngleLeft/>
                        {" "}
                    </span>
                    <span className={css.item}>{xpage} </span>
                    <span className={css.item}>de</span>
                    <span className={css.item}>{" "} {Math.round(globalPokemon?.length / 20)} {" "} </span>
                    <span className={css.itemDerecho}
                    onClick={() => {
                        if(xpage == 50){
                            return console.log("no hay mas paginas")
                        }
                        setXPage(xpage + 1)
                        }
                    }>
                        {" "}
                        <FaIcons.FaAngleRight/>
                        {" "}
                    </span>
                </div>
            </section>

            <Footer/>
        </div>
    );   
}
