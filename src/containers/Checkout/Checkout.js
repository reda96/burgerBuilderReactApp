import React, { Component } from "react";
import CheckoutSummary from "./../../components/Order/CkeckoutSummary/CheckoutSummary";
import { Route, Redirect } from "react-router-dom";
import ContactData from "../../containers/Checkout/ContactData/ContactData";
import { connect } from "react-redux";
class Checkout extends Component {
  CheckoutContinue = () => {
    this.props.history.replace("/checkout/contact-data");
  };
  CheckoutCancel = () => {
    this.props.history.goBack();
  };

  render() {
    let summary = <Redirect to="/" />;

    if (this.props.ingredients) {
      const purchasedRedirect = this.props.purchased ? (
        <Redirect to="/" />
      ) : null;
      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            CheckoutCancel={this.CheckoutCancel}
            CheckoutContinue={this.CheckoutContinue}
            ingredients={this.props.ingredients}
          />
          <Route
            path={this.props.match.path + "/contact-data"}
            component={ContactData}
          />
        </div>
      );
    }
    return summary;
  }
}
const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  };
};

export default connect(mapStateToProps)(Checkout);
