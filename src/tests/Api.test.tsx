import { render, waitFor } from '@testing-library/react';
import fetchPlanets from '../Api/api';
import Table from '../components/table';
import { vi } from 'vitest';
import { returnData } from './mock/apiPlanetsMock';

describe('fetch Planets', () => {
  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue(returnData),
    });
  });
  test('Buscar e retornar dados de planetas', async () => {
    render(<Table />);

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    
  });
});
