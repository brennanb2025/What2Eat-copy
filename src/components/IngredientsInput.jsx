const IngredientsInput = ({
  searchTerm,
  onInputChange,
  onFocus,
  onBlur,
  onKeyDown,
}) => {
  return (
    <input
      type="text"
      className="form-control"
      placeholder="Search..."
      value={searchTerm}
      onChange={onInputChange}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
    />
  );
};

export default IngredientsInput;
