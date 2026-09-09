import { render, screen, fireEvent } from '@testing-library/react';
import { MoodChart } from '@/components/progress/MoodChart';

describe('MoodChart', () => {
  it('should render empty state when no data', () => {
    render(<MoodChart data={[]} />);
    expect(screen.getByText('No mood data yet. Start journaling to see your mood trends.')).toBeInTheDocument();
  });

  it('should render chart with mood data', () => {
    const data = [
      { date: '2024-01-01', overall: 6, energy: 5, stress: 4, focus: 7 },
      { date: '2024-01-02', overall: 7, energy: 6, stress: 3, focus: 8 },
    ];
    render(<MoodChart data={data} />);
    
    expect(screen.getByText('Overall')).toBeInTheDocument();
    expect(screen.getByText('Energy')).toBeInTheDocument();
    expect(screen.getByText('Stress')).toBeInTheDocument();
    expect(screen.getByText('Focus')).toBeInTheDocument();
  });
});
