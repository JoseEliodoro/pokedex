import './index.css';
import { useEffect, useState } from "react";
import { numberFormat } from './Ultis';



export const Card = ({ poke })=>{

    const [pokemon, setPokemon] = useState({});

    useEffect(()=>{

        fetch(poke.url, {method: 'GET'})
        .then(response=> response.json()).then((res)=>{
            setPokemon(res)
        });

    }, [poke]);

    if(pokemon.name === undefined) return <p></p>;


    //console.log(pokemon.types[0].type)
    return (
        <div className="card">
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <span>Nº {numberFormat(pokemon.id)}</span>
          <div className='text'>
            <h2>{pokemon.name}</h2>
            <div className="type">
              {pokemon.types.map(el=>{
                return (
                  <span key={el.type.name} className={el.type.name}>{el.type.name}</span>
                );
              })}
            </div>
          </div>
        </div>
    );
};