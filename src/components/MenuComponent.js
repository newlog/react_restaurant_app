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
const RenderMenuItem = ({ dish }) => {
  return (
    <Card>
      <Link to={`/menu/${dish.id}`}>
        <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
        <CardImgOverlay>
          <CardTitle>
            <div
              style={{
                backgroundColor: '#000000',
                color: '#ffffff',
                display: 'inline-block',
                borderRadius: '5px',
              }}
            >
              <h3 className="ml-2 mr-2 mt-1">{dish.name}</h3>
            </div>
          </CardTitle>
        </CardImgOverlay>
      </Link>
    </Card>
  );
};

// another way to define a component (ES6 style) (functional component)
const Menu = (props) => {
  const { dishes } = props;
  // Iterate for every dish and for each one return the div
  const menu = dishes.dishes.map((dish) => {
    return (
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
