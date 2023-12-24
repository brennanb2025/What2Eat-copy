// Banner.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import vitest, { beforeEach } from 'vitest';
import { useAuthState } from '../utils/firebase';
import Banner from './Banner';
import { BrowserRouter } from 'react-router-dom';

// Mocking firebase functions
vi.mock('../utils/firebase');


describe('Banner Component', () => {
  // Mock user data for testing
  const mockUser = {
    photoURL: 'test.jpg',
  };

  // Set up the mock useAuthState hook
  beforeEach(() => {
    useAuthState.mockReturnValue([mockUser]);
  });

  it('renders "Go to Profile" when the profile button is clicked', () => {
    const { container } = render(
      <BrowserRouter>
        <Banner />
      </BrowserRouter>
    )

    // Assert that the component renders initially
    assert.isNotNull(screen.getByText(/what's for/i));

    // Click the profile button
    expect(container.getElementsByClassName('profileButton').length).toBe(1);
    const profileButton = container.getElementsByClassName('profileButton')[0]
    fireEvent.click(profileButton);

    // Assert that the "Go to Profile" link is rendered
    assert.isNotNull(screen.getByText(/go to profile/i));
  });
});
