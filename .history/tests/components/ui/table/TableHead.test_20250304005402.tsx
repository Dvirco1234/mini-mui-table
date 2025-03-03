import { render, screen } from "@testing-library/react";
import { TableHead } from "@/components/ui/table";

describe("TableHead", () => {
  it("renders correctly with children", () => {
    render(
      <table>
        <TableHead>
          <tr>
            <th>Header 1</th>
            <th>Header 2</th>
          </tr>
        </TableHead>
      </table>
    );

    expect(screen.getByText("Header 1")).toBeInTheDocument();
    expect(screen.getByText("Header 2")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <table>
        <TableHead className="custom-class">
          <tr>
            <th>Header</th>
          </tr>
        </TableHead>
      </table>
    );

    const thead = container.querySelector("thead");
    expect(thead).toHaveClass("custom-class");
  });

  it("forwards ref correctly", () => {
    const ref = jest.fn();
    render(
      <table>
        <TableHead ref={ref}>
          <tr>
            <th>Header</th>
          </tr>
        </TableHead>
      </table>
    );

    expect(ref).toHaveBeenCalled();
  });
});
