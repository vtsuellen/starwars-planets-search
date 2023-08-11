import { Planet } from '../../types/types';

const filteredPlanets = (planets: never[], filterText: string) => planets
  .filter((planet: Planet) => planet
    .name.toLowerCase().includes(filterText.toLowerCase()));

const handleFilterChange = (
  event: any,
  setFilterText: React.Dispatch<React.SetStateAction<string>>,
) => {
  setFilterText(event.target.value);
};

export { filteredPlanets, handleFilterChange };
