import { render, screen } from '@testing-library/react';
import Table from '../components/table';
import { filteredPlanets, handleFilterChange } from '../scripts/filters/filter';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';

const returnData = {
  results: [
    {
      climate: 'arid',
      created: '2014-12-09T13:50:49.641000Z',
      diameter: '10465',
      edited: '2014-12-20T20:58:18.411000Z',
      films: [
        'https://swapi.dev/api/films/1/',
        'https://swapi.dev/api/films/3/',
        'https://swapi.dev/api/films/4/',
        'https://swapi.dev/api/films/5/',
        'https://swapi.dev/api/films/6/',
      ],
      gravity: '1 standard',
      name: 'Tatooine',
      orbital_period: '304',
      population: '200000',
      rotation_period: '23',
      surface_water: '1',
      terrain: 'desert',
      url: 'https://swapi.dev/api/planets/1/',
    },
    {
      climate: 'temperate',
      created: '2014-12-10T11:35:48.479000Z',
      diameter: '12500',
      edited: '2014-12-20T20:58:18.420000Z',
      films: [
        'https://swapi.dev/api/films/1/',
        'https://swapi.dev/api/films/6/',
      ],
      gravity: '1 standard',
      name: 'Alderaan',
      orbital_period: '364',
      population: '2000000000',
      rotation_period: '24',
      surface_water: '40',
      terrain: 'grasslands, mountains',
      url: 'https://swapi.dev/api/planets/2/',
    },
    {
      climate: 'temperate, tropical',
      created: '2014-12-10T11:37:19.144000Z',
      diameter: '10200',
      edited: '2014-12-20T20:58:18.421000Z',
      films: ['https://swapi.dev/api/films/1/'],
      gravity: '1 standard',
      name: 'Yavin IV',
      orbital_period: '4818',
      population: '1000',
      rotation_period: '24',
      surface_water: '8',
      terrain: 'jungle, rainforests',
      url: 'https://swapi.dev/api/planets/3/',
    },
    {
      climate: 'frozen',
      created: '2014-12-10T11:39:13.934000Z',
      diameter: '7200',
      edited: '2014-12-20T20:58:18.423000Z',
      films: ['https://swapi.dev/api/films/2/'],
      gravity: '1.1 standard',
      name: 'Hoth',
      orbital_period: '549',
      population: 'unknown',
      rotation_period: '23',
      surface_water: '100',
      terrain: 'tundra, ice caves, mountain ranges',
      url: 'https://swapi.dev/api/planets/4/',
    },
    {
      climate: 'murky',
      created: '2014-12-10T11:42:22.590000Z',
      diameter: '8900',
      edited: '2014-12-20T20:58:18.425000Z',
      films: [
        'https://swapi.dev/api/films/2/',
        'https://swapi.dev/api/films/3/',
        'https://swapi.dev/api/films/6/',
      ],
      gravity: 'N/A',
      name: 'Dagobah',
      orbital_period: '341',
      population: 'unknown',
      rotation_period: '23',
      surface_water: '8',
      terrain: 'swamp, jungles',
      url: 'https://swapi.dev/api/planets/5/',
    },
    {
      climate: 'temperate',
      created: '2014-12-10T11:43:55.240000Z',
      diameter: '118000',
      edited: '2014-12-20T20:58:18.427000Z',
      films: ['https://swapi.dev/api/films/2/'],
      gravity: '1.5 (surface), 1 standard (Cloud City)',
      name: 'Bespin',
      orbital_period: '5110',
      population: '6000000',
      rotation_period: '12',
      surface_water: '0',
      terrain: 'gas giant',
      url: 'https://swapi.dev/api/planets/6/',
    },
    {
      climate: 'temperate',
      created: '2014-12-10T11:50:29.349000Z',
      diameter: '4900',
      edited: '2014-12-20T20:58:18.429000Z',
      films: ['https://swapi.dev/api/films/3/'],
      gravity: '0.85 standard',
      name: 'Endor',
      orbital_period: '402',
      population: '30000000',
      rotation_period: '18',
      surface_water: '8',
      terrain: 'forests, mountains, lakes',
      url: 'https://swapi.dev/api/planets/7/',
    },
    {
      climate: 'temperate',
      created: '2014-12-10T11:52:31.066000Z',
      diameter: '12120',
      edited: '2014-12-20T20:58:18.430000Z',
      films: [
        'https://swapi.dev/api/films/3/',
        'https://swapi.dev/api/films/4/',
        'https://swapi.dev/api/films/5/',
        'https://swapi.dev/api/films/6/',
      ],
      gravity: '1 standard',
      name: 'Naboo',
      orbital_period: '312',
      population: '4500000000',
      rotation_period: '26',
      surface_water: '12',
      terrain: 'grassy hills, swamps, forests, mountains',
      url: 'https://swapi.dev/api/planets/8/',
    },
    {
      climate: 'temperate',
      created: '2014-12-10T11:54:13.921000Z',
      diameter: '12240',
      edited: '2014-12-20T20:58:18.432000Z',
      films: [
        'https://swapi.dev/api/films/3/',
        'https://swapi.dev/api/films/4/',
        'https://swapi.dev/api/films/5/',
        'https://swapi.dev/api/films/6/',
      ],
      gravity: '1 standard',
      name: 'Coruscant',
      orbital_period: '368',
      population: '1000000000000',
      rotation_period: '24',
      surface_water: 'unknown',
      terrain: 'cityscape, mountains',
      url: 'https://swapi.dev/api/planets/9/',
    },
    {
      climate: 'temperate',
      created: '2014-12-10T12:45:06.577000Z',
      diameter: '19720',
      edited: '2014-12-20T20:58:18.434000Z',
      films: ['https://swapi.dev/api/films/5/'],
      gravity: '1 standard',
      name: 'Kamino',
      orbital_period: '463',
      population: '1000000000',
      rotation_period: '27',
      surface_water: '100',
      terrain: 'ocean',
      url: 'https://swapi.dev/api/planets/10/',
    },
  ],
};

describe('filtered Planets', () => {
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
