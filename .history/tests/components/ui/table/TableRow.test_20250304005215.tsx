/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import { TableRow } from '@/components/ui/table';

describe('TableRow', () => {
  it('renders correctly with children', () => {
    render(
      <table>
        <tbody>
          <TableRow>
            <td>Cell 1</td>
            <td>Cell 2</td>
          </TableRow>
        </tbody>
      </table>
    );

    expect(screen.getByText('Cell 1')).toBeInTheDocument();
    expect(screen.getByText('Cell 2')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <table>
        <tbody>
          <TableRow className="custom-class">
            <td>Cell</td>
          </TableRow>
        </tbody>
      </table>
    );

    const tr = container.querySelector('tr');
    expect(tr).toHaveClass('custom-class');
  });

  it('applies custom row height', () => {
    const { container } = render(
      <table>
        <tbody>
          <TableRow rowHeight={60}>
            <td>Cell</td>
          </TableRow>
        </tbody>
      </table>
    );

    const tr = container.querySelector('tr');
    expect(tr).toHaveStyle({ height: '60px' });
  });

  it('applies string row height', () => {
    const { container } = render(
      <table>
        <tbody>
          <TableRow rowHeight="4rem">
            <td>Cell</td>
          </TableRow>
        </tbody>
      </table>
    );

    const tr = container.querySelector('tr');
    expect(tr).toHaveStyle({ height: '4rem' });
  });

  it('forwards ref correctly', () => {
    const ref = jest.fn();
    render(
      <table>
        <tbody>
          <TableRow ref={ref}>
            <td>Cell</td>
          </TableRow>
        </tbody>
      </table>
    );

    expect(ref).toHaveBeenCalled();
  });
});
