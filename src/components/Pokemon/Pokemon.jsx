import React, { useState, useEffect } from "react";
import axios from "axios";

const Pokemon = () => {
  const [pokemonId, setPokemonId] = useState(6);
  const [pokemonFilter, setPokemonFilter] = useState(6);
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    async function getPokemonData() {
      let url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
      let response = await axios.get(url);
      let data = await response.data;
      const { id, name, sprites, stats, types } = data;

      // Create a pokemonData object
      // Objects have a name, number, artwork, stats and types property
      const pokemonData = {
        number: id,
        name: name,
        artwork: sprites.other["official-artwork"].front_default,
        stats: stats,
        types: types,
      };

      setPokemonData(pokemonData);
    }

    getPokemonData();
  }, [pokemonId]);

  const handlePokemonFilter = (e) => {
    e.preventDefault();

    // Remove leading zeros from input
    setPokemonFilter(e.target.value.replace(/^0+/, ""));
  };

  const handlePokemonSubmit = (e) => {
    e.preventDefault();
    setPokemonId(pokemonFilter);
  };

  const padZeros = (num, places) => String(num).padStart(places, "0");

  return (
    <>
      {pokemonData && (
        <div>
          <form onSubmit={handlePokemonSubmit}>
            <label>
              Pokemon Number:
              <input
                type="number"
                min={1}
                max={898}
                required
                value={pokemonFilter}
                onChange={handlePokemonFilter}
              />
            </label>
            <input type="submit" value="I Choose You" />
          </form>
          <div>
            <div>
              <h1>{padZeros(pokemonData.number, 3)}</h1>
              <h1>{pokemonData.name.toUpperCase()}</h1>
            </div>
            <div>
              <div>
                <img src={pokemonData.artwork} alt={`${pokemonData.name}`} />
              </div>
              <div>
                {pokemonData.types.length === 1 ? (
                  <div>
                    <p>{pokemonData.types[0].type.name.toUpperCase()}</p>
                  </div>
                ) : (
                  <div>
                    <p>{pokemonData.types[0].type.name.toUpperCase()}</p>
                    <p>{pokemonData.types[1].type.name.toUpperCase()}</p>
                  </div>
                )}
                <div>
                  {pokemonData.stats.map((stat) => (
                    <p>{`${stat.stat.name.toUpperCase()}: ${
                      stat.base_stat
                    }`}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Pokemon;
