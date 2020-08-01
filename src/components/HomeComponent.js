import React from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from 'reactstrap';
import Loading from './LoadingComponent';
import baseUrl from '../shared/baseUrl';

function RenderCard({ item, isLoading, errMess }) {
  if (isLoading === true) {
    return (
      <div className="text-center">
        <Loading />
      </div>
    );
  }
  if (errMess !== null) {
    return <h4>{errMess}</h4>;
  }
  return (
    <Card>
      <CardImg src={baseUrl + item.image} alt={item.name} />
      <CardBody>
        <CardTitle>{item.name}</CardTitle>
        {
          // adding JS code inside the HTML code
          item.designation ? (
            <CardSubtitle>{item.designation}</CardSubtitle>
          ) : null
        }
        <CardText>{item.description}</CardText>
      </CardBody>
    </Card>
  );
}

function Home(props) {
  const {
    dish,
    promotion,
    promoLoading,
    promoErrMess,
    leader,
    dishesLoading,
    dishesErrMess,
  } = props;
  return (
    <div className="container">
      <div className="row align-items-start">
        <div className="col-12 col-md m-1">
          <RenderCard
            item={dish}
            isLoading={dishesLoading}
            errMess={dishesErrMess}
          />
        </div>
        <div className="col-12 col-md m-1">
          <RenderCard
            item={promotion}
            isLoading={promoLoading}
            errMess={promoErrMess}
          />
        </div>
        <div className="col-12 col-md m-1">
          <RenderCard
            item={leader}
            isLoading={dishesLoading}
            errMess={dishesErrMess}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
