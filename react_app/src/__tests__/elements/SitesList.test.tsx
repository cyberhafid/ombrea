import { render, screen } from '@testing-library/react';
import { SitesList } from '@elements/SitesList';

const mockSites = [
  { id: 1, name: 'Site A', farmer: 'Jean Dupont' },
  { id: 2, name: 'Site B', farmer: 'Marie Martin' },
];

describe('SitesList', () => {
  it('affiche la liste des sites', () => {
    render(<SitesList sites={mockSites} />);
    expect(screen.getByText('Site A')).toBeInTheDocument();
    expect(screen.getByText('Site B')).toBeInTheDocument();
  });

  it('affiche vide si pas de sites', () => {
    render(<SitesList sites={[]} />);
    expect(screen.getByText('Pas de site')).toBeInTheDocument();
  });

  it('affiche le bouton supprimer uniquement sur les IDs pairs', () => {
    render(<SitesList sites={mockSites} handleDelete={vi.fn()} />);
    const deleteButtons = screen.getAllByRole('button', { name: 'Supprimer' });
    expect(deleteButtons).toHaveLength(1); // seulement site id=2
  });
});
