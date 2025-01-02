import { getAllByRole, render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Simple from './Simple';

describe('First test', () => {
  it('Simple component should renders the meetup list', () => {
    render(<Simple />);
    const [thead, tbody] = screen.getAllByRole('rowgroup');
    
    // Check that thead is rendered correctly
    const columns = getAllByRole(thead, 'columnheader');
    expect(columns).toHaveLength(3);
    expect(columns[0]).toHaveTextContent('Name');
    expect(columns[1]).toHaveTextContent('Date');
    expect(columns[2]).toHaveTextContent('Location');

    // Check that first row is rendered correctly
    const [row1] = getAllByRole(tbody, 'row');    
    const [name1, date1, location1] = getAllByRole(row1, 'cell');
    expect(name1).toHaveTextContent('Touraine Tech');
    expect(date1).toHaveTextContent('2025-02-06');
    expect(location1).toHaveTextContent('Tours');
  });
});
