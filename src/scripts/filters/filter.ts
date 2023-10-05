import { IFilter, IPlanet } from '../../types/types';

const filteredPlanets = (
  planets: IPlanet[], // Um array de planetas
  filterText: string, // O texto pelo qual os planetas serão filtrados
  filters: IFilter[], // Filtros adicionais (não estão sendo usados neste trecho)
): IPlanet[] => {
  let filtered = planets // Inicializa uma variável "filtered" com o array de planetas de entrada
    .filter((planet: IPlanet) => planet
      .name.toLowerCase() // Converte o nome do planeta para letras minúsculas
      .includes(filterText.toLowerCase())); // Faz aparecer assim que adiconar uma letra

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
  // // O segundo parâmetro é uma função para atualizar o estado de um componente React,
) => {
  // Quando o evento ocorre (por exemplo, quando o valor de um campo de entrada de formulário muda), este código é executado.

  // event.target.value contém o valor do elemento que desencadeou o evento, neste caso, o valor de um campo de entrada de formulário.

  // setFilterText é uma função que será usada para atualizar o estado de algum componente React com o novo valor do campo de entrada.

  // Aqui, estamos atualizando o estado do filtro com o novo valor do campo de entrada.
  setFilterText(event.target.value);
};

export { filteredPlanets, handleFilterChange };
