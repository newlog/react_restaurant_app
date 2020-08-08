import React, { Component, actions } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Menu from './MenuComponent';
import About from './AboutComponent';
import DishDetail from './DishdetailComponent';
import {
  postComment,
  fetchDishes,
  fetchComments,
  fetchPromos,
  fetchLeaders,
  postFeedback,
} from '../redux/actionCreator';

// https://react-redux.js.org/using-react-redux/connect-mapstate
// all the state fields become available to the component as props thanks to the last line:
// export default withRouter(connect(mapStateToProps)(Main));
const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
    feedback: state.feedback,
  };
};

// https://react-redux.js.org/using-react-redux/connect-mapdispatch
// dispatching actions to the store
// last line: export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
const mapDispatchToProps = (dispatch) => ({
  postCommentAction: (dishId, rating, author, comment) =>
    // the addComment will return the action and this action is passed to the dispatcher.
    // then the action will be available to the Main component below.
    dispatch(postComment(dishId, rating, author, comment)),
  // same here
  fetchDishesAction: () => dispatch(fetchDishes()),
  fetchCommentsAction: () => dispatch(fetchComments()),
  fetchPromosAction: () => dispatch(fetchPromos()),
  fetchLeadersAction: () => dispatch(fetchLeaders()),
  postFeedbackAction: (
    firstname,
    lastname,
    telnum,
    email,
    agree,
    message,
    contactType,
  ) =>
    dispatch(
      postFeedback(
        firstname,
        lastname,
        telnum,
        email,
        agree,
        message,
        contactType,
      ),
    ),
  resetFeedbackFormAction: () => {
    dispatch(actions.reset('feedback'));
  },
});

// eslint-disable-next-line react/prefer-stateless-function
class Main extends Component {
  componentDidMount() {
    const {
      fetchDishesAction,
      fetchCommentsAction,
      fetchPromosAction,
      fetchLeadersAction,
    } = this.props;
    fetchDishesAction();
    fetchCommentsAction();
    fetchPromosAction();
    fetchLeadersAction();
  }

  render() {
    // this line is to avoid eslint "Must use destructuring state assignment"
    // https://stackoverflow.com/questions/52638426/eslint-must-use-destructuring-state-assignment
    // state is not used anymore, as the state is retrieved from the Store and converted into component props
    const {
      dishes,
      comments,
      promotions,
      leaders,
      postFeedbackAction,
    } = this.props;
    const HomePage = () => {
      return (
        <Home
          // the state for dishes has changed and now inside of the dishes state we have 3 properties (dishes, errmess, isLoading)
          dish={
            Object.keys(dishes.dishes).length !== 0
              ? dishes.dishes.filter((dish) => dish.featured === true)[0]
              : []
          }
          dishesLoading={dishes.isLoading}
          dishesErrMess={dishes.errMess}
          promotion={
            Object.keys(promotions.promotions).length !== 0
              ? promotions.promotions.filter(
                  (promotion) => promotion.featured === true,
                )[0]
              : []
          }
          promoLoading={promotions.isLoading}
          promoErrMess={promotions.errMess}
          leader={
            Object.keys(leaders.leaders).length !== 0
              ? leaders.leaders.filter((leader) => leader.featured === true)[0]
              : []
          }
          leaderLoading={leaders.isLoading}
          leaderErrMess={leaders.errMess}
        />
      );
    };

    const DishWithId = ({ match }) => {
      const { postCommentAction } = this.props;
      return (
        <DishDetail
          dish={
            dishes.dishes.filter(
              (dish) => dish.id === parseInt(match.params.dishId, 10),
            )[0]
          }
          isLoading={dishes.isLoading}
          errMess={dishes.errMess}
          comments={
            Object.keys(comments.comments) !== 0
              ? comments.comments.filter(
                  (comment) =>
                    comment.dishId === parseInt(match.params.dishId, 10),
                )
              : []
          }
          commentsErrMess={comments.errMess} // not used.
          postCommentAction={postCommentAction}
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
          <Route
            exact
            path="/contactus"
            component={() => (
              <Contact postFeedbackAction={postFeedbackAction} />
            )}
          />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
