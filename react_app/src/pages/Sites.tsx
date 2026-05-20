import { SitesList } from '@elements/SitesList';
import { useQuerySitesList, useQuerySiteData } from '@hooks';
import { useState } from 'react';
import Plot from 'react-plotly.js';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
dayjs.locale('fr');

const { RangePicker } = DatePicker;

const Sites = () => {

  const [selectedSiteId, setSelectedSiteId] = useState<number | undefined>(undefined)
  const [dateRange, setDateRange] = useState<[string, string]>(["-24h", "now()"]);

  const { data: sitesListData } = useQuerySitesList();
  const { data: siteData, isLoading } = useQuerySiteData(selectedSiteId, dateRange[0], dateRange[1]);

  const traces = siteData
    ? Object.entries(
      siteData.reduce((acc, d) => {
        const key = `${d.field} (${d.position})`;
        if (!acc[key]) acc[key] = { x: [], y: [] };
        acc[key].x.push(d.time);
        acc[key].y.push(d.value);
        return acc;
      }, {} as Record<string, { x: string[]; y: number[] }>)
    ).map(([name, { x, y }]) => ({
      name, x, y,
      type: 'scatter' as const,
      mode: 'lines+markers' as const,
      line: { shape: 'spline', smoothing: 0.8, width: 2 },
      marker: { size: 4 }
    }))
    : [];

  return (
    <>
      <div className="card">
        <h3 style={{ marginBottom: '8px' }}>Projets</h3>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
          <h5>Date    :    </h5>
          <RangePicker
            picker="date"
            onChange={(dates) => {
              if (dates?.[0] && dates?.[1]) {
                console.log(dates[0].toISOString(), dates[1].toISOString());
                setDateRange([dates[0].toISOString(), dates[1].toISOString()]);
              } else {
                setDateRange(["-24h", "now()"]);
              }
            }}
          />
        </div>

        <div style={{ marginBottom: '8px' }}>
          <SitesList handleDelete={(id) => console.log('delete', id)} sites={sitesListData} siteId={{ state: selectedSiteId, setState: setSelectedSiteId }} />

        </div>
      </div>

      {selectedSiteId !== undefined && (
        <div className="card">
          <h3 style={{ marginBottom: '8px' }}>Données du site {selectedSiteId}</h3>
          {isLoading ? (
            <p>Chargement...</p>
          ) : (
            /*    <ul>
                 {siteData?.map((d, i) => (
                   <li key={i}>{d.time} — {d.field} : {d.value} ({d.position})</li>
                 ))}
               </ul> */
            <Plot data={traces} layout={{ height: 400, autosize: true, title: `Site ${selectedSiteId}`,     xaxis: { title: { text: 'Heure' } },
  yaxis: { title: { text: 'Température (°C)' } } }} style={{ width: '100%' }} useResizeHandler/>
          )}
        </div>
      )}

    </>
  );
};

export default Sites;
