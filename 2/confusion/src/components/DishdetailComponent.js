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

function RenderDish({ dish }) {
  return (
    <Card>
      <CardImg width="100%" src={dish.image} alt={dish.name} />
      <CardBody>
        <CardTitle>{dish.name}</CardTitle>
        <CardText>{dish.description}</CardText>
      </CardBody>
    </Card>
  );
}

function RenderComments({ comments }) {
  // Instead of "moment" module for dates, we can use standard JS as:
  // {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse({comment.date})))}
  return (
    <div>
      <h4>Comments</h4>
      <ul className="list-unstyled">
        {comments.map((comment) => (
          <div key={comment.id}>
            <li>{comment.comment}</li>
            <li>
              -- {comment.author},{' '}
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
    </div>
  );
}

class DishDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dish: props.dish,
      comments: props.comments,
      isModalOpen: false,
    };
    this.toggleCommentModal = this.toggleCommentModal.bind(this);
  }

  toggleCommentModal() {
    const { isModalOpen } = this.state;
    this.setState({
      isModalOpen: !isModalOpen,
    });
  }

  render() {
    const { dish, comments, isModalOpen } = this.state;
    if (this.dish !== null) {
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
                <RenderComments comments={comments} />
                <Button
                  outline
                  color="secondary"
                  onClick={this.toggleCommentModal}
                >
                  <span className="fa fa-pencil fa-lg mr-2" />
                  Submit Comment
                </Button>
              </div>
            </div>
          </div>
          <AddComment
            isModalOpen={isModalOpen}
            toggleCommentModal={this.toggleCommentModal}
          />
        </>
      );
    }
    return <div />;
  }
}

export default DishDetail;
