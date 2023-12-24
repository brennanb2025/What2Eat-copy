const ProfileIngredients = ({ ingredient, handleRemoveIngredient }) => {
  const expirationDate = new Date(ingredient["expiration-date"]);
  const today = new Date();
  const daysUntilExpiration = Math.ceil(
    (expirationDate - today) / (1000 * 60 * 60 * 24)
  );

  let buttonColor = "btn-info";

  if (daysUntilExpiration <= 0) {
    buttonColor = "btn-danger";
  } else if (daysUntilExpiration <= 7) {
    buttonColor = "btn-warning";
  } else if (daysUntilExpiration <= 14) {
    buttonColor = "btn-success";
  }

  let testid = ingredient["ingredient-name"] + "-" + buttonColor;

  return (
    <button
      data-testid={`${testid}`}
      key={ingredient["ingredient-name"]}
      className={`btn ${buttonColor} m-2`}
      onClick={() => handleRemoveIngredient(ingredient)}
    >
      {ingredient["ingredient-name"]}
    </button>
  );
};

export default ProfileIngredients;
