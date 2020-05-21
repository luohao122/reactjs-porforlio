import React from "react";
import { Switch, Route } from "react-router-dom";
import PostCreate from "../components/Posts/PostCreate";
import PostDelete from "../components/Posts/PostDelete";
import PostEdit from "../components/Posts/PostEdit";
import PostList from "../components/Posts/PostList";
import PostShow from "../components/Posts/PostShow";
import SignUp from "../components/Auth/SignUp";

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
