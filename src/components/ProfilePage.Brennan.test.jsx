import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import ProfilePage from './ProfilePage';
import { BrowserRouter } from 'react-router-dom';
import '../data/Ingredients.json'

// Mock the necessary modules or functions used in the component
vi.mock('../utils/firebase', () => ({
    useAuthState: vi.fn(() => []), //don't really need this
    useDbUpdate: vi.fn(() => [() => {}]),
    useDbData: vi.fn(() => [])
}));
  // Mock the Ingredients.json file
vi.mock('../data/Ingredients.json', async () => {
    const actual = await vi.importActual("../data/Ingredients.json");
    return actual;
});

describe('ProfilePage', () => {
  it('handles adding 1 ingredient', async () => {
    render(
        <BrowserRouter>
            <ProfilePage />
        </BrowserRouter>);

    //must use current date to get the right button
    var date = new Date();
    let today = formatDate(date);

    // Simulate adding an ingredient
    fireEvent.change(screen.getByTestId('date-picker'), { target: { value: today } });
    //console.log(screen.getByTestId('date-picker'))
    fireEvent.click(screen.getByTestId('search-ingredients'));
    fireEvent.change(screen.getByTestId('search-ingredients'), { target: { value: 'egg' } });
    fireEvent.keyDown(screen.getByTestId('search-ingredients'), { key: 'Enter' });

    // Check if the ingredient is added to the list
    expect(screen.getByRole('button', { name: 'egg', class: 'btn btn-danger m-2' })).toBeDefined();
    
    //that was test 1 - test if adding 1 element works
  });

  it('handles multiple ingredients and all expiration dates', async () => {
    render(
        <BrowserRouter>
            <ProfilePage />
        </BrowserRouter>);

    //must use current date to get the right button
    var date = new Date();
    let today = formatDate(date);
    let weekLater = formatDate(addWeekToDate(date));
    let twoWeeksLater = formatDate(addWeekToDate(addWeekToDate(date)));
    let threeWeeksLater = formatDate(addWeekToDate(addWeekToDate(addWeekToDate(date))));


    //#1
    // Simulate adding an ingredient
    fireEvent.change(screen.getByTestId('date-picker'), { target: { value: today } });
    fireEvent.click(screen.getByTestId('search-ingredients'));
    fireEvent.change(screen.getByTestId('search-ingredients'), { target: { value: 'egg' } });
    fireEvent.keyDown(screen.getByTestId('search-ingredients'), { key: 'Enter' });

    // Check if the ingredient is added to the list
    expect(screen.getByTestId('egg-btn-danger')).toBeDefined();
    

    //#2
    // Simulate adding an ingredient
    fireEvent.change(screen.getByTestId('date-picker'), { target: { value: weekLater } });
    fireEvent.click(screen.getByTestId('search-ingredients'));
    fireEvent.change(screen.getByTestId('search-ingredients'), { target: { value: 'carrots' } });
    fireEvent.keyDown(screen.getByTestId('search-ingredients'), { key: 'Enter' });

    // Check if the ingredient is added to the list
    expect(screen.getByTestId('carrots-btn-warning')).toBeDefined();


    //#3
    // Simulate adding an ingredient
    fireEvent.change(screen.getByTestId('date-picker'), { target: { value: twoWeeksLater } });
    fireEvent.click(screen.getByTestId('search-ingredients'));
    fireEvent.change(screen.getByTestId('search-ingredients'), { target: { value: 'potatoes' } });
    fireEvent.keyDown(screen.getByTestId('search-ingredients'), { key: 'Enter' });

    // Check if the ingredient is added to the list
    expect(screen.getByTestId('potatoes-btn-success')).toBeDefined();


    //#4
    // Simulate adding an ingredient
    fireEvent.change(screen.getByTestId('date-picker'), { target: { value: threeWeeksLater } });
    fireEvent.click(screen.getByTestId('search-ingredients'));
    fireEvent.change(screen.getByTestId('search-ingredients'), { target: { value: 'butter' } });
    fireEvent.keyDown(screen.getByTestId('search-ingredients'), { key: 'Enter' });

    // Check if the ingredient is added to the list
    expect(screen.getByTestId('butter-btn-info')).toBeDefined();
  });
});


const formatDate = (date) => {
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();
    
    return yyyy + '-' + mm + '-' + dd;
}

function addWeekToDate(originalDate) {
    let newDate = new Date(originalDate);
    let currentDay = newDate.getDate();
    newDate.setDate(currentDay + 7);
    return newDate;
}