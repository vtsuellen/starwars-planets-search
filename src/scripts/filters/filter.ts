import { IFilter, IPlanet } from '../../types/types';

const filteredPlanets = (
  planets: IPlanet[],
  filterText: string,
  filters: IFilter[],
): IPlanet[] => {
  let filtered = planets
    .filter((planet: IPlanet) => planet
      .name.toLowerCase().includes(filterText.toLowerCase()));

  filters.forEach((filter) => {
    const { columnFilter, comparisonFilter, valueFilter } = filter;
    if (comparisonFilter === 'maior que') {
      filtered = filtered.filter((planet) => (
        Number(planet[columnFilter]) > +valueFilter
      ));
    } if (comparisonFilter === 'menor que') {
      filtered = filtered.filter((planet) => (
        Number(planet[columnFilter]) < +valueFilter
      ));
    } if (comparisonFilter === 'igual a') {
      filtered = filtered.filter((planet) => (
        Number(planet[columnFilter]) === +valueFilter
      ));
    }
  });

  return filtered;
};

const handleFilterChange = (
  event: any,
  setFilterText: React.Dispatch<React.SetStateAction<string>>,
) => {
  setFilterText(event.target.value);
};

export { filteredPlanets, handleFilterChange };
