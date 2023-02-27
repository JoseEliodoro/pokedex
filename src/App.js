import './App.css'
import { useEffect, useState } from "react";
import { Card } from "./components/Card";


function App() {

  const [pokedex, setPokedex] = useState([]);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  const [next, setNext] = useState(false);

  useEffect(()=>{

    setNext(true)

    fetch(url, {method: 'GET'})
    .then(response=> response.json()).then(resp=> {

      setPokedex(resp);
      setNext(false);


    });

  }, [url]);

  const handleMorePokemon = ()=>{
    if(pokedex.next === undefined) setUrl('https://pokeapi.co/api/v2/pokemon');
    if(!next){
      setUrl(pokedex.next);
    }
  }

  if (pokedex.length === 0) return <div></div>


  return (
    <div className="App">
      <div>
        {pokedex.results.map((el, id)=>{
          return (
            <Card key={id} poke={el}/>
          );
        })}
      </div>
      <button onClick={handleMorePokemon} disabled={next}>MORE</button>
    </div>
  );
}

export default App;
