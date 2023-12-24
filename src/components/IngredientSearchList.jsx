const IngredientSearchList = ({
  filteredIngredients,
  highlightedIndex,
  handleSelection,
}) => {
  return (
    <div className="ingredient-list-container">
      <ul className="list-group">
        {filteredIngredients.map((ingredient, index) => (
          <li
            onClick={() => handleSelection(ingredient)}
            onMouseDown={(e) => e.preventDefault()}
            className={`list-group-item${
              index === highlightedIndex ? " active" : ""
            }`}
            key={ingredient}
            style={{ cursor: "pointer" }}
          >
            {ingredient}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IngredientSearchList;
