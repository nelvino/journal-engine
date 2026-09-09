import { render, screen, fireEvent, act } from '@testing-library/react';
import { OnboardingProvider, useOnboarding } from '@/context/OnboardingContext';
import { createStorageAdapter } from '@/lib/storage';

describe('OnboardingProvider', () => {
  const TestComponent = () => {
    const { showOnboarding, completeOnboarding } = useOnboarding();
    return (
      <div>
        {showOnboarding ? <span data-testid="visible">Onboarding Visible</span> : <span data-testid="hidden">Onboarding Hidden</span>}
        <button onClick={completeOnboarding}>Complete</button>
      </div>
    );
  };

  beforeEach(async () => {
    const storage = createStorageAdapter();
    await storage.clear();
  });

  it('should show onboarding by default', async () => {
    await act(async () => {
      render(
        <OnboardingProvider>
          <TestComponent />
        </OnboardingProvider>
      );
    });

    expect(screen.getByTestId('visible')).toBeInTheDocument();
  });

  it('should hide onboarding when completed', async () => {
    await act(async () => {
      render(
        <OnboardingProvider>
          <TestComponent />
        </OnboardingProvider>
      );
    });

    await act(async () => {
      fireEvent.click(screen.getByText('Complete'));
    });

    expect(screen.getByTestId('hidden')).toBeInTheDocument();
  });
});
