import { render, screen } from "@testing-library/react";
import { TableCell } from "@/components/ui/table";

describe("TableCell", () => {
  it("renders correctly with children", () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableCell>Cell Content</TableCell>
          </tr>
        </tbody>
      </table>
    );

    expect(screen.getByText("Cell Content")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <TableCell className="custom-class">Cell</TableCell>
          </tr>
        </tbody>
      </table>
    );

    const td = container.querySelector("td");
    expect(td).toHaveClass("custom-class");
  });

  it("applies colSpan attribute", () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <TableCell colSpan={3}>Cell</TableCell>
          </tr>
        </tbody>
      </table>
    );

    const td = container.querySelector("td");
    expect(td).toHaveAttribute("colspan", "3");
  });

  it("forwards ref correctly", () => {
    const ref = jest.fn();
    render(
      <table>
        <tbody>
          <tr>
            <TableCell ref={ref}>Cell</TableCell>
          </tr>
        </tbody>
      </table>
    );

    expect(ref).toHaveBeenCalled();
  });
});
