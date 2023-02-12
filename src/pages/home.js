import React, { useEffect, useState, useContext } from 'react';
import { ListContext } from '../contexts/Contexts';
import api from '../api';
import CountPage from '../components/CountPage';
import Card from '../components/Card';
import logo from '../assets/pokemon-png-logo.webp'

import CircularProgress from '@mui/material/CircularProgress';

import '../css/pokedex.css';
import '../css/global.css';

const Home = () => {
  const [ , setList ] = useContext(ListContext);

  const pokemons = 10;

  const [ page, setPage ] = useState(1);
  const [ total, setTotal ] = useState(0);
  const [ loading, setLoading ] = useState(false);

  const getTotalPages = async () => {
    await api.get()
      .then(({ data }) => {
      setTotal(Math.ceil(data.count / pokemons));
      })
      .catch(e => console.log(e));
  };

  const pokemonList = async () => {
    setLoading(true);

    const urlList = [];

    const end = page * pokemons;
    const start = end - (pokemons - 1);

    for (let i = start; i <= end; i++) { urlList.push(await api.get(`/${i}`)) };

    await Promise.all(urlList)
      .then((result) => {
        setList(result);
      })
      .catch(e => console.log(e));

    setLoading(false);
  };

  useEffect(() => {
    getTotalPages();
  }, []);

  useEffect(() => {
    pokemonList();
  }, [page]);


  return (
    <section class="content">
        <div class="logo">
          <img src={logo} alt="Pokemon Logo" />
        </div>

        { loading ? <div className='loading'><CircularProgress /></div> : <>

        <ol id="pokemonList" class="pokemons">
          <Card />
        </ol>

        <div class="pagination">
          <button onClick={() => CountPage('decrease', page, total, setPage)}>{'<'}</button>Página {page} de {total}
          <button onClick={() => CountPage('increase', page, total, setPage)}>{'>'}</button>
        </div>
      </> }

    </section>
  );
};

export default Home;
