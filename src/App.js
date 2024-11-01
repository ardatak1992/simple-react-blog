import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";
import Home from "./Home";
import EditPosts from "./EditPost";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import About from "./About";
import Missing from "./Missing";

import { Route, Switch } from "react-router-dom";
import { useEffect } from "react";
import useAxiosFetch from "./hooks/useAxiosFetch";
import { useStoreActions } from "easy-peasy";

function App() {
  const setPosts = useStoreActions((actions) => actions.setPosts);

  const { data, fetchError, isLoading } = useAxiosFetch(
    "http://localhost:3500/posts"
  );

  useEffect(() => {
    setPosts(data);
    
  }, [data, setPosts]);

  return (
    <div className="App">
      <Header title="React JS Blog" />

      <Nav />
      <Switch>
        <Route exact path="/">
          <Home isLoading={isLoading} fetchError={fetchError} />
        </Route>

        <Route path="/post" component={NewPost} exact />
        <Route path="/edit/:id" component={EditPosts} />
        <Route path="/post/:id" component={PostPage} />
        <Route path="/about" component={About} />
        <Route path="*" component={Missing} />
      </Switch>

      <Footer />
    </div>
  );
}

export default App;
