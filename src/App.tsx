import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./containers/Home";

import Error from "./components/Error";
import locale from "./locale";
import Login from "./containers/Login";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route
          exact
          path="*"
          render={(props) => (
            <Error {...props} message={locale.eng.pageNotFound} />
          )}
        />
      </Switch>
    </BrowserRouter>
  );
};
export default App;
