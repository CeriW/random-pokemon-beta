import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import Pokedex from 'pokedex-promise-v2';
const P = new Pokedex();
const totalPokemon = 1020;

const PokemonCard = (pokemon) => {
  // const myPokemon = getRandomPokemon();
  // const myRandomPokemon =

  const thisPokemon = { ...pokemon.pokemon };

  console.log(thisPokemon);
  return (
    <div className="pokemon-card">
      <div className="pokemon-name">{thisPokemon.name}</div>
      <div className="pokemon-id">#{thisPokemon.id}</div>
      <img src={thisPokemon.sprites.other.home.front_default} alt={thisPokemon.name} />
      <SpriteList spriteList={thisPokemon.sprites} />
    </div>
  );
};

const SpriteList = (spriteList) => {
  // console.log(spriteList.spriteList);
  // console.log(Object.keys(spriteList.spriteList));

  // const spriteImages = [];

  // spriteKeys.forEach((type) => {
  //   spriteImages.push(
  //     typeof spriteList.spriteList[type] === 'string' && (
  //       <div>
  //         <img src={spriteList.spriteList[type]} />
  //         <span>{type}</span>
  //       </div>
  //     )
  //   );
  // });

  // const spriteImages = spriteList.spriteList.map((sprite) => {
  //   return sprite ? <img src={sprite} /> : null;
  // });

  return (
    <div>
      {spriteList.spriteList.front_default && (
        <span>
          <img src={spriteList.spriteList.front_default} alt="default sprite" />
          Default
        </span>
      )}

      {spriteList.spriteList.shiny_default && (
        <span>
          <img src={spriteList.spriteList.shiny_default} alt="shiny sprite" />
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
  // return <div>{JSON.stringify(spriteList)}</div>;
};

const getRandomPokemon = async () => {
  const randomNumber = Math.ceil(Math.random() * totalPokemon);
  const myPokemon = await P.getPokemonByName(randomNumber);
  return myPokemon;
};

const myPokemon = await getRandomPokemon();
// console.log(myPokemon);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}

    <PokemonCard pokemon={myPokemon} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
