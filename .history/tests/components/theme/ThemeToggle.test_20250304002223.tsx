import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { ThemeProvider } from '@/components/theme/ThemeProvider';

describe('ThemeToggle', () => {
  it('renders correctly with default theme', () => {
    render(
      <ThemeProvider defaultTheme="light" storageKey="test-theme">
        <ThemeToggle />
      </ThemeProvider>
    );

    // Check that the select element is rendered
    const themeSelect = screen.getByRole('combobox');
    expect(themeSelect).toBeInTheDocument();
    
    // Default value should be "light"
    expect(themeSelect).toHaveValue('light');
  });

  it('changes theme when a different option is selected', () => {
    render(
      <ThemeProvider defaultTheme="light" storageKey="test-theme">
        <ThemeToggle />
      </ThemeProvider>
    );

    // Get the select element
    const themeSelect = screen.getByRole('combobox');
    
    // Change to dark theme
    fireEvent.change(themeSelect, { target: { value: 'dark' } });
    
    // Value should be updated
    expect(themeSelect).toHaveValue('dark');
    
    // Check that the theme class is applied to the document
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('changes to system theme when system option is selected', () => {
    // Mock window.matchMedia to simulate dark mode preference
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: query === '(prefers-color-scheme: dark)',
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    render(
      <ThemeProvider defaultTheme="light" storageKey="test-theme">
        <ThemeToggle />
      </ThemeProvider>
    );

    // Get the select element
    const themeSelect = screen.getByRole('combobox');
    
    // Change to system theme
    fireEvent.change(themeSelect, { target: { value: 'system' } });
    
    // Value should be updated
    expect(themeSelect).toHaveValue('system');
    
    // Since we mocked matchMedia to return dark mode preference,
    // the theme should be dark
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('applies custom className', () => {
    const { container } = render(
      <ThemeProvider defaultTheme="light" storageKey="test-theme">
        <ThemeToggle className="custom-toggle-class" />
      </ThemeProvider>
    );

    const toggleContainer = container.firstChild;
    expect(toggleContainer).toHaveClass('custom-toggle-class');
  });
});
