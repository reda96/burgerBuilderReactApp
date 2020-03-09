import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";
export const addIngredient = name => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name
  };
};

export const removeIngrdient = name => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name
  };
};

export const setIngredients = Ingredients => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: Ingredients
  };
};
export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  };
};
export const initIngredients = () => {
  return dispatch => {
    axios
      .get("/ingredients.json")
      .then(res => {
        dispatch(setIngredients(res.data));
      })
      .catch(err => {
        dispatch(fetchIngredientsFailed());
      });
  };
};
