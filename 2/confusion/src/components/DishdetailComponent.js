import React from 'react';
import { Card, CardImg, CardBody, CardText, CardTitle } from 'reactstrap';
import Moment from 'react-moment';

function RenderDish({dish}) {
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

function RenderComments({dish}) {
    // Instead of "moment" module for dates, we can use standard JS as:
    // {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse({comment.date})))}
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

const DishDetail = (props) => {
    const dish = props.dish;
    if (dish != null) {
        return (
            <div className="container">
                <div key={dish.id} className="row">
                    <div className="col-12 col-sm-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-sm-12 col-md-5 m-1">
                        <RenderComments dish={props.dish} />
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div></div>
        );
    }
}


export default DishDetail;