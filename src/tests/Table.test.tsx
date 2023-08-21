import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Table from '../components/table';
import { vi } from 'vitest';
import { returnData } from './mock/apiPlanetsMock';

describe('Componente Table', () => {
  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue(returnData),
    });
  });
  test('Renderiza as colunas da tabela', () => {
    render(<Table />);

    const columnNames = [
      'Name',
      'Rotation Period',
      'Orbital Period',
      'Diameter',
      'Climate',
      'Gravity',
      'Terrain',
      'Surface Water',
      'Population',
      'Films',
      'Created',
      'Edited',
      'URL',
    ];

    columnNames.forEach((header) => {
      const headerElement = screen.getByText(header);
      expect(headerElement).toBeInTheDocument();
    });
  });

  test('Renderiza os campos de filtro e botão', () => {
    render(<Table />);

    const filterInputs = [
      'name-filter',
      'column-filter',
      'comparison-filter',
      'value-filter',
      'button-filter',
    ];

    filterInputs.forEach((input) => {
      const inputElement = screen.getByTestId(input);
      expect(inputElement).toBeInTheDocument();
    });
  });
  test('Aplica o filtro ao clicar no botão', () => {
    render(<Table />);

    const columnFilterInput = screen.getByTestId('column-filter');
    const comparisonFilterInput = screen.getByTestId('comparison-filter');
    const valueFilterInput = screen.getByTestId('value-filter');
    const filterButton = screen.getByTestId('button-filter');

    fireEvent.change(columnFilterInput, { target: { value: 'population' } });
    fireEvent.change(comparisonFilterInput, { target: { value: 'maior que' } });
    fireEvent.change(valueFilterInput, { target: { value: '1000000' } });
    fireEvent.click(filterButton);

    const filteredRows = screen.getAllByText('population');
    expect(filteredRows.length).toBeGreaterThan(0);
  });
});
