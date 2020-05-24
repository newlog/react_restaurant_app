import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Menu from './MenuComponent';
// import DishDetail from './DishdetailComponent';
import DISHES from '../shared/dishes';
// import COMMENTS from '../shared/comments';
import LEADERS from '../shared/leaders';
import PROMOTIONS from '../shared/promotions';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dishes: DISHES,
      // comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS,
    };
  }

  render() {
    // this line is to avoid eslint "Must use destructuring state assignment"
    // https://stackoverflow.com/questions/52638426/eslint-must-use-destructuring-state-assignment
    const { dishes, promotions, leaders } = this.state;
    const HomePage = () => {
      return (
        <Home
          dish={dishes.filter((dish) => dish.featured === true)[0]}
          promotion={
            promotions.filter((promotion) => promotion.featured === true)[0]
          }
          leader={leaders.filter((leader) => leader.featured === true)[0]}
        />
      );
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
          <Route exact path="/contactus" component={Contact} />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;
