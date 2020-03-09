import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.css";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Auxiliary from "../../../hoc/Auxiliary";
const sideDrawer = props => {
  let attachedClassses = [classes.SideDrawer, classes.Close];
  if (props.open) {
    attachedClassses = [classes.SideDrawer, classes.Open];
  }
  return (
    <Auxiliary>
      <Backdrop clicked={props.closed} show={props.open} />
      <div className={attachedClassses.join(" ")} onClick={props.closed}>
        <Logo height="11%" marginBoottom="32px" />
        <nav>
          <NavigationItems isAuthenticated={props.isAuth} />
        </nav>
      </div>
    </Auxiliary>
  );
};
export default sideDrawer;
