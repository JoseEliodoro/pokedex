import './App.css'
import { useEffect, useRef, useState } from "react";
import { Card } from "./components/Card";
import { Button } from './components/Button';


function App() {

  const [pokedex, setPokedex] = useState([]);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  const [next, setNext] = useState(false);

  const [search, setSearch] = useState('');
  const inputRef = useRef();
  useEffect(()=>{
    setNext(true);

    fetch(url, {method: 'GET'})
    .then(response=> response.json()).then(resp=> {

      setPokedex(resp);
      setNext(false);


    });

  }, [url]);

  const handleMorePokemon = ()=>{
    if(pokedex.next === undefined) {
      setSearch('')
      url === 'https://pokeapi.co/api/v2/pokemon/' ?
      setUrl('https://pokeapi.co/api/v2/pokemon'):
      setUrl('https://pokeapi.co/api/v2/pokemon/');
    }else if(!next){
      window.scrollTo(0, 0);
      setUrl(pokedex.next);
    }
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    if (search !== ''){
      fetch(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`, {method: 'GET'})
      .then(response=> response.json()).then(resp=> {
        setPokedex({results: [{url: `https://pokeapi.co/api/v2/pokemon/${resp.id}`}]});
      }).catch(err=> {
        console.log('pokemon não encontrado');
        setPokedex([0, 5]);

      });
    }

  }

  if (pokedex.length === 0) return <div></div>

  return (
      <div className="App">
        <div  className='filho'>
          <form className='search'>
            <input
              ref={inputRef}
              value={search}
              onChange={()=> setSearch(inputRef.current.value)}
              type='text'
            />
            <button className='btn_search' onClick={handleSubmit}>Pesquisar</button>
          </form>

        </div>

        <div id='topo' className='filho'>

        {pokedex.results ? (
          <>
            {pokedex.results.map((el, id)=>{
              return (
                <Card key={id} poke={el}/>
              );
            })}
          </>
        ):(
          <p>Pokemon não encontrado</p>
        )}

        </div>

        <div className='filho'>

            <Button handleClick={handleMorePokemon} text='More' disabled={next}/>

        </div>
      </div>
  );
}

export default App;
