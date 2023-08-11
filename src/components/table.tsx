import React, { useEffect, useState } from 'react';
import fetchPlanets from '../Api/api';
import { Planet } from '../types/types';
import { filteredPlanets, handleFilterChange } from '../scripts/filters/text';

function Table() {
  const [planets, setPlanets] = useState([]);
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const planetsWithoutResidents = await fetchPlanets();
      setPlanets(planetsWithoutResidents);
    };

    fetchData();
  }, []);

  return (
    <>
      <div>
        <input
          type="text"
          value={ filterText }
          onChange={ (e) => handleFilterChange(e, setFilterText) }
          data-testid="name-filter"
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {filteredPlanets(planets, filterText).map((planet: Planet, index) => (
            <tr key={ index }>
              <td>{planet.name}</td>
              <td>{planet.rotation_period}</td>
              <td>{planet.orbital_period}</td>
              <td>{planet.diameter}</td>
              <td>{planet.climate}</td>
              <td>{planet.gravity}</td>
              <td>{planet.terrain}</td>
              <td>{planet.surface_water}</td>
              <td>{planet.population}</td>
              <td>{planet.films}</td>
              <td>{planet.created}</td>
              <td>{planet.edited}</td>
              <td>{planet.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Table;
