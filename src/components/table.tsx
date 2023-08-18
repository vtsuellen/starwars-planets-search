import React, { useEffect, useState } from 'react';
import fetchPlanets from '../Api/api';
import { IFilter, IPlanet } from '../types/types';
import { filteredPlanets, handleFilterChange } from '../scripts/filters/filter';

function Table() {
  const [planets, setPlanets] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [columnFilter, setColumnFilter] = useState('population');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [valueFilter, setValueFilter] = useState('0');
  const [filter, setFilter] = useState<IFilter[]>([]);
  const [filterReturn, setFilterReturn] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const planetsWithoutResidents = await fetchPlanets();
      setPlanets(planetsWithoutResidents);
    };

    fetchData();
  }, []);

  const handleFilterClick = () => {
    setFilter([
      ...filter,
      { columnFilter, comparisonFilter, valueFilter },
    ]);

    // Update the return output
    const newReturnOutput = [
      ...filterReturn,
      `${columnFilter}`,
      `${comparisonFilter}`,
      `${valueFilter}`,
    ];
    setFilterReturn(newReturnOutput);

    // Reset filter values
    setColumnFilter('population');
    setComparisonFilter('maior que');
    setValueFilter('0');
  };

  return (
    <>
      {/* text filter */}
      <div>
        <input
          type="text"
          value={ filterText }
          onChange={ (e) => handleFilterChange(e, setFilterText) }
          data-testid="name-filter"
        />
      </div>

      {/* filters section */}
      <section>

        <select
          data-testid="column-filter"
          value={ columnFilter }
          onChange={ (e) => setColumnFilter(e.target.value) }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>

        <select
          data-testid="comparison-filter"
          value={ comparisonFilter }
          onChange={ (e) => setComparisonFilter(e.target.value) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>

        <input
          type="number"
          data-testid="value-filter"
          value={ valueFilter }
          onChange={ (e) => setValueFilter((e.target.value)) }
        />
        <button onClick={ handleFilterClick } data-testid="button-filter">Filtrar</button>

        {/* filter return */}
        <section data-testid="filter-return">
          <ul>
            { filterReturn.map((output, index) => (
              <li key={ index }>{output}</li>
            ))}
          </ul>
        </section>
      </section>

      {/* Table */}
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
          {filteredPlanets(planets, filterText, filter).map((planet: IPlanet, index) => (
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
