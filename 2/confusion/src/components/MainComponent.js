import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import DISHES from '../shared/dishes';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dishes: DISHES,
    };
  }

  render() {
    // this line is to avoid eslint "Must use destructuring state assignment"
    // https://stackoverflow.com/questions/52638426/eslint-must-use-destructuring-state-assignment
    const { dishes } = this.state;
    const HomePage = () => {
      return <Home />;
    };
    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route
            exact
            path="/menu"
            component={() => <Menu dishes={dishes} />}
          />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;
