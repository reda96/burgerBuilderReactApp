import React from "react";
import classes from "./Modal.css";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Auxiliary from "../../../hoc/Auxiliary";
class Modal extends React.Component {
  shouldComponentUpdate(nexProps, nextState) {
    return (
      nexProps.show !== this.props.show ||
      nexProps.children !== this.props.children
    );
  }
  render() {
    return (
      <Auxiliary>
        <Backdrop show={this.props.show} clicked={this.props.clicked} />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0"
          }}
        >
          {" "}
          {this.props.children}
        </div>
      </Auxiliary>
    );
  }
}
export default Modal;
