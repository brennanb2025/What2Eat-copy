import { render, fireEvent, screen } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import RecipeCard from './RecipeCard';

describe.skip('RecipeCard Component', () => {
  const mockRecipe = {
    recipe_id: 1,
    recipe_name: 'Test Recipe',
    time: 30,
    ingredients: ['Ingredient 1', 'Ingredient 2', 'Ingredient 3'],
  };

  const mockProps = {
    recipe: mockRecipe,
    setSelectedRecipe: vi.fn(),
    openModal: vi.fn(),
    favoriteRecipes: [],
    addToFavorites: vi.fn(),
    removeFromFavorites: vi.fn(),
  };

  it('renders without crashing', () => {
    render(<RecipeCard {...mockProps} />);
    expect(screen.getByText('Test Recipe')).toBeDefined();
  });

  it('displays recipe information correctly', () => {
    render(<RecipeCard {...mockProps} />);
    
    expect(screen.getByText('Test Recipe')).toBeDefined();
    expect(screen.getByText('30 min')).toBeDefined();
    expect(screen.getAllByRole('listitem')).toHaveLength(3); // Assuming there are 3 ingredients in the mock recipe
  });

  it('handles button click correctly when not favorited', () => {
    render(<RecipeCard {...mockProps} />);
    
    fireEvent.click(screen.getByRole('button', { name: 'favorite' }));
    expect(mockProps.addToFavorites).toHaveBeenCalledWith(1); // Assuming recipe_id is 1 in the mock recipe
  });

  it('handles button click correctly when favorited', () => {
    const favoritedProps = {
      ...mockProps,
      favoriteRecipes: [{ id: 1 }],
    };

    render(<RecipeCard {...favoritedProps} />);
    
    fireEvent.click(screen.getByRole('button', { name: 'favorite' }));
    expect(favoritedProps.removeFromFavorites).toHaveBeenCalledWith(1);
  });

  it('calls setSelectedRecipe and openModal on card click', () => {
    render(<RecipeCard {...mockProps} />);
    
    fireEvent.click(screen.getByRole('presentation')); // Assuming '.card' is a clickable element
    expect(mockProps.setSelectedRecipe).toHaveBeenCalledWith(1); // Assuming recipe_id is 1 in the mock recipe
    expect(mockProps.openModal).toHaveBeenCalled();
  });
});