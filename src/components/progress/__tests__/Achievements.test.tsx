import { render, screen } from '@testing-library/react';
import { Achievements } from '@/components/progress/Achievements';

describe('Achievements', () => {
  it('should render achievements', () => {
    const achievements = [
      { id: '1', title: 'First Entry', description: 'Write your first entry.', unlockedAt: new Date(), icon: 'book' as const },
      { id: '2', title: 'Locked Achievement', description: 'Not yet unlocked.', icon: 'flame' as const },
    ];
    render(<Achievements achievements={achievements} />);
    
    expect(screen.getByText('First Entry')).toBeInTheDocument();
    expect(screen.getByText('Locked Achievement')).toBeInTheDocument();
  });

  it('should show unlocked state differently from locked', () => {
    const achievements = [
      { id: '1', title: 'Unlocked', description: 'Done.', unlockedAt: new Date(), icon: 'book' as const },
      { id: '2', title: 'Locked', description: 'Pending.', icon: 'book' as const },
    ];
    render(<Achievements achievements={achievements} />);
    
    const unlockedTitle = screen.getByText('Unlocked');
    const unlockedCard = unlockedTitle.closest('[class*="bg-success-50"], [class*="opacity-60"]');
    expect(unlockedCard).toHaveClass('bg-success-50');
    
    const lockedTitle = screen.getByText('Locked');
    const lockedCard = lockedTitle.closest('[class*="bg-success-50"], [class*="opacity-60"]');
    expect(lockedCard).toHaveClass('opacity-60');
  });
});
