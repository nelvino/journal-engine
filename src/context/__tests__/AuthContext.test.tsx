import { render, screen, act } from '@testing-library/react';
import { AuthProvider, useAuth } from '@/context/AuthContext';

describe('AuthProvider', () => {
  const TestComponent = () => {
    const { user, loading, loginWithGoogle, logout } = useAuth();
    return (
      <div>
        <span data-testid="loading">{loading ? 'Loading' : 'Ready'}</span>
        <span data-testid="user">{user ? user.email : 'No user'}</span>
        <button onClick={loginWithGoogle}>Login</button>
        <button onClick={logout}>Logout</button>
      </div>
    );
  };

  it('should render children and finish loading', async () => {
    await act(async () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );
    });

    expect(screen.getByTestId('loading')).toHaveTextContent('Ready');
    expect(screen.getByTestId('user')).toHaveTextContent('No user');
  });
});
