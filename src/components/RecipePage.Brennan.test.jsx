import { render, screen } from '@testing-library/react';
import RecipePage from './RecipePage';
import { useAuthState } from '../utils/firebase';
import { describe, it, vi } from 'vitest';

// Mocking firebase functions
vi.mock('../utils/firebase');

describe.skip('RecipeCard component rendering tests', () => {

  // Mock user data for testing
  const mockUser = {
    photoURL: 'test.jpg',
  };

  // Set up the mock useAuthState hook
  beforeEach(() => {
    useAuthState.mockReturnValue([mockUser]);
  });

  it('Clicking favorite button on a recipe should highlight the recipe as favorited', async () => {
    render(<RecipePage/>);

    // Find the favorite button
    //const favoriteBtn = screen.getByRole("button", { name: /favorite/i });
    //fireEvent.click(favoriteBtn);

    screen.getAllByText(/☆/)[0].click();
    await screen.findByText(/★/); //find starred one
  });
});