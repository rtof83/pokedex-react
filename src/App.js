import { useEffect, useState } from 'react';
import api from './api';
import CountPage from './components/CountPage';

import './css/pokedex.css';
import './css/global.css';

const App = () => {
  const pokemons = 10;

  const [ page, setPage ] = useState(1);
  const [ total, setTotal ] = useState(0);
  const [ list, setList ] = useState('');
  const [ loading, setLoading ] = useState(false);

  // const getPokemonDetail = async (pokemon) => {
  //   await api.get(`/${pokemon}`)
  //     .then(({ data }) => {
  //       console.log(data.types[0].type.name);
  //       setData(data);
  //     })
  //     .then(() => pokemonList)
  //     .catch(e => console.log(e));
  // };

  const getTotalPages = async () => {
    await api.get()
      .then(({ data }) => {
      setTotal(Math.ceil(data.count / pokemons));
      })
      .catch(e => console.log(e));
  };

  const mountList = (list) => {
    setList(list.map(item => (
      <li className={`pokemon ${item.data.types[0].type.name}`}>
          <span class="number">#{item.data.id}</span>
          <span class="name">{item.data.name}</span>

          <div class="detail">
              <ol class="types">
                {item.data.types.map(({ type }) => <li class={`type ${type.name}`}>{type.name}</li>)}
              </ol>

              <img src={item.data.sprites.other.dream_world.front_default}
                   alt={item.data.name} />
          </div>
      </li>
    )));
  };

  const pokemonList = async () => {
    setLoading(true);

    const urlList = [];

    const end = page * pokemons;
    const start = end - (pokemons - 1);

    for (let i = start; i <= end; i++) { urlList.push(await api.get(`/${i}`)) };

    await Promise.all(urlList)
      .then((result) => {
        mountList(result);
      })
      .catch(e => console.log(e));


    // getPokemonDetail(1);

    // let list = '';

    // setList(
    //     <li className={`pokemon ${data.types[0].type.name}`}>
    //         <span class="number">#{data.id}</span>
    //         <span class="name">{data.name}</span>

    //         <div class="detail">
    //             <ol class="types">
    //                 ${data.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
    //             </ol>

    //             <img src={data.sprites.other.dream_world.front_default}
    //                  alt={data.name} />
    //         </div>
    //     </li>
    // );

    // return list;


//     setList(<li class="pokemon">
//     <span class="number">01</span>
//     <span class="name">teste</span>

//     <div class="detail">
//         <ol class="types">
//             <li class="type fire">tipo</li>
//         </ol>

//         <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/6.png"
//              alt="" />
//     </div>
// </li> )

    setLoading(false);
  };

  useEffect(() => {
    // getPokemonDetail(1);
    getTotalPages();
    // pokemonList();
  }, []);

  useEffect(() => {
    pokemonList();
  }, [page]);


  return (
    <section class="content">
        <h1>Pokedex</h1>

        { loading ? <h3>carregando...</h3> : <>

        <ol id="pokemonList" class="pokemons">

            {/* <!-- ..... Pokemons here ..... --> */}

            {/* <PokemonList /> */}

            {list}

            {/* <li class="pokemon">
            <span class="number">01</span>
            <span class="name">teste</span>

            <div class="detail">
                <ol class="types">
                    <li class="type fire">tipo</li>
                </ol>

                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/6.png"
                     alt="" />
            </div>
        </li> */}

        {/* <!-- ..... Pokemons here ..... --> */}



        </ol>

        <div class="pagination">
          <button onClick={() => CountPage('decrease', page, total, setPage)}>{'<'}</button>P??gina {page} de {total}
          <button onClick={() => CountPage('increase', page, total, setPage)}>{'>'}</button>
        </div>


        {/* <StyledTableCell colSpan={7} align="center">
          <Button sx={{ mr: 1.5 }} variant="outlined" onClick={() => CountPage('decrease', page, data, setPage)}>{'<'}</Button>P??gina {item.page} de {item.from}
          <Button sx={{ ml: 1.5 }} variant="outlined" onClick={() => CountPage('increase', page, data, setPage)}>{'>'}</Button>
        </StyledTableCell> */}

      </> }

    </section>
  );
}

export default App;
