import './css/pokedex.css';
import './css/global.css';

function App() {
  return (
    <section class="content">
        <h1>Pokedex</h1>

        <ol id="pokemonList" class="pokemons">
            {/* <!-- ..... Pokemons here ..... --> */}
        </ol>

        <div class="pagination">
            <button id="loadMoreButton" type="button">
                Load More
            </button>
        </div>
    </section>
  );
}

export default App;
