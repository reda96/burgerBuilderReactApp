import React from "react";
import classes from "./Order.css";
const order = props => {
  const ingredients = [];
  for (let ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName]
    });
  }
  return (
    <div className={classes.Order}>
      <p>
        Ingredients:
        {ingredients.map(ig => {
          return (
            <span
              style={{
                textTransform: "capitalize",
                display: "inline-block",
                border: "1px solid #ccc",
                margin: "0 5px",
                padding: "10px"
              }}
              key={ig.name}
            >
              {ig.name} ({ig.amount}){" "}
            </span>
          );
        })}
      </p>
      <p>
        Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong>
      </p>
    </div>
  );
};
export default order;
