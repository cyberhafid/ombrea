import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import * as hooks from '@hooks';
import Sites from '@pages/Sites';

vi.mock('react-plotly.js', () => ({
  default: () => <div data-testid="plot" />
}));

vi.mock('@hooks', () => ({
  useQuerySitesList: vi.fn(),
  useQuerySiteData: vi.fn(),
}));

const mockSites = [
  { id: 1, name: 'Site A', farmer: 'Jean Dupont' },
  { id: 2, name: 'Site B', farmer: 'Marie Martin' },
];

describe('Sites', () => {
  beforeEach(() => {
    vi.mocked(hooks.useQuerySitesList).mockReturnValue({ data: mockSites } as any);
    vi.mocked(hooks.useQuerySiteData).mockReturnValue({ data: [], isLoading: false } as any);
  });

  it('affiche la liste des sites', () => {
    render(<Sites />);
    expect(screen.getByText('Site A')).toBeInTheDocument();
    expect(screen.getByText('Site B')).toBeInTheDocument();
  });

  it('n\'affiche pas la card données par défaut', () => {
    render(<Sites />);
    expect(screen.queryByText(/Données du site/)).not.toBeInTheDocument();
  });

  it('affiche la card données après sélection d\'un site', () => {
    render(<Sites />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Voir' })[0]);  // clique sur l'icône eye du premier site
    expect(screen.getByText(/Données du site/)).toBeInTheDocument();
  });
});
