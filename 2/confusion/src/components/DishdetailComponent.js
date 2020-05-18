import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardText, CardTitle } from 'reactstrap';

class Dishdetail extends Component {

    renderDish() {
        const dish = this.props.selectedDish;
        if (dish != null) {
            return (
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        } else {
            return (
                <div></div>
            );
        }
    }

    render() {
        return (
            <div className="row">
                {this.renderDish()}
            </div>
        );
    }
}

export default Dishdetail;