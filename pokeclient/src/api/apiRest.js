import axios from "axios";

export const URL_POKEMON = "https://pokeapi.co/api/v2/pokemon/";
export const URL_POKEMON_SPECIE = "https://pokeapi.co/api/v2/pokemon-species/";

const pokeAPI = "https://pokeapi.co/api/v2"

export const pokemon = axios.get(`${pokeAPI}/pokemon`);

export const pokeSpecies = axios.get(`${pokeAPI}/pokemon-species`);
export const pokeEvo = axios.get(`${pokeAPI}/evolution-chain`);