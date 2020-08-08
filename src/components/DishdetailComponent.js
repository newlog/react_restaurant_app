import React, { Component } from 'react';
import Moment from 'react-moment';
import {
  Card,
  CardImg,
  CardBody,
  CardText,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import AddComment from './AddCommentComponent';
import Loading from './LoadingComponent';
import baseUrl from '../shared/baseUrl';

function RenderDish({ dish }) {
  return (
    <Card>
      <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
      <CardBody>
        <CardTitle>{dish.name}</CardTitle>
        <CardText>{dish.description}</CardText>
      </CardBody>
    </Card>
  );
}

function RenderComments({ comments, postCommentAction, dishId }) {
  const [isModalOpen, setModalVisibility] = React.useState(false);
  // Instead of "moment" module for dates, we can use standard JS as:
  // {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse({comment.date})))}

  const toggleCommentModal = () => {
    setModalVisibility(!isModalOpen);
  };

  if (comments !== null)
    return (
      <div>
        <h4>Comments</h4>
        <ul className="list-unstyled">
          {comments.map((comment) => (
            <div key={comment.id}>
              <li>{comment.comment}</li>
              <li>
                {comment.rating} {comment.rating !== '1' ? 'stars' : 'star'} --{' '}
                {comment.author},
                <Moment
                  interval={0}
                  format="YYYY/MM/DD HH:mm Z"
                  date={comment.date}
                />
              </li>
              <p />
            </div>
          ))}
        </ul>
        <Button outline color="secondary" onClick={toggleCommentModal}>
          <span className="fa fa-pencil fa-lg mr-2" />
          Submit Comment
        </Button>
        <AddComment
          isModalOpen={isModalOpen}
          setModalVisibility={setModalVisibility}
          postCommentAction={postCommentAction}
          dishId={dishId}
        />
      </div>
    );
}

class DishDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dish: props.dish,
      comments: props.comments,
    };
  }

  render() {
    const { dish, comments } = this.state;
    const { postCommentAction, isLoading, errMess } = this.props;
    if (isLoading === true) {
      return (
        <div className="container">
          <div className="row m-5 text-center">
            <Loading />
          </div>
        </div>
      );
    }
    if (errMess !== null) {
      return (
        <div className="container">
          <div className="row m-5 text-center">
            <h4>{errMess}</h4>
          </div>
        </div>
      );
    }
    if (dish !== null) {
      return (
        <>
          <div className="container">
            <div className="row">
              <Breadcrumb>
                <BreadcrumbItem>
                  <Link to="/menu">Menu</Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
              </Breadcrumb>
              <div className="col-12">
                <h3>{dish.name}</h3>
                <hr />
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-sm-12 col-md-5 m-1">
                <RenderDish dish={dish} />
              </div>
              <div className="col-12 col-sm-12 col-md-5 m-1">
                <RenderComments
                  comments={comments}
                  postCommentAction={postCommentAction}
                  dishId={dish.id}
                />
              </div>
            </div>
          </div>
        </>
      );
    }
    return <div />;
  }
}

export default DishDetail;
