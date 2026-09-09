import { render, screen, fireEvent, act } from '@testing-library/react';
import { GuidanceProvider, useGuidance } from '@/context/GuidanceContext';
import { createStorageAdapter } from '@/lib/storage';

describe('GuidanceProvider', () => {
  const TestComponent = () => {
    const { recommendation, loading, dismissRecommendation } = useGuidance();
    if (loading) return <span>Loading</span>;
    return (
      <div>
        {recommendation ? (
          <>
            <span data-testid="title">{recommendation.title}</span>
            <span data-testid="entry-type">{recommendation.entryType}</span>
            <button onClick={dismissRecommendation}>Dismiss</button>
          </>
        ) : (
          <span data-testid="none">No recommendation</span>
        )}
      </div>
    );
  };

  beforeEach(async () => {
    const storage = createStorageAdapter();
    await storage.clear();
  });

  it('should provide a recommendation', async () => {
    await act(async () => {
      render(
        <GuidanceProvider>
          <TestComponent />
        </GuidanceProvider>
      );
    });

    expect(screen.getByTestId('title')).toBeInTheDocument();
    expect(screen.getByTestId('entry-type')).toBeInTheDocument();
  });

  it('should dismiss recommendation', async () => {
    await act(async () => {
      render(
        <GuidanceProvider>
          <TestComponent />
        </GuidanceProvider>
      );
    });

    await act(async () => {
      fireEvent.click(screen.getByText('Dismiss'));
    });

    expect(screen.getByTestId('none')).toBeInTheDocument();
  });
});
