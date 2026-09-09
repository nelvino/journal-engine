import { render, screen, fireEvent, act } from '@testing-library/react';
import { GoalProvider, useGoals } from '@/context/GoalContext';
import { createStorageAdapter } from '@/lib/storage';

describe('GoalContext', () => {
  const TestComponent = () => {
    const { goals, loading, addGoal, completeGoal, deleteGoal } = useGoals();
    return (
      <div>
        {loading ? <span>Loading</span> : (
          <>
            <span data-testid="goal-count">{goals.length}</span>
            <button onClick={() => addGoal({
              userId: 'user-1',
              title: 'Test Goal',
              description: 'A test goal',
              category: 'health',
              timeframe: 'monthly',
              startDate: '2024-01-01',
              targetDate: '2024-01-31',
              progress: { current: 0, target: 10, unit: 'steps', percentage: 0 },
              milestones: [],
              smartElements: { specific: '', measurable: '', achievable: '', relevant: '', timeBound: '' },
              status: 'active',
              valueIds: [],
            })}>
              Add Goal
            </button>
            {goals.map(goal => (
              <div key={goal.id} data-testid="goal">
                <span data-testid="goal-title">{goal.title}</span>
                <span data-testid="goal-status">{goal.status}</span>
                <button onClick={() => completeGoal(goal.id)}>Complete</button>
                <button onClick={() => deleteGoal(goal.id)}>Delete</button>
              </div>
            ))}
          </>
        )}
      </div>
    );
  };

  beforeEach(() => {
    const storage = createStorageAdapter();
    storage.clear();
  });

  it('should start with no goals', async () => {
    await act(async () => {
      render(
        <GoalProvider>
          <TestComponent />
        </GoalProvider>
      );
    });

    expect(screen.getByTestId('goal-count')).toHaveTextContent('0');
  });

  it('should add a goal and update the list', async () => {
    await act(async () => {
      render(
        <GoalProvider>
          <TestComponent />
        </GoalProvider>
      );
    });

    const addButton = screen.getByText('Add Goal');
    await act(async () => {
      fireEvent.click(addButton);
    });

    expect(screen.getByTestId('goal-count')).toHaveTextContent('1');
    expect(screen.getByText('Test Goal')).toBeInTheDocument();
  });

  it('should mark a goal as completed', async () => {
    await act(async () => {
      render(
        <GoalProvider>
          <TestComponent />
        </GoalProvider>
      );
    });

    await act(async () => {
      fireEvent.click(screen.getByText('Add Goal'));
    });

    await act(async () => {
      fireEvent.click(screen.getByText('Complete'));
    });

    expect(screen.getByTestId('goal-status')).toHaveTextContent('completed');
  });

  it('should delete a goal', async () => {
    await act(async () => {
      render(
        <GoalProvider>
          <TestComponent />
        </GoalProvider>
      );
    });

    await act(async () => {
      fireEvent.click(screen.getByText('Add Goal'));
    });

    await act(async () => {
      fireEvent.click(screen.getByText('Delete'));
    });

    expect(screen.getByTestId('goal-count')).toHaveTextContent('0');
  });
});
