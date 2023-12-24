const IngredientCard = ({ ingredient }) => {
  return (
    <div className="cardcard m-1 p-2">
      <div className="card-body">
        <h5 className="card-title">{ingredient.name}</h5>
      </div>
    </div>
  );
};

export default IngredientCard;
