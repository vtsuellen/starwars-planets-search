import { render, screen } from '@testing-library/react';
import Table from '../components/table';
import { filteredPlanets, handleFilterChange } from '../scripts/filters/filter';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { returnData } from './mock/apiPlanetsMock';

describe('filtered Planets', () => {
  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue(returnData),
    });
  });

  it('filtra planetas por nome', () => {
    const result = filteredPlanets(returnData.results, 'Hoth', []);

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Hoth');
  });

  it('filtra planetas com comparação "maior que"', () => {
    const filters = [
      {
        columnFilter: 'diameter',
        comparisonFilter: 'maior que',
        valueFilter: '10000',
      },
    ];
    const result = filteredPlanets(returnData.results, '', filters);
    const waitedResult = returnData.results.filter(
      (planet) => Number(planet.diameter) > 10000
    );

    result.forEach((element, index) => {
      expect(element.name).toBe(waitedResult[index].name);
    });

    expect(result).toHaveLength(7);
  });

  it('filtra planetas com comparação "menor que"', () => {
    const filters = [
      {
        columnFilter: 'diameter',
        comparisonFilter: 'menor que',
        valueFilter: '10000',
      },
    ];
    const result = filteredPlanets(returnData.results, '', filters);

    expect(result).toHaveLength(3);
    expect(result[0].name).toBe('Hoth');
    expect(result[1].name).toBe('Dagobah');
    expect(result[2].name).toBe('Endor');
  });
  
  it('filtra planetas com comparação "igual a"', () => {
    const filters = [
      {
        columnFilter: 'diameter',
        comparisonFilter: 'igual a',
        valueFilter: '8900',
      },
    ];
    const result = filteredPlanets(returnData.results, '', filters);

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Dagobah');
  });
});

describe('handleFilterChange', () => {
  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue(returnData),
    });
  });

  it('verifica o valor do input', async () => {
   render(<Table />)

   const input = screen.getByTestId('name-filter');
   expect(input).toBeInTheDocument();

   userEvent.type(input, 'Hoth');
   expect(input).toHaveValue('Hoth');
   
   const hoth = await screen.findByText('Hoth');
   expect(hoth).toBeInTheDocument();
  });
});
