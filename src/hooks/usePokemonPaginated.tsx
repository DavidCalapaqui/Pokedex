import {useEffect,useRef, useState} from 'react'
import { pokemonApi } from '../api/pokemonApi';
import { PokemonPaginatedResponse, SimplePokemon, Result } from '../interfaces/pokemonInterfaces';

export const usePokemonPaginated = () => {

  const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>( [] )

  const [loading, setLoading] = useState(false)
    
    const nextPageUrl =  useRef("https://pokeapi.co/api/v2/pokemon?limit=40");
    

    // const nextPage
    const loadPokemons = async () => {
      setLoading(true)
      const resp = await pokemonApi.get<PokemonPaginatedResponse>(nextPageUrl.current);
      nextPageUrl.current = resp.data.next;
      mapPokemonList(resp.data.results )

    }

    const mapPokemonList = (pokemonList: Result[] ) => {
      const newPokemonList:SimplePokemon[] = pokemonList.map( ({name, url}) => {
        //https://pokeapi.co/api/v2/pokemon/1/
        const urlParts = url.split('/');
        const id = urlParts[urlParts.length-2];
        const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
        return {id,picture,name}
        
      })

      setSimplePokemonList([...simplePokemonList, ...newPokemonList]);
      setLoading(false);
    }

    useEffect(() => {
      loadPokemons()
    }, [])
    
    return {
      loading,
      simplePokemonList,
      loadPokemons
    };

}
