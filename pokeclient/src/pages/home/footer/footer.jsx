import React from "react";
import css from "./footer.module.scss";

export default function Footer(){


    return(
        <div className={css.BlackFooter}>
            <div className={css.FooterInfo}>
                <div className={css.Info}>
                    <h1 className="text-3xl font-bold">The pokemon Company</h1>
                    <ul className="text-lg">
                        <li><a href="https://www.pokemon.com/el/noticias-pokemon">Novedades</a></li>
                        <li><a href="http://parents.pokemon.com/es-mx/" >Guía para padres pokemon</a></li>
                        <li><a href="http://parents.pokemon.com/es-mx/" >Servicio de atención al cliente</a></li>
                    </ul>
                </div>
                <div className={css.Info2}>
                    <a href="https://x.com/PokemonLATAM" target="_blank" rel="noopener noreferrer" className="inline-block w-[50px] h-[50px]">
                        <img src="https://img.icons8.com/?size=100&id=phOKFKYpe00C&format=png&color=000000" alt="Twitter" className="w-full h-full"/>   
                    </a>
                    <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" className="inline-block w-[50px] h-[50px]">
                        <img src="https://img.icons8.com/?size=100&id=9a46bTk3awwI&format=png&color=000000" alt="youtube" className="w-full h-full"/>   
                    </a>
                    <a href="https://www.facebook.com/PokemonOficialLatAm#" target="_blank" rel="noopener noreferrer" className="inline-block w-[50px] h-[50px]">
                        <img src="https://img.icons8.com/?size=100&id=13912&format=png&color=000000" alt="facebook" className="w-full h-full"/>   
                    </a>

                </div>
                <div className={css.Info3}>
                    <h1 className="font-bold text-3xl">Legal</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
                    <a className="font-extralight text-xs" href="https://www.pokemon.com/el/legal/terminos-de-uso">Terminos de uso</a>

                </div>
            </div>

        </div>
    )


}