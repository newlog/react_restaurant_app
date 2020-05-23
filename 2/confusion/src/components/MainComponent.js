import React, { Component } from 'react';
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
      selectedDish: null,
    };
  }

  onDishSelect(dishId) {
    this.setState({ selectedDish: dishId });
  }

  render() {
    // this line is to avoid eslint "Must use destructuring state assignment"
    // https://stackoverflow.com/questions/52638426/eslint-must-use-destructuring-state-assignment
    const { dishes, selectedDish } = this.state;
    return (
      <div>
        <Header />
        <Menu dishes={dishes} onClick={(dishId) => this.onDishSelect(dishId)} />
        <DishDetail
          dish={dishes.filter((dish) => dish.id === selectedDish)[0]}
        />
        <Footer />
      </div>
    );
  }
}

export default Main;
