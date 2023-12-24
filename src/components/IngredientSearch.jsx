import { useState, useRef, useEffect, useMemo } from "react";
import Fuse from "fuse.js";
import "./IngredientSearch.css";

const IngredientSearch = ({
  ingredientOptions,
  selectedIngredients,
  onIngredientSelect,
  expiration,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedIngredient, sethighlightedIngredient] = useState(0);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [clickedInsideList, setClickedInsideList] = useState(false);
  const listRef = useRef(null);

  //Fuzzy search. Matches by the name of the ingredient
  const fuse = new Fuse(ingredientOptions, {
    keys: ["name"],
    threshold: 0.3,
    includeMatches: true,
    minMatchCharLength: 2,
  });

  //Close the list when clicked outside of the list
  useEffect(() => {
    function handleOutsideClick(event) {
      if (listRef.current && !listRef.current.contains(event.target)) {
        setIsInputFocused(false);
      }
    }

    if (isInputFocused) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isInputFocused]);

  //Close the list when clicked outside of the list
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    sethighlightedIngredient(0);
  };

  //Close the list when clicked outside of the list
  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  //Close the list when clicked outside of the list
  const handleInputBlur = () => {
    if (!clickedInsideList) {
      setIsInputFocused(false);
    }
  };

  //Keep track of whether the mouse is clicked inside the list
  const handleMouseDownInsideList = () => {
    setClickedInsideList(true);
  };

  //When a selection is made, store the ingredient locally and in the DB
  //Also resets the search term and brings the user back to the first ingredient on the list.
  const handleSelection = (ingredient) => {
    onIngredientSelect({
      "ingredient-name": ingredient,
      "expiration-date": expiration,
    });
    setSearchTerm("");
    sethighlightedIngredient(-1);
    scrollList("top");
    if(listRef.current) {
      listRef.current.blur();
    }
  };

  //This handles pressing arrow keys to navigate and enter to select
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && highlightedIngredient !== -1) {
      const selectedIngredient = filteredIngredients[highlightedIngredient];
      if (selectedIngredient) {
        handleSelection(selectedIngredient);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (highlightedIngredient < filteredIngredients.length - 1) {
        sethighlightedIngredient(highlightedIngredient + 1);
        scrollList("down");
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (highlightedIngredient > 0) {
        sethighlightedIngredient(highlightedIngredient - 1);
        scrollList("up");
      }
    }
  };

  //This allows us to control the movement of the list.
  const scrollList = (direction) => {
    if (listRef.current) {
      const itemHeight = listRef.current.querySelector("li").clientHeight;
      if (direction === "down") {
        listRef.current.scrollTop += itemHeight;
      } else if (direction === "up") {
        listRef.current.scrollTop -= itemHeight;
      } else if (direction === "top") {
        listRef.current.scrollTop = 0;
        sethighlightedIngredient(0);
      }
    }
  };

  //Max results to show in the list
  const maxResults = 20;

  //Filters the ingredients based on the search term and the ingredients that have already been selected.
  //Using memo to prevent unnecessary re-renders and hopefully improve performance.

  const selectedIngredientsNames = selectedIngredients.map(
    (ingredient) => ingredient["ingredient-name"]
  );

  const filteredIngredients = useMemo(() => {
    if (searchTerm) {
      let filtered = fuse.search(searchTerm).map((result) => result.item);
      filtered = filtered.filter(
        (ingredient) => !selectedIngredientsNames.includes(ingredient)
      );
      return filtered.slice(0, maxResults);
    } else {
      return ingredientOptions
        .filter((ingredient) => !selectedIngredientsNames.includes(ingredient))
        .slice(0, maxResults);
    }
  }, [searchTerm, selectedIngredientsNames]);

  const ingredientOptionsMap = useMemo(() => {
    return (
      <div>
        <input
          data-testid="search-ingredients"
          type="text"
          className="form-control"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
        />
        {isInputFocused && (
          <div
            className="ingredient-list-container"
            ref={listRef}
            onMouseDown={handleMouseDownInsideList}
          >
            <ul className="list-group">
              {filteredIngredients.map((ingredient, index) => (
                <li
                  onClick={() => handleSelection(ingredient)}
                  onMouseDown={(e) => e.preventDefault()}
                  className={`list-group-item${
                    index === highlightedIngredient ? " active" : ""
                  }`}
                  key={index}
                  style={{ cursor: "pointer" }}
                >
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }, [searchTerm, isInputFocused, selectedIngredients, highlightedIngredient]);

  return <div>{ingredientOptionsMap}</div>;
};

export default IngredientSearch;
