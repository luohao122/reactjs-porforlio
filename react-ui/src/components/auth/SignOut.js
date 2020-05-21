import React from "react";
import { connect } from "react-redux";
import { signOut } from "../../actions";

class SignOut extends React.Component {
  componentDidMount() {
    this.props.signOut(() => {
      this.props.history.push("/");
    });
  }

  render() {
    return null;
  }
}

export default connect(null, {
  signOut,
})(SignOut);
