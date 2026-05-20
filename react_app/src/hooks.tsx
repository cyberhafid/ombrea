import { SitesService, SiteDataService } from '@services';
import { useQuery } from '@tanstack/react-query';


export function useQuerySitesList() {
  return useQuery({ 
    queryKey: ["Sites"], 
    queryFn: () => SitesService.getSitesList()
  });
}

export function useQuerySiteData(id: number | undefined, start: string = "-24h", end: string = "now()") {
  return useQuery({ 
    queryKey: ["SiteData", id, start, end], 
    queryFn: () => SiteDataService.getSiteData(id!, start, end),
    enabled: id !== undefined,
  });
}
