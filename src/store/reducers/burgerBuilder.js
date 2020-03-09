import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utiltiy";
const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false
};
const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};
const addIngr = (state, action) => {
  const updatedIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
  };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = {
    ...state,
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    building: true
  };
  return updateObject(state, updatedState);
};
const removeIng = (state, action) => {
  const updatedIng = {
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
  };
  const updatedIngs = updateObject(state.ingredients, updatedIng);
  const updatedSt = {
    ...state,
    ingredients: updatedIngs,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    building: true
  };
  return updateObject(state, updatedSt);
};
const setIng = (state, action) => {
  return updateObject(state, {
    ingredients: {
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat
    },
    error: false,
    totalPrice: 4,
    building: false
  });
};
const fetchIngFailed = (state, action) => {
  return updateObject(state, { error: true });
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngr(state, action);
    case actionTypes.REMOVE_INGREDIENT:
      return removeIng(state, action);
    case actionTypes.SET_INGREDIENTS:
      return setIng(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return fetchIngFailed(state, action);
    default:
      return state;
  }
};
export default reducer;
