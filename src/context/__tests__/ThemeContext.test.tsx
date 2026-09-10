import { render, screen, waitFor } from '@testing-library/react';
import { ThemeProvider } from '@/context/ThemeContext';

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = '';
  });

  it('should render children', () => {
    render(
      <ThemeProvider>
        <div>Test Child</div>
      </ThemeProvider>
    );
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  it('should apply theme class to document on mount', () => {
    render(
      <ThemeProvider>
        <div>Test Child</div>
      </ThemeProvider>
    );

    // Check that document has a theme class
    const hasThemeClass = document.documentElement.classList.contains('light') ||
                         document.documentElement.classList.contains('dark');
    expect(hasThemeClass).toBe(true);
  });

  it('should save theme preference to localStorage', async () => {
    // Set a theme in localStorage before mounting
    localStorage.setItem('theme', 'dark');

    render(
      <ThemeProvider>
        <div>Test Child</div>
      </ThemeProvider>
    );

    // storage.get is async; wait for the value to be saved back
    await waitFor(() =>
      expect(localStorage.getItem('theme')).toBe(JSON.stringify('dark'))
    );
  });
});