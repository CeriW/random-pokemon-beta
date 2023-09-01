import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Pokedex from 'pokedex-promise-v2';
const P = new Pokedex();

const PokemonApp = () => {
  const [currentPokemon, setCurrentPokemon] = useState(null);

  const getRandomPokemon = async () => {
    const totalPokemon = 1010;
    const randomNumber = Math.ceil(Math.random() * totalPokemon);
    const myPokemon = await P.getPokemonByName(randomNumber);
    return myPokemon;
  };

  const generateNewPokemon = async () => {
    const newRandomPokemon = await getRandomPokemon();
    setCurrentPokemon(newRandomPokemon);
  };

  return (
    <div>
      {currentPokemon ? <PokemonCard pokemon={currentPokemon} /> : ''}
      <button onClick={generateNewPokemon}>Give me a random pokemon</button>
    </div>
  );
};

const PokemonCard = ({ pokemon }) => {
  return (
    <div className="pokemon-card">
      <div className="pokemon-name">
        <h1>{pokemon.name}</h1>
        <span className="pokemon-id">#{pokemon.id}</span>
      </div>
      <PokemonImage pokemon={pokemon} />
      <SpriteList spriteList={pokemon.sprites} />
      <div className="pokemon-info">
        <h2>Info</h2>
        <div className="pokemon-weight">Weight: {weightToKilos(pokemon.weight)}kg</div>
        <div className="pokemon-height">Height: {heightToCM(pokemon.height)}cm</div>
      </div>
      <BaseStatsList stats={pokemon.stats} />
      <TypeList types={pokemon.types} />
      <HeldItemsList items={pokemon.held_items} />
    </div>
  );
};

const PokemonImage = ({ pokemon }) => {
  const imgSrc = pokemon.sprites.other.home.front_default ?? pokemon.sprites.other['official-artwork'].front_default;
  return <img className="pokemon-img-main" src={imgSrc} alt={pokemon.name} />;
};

const HeldItemsList = ({ items }) => {
  const [itemDetails, setItemDetails] = useState([]);

  useEffect(() => {
    async function fetchItemDetails() {
      const itemDetailsData = [];

      for (const item of items) {
        try {
          const response = await P.getItemByName(item.item.name);
          itemDetailsData.push(response);
        } catch (err) {
          console.error('Error:', err);
        }
      }

      setItemDetails(itemDetailsData);
    }

    fetchItemDetails();
  }, [items]);

  return (
    itemDetails.length > 0 && (
      <div className="held-items">
        <h2>Held items</h2>
        <ul>
          {itemDetails.map((itemDetail, index) => (
            <li key={index}>
              <img src={itemDetail.sprites.default} alt={itemDetail.name} />
              {formatName(itemDetail.name)}
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

const SpriteList = (spriteList) => {
  return (
    <div className="sprites">
      <h2>Sprites</h2>
      <div>
        {spriteList.spriteList.front_default && (
          <span>
            <img src={spriteList.spriteList.front_default} alt="default sprite" width="96" />
            Default
          </span>
        )}

        {spriteList.spriteList.front_shiny && (
          <span>
            <img src={spriteList.spriteList.front_shiny} alt="shiny sprite" width="96" />
            Shiny
          </span>
        )}

        {spriteList.spriteList.front_female && (
          <span>
            <img src={spriteList.spriteList.front_female} alt="female sprite" width="96" />
            Female
          </span>
        )}

        {spriteList.spriteList.front_shiny_female && (
          <span>
            <img src={spriteList.spriteList.front_shiny_female} alt="shiny female sprite" width="96" />
            Shiny female
          </span>
        )}
      </div>
    </div>
  );
};

const BaseStatsList = (stats) => {
  const statsList = [];
  stats.stats.forEach((stat) => {
    statsList.push(
      <tr key={stat.stat.name}>
        <td>{formatName(stat.stat.name)}</td>
        <td>{stat.base_stat}</td>
      </tr>
    );
  });

  return (
    <div className="base-stats">
      <h2>Base stats</h2>
      <table>
        <tbody>{statsList}</tbody>
      </table>
    </div>
  );
};

const TypeList = (types) => {
  const typeList = [];
  types.types.forEach((type) => {
    typeList.push(
      <li key={`type-${type.slot}`} type={type.type.name}>
        {formatName(type.type.name)}
      </li>
    );
  });

  return (
    <span className="type-list">
      <h2>Types</h2>
      <ul>{typeList}</ul>
    </span>
  );
};

// Function to capitalize the first letter of the first word
function formatName(name) {
  // Split the name by hyphens
  const words = name.split('-');

  // Capitalize the first letter of the first word and join it with the rest
  const formattedName =
    words[0].charAt(0).toUpperCase() + words[0].slice(1) + (words.length > 1 ? ' ' + words.slice(1).join('-') : '');

  return formattedName;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div></div>
    <PokemonApp />
    <footer>
      Powered by{' '}
      <a href="https://pokeapi.co" target="_blank" rel="noreferrer">
        PokeAPI
      </a>
      . Pokémon and Pokémon character names are trademarks of Nintendo. All rights reserved.
    </footer>
  </React.StrictMode>
);

const weightToKilos = (hectograms) => {
  return (hectograms * 100) / 1000;
};

const heightToCM = (decimetres) => {
  return decimetres * 10;
};

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
