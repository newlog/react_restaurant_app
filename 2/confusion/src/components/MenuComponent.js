import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap';
import Dishdetail from './DishdetailComponent';

class Menu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedDish: null
        }
    }

    onDishSelect(dish) {
        this.setState({ selectedDish: dish });
    }

    render() {
        // Iterate for every dish and for each one return the div
        const menu = this.props.dishes.map((dish) => {
            return (
                // Whenever you construct a list of item in React, every item requires a "key" attribute.
                // The key helps React to recognize every item when rendering
                <div key={dish.id} className="col-12 col-md-5 m-1">
                    <Card onClick={() => this.onDishSelect(dish)}>
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                        <CardImgOverlay>
                            <CardTitle>{dish.name}</CardTitle>
                        </CardImgOverlay>
                    </Card>
                </div>
            );
        });

        return (
            <div className="container">
                <div className="row">
                    {menu}
                </div>
                <Dishdetail dishes={this.props.dishes} selectedDish={this.state.selectedDish} />
            </div>
        );
    }
}

export default Menu;