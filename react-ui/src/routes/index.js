import React from "react";
import { Switch, Route } from "react-router-dom";
import PostCreate from "../components/posts/PostCreate";
import PostDelete from "../components/posts/PostDelete";
import PostEdit from "../components/posts/PostEdit";
import PostList from "../components/posts/PostList";
import PostShow from "../components/posts/PostShow";
import SignUp from "../components/auth/SignUp";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={PostList} />
      <Route path="/posts/new" exact component={PostCreate} />
      <Route path="/posts/delete/:id" exact component={PostDelete} />
      <Route path="/posts/edit/:id" exact component={PostEdit} />
      <Route path="/posts/:id" exact component={PostShow} />
      <Route path="/signup" exact component={SignUp} />
    </Switch>
  );
};

export default Routes;
