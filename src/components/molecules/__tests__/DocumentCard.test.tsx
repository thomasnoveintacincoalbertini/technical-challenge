import { render, screen } from '@testing-library/react-native';
import { Document } from '../../../types/document';
import { DocumentCard } from '../DocumentCard';

const document: Document = {
  id: '1',
  title: 'Hop Rod Rye',
  version: '2.6.16',
  createdAt: '2020-08-12T07:30:08Z',
  updatedAt: '2020-08-12T07:30:08Z',
  attachments: ['Light Lager', 'Porter'],
  contributors: [
    { id: 'a', name: 'Carlie Abott' },
    { id: 'b', name: 'Zoe Buckridge' },
  ],
};

describe('DocumentCard', () => {
  it('shows title and version in grid mode without the detail columns', async () => {
    await render(<DocumentCard document={document} mode="grid" />);

    expect(screen.getByText('Hop Rod Rye')).toBeTruthy();
    expect(screen.getByText('Version 2.6.16')).toBeTruthy();
    expect(screen.queryByText('Contributors')).toBeNull();
  });

  it('shows contributors and attachments in list mode', async () => {
    await render(<DocumentCard document={document} mode="list" />);

    expect(screen.getByText('Contributors')).toBeTruthy();
    expect(screen.getByText('Attachments')).toBeTruthy();
    expect(screen.getByText('Carlie Abott')).toBeTruthy();
    expect(screen.getByText('Light Lager')).toBeTruthy();
  });
});
