import React, { Component } from "react";
import "./App.css";
import SampleComponent from "./components/SampleComponent";
import Login from "./components/Login"
import Pokedex from "./components/Pokedex"
import Pokemons from "./components/Pokemons"
import { Provider as ReduxProvider } from "react-redux";
import  {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import configureStore from "./modules/store";

const reduxStore = configureStore(window.REDUX_INITIAL_DATA);

const routing = (

  <Router>
    <div>
      <Switch>
        <Route path="/" exact component = {Login}></Route>
        <Route path="/Pokedex" component = {Pokedex}></Route>
        <Route path="/Pokemons" component = {Pokemons}></Route>
      </Switch>
    </div>
  </Router>

);

class App extends Component {
  render() {
    return (
      <ReduxProvider store={reduxStore}>
        <div className="App">
          {routing}
        </div>
      </ReduxProvider>
    );
  }
}

export default App;