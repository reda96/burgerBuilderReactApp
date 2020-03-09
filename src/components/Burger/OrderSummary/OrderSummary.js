import React from "react";
import Auxiliary from "../../../hoc/Auxiliary";
import Button from "../../UI/Button/Button";
class OrderSummary extends React.Component {
  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(igKey => {
      return (
        <li key={igKey}>
          <span style={{ textTransform: "capitalize" }}>
            {igKey}: {this.props.ingredients[igKey]}{" "}
          </span>
        </li>
      );
    });
    return (
      <Auxiliary>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>{ingredientSummary}</ul>
        <p>
          <strong>Total Price: {this.props.price.toFixed(2)}</strong>
        </p>

        <Button btnType="Success" clicked={this.props.Continued}>
          CONTINUE
        </Button>

        <Button btnType="Danger" clicked={this.props.Canceled}>
          CANCEL
        </Button>
      </Auxiliary>
    );
  }
}
export default OrderSummary;
