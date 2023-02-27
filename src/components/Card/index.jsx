import './index.css';
import { useEffect, useState } from "react";
import { numberFormat } from './Ultis';

const color ={
  fire: "#ff0000",
  water: '#120a8f',
  grass: '#90ee90',
  electric: "#ffff00",
  fighting: "#daa520",
  ice : "#DAE4E9",
  psychic: '#006400',
  poison: '#993399',
  normal: '#964b00',
  dark: '#1b1e23',
  ground: '#e2725b',
  steel: '#b5b8b1',
  rock: '#65645D',
  bug: '#ff6961',
  flying: '#add8e6',
  ghost: '#c8a2c8',
  dragon: '#ff7f00',
  fairy: '#ffcbdb',

}

export const Card = ({ poke })=>{

    const [pokemon, setPokemon] = useState({});

    useEffect(()=>{

        fetch(poke.url, {method: 'GET'})
        .then(response=> response.json()).then((res)=>{
            setPokemon(res)
        });

    }, [poke]);

    if(pokemon.name === undefined) return <p></p>;

    var backgroundColor01 = color[pokemon.types[0].type.name];
    var backgroundColor02 = '#363636';
    if(pokemon.types.length >= 2){
      backgroundColor02 = color[pokemon.types[1].type.name];
    }
    //console.log(pokemon)
    return (
        <div className="card">
            <div className="front"
              style={{backgroundImage: `linear-gradient(to left, ${backgroundColor01}, ${backgroundColor02})`}}>
                <div className='image'>
                  <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                  <span>Nº {numberFormat(pokemon.id)}</span>
                </div>
                <div className="info">
                  <h3>{pokemon.name}</h3>
                  <p>{pokemon.base_experience} EXP</p>
                </div>
            </div>
            <div className="back"
            style={{backgroundImage: `linear-gradient(to left, ${backgroundColor02}, ${backgroundColor01})`}}>
              <h3>tipos</h3>
              <div>
                {pokemon.types.map((el, id)=>{
                  return (
                    <p key={id}>{el.type.name}</p>
                  );
                })}
              </div>
            </div>
        </div>
    );
};