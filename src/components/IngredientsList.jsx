import IngredientCard from './IngredientCard';
import React from 'react';
import { IngredientExpiration } from '../utils/expiration.js';

const IngredientsList = ({ selectedIngredients, onDeleteIngredient }) => {
  return (
    <div>
      {selectedIngredients.map((ingredient, index) => (
        <button
          className={`btn ${IngredientExpiration(ingredient)} btn-sm m-1 mt-2`}
          key={index}
          onClick={() => onDeleteIngredient(ingredient)}
          style={{ cursor: "pointer" }}
        >
          {ingredient["ingredient-name"]}
        </button>
      ))}
    </div>
  );
};

export default IngredientsList;
