import SingUp from "./pages/SignUp/index";
import LogIn from "./pages/LogIn/index";
import Home from "./pages/Home/index";
import { useReducer, createContext } from "react";
import PrevetRouter from "./Components/PreventRouter";

import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const initState = {
  isLoggedIn: false,
  name: "",
  isAuthenticated: false,
  errors: {},
};

function loginReducer(state, action) {
  switch (action.type) {
    case "login":
      window.localStorage.setItem("isLoggedIn", true);
      window.localStorage.setItem("name", action.payload);
      return {
        isLoggedIn: true,
        isLoading: false,
        name: action.payload,
        error: "",
      };
    case "signup":
      window.localStorage.setItem("name", action.payload);
      return {
        isLoggedIn: true,
        isLoading: false,
        name: action.payload,
        error: "",
      };
    case "logout":
      window.localStorage.setItem("isLoggedIn", false);
      window.localStorage.setItem("name", "");

      return { isLoggedIn: false, name: "", error: "", isLoading: false };
    case "error":
      return { ...state, error: action.error };
    case "loading":
      return { ...state, isLoading: true };

    default:
      throw new Error("Invalid action type");
  }
}
export const LoginsContext = createContext({
  state: initState,
  dispatch: null,
});
function App() {
  const [state, dispatch] = useReducer(loginReducer, initState);

  return (
    <div className="App">
      <Router>
        <Switch>
          <LoginsContext.Provider value={{ state, dispatch }}>
            <PrevetRouter exact path="/">
              <Home />
            </PrevetRouter>
            <Route exact path="/login">
              <LogIn />
            </Route>
            <Route exact path="/SignUp">
              <SingUp />
            </Route>
          </LoginsContext.Provider>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
