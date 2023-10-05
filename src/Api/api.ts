import { IPlanet } from '../types/types';

const fetchPlanets = async () => {
  const response = await fetch('https://swapi.dev/api/planets');
  const data = await response.json();

  // Remover a coluna 'residents' de cada planeta
  const planetsWithoutResidents = data.results.map((planet: IPlanet) => {
    const { residents, ...planetWithoutResidents } = planet;
    // Basicamente, ele está extraindo a propriedade residents do objeto planet e criando um novo objeto chamado planetWithoutResidents que contém todas as outras propriedades do objeto planet, exceto residents.
    return planetWithoutResidents;
  });

  return planetsWithoutResidents;
};

export default fetchPlanets;

// Outra forma de retirar a coluna residents

// const planetsWithoutResidents = data.results.map((planet: IPlanet) => {
//   delete planet.residents;
//   return planet;
// });
