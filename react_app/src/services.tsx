import { ISitesList, ISiteData } from "@interfaces";
import axios from 'axios';

export const SitesService = {
  getSitesList: async (): Promise<ISitesList[]> => {
    try {
      const sites = await axios.get(`${import.meta.env.VITE_API_URL}/sites/`, { 'headers': { 'Content-Type': 'application/json' } });
      return sites.data;
    } catch (error) {
      console.error('Error fetching sites list:', error);
      throw error;
    }
  },
};

export const SiteDataService = {
  getSiteData: async (siteId: number, start: string = "-24h", end: string = "now()"): Promise<ISiteData[]> => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/sites/${siteId}/data`, { 'headers': { 'Content-Type': 'application/json' } , params: { start, end }});
      return response.data;
    } catch (error) {
      console.error('Error fetching sites data:', error);
      throw error;
    }
  },
};