import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import Pokedex from 'pokedex-promise-v2';
const P = new Pokedex();
const totalPokemon = 1020;

const PokemonCard = (pokemon) => {
  const thisPokemon = { ...pokemon.pokemon };

  console.log(thisPokemon);
  return (
    <div className="pokemon-card">
      <div className="pokemon-name">
        <h1>{thisPokemon.name}</h1>
        <span className="pokemon-id">#{thisPokemon.id}</span>
      </div>
      <img className="pokemon-img-main" src={thisPokemon.sprites.other.home.front_default} alt={thisPokemon.name} />
      <SpriteList spriteList={thisPokemon.sprites} />
      <div className="pokemon-weight">Weight: {weightToKilos(thisPokemon.weight)}kg</div>
      <div className="pokemon-height">Height: {heightToCM(thisPokemon.height)}cm</div>
      <BaseStatsList stats={thisPokemon.stats} />
      <TypeList types={thisPokemon.types} />
      <HeldItemsList items={thisPokemon.held_items} />
    </div>
  );
};

const SpriteList = (spriteList) => {
  return (
    <div className="sprites">
      {spriteList.spriteList.front_default && (
        <span>
          <img src={spriteList.spriteList.front_default} alt="default sprite" />
          Default
        </span>
      )}

      {spriteList.spriteList.front_shiny && (
        <span>
          <img src={spriteList.spriteList.front_shiny} alt="shiny sprite" />
          Shiny
        </span>
      )}

      {spriteList.spriteList.front_female && (
        <span>
          <img src={spriteList.spriteList.front_female} alt="female sprite" />
          Female
        </span>
      )}

      {spriteList.spriteList.front_shiny_female && (
        <span>
          <img src={spriteList.spriteList.front_shiny_female} alt="shiny female sprite" />
          Shiny female
        </span>
      )}
    </div>
  );
};

const BaseStatsList = (stats) => {
  const statsList = [];
  stats.stats.forEach((stat) => {
    statsList.push(
      <tr key={stat.stat.name}>
        <td>{stat.stat.name}</td>
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
    typeList.push(<span key={`type-${type.slot}`}>{type.type.name}</span>);
  });

  return (
    <span className="type-list">
      <h2>Types</h2>
      {typeList}
    </span>
  );
};

const HeldItemsList = (items) => {
  const itemsList = [];
  items.items.forEach((item) => {
    itemsList.push(<li key={items.items.indexOf(item)}>{item.item.name}</li>);
  });

  return (
    itemsList.length > 0 && (
      <div className="held-items">
        <h2>Held items</h2>
        <ul>{itemsList}</ul>
      </div>
    )
  );
};

const getRandomPokemon = async () => {
  const randomNumber = Math.ceil(Math.random() * totalPokemon);
  // const myPokemon = await P.getPokemonByName(randomNumber);
  const myPokemon = await P.getPokemonByName(396);
  return myPokemon;
};

const myPokemon = await getRandomPokemon();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PokemonCard pokemon={myPokemon} />
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
