import React from "react";
import { gapi } from "gapi-script";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";
class GoogleAuth extends React.Component {
  componentDidMount() {
    gapi.load("client:auth2", () => {
      gapi.client
        .init({
          clientId: "put your id",
          scope: "email",
        })
        .then(() => {
          this.auth = gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };
  OnSigngOutClick = () => {
    this.auth.signOut();
  };
  OnSignInClick = () => {
    this.auth.signIn();
  };
  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return <div>{null}</div>;
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.OnSigngOutClick} className="ui red google button">
          <i className="google icon"></i>
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.OnSignInClick} className="ui red google button">
          <i className="google icon"></i>
          Sign In with Google
        </button>
      );
    }
  }

  render() {
    console.log(this.props.isSignedIn);
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToprops = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToprops, { signIn, signOut })(GoogleAuth);
