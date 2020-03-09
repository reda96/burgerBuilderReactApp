import React, { Component } from "react";
import { connect } from "react-redux";
import Auxiliary from "../../hoc/Auxiliary";
import withErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";
import Buger from "../../components/Burger/Burger";
import BuilderControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import { withRouter } from "react-router-dom";
import axios from "../../axios-orders";
import * as actions from "../../store/actions/index";
export class BurgerBuilder extends Component {
  state = {
    purchasable: false,
    purchasing: false
  };
  purchaseHndler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.onSetAuthRedirectPath("/checkout");
      this.props.history.push("/auth");
    }
  };
  backdropClickHandler = () => {
    this.setState({ purchasing: false });
  };
  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push("/checkout");
  };
  componentDidMount() {
    this.props.onInitIngredients();
  }

  updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(key => {
        return ingredients[key];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  };

  render() {
    const disabledInfo = { ...this.props.ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let burger = this.props.error ? (
      <p>Ingredients can't be loaded!</p>
    ) : (
      <Spinner />
    );

    let orderSummary = null;

    if (this.props.ingredients) {
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingredients}
          Canceled={this.backdropClickHandler}
          Continued={this.purchaseContinueHandler}
          price={this.props.totalPrice}
        />
      );
      burger = (
        <Auxiliary>
          <Buger ingredients={this.props.ingredients} />
          <BuilderControls
            disabled={disabledInfo}
            ingredientAdded={this.props.addIngredient}
            ingredientRemoved={this.props.removeIngredient}
            price={this.props.totalPrice}
            purchasable={this.updatePurchaseState(this.props.ingredients)}
            ordered={this.purchaseHndler}
            isAuth={this.props.isAuthenticated}
          />
        </Auxiliary>
      );
    }

    return (
      <Auxiliary>
        <Modal show={this.state.purchasing} clicked={this.backdropClickHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Auxiliary>
    );
  }
}
const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  };
};
const mapDispatchToProps = dispatch => {
  return {
    addIngredient: ingredientName =>
      dispatch(actions.addIngredient(ingredientName)),
    removeIngredient: ingredientName =>
      dispatch(actions.removeIngredient(ingredientName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(withRouter(BurgerBuilder), axios));
