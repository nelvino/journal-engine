import { render, screen } from '@testing-library/react';
import { FrameworkUsage } from '@/components/progress/FrameworkUsage';

describe('FrameworkUsage', () => {
  it('should render empty state when no usage', () => {
    render(<FrameworkUsage usage={[]} totalEntries={0} />);
    expect(screen.getByText('No framework usage yet. Try a framework-specific entry to see your practice patterns.')).toBeInTheDocument();
  });

  it('should render framework usage bars', () => {
    const usage = [
      { frameworkId: 'cbt', frameworkName: 'CBT Thought Record', count: 3, percentage: 60 },
      { frameworkId: 'gratitude', frameworkName: 'Gratitude', count: 2, percentage: 40 },
    ];
    render(<FrameworkUsage usage={usage} totalEntries={5} />);
    
    expect(screen.getByText('CBT Thought Record')).toBeInTheDocument();
    expect(screen.getByText('3 entries (60%)')).toBeInTheDocument();
    expect(screen.getByText('Gratitude')).toBeInTheDocument();
    expect(screen.getByText('2 entries (40%)')).toBeInTheDocument();
  });
});
