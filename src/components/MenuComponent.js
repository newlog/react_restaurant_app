import React from 'react';
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import Loading from './LoadingComponent';
import baseUrl from '../shared/baseUrl';

// a functional component
function RenderMenuItem({ dish }) {
  return (
    <Card>
      <Link to={`/menu/${dish.id}`}>
        <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
        <CardImgOverlay>
          <CardTitle>{dish.name}</CardTitle>
        </CardImgOverlay>
      </Link>
    </Card>
  );
}

// another way to define a functional component (ES6 style)
const Menu = (props) => {
  const { dishes } = props;
  // Iterate for every dish and for each one return the div
  const menu = dishes.dishes.map((dish) => {
    return (
      // Whenever you construct a list of item in React, every item requires a "key" attribute.
      // The key helps React to recognize every item when rendering and only modify specific items on updates
      // onClick property in the Component properties (this.props.onClick) is a function passed from MainComponent, which eventually calls MainComponent.onDishSelect()
      <div key={dish.id} className="col-12 col-md-5 m-1">
        <RenderMenuItem dish={dish} />
      </div>
    );
  });

  if (dishes.isLoading === true) {
    return (
      <div className="container">
        <div className="row m-5 text-center">
          <Loading />
        </div>
      </div>
    );
  }
  if (dishes.errMess !== null) {
    return (
      <div className="container">
        <div className="row m-5 text-center">
          <h4>{dishes.dishes.errMess}</h4>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/home">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>Menu</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div className="col-12">
        <h3>Menu</h3>
        <hr />
      </div>
      <div className="row">{menu}</div>
    </div>
  );
};

export default Menu;
