import { EmptyOb } from '@components/Empty';
import { IconTrash } from '@components/Icons/IconTrash';
import { TableOb } from '@components/Table/Table';
import { ISitesList } from '@interfaces';
import { Tooltip } from 'antd';
import { EyeOutlined } from '@ant-design/icons';

interface ISiteList {
  sites: ISitesList[] | undefined;
  handleDelete?: (id: number) => void;
    siteId?: { state: number | undefined; setState: (v: number | undefined) => void };
}

export const SitesList = ({ sites, handleDelete, siteId }: ISiteList) => {

//console.log("siteId", siteId)

  return (
    <div>
      <h4 className="mb-2">Sites</h4>
      <TableOb>
        <TableOb.Thead>
          <TableOb.Tr >
            <TableOb.Th>Name</TableOb.Th>
            <TableOb.Th>Farmer</TableOb.Th>
            {(handleDelete || siteId) && <TableOb.Th>Actions</TableOb.Th>}
          </TableOb.Tr>
        </TableOb.Thead>

        <TableOb.Tbody>
          
          {sites && sites.length > 0 ? (
            sites.map((site) => {
              return (
                <TableOb.Tr key={site.id}>
                  <TableOb.Td>{site.name}</TableOb.Td>
                  <TableOb.Td>{site.farmer}</TableOb.Td>

                 {(handleDelete || siteId) && (
                    <TableOb.Td>
                      <div style={{ display: 'flex', gap: '40px' }} onClick={(e) => e.stopPropagation()}>
                    {siteId && (
                          <Tooltip title={'Voir'}>
                            <button
                              aria-label="Voir"
                              className="simulations__actions simulations__actions--delete simulations__actions--small flex items-center gap-1"
                              onClick={() => siteId.setState(site.id as number)}
                              type="button">
                              <EyeOutlined height={16} width={16} />
                            </button>
                          </Tooltip>
                  )} 
                        {handleDelete && site.id % 2 === 0 &&  (
                          <Tooltip title={'Supprimer'}>
                            <button
                              aria-label="Supprimer"
                              className="simulations__actions simulations__actions--delete simulations__actions--small flex items-center gap-1"
                              onClick={() => handleDelete(site.id as number)}
                              type="button">
                              <IconTrash height={16} width={16} />
                            </button>
                          </Tooltip>
                        )}
                      </div>
                    </TableOb.Td>
                  )} 


                </TableOb.Tr>
              );
            })
          ) : (
            <TableOb.Tr className="empty">
              <TableOb.Td colSpan={100}>
                <EmptyOb
                  height={150}
                  message={"Pas de site"}
                  title={"Sites"}
                  small
                />
              </TableOb.Td>
            </TableOb.Tr>
          )}
        </TableOb.Tbody>
      </TableOb>
    </div>
  );
};

export default SitesList;
