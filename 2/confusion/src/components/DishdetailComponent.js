import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardText, CardTitle } from 'reactstrap';
import Moment from 'react-moment';

class Dishdetail extends Component {

    renderDish() {
        const dish = this.props.selectedDish;
        if (dish != null) {
            const comments = this.getCommentDetails(dish)
            const dishDetails = this.getDishDetails(dish)
            return (
                <div key={dish.id} className="row">
                    <div className="col-12 col-sm-12 col-md-5 m-1">
                        {dishDetails}
                    </div>
                    <div className="col-12 col-sm-12 col-md-5 m-1">
                        {comments}
                    </div>
                </div>
            );
        } else {
            return (
                <div></div>
            );
        }
    }

    getDishDetails(dish) {
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

    getCommentDetails(dish) {
        const comments = dish.comments.map((comment) =>
            <div key={comment.id}>
                <li>{comment.comment}</li>
                <li>-- {comment.author}, <Moment interval={0} format="YYYY/MM/DD HH:mm Z" date={comment.date} /></li>
                <p></p>
            </div>
        );
        return (
            <div>
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    {comments}
                </ul>
            </div>
        );
    }

    render() {
        return (
            this.renderDish()
        );
    }
}

export default Dishdetail;
