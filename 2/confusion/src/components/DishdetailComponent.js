import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardText, CardTitle } from 'reactstrap';

class Dishdetail extends Component {

    renderDish() {
        const dish = this.props.selectedDish;
        if (dish != null) {
            const comments = this.renderComments()
            return (
                <div className="row">
                <div key={dish.id} className="col-12 col-sm-12 col-md-5 m-1">
                    <Card>
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
                {comments}
                </div>
            );
        } else {
            return (
                <div></div>
            );
        }
    }

    renderComments() {
        const dish = this.props.selectedDish;
        const commentDetail = this.getCommentDetails(dish)
        return (
            <div className="col-12 col-md-5 m-1">
                {commentDetail}
            </div>
        );
    }

    getCommentDetails(dish) {
        return dish.comments.map(comment =>
            <div key={comment.id}>
                <div className="row">
                    {comment.author} - {comment.date}
                </div>
                <div className="row">
                    Rating: {comment.rating}
                </div>
                <div className="row">
                    <b>Comment:</b>
                </div>
                <div className="row">
                    <p>
                        {comment.comment}
                    </p>
                </div>
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
