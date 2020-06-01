import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Menu from './MenuComponent';
import About from './AboutComponent';
import DishDetail from './DishdetailComponent';

// all the state fields become available to the component as props thanks to the last line:
// export default withRouter(connect(mapStateToProps)(Main));
const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
  };
};

// eslint-disable-next-line react/prefer-stateless-function
class Main extends Component {
  render() {
    // this line is to avoid eslint "Must use destructuring state assignment"
    // https://stackoverflow.com/questions/52638426/eslint-must-use-destructuring-state-assignment
    // state is not used anymore, as the state is retrieved from the Store and converted into component props
    const { dishes, comments, promotions, leaders } = this.props;
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

    const DishWithId = ({ match }) => {
      return (
        <DishDetail
          dish={
            dishes.filter(
              (dish) => dish.id === parseInt(match.params.dishId, 10),
            )[0]
          }
          comments={comments.filter(
            (comment) => comment.dishId === parseInt(match.params.dishId, 10),
          )}
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
          <Route
            exact
            path="/aboutus"
            component={() => <About leads={leaders} />}
          />
          <Route path="/menu/:dishId" component={DishWithId} />
          <Route exact path="/contactus" component={Contact} />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(Main));
