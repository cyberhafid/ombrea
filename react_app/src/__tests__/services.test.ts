import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { SitesService, SiteDataService } from '../services';

vi.mock('axios');
const mockedAxios = vi.mocked(axios);

beforeEach(() => {
  vi.spyOn(console, 'error').mockImplementation(() => {});
});

describe('SitesService', () => {
  it('retourne la liste des sites', async () => {
    const mockSites = [{ id: 1, name: 'Site A', farmer: 'Jean Dupont' }];
    mockedAxios.get.mockResolvedValue({ data: mockSites });

    const result = await SitesService.getSitesList();
    expect(result).toEqual(mockSites);
  });


  it('leve une erreur si la requête échoue', async () => {
    mockedAxios.get.mockRejectedValue(new Error('Network Error'));
    await expect(SitesService.getSitesList()).rejects.toThrow('Network Error');
  });
});

describe('SiteDataService', () => {
  it('retourne les données du site avec params (défaut)', async () => {
    const mockData = [{ time: '2026-01-01T00:00:00Z', field: 'air_temperature', value: 20.5, position: 'in' }];
    mockedAxios.get.mockResolvedValue({ data: mockData });

    const result = await SiteDataService.getSiteData(1);
    expect(result).toEqual(mockData);
    expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.stringContaining('/sites/1/data'), 
        expect.objectContaining({params: { start: '-24h', end: 'now()' }})
    );
  });

  it('retourne les données avec une plage de dates', async () => {
    mockedAxios.get.mockResolvedValue({ data: [] });

    await SiteDataService.getSiteData(1, '2026-01-01T00:00:00Z', '2026-01-31T23:59:59Z');
    expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.anything(), 
        expect.objectContaining({
      params: { start: '2026-01-01T00:00:00Z', end: '2026-01-31T23:59:59Z' }
    }));
  });
});
