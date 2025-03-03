import { render, screen } from '@testing-library/react';
import { TableBody } from '@/components/ui/table';

describe('TableBody', () => {
  it('renders correctly with children', () => {
    render(
      <table>
        <TableBody>
          <tr>
            <td>Cell 1</td>
            <td>Cell 2</td>
          </tr>
        </TableBody>
      </table>
    );

    expect(screen.getByText('Cell 1')).toBeInTheDocument();
    expect(screen.getByText('Cell 2')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <table>
        <TableBody className="custom-class">
          <tr>
            <td>Cell</td>
          </tr>
        </TableBody>
      </table>
    );

    const tbody = container.querySelector('tbody');
    expect(tbody).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = jest.fn();
    render(
      <table>
        <TableBody ref={ref}>
          <tr>
            <td>Cell</td>
          </tr>
        </TableBody>
      </table>
    );

    expect(ref).toHaveBeenCalled();
  });
});
