import { IPlanet } from '../types/types';

const fetchPlanets = async () => {
  const response = await fetch('https://swapi.dev/api/planets');
  const data = await response.json();

  // Remover a coluna 'residents' de cada planeta
  const planetsWithoutResidents = data.results.map((planet: IPlanet) => {
    const { residents, ...planetWithoutResidents } = planet;
    return planetWithoutResidents;
  });

  return planetsWithoutResidents;
};

export default fetchPlanets;
