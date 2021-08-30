import React from "react";
import { withRouter } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { isLoggedIn } from "../utils/authUtils";

class RouterRoot extends React.Component {
  static contextType = UserContext;

  componentDidUpdate(prevProps) {
    const { location } = this.props;
    const { location: locationPrev } = prevProps;

    console.log(location, locationPrev);

    if (!isLoggedIn) {
      this.context.setUser({});
    }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(RouterRoot);
