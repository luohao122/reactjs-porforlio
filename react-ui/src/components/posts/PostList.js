import React from "react";
import { connect } from "react-redux";
import requireAuth from "../../services/requireAuth";
class PostList extends React.Component {
  render() {
    return <div>PostLists</div>;
  }
}

export default requireAuth(PostList);
