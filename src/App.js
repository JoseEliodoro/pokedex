import './App.css'
import { useEffect, useRef, useState } from "react";
import { Card } from "./components/Card";
import { Button } from './components/Button';


function App() {

  const [pokedex, setPokedex] = useState([]);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  const [next, setNext] = useState(false);

  const [search, setSearch] = useState();
  const inputRef = useRef();
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
      window.scrollTo(0, 0);
      setUrl(pokedex.next);
    }
  }

  const handleSubmit = (e)=>{
    console.log(e)

  }
  if (pokedex.length === 0) return <div></div>


  return (
      <div className="App">
        <div  className='filho'>
          <input
            ref={inputRef}
            value={search}
            onChange={()=> setSearch(inputRef.current.value)}
            type='text'
          />

        </div>
        <div id='topo' className='filho'>
          {pokedex.results.map((el, id)=>{
            return (
              <Card key={id} poke={el}/>
            );
          })}
        </div>
        <div className='filho'>
          <a href="#topo">
            <Button handleClick={handleMorePokemon} text='More' disabled={next}/>
          </a>
        </div>
      </div>
  );
}

export default App;
